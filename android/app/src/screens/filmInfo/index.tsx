import React, { useState, useEffect, useContext, useRef }  from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking, Pressable, Dimensions } from 'react-native';
import Styles from '../../assets/styles';
import FullPoster from '../../components/FullPoster';
import Player from '../../components/Player';
import FullCategoryScreen from '../category';
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Menu from '../../components/Menu';
import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/ThemeContext';
import {fetchFilmData, fetchFavauriteFilms, addToFavaurites, removeFromFavaurites} from '../../services/MongoDBFetch'
import filmInterface from '../../assets/filmInterface';
import auth from '@react-native-firebase/auth';
import BackButton from '../../components/BackButton';
import Video from 'react-native-video';
import LoadingAnimation from '../../components/LoadingAnimation';

const MovieDetails = ({navigation, route}: any) => {
    let theme = useContext(ThemeContext)
    const [movieDetails, setMovieDetails] = useState<filmInterface | undefined>()
    const [showFullPoster, setShowFullPoster] = useState<Boolean>(false)
    const [showPlayer, setShowPlayer] = useState<Boolean>(false)
    const [error, setError] = useState<Boolean>(false)
    const [errMessage, setErrMessage] = useState<String>('')
    const [loading, setLoading] = useState<Boolean>(false)
    const [inFavaurites, setInFavaurites] = useState<boolean>(false)
    const [posterFocus, setPosterFocus] = useState<Boolean>(false)
    const [buttonFocus, setButtonFocus] = useState<Boolean>(false)
    const [trailerFocus, setTrailerFocus] = useState<Boolean>(false)

    const closeModal = (type: any) => {
        type === 'player' && showPlayer ? setShowPlayer(false) : null
        type === 'poster' && showFullPoster ? setShowFullPoster(false) : null
    }

    useEffect(() => {
      setLoading(true)
      fetchFilmData('http://10.0.2.2:3000/films/' + route.params.movieInfo.imdbid)
      .then((result) => {setMovieDetails(result); checkFavaurite(result); setLoading(false)})
      .catch((err) => {console.log(err.message); setErrMessage(err.message)})
    }, [route]);

    let checkFavaurite = (filmData: any)=>{
      fetchFavauriteFilms(auth().currentUser?.uid)
        .then(response=>{
          console.log(response)
          if (response.find((film: any) => {return film._id === filmData?._id}) === undefined) {
            setInFavaurites(false)}
          else setInFavaurites(true)})
    }

    return (
      <>
        <Menu navigation = {navigation}/>
        {showFullPoster ? movieDetails && <FullPoster image = {movieDetails?.poster} closeModal = {closeModal}/> : null}
        {showPlayer ? <Player url = {movieDetails?.videolink} closeModal = {closeModal}/> : null}
        <ScrollView style={[Styles.container, {backgroundColor: theme?.getColorTheme() == 'dark' ? '#1c1d1f' : 'white', zIndex:0, position:'relative'}]} horizontal={false}>
        <BackButton navigation = {navigation}/>
        { error ? <TextColorSwitcher style = {Styles.browseHeading}>Error: {errMessage}</TextColorSwitcher> :  
          loading ? <LoadingAnimation message = 'Loading film...' /> :     
          <View style = {Styles.movieScreenContainer}>
            {/* <Video resizeMode="contain" paused={true} style = {{width: Dimensions.get('window').width, height: 200}} source={{uri: "https://imdb-video.media-imdb.com/vi3956589337/1434659607842-pgv4ql-1637943487598.mp4?Expires=1692368814&Signature=XbhtqF5TMJpG4S0FZaakQtFS~Cckg32HDhKaZsS8XlWq79VuXZZdK-3oihGSK93PYL5YQUC3PvRpgaKLcCwhOJSWQNbwe4WDJa21UF4eie-o8cGGcyxd0otDfZGHmgo~toJeC0qotwX4zN83dfTJ~MsBSFY2FBTGW1g5ZPzaZxZGurbhNaWFup0CF5~JtyQtUS~Q-72D1UqrdiJCQyB82UuguvOzGDn53Gsksa6T0qbk0kSBRHZAR7c6SWm21MKOLKYhv-fcE~r2VEBesMOQefE6KPuXLvUMmbGkLh738yH9a~uwx0QA~EgaFJyUXH4DRuHGnaMY4ZuJti3KJSVnfg__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"}}/> */}

            {movieDetails && <TextColorSwitcher style = {Styles.movieDetailsHeader}>{movieDetails.title}</TextColorSwitcher>}
            <View style = {{flexDirection:'row'}}>
              <TouchableOpacity accessible={showFullPoster ? false : true} onPress={() => {setShowFullPoster(true)}} onFocus={()=>{setPosterFocus(true)}} onBlur = {()=>{setPosterFocus(false)}} style = {{borderWidth: posterFocus ? 1 : 0, borderColor: posterFocus && 'red'}}>
                {movieDetails?.poster != 'No poster' && movieDetails?.poster != null ? 
                <Image style={{height:320, width: 230}} source = {{uri: movieDetails?.poster}}/>
                : 
                <View style={{height:320, width:230, backgroundColor:'rgb(59, 57, 51)'}}>
                  <TextColorSwitcher style={{textAlign: 'center', paddingTop:'25%'}}>No poster</TextColorSwitcher>
                </View>}
              </TouchableOpacity>
              <View style={{flexDirection:'column', flex:1, paddingHorizontal:10}}>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Year: <TextColorSwitcher style = {{fontWeight:'bold'}}>{movieDetails?.year}</TextColorSwitcher></TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Average evaluation: <TextColorSwitcher style = {{fontWeight:'bold'}}>{movieDetails?.avgrating}</TextColorSwitcher></TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Genres: {movieDetails?.genres.map((genre, index) => <TextColorSwitcher  key = {genre} style = {{fontWeight:'bold'}}>{genre}{index === movieDetails?.genres.length-1 ? '' : '/'}</TextColorSwitcher>)}</TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Languages: {movieDetails?.country.map((country, index) => <TextColorSwitcher  key = {country} style = {{fontWeight:'bold'}}>{country}{index === movieDetails?.country.length-1 ? '' : '/'}</TextColorSwitcher>)}</TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Country: {movieDetails?.languages.map((language, index) => <TextColorSwitcher  key = {language} style = {{fontWeight:'bold'}}>{language}{index === movieDetails?.languages.length-1 ? '' : '/'}</TextColorSwitcher>)}</TextColorSwitcher>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Runtime: <TextColorSwitcher style = {{fontWeight:'bold'}}>{movieDetails?.length}</TextColorSwitcher></TextColorSwitcher>
                <View style={{flex:1}}><TextColorSwitcher style = {Styles.movieDetailsItem}>{movieDetails?.description}</TextColorSwitcher></View>
                <TextColorSwitcher style = {Styles.movieDetailsItem}>Starring: {movieDetails?.actors.map((actor, index) => <TextColorSwitcher  key = {actor} style = {{fontWeight:'bold'}}>{actor}{index === movieDetails?.actors.length-1 ? '' : '/'}</TextColorSwitcher>)}</TextColorSwitcher>
                <TouchableOpacity  accessible={showFullPoster ? false : true} onPress={() => {setShowPlayer(true)}} onFocus={()=>{setTrailerFocus(true)}} onBlur = {()=>{setTrailerFocus(false)}} style = {{borderWidth: trailerFocus ? 1 : 0, borderColor: trailerFocus && 'red'}}>
                  <TextColorSwitcher style = {{fontWeight:'bold'}}>View Trailer</TextColorSwitcher>
                </TouchableOpacity>
              </View>
            </View>
            <Pressable
              accessible={showFullPoster ? false : true}
              style = {[Styles.addToWatchlistButton, {borderWidth: buttonFocus ? 1 : 0, borderColor: buttonFocus && 'red'}]}
              onPress={() => {inFavaurites === false ? (addToFavaurites(auth().currentUser?.uid, movieDetails?._id), setInFavaurites(true)) : (removeFromFavaurites(auth().currentUser?.uid, movieDetails?._id), setInFavaurites(false))}}
              onFocus={()=>{setButtonFocus(true)}} 
              onBlur = {()=>{setButtonFocus(false)}}
            >
              <Text>{inFavaurites ? 'REMOVE FROM WATCHLIST' : 'ADD TO WATCHLIST'}</Text>
            </Pressable>
            {/* <TextColorSwitcher style = {Styles.browseScreenHeader}>Recommended titles</TextColorSwitcher> */}
            {/* <BrowseMoviesCategory query = {`${route.params.movieInfo.id}/similar`} navigation = {navigation}/> */}
          </View>}
          </ScrollView>
      </>
    );
};

export default MovieDetails;