import React, { useEffect, useState } from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import TextColorSwitcher from './TextColorSwitcher';
import Styles from '../assets/styles';
import Video from 'react-native-video';
// import VideoPlayer from 'react-native-video-controls';


const Player = (props: any) => {
    const [error, setError] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    return (
        <View style = {{position:'absolute', left: 0, right: 0, top: 0, zIndex:20, backgroundColor:'rgba(0,0,0,0.5)', height: Dimensions.get('window').height}}>
            {error ? <TextColorSwitcher style = {Styles.browseHeading}>Error: {errMessage}</TextColorSwitcher> :
            <View style = {{marginTop:10}}>
                <TouchableOpacity onPress={()=>{props.closeModal('player')}}><TextColorSwitcher style = {{padding:15, textAlign:'right'}}>X</TextColorSwitcher></TouchableOpacity>
                <View>
                    <Video resizeMode="contain" style = {{width: Dimensions.get('window').width, height: 400}} source={{uri: "https://imdb-video.media-imdb.com/vi3956589337/1434659607842-pgv4ql-1637943487598.mp4?Expires=1693065004&Signature=bUno12eQjjwMeEX9q4tvDXDIkU58umk4cxR~qkMyowRPGwMu3XrbiJBCePlERCYJAUku1MRxnUkIKgU0yJkk2tFpgxnwZBfWyqPciiDMFCH9u544e~Msq8MRsIUCoTY7BZraR286ifZ0EQ673m~ErsXfYaahW~dZ1e94LnuesWiqxT0jhjkAE-6JPC6x5D4sOUNYIrf8yIVoZpS3yZ0lNsJW-P1hGblr4Xto50w1VhVHRgrcy3v0o~YFmPLIFEotD1PahYe8ZU29EdVMhMbTbZoDRN8xNEZtY7uSYSe0pdTO5HafQK5is6XK0EuRtL4YEAy-rn-Os~VlylO4grR2SA__&Key-Pair-Id=APKAIFLZBVQZ24NQH3KA"}}/>
                </View>
            </View>}
        </View>
    );
};

export default Player;


// Movie's videos: https://api.themoviedb.org/3/movie/785759/videos?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b

// Movie's details: https://api.themoviedb.org/3/movie/785759?api_key=0f4ef1ceadd5dc4b42d00c8efa9fb83b