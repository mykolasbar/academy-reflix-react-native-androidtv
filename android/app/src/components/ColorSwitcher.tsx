import React, { useState, useEffect, useContext }  from 'react';
import { StyleSheet, Text, View, Button, Pressable, Image } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import Styles from '../assets/styles';
import TextColorSwitcher from './TextColorSwitcher';

const ColorSwitcher = () => {
    let theme = useContext(ThemeContext)

    return (
        <View style = {{flexDirection:'row', position:'absolute', zIndex:+100}}>
            <View>
                <View style = {{height:36, paddingRight:10}}>
                    <TextColorSwitcher>Dark</TextColorSwitcher>
                </View>
                <View style = {{height:36, paddingRight:10}}>
                    <TextColorSwitcher>Light</TextColorSwitcher>
                </View>
            </View>
            <View style = {{flexDirection:'column', backgroundColor:'#7ba5e8', width:36, height:66, alignItems:'center', justifyContent:'center'}}>
                <Pressable 
                    onPress = {() => {theme?.setColorTheme('dark')}}
                    style={{width:30, height:30, backgroundColor: theme?.getColorTheme()  === 'dark' ? 'black' : '#7ba5e8'}}>
                </Pressable>
                <Pressable 
                    onPress = {() => {theme?.setColorTheme('light')}}
                    style={{width:30, height:30, backgroundColor: theme?.getColorTheme()  === 'light' ? 'black' : '#7ba5e8'}}>
                </Pressable>
            </View>
        </View>
    );
};

export default ColorSwitcher;