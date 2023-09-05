import React, {useState} from 'react';
import {Pressable, Text, View, Button, BackHandler, StyleSheet} from 'react-native';

const BackButton = ({navigation}:  any) => {

    const [inFocus, setInFocus] = useState<Boolean>(false)
    return (
        <View style = {{position: 'absolute', right: 10, top: 10}} >
            <Pressable onPress = {()=>{navigation.goBack()}} onFocus={()=>{setInFocus(true)}} onBlur = {()=>{setInFocus(false)}} style = {{backgroundColor: '#112d5c', width: 60, flex: 1, height: 25, alignItems: 'center', justifyContent: 'center', borderWidth: inFocus ? 1 : 0, borderColor: inFocus && 'red'}}>
                <Text style ={{color:'white'}}>Back</Text>
            </Pressable>
        </View>
    );
};

export default BackButton;
