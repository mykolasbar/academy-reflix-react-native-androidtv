import React, { useState, useEffect, useContext }  from 'react';
import { Text, View, Pressable, Image, ScrollView } from 'react-native';
import Styles from '../../assets/styles';
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Menu from '../../components/Menu';
import { ThemeContext } from '../../context/ThemeContext';
import {fetchListData} from '../../services/MongoDBFetch'
import filmInterface from '../../assets/filmInterface';
import ShowMoreButton from '../../components/ShowMoreButton'
import LoadingAnimation from '../../components/LoadingAnimation';
import BackButton from '../../components/BackButton';
import {RotateInView} from '../../components/AnimatedTest';
 
export default function FullCategoryScreen({navigation, route, category}: any) {
    const [filmList, setFilmList] = useState<filmInterface[] | undefined>()
    const [showNavigation, setShowNavigation] = useState<Boolean>(false)
    const [error, setError] = useState<Boolean>(false)
    const [errMessage, setErrMessage] = useState<String>('')
    const [loading, setLoading] = useState<Boolean>(false)
    const [inFocus, setInFocus] = useState<Boolean>(false)

    let [filmsPage, setFilmsPage] = useState<Array<filmInterface> | undefined | string>([])

    let [page, setPage] = useState(1)
    let [recordsPerPage, setRecordsPerPage] = useState(10)

    let indexOfLastPost = page * recordsPerPage
    let indexOfFirstPost = indexOfLastPost - recordsPerPage
    let [totalPages, setTotalPages] = useState<number>()

    let setCurrentPage = (pageNumber: number) => {
      setPage(pageNumber)
    }

    let theme = useContext(ThemeContext)

    useEffect(() => {
        console.log('Test')
        setLoading(true)
        fetchListData('http://10.0.2.2:3000/' + route.params.query)
        .then((response) => {console.log('Responseee: ' + response), typeof response != 'string' ? (setTotalPages(Math.ceil(response.length / recordsPerPage)), setFilmsPage(response.slice(indexOfFirstPost, indexOfLastPost)), setLoading(false)) : (setFilmsPage(response), setLoading(false))})
        .catch((err) => {console.log(err.message); setError(true); setErrMessage(err.message)})
    }, [page]);

    return (
        <>
            <Menu navigation = {navigation}/>
            <ScrollView style={[Styles.container, {backgroundColor:  theme && theme.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]} onMomentumScrollBegin = {()=>{setShowNavigation(true)}}>
            {error ? (<TextColorSwitcher style = {Styles.browseHeading}>Error: {errMessage}</TextColorSwitcher>) : 
                loading ? (<LoadingAnimation message = 'Loading films...' />) : 
                <View style = {{paddingBottom:20}}>
                    <BackButton navigation = {navigation}/>
                    <View style = {{flexDirection:'row'}}><TextColorSwitcher style = {{fontSize: 25, fontWeight: 300, color: "white", paddingBottom: 8}}>{route.params.title}</TextColorSwitcher></View>
                    <TextColorSwitcher style = {{position:'absolute', top:40, right:10}}>Page: {page}</TextColorSwitcher>
                    <View style = {{flexDirection: "row", flexWrap: "wrap"}}>
                    {filmsPage !== undefined && (typeof filmsPage != 'string' ? filmsPage.map((movie, index) => 
                        <View style = {Styles.fulCategoryComponent} key = {movie._id}> 
                            {movie.poster != 'No poster' ? <Image
                                style={{height:230, width:150}}
                                source={{uri: movie.poster}}
                                resizeMethod={'auto'}
                            />
                            : 
                            <View style={{height:230, width:150, backgroundColor:'rgb(59, 57, 51)'}}><TextColorSwitcher style={{textAlign: 'center', paddingTop:'25%'}}>No poster</TextColorSwitcher></View>}
                            <View style = {{flexDirection:'column'}}>
                                <TextColorSwitcher style = {{fontWeight:'bold', height:40, paddingTop:5}}>{movie.title}</TextColorSwitcher>
                                {route.params.query == 'highestrated' ? 
                                <View>
                                    <TextColorSwitcher>Average rating: <Text style={{color: theme && theme.getColorTheme() === 'dark' ? 'yellow' : 'blue', fontWeight:'bold'}}>{movie.avgrating}</Text></TextColorSwitcher>
                                    <TextColorSwitcher>Popularity index: <Text style={{color:'green', fontWeight:'bold'}}>{'\n'}{movie.popularityrating}</Text></TextColorSwitcher>
                                </View> :null}
                                {route.params.query == 'popular' ? 
                                <TextColorSwitcher style = {{height:40, paddingTop:5}}>Popularity index: <Text style={{color:'green', fontWeight:'bold'}}>{'\n'}{movie.popularityrating}</Text></TextColorSwitcher>
                                : null}
                                <ShowMoreButton navigation = {navigation} film = {movie}/>
                            </View>
                        </View>
                        ): <TextColorSwitcher>{filmsPage}</TextColorSwitcher>)}
                    </View>
                </View>}
            </ScrollView>
            {showNavigation && <View style = {Styles.navigation}>
                <Pressable
                    disabled = {page <= 1 && true}
                    onPress={() => {setPage(page == 1 ? 1 : page-1)}}
                    onFocus={()=>{setInFocus(true)}} 
                    onBlur = {()=>{setInFocus(false)}}
                    style = {{borderWidth: inFocus ? 1 : 0, borderColor: inFocus && 'red'}}
                >
                    <Text style = {Styles.buttonText}>
                        Previous
                    </Text>
                </Pressable>
                <Pressable
                    onPress={() => {setPage(page == totalPages ? totalPages : page+1)}}
                    onFocus={()=>{setInFocus(true)}} 
                    onBlur = {()=>{setInFocus(false)}}
                    style = {{borderWidth: inFocus ? 1 : 0, borderColor: inFocus && 'black'}}
                >
                    <Text style = {Styles.buttonText}>
                        Next
                    </Text>
                </Pressable>
            </View>}
        </>
    );
};