import React, {useState} from 'react';
import { Text, Pressable } from 'react-native';
import Styles from '../assets/styles'

const ShowMoreButton = ({navigation, film, extraStyle}: any) => {

    const [inFocus, setInFocus] = useState<Boolean>(false)

    return (
            <Pressable onFocus={()=>{setInFocus(true)}} onBlur = {()=>{setInFocus(false)}} style = {[Styles.showMoreButton, {borderWidth: inFocus ? 1 : 0, borderColor: inFocus && 'red'}, extraStyle]} onPress={() => {navigation.navigate('MovieDetails', {movieInfo: film})}}>
                <Text style = {Styles.buttonText}>More Info</Text>
            </Pressable>
    );
};

export default ShowMoreButton;