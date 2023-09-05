import React, { useState, useContext, useEffect }  from 'react';
import { Text, View, Pressable, ScrollView, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';
import filmInterface from '../assets/filmInterface'
import ShowMoreButton from './ShowMoreButton';
import { fetchFavauriteFilms, removeFromFavaurites } from '../services/MongoDBFetch';

// {listPreview, uid, update, navigation} 

const Watchlist = (props: any) => {
    let theme = useContext(ThemeContext)
    const [removeFromWatchlistFocus, setRemoveFromWatchlistFocus] = useState<Boolean>(false)

    // const [updateList, setUpdateList] = useState<boolean>(false)

    console.log(props.listPreview)

    return (   
        <ScrollView horizontal={true} style = {Styles.browseRows}>
        {props.listPreview?.map((movie: any, index: number) => 
            <View key = {index} style = {Styles.browseComponent}> 
                <TextColorSwitcher style = {Styles.browseHeading}>{movie.title}</TextColorSwitcher>
                <Image
                    style={Styles.image}
                    source = {{uri: movie.poster}}
                    resizeMethod={'auto'}
                />
                <ShowMoreButton extraStyle = {{width:170}}/>
                <Pressable
                    style={[Styles.addToWatchlistButton, {width: 170, marginTop: 0, borderWidth: removeFromWatchlistFocus ? 1 : 0, borderColor: removeFromWatchlistFocus && 'red'}]}
                    onPress={()=>{removeFromFavaurites(props.uid, movie._id).then(()=>{props.update()})}}
                    onFocus={()=>{setRemoveFromWatchlistFocus(true)}}
                    onBlur={()=>{setRemoveFromWatchlistFocus(false)}}
                >
                    <Text style = {{fontSize:12}}>REMOVE FROM WATCHLIST</Text>
                </Pressable>
            </View>
        )}
        </ScrollView>
    )
};

export default Watchlist;
