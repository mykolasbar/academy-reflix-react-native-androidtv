import React, {useContext, useEffect, useState} from 'react';
import {View} from 'react-native'
import { ThemeContext } from '../context/ThemeContext';
import TextColorSwitcher from './TextColorSwitcher';

const LoadingAnimation = ({message}: any) => {
    let theme = useContext(ThemeContext)
    const [id, setId] = useState<number>(0)

    useEffect(()=>{
        setInterval(()=>{
            setId(id => id != 5 ? id+1 : id = 0)
            id == 5 && setId(0)
        }, 300)    
    }, [])

    return (
        <View style = {{display:'flex', flexDirection:'row', alignItems:'center'}}>
            <TextColorSwitcher>{message}</TextColorSwitcher>
            <View style = {{display:'flex', flexDirection:'row', marginLeft:5}}>
                <View style = {{width:15, height:15, borderWidth:1, borderColor: theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f', backgroundColor: id == 1 ? (theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f') : '#1c1d1f'}}></View> 
                <View style = {{width:15, height:15, borderWidth:1, borderColor: theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f', backgroundColor: id == 2 ? (theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f') : '#1c1d1f'}}></View> 
                <View style = {{width:15, height:15, borderWidth:1, borderColor: theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f', backgroundColor: id == 3 ? (theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f') : '#1c1d1f'}}></View> 
                <View style = {{width:15, height:15, borderWidth:1, borderColor: theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f', backgroundColor: id == 4 ? (theme?.getColorTheme() == 'dark' ? 'white' : '#1c1d1f') : '#1c1d1f'}}></View>
            </View>
        </View>
    );
};

export default LoadingAnimation;