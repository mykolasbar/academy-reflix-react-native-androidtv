import React from 'react';
import { Image, Text, View, Pressable, Dimensions, TouchableOpacity } from 'react-native';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';

const FullPoster = (props: any) => {

    return (
        <View style = {Styles.imageModal}>
            {/* <Pressable onPress={()=>{props.closeModal('poster')}}><TextColorSwitcher style = {{padding:5, width: Dimensions.get('window').width, textAlign:'right', fontSize:20}}>X</TextColorSwitcher></Pressable> */}
            <TouchableOpacity onPress={()=>{props.closeModal('poster')}} activeOpacity={1}>
                <Image source = {{uri: props.image}} style = {{height:500, width:330}}/>
            </TouchableOpacity>
        </View>
        );
};

export default FullPoster;