import React, {useState, useEffect, useContext} from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView, Linking, Pressable } from 'react-native';
import { fetchPreviewListData } from '../services/MongoDBFetch';
import filmInterface from '../assets/filmInterface';
// import { Link, useNavigate } from "react-router-dom";
import Styles from '../assets/styles';
import { ThemeContext } from '../context/ThemeContext';
import TextColorSwitcher from './TextColorSwitcher';
import ShowMoreButton from './ShowMoreButton';
import LoadingAnimation from './LoadingAnimation';
import Menu from './Menu';


const FilmsListPreview = ({navigation, query}: any) => {
    const [listPreview, setListPreview] = useState<Array<filmInterface> | undefined | string>([])
    const [loading, setLoading] = useState<Boolean>()    

    useEffect(()=>{
      setLoading(true)
      fetchPreviewListData('http://10.0.2.2:3000/' + query + '?preview=true')
      .then((response) => {
        console.log('Film list preview: ' + response);
        setListPreview(response)
        setLoading(false)
      })
    }, [])

    console.log('List preview is: ' + listPreview)

    return (
        <ScrollView horizontal = {true} style = {Styles.browseRows}>
          {!loading ? (listPreview !== undefined && typeof listPreview !== 'string' ? listPreview.map((film, id) => 
            id == listPreview.length ? 
            <View key = {id} style = {Styles.browseComponent}>
              <TextColorSwitcher style = {Styles.browseHeading}>{film.title}</TextColorSwitcher>
              {film.poster != 'No poster' ? <Image source = {{uri: film.poster}} alt = {film.poster} style = {Styles.image}/> : <View style={{height:250, width:170, backgroundColor:'rgb(59, 57, 51)'}}><TextColorSwitcher style={{textAlign: 'center', paddingTop:'25%'}}>No poster</TextColorSwitcher></View>}
              <ShowMoreButton navigation = {navigation} film = {film} extraStyle = {{width: 170}}/>
            </View>
            :
            <View key = {id} style = {Styles.browseComponent}>
              <TextColorSwitcher style = {Styles.browseHeading}>{film.title}</TextColorSwitcher>
              {film.poster != 'No poster' ? <Image source = {{uri: film.poster}} alt = {film.poster} style = {Styles.image}/> : <View style={{height:250, width:170, backgroundColor:'rgb(59, 57, 51)'}}><TextColorSwitcher style={{textAlign: 'center', paddingTop:'25%'}}>No poster</TextColorSwitcher></View>}
              <ShowMoreButton navigation = {navigation} film = {film} extraStyle = {{width: 170}}/>
            </View>
            ): <TextColorSwitcher>{listPreview}</TextColorSwitcher>)
             : <LoadingAnimation message = 'Loading films...' />
          }
        </ScrollView>
    );
};

export default FilmsListPreview;