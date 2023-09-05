import React, { useRef } from 'react';
import { View, Image,TouchableOpacity } from 'react-native';
import Styles from '../assets/styles';

const Menu = ({navigation, route}: any) => {
    let firstMenuItem = useRef<Image>(null)

    return (
        <View style = {Styles.menu}>
            <Image style={{width: 80, height: 25, alignSelf:'center'}} source = {require('../assets/logo.png')} />
            <TouchableOpacity onPress={() => navigation.navigate('Home')} >
                <Image style = {Styles.menuLogo} source = {require('../assets/menu-icon.png')} ref={firstMenuItem} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                <Image style = {Styles.menuLogo} source = {require('../assets/search-icon-white-png-18.jpg')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Image style = {Styles.menuLogo} source = {require('../assets/profile-icon2.png')} />
            </TouchableOpacity>
        </View>
    );
};

export default Menu;