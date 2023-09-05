import React, { useContext, useState, useEffect }  from 'react';
import { View, ScrollView, Text, Pressable } from 'react-native';
// import { AuthContext } from '../../context/Auth';
import { ThemeContext } from '../../context/ThemeContext';
import Styles from '../../assets/styles'
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Watchlist from '../../components/Watchlist';
import Menu from '../../components/Menu';
import ColorSwitcher from '../../components/TextColorSwitcher';
import auth from '@react-native-firebase/auth';
import { fetchFavauriteFilms } from '../../services/MongoDBFetch';
import filmInterface from '../../assets/filmInterface'
import BackButton from '../../components/BackButton';

const Profile = ({navigation}: any) => {

    let theme = useContext(ThemeContext)
    let user = auth().currentUser
    const [listPreview, setListPreview] = useState<Array<filmInterface> | undefined>([])
    const [updateList, setUpdateList] = useState<boolean>(false)
    const [inFocus, setInFocus] = useState<Boolean>(false)
    const [signOutInFocus, setSignOutInFocus] = useState<Boolean>(false)
    const [darkInFocus, setDarkInFocus] = useState<Boolean>(false)
    const [lightInFocus, setLightInFocus] = useState<Boolean>(false)

    let update = () => {
        setUpdateList(!updateList)
    }

    useEffect(()=>{
        fetchFavauriteFilms(user?.uid).then((response) => {console.log(response); setListPreview(response)})
    }, [updateList])

    return (
        <>
        <Menu navigation = {navigation}/>
        <ScrollView style={[Styles.container, {backgroundColor: theme?.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'}]}>
            <BackButton navigation = {navigation}/>
            <View>
                <TextColorSwitcher style = {Styles.profileHeader}>User info</TextColorSwitcher>
                <TextColorSwitcher>Name: {user?.displayName ? user?.displayName : 'Not set'}</TextColorSwitcher>
                <TextColorSwitcher>Email: {user?.email}</TextColorSwitcher>
                <TextColorSwitcher>Account created: {user?.metadata.creationTime}</TextColorSwitcher>
                <TextColorSwitcher>UID: {auth().currentUser?.uid}</TextColorSwitcher>
                <Pressable 
                    onPress = {() => {auth().signOut().then(() => {console.log('User signed out!')})}}
                    onFocus={()=>{setSignOutInFocus(true)}} 
                    onBlur = {()=>{setSignOutInFocus(false)}}
                    style = {{borderWidth: signOutInFocus ? 1 : 0, borderColor: signOutInFocus && 'red'}}
                >
                <TextColorSwitcher style={{color:'white'}}>Sign out</TextColorSwitcher></Pressable>
            </View>
            <View>
                <TextColorSwitcher style = {Styles.profileHeader}>Color theme</TextColorSwitcher>
                <View style = {{flexDirection:'row', position:'relative', zIndex:+100}}>
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
                            onFocus={()=>{setDarkInFocus(true)}} 
                            onBlur = {()=>{setDarkInFocus(false)}}
                            style={{width:30, height:30, backgroundColor: theme?.getColorTheme()  === 'dark' ? 'black' : '#7ba5e8', borderWidth: darkInFocus ? 1 : 0, borderColor: darkInFocus && 'red'}}>
                        </Pressable>
                        <Pressable 
                            onPress = {() => {theme?.setColorTheme('light')}}
                            onFocus={()=>{setLightInFocus(true)}} 
                            onBlur = {()=>{setLightInFocus(false)}}
                            style={{width:30, height:30, backgroundColor: theme?.getColorTheme()  === 'light' ? 'black' : '#7ba5e8', borderWidth: lightInFocus ? 1 : 0, borderColor: lightInFocus && 'red'}}>
                        </Pressable>
                    </View>
                </View>
            </View>
            <View style = {{marginBottom:30}}>
                <TextColorSwitcher style = {Styles.profileHeader}>WATCHLIST:</TextColorSwitcher>
                <Watchlist listPreview = {listPreview} uid = {user?.uid} update = {update} navigation = {navigation}/>
            </View>
        </ScrollView>
        </>
    );
};

export default Profile;