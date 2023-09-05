import React, { useState, useContext }  from 'react';
import { Text, View, TextInput, Pressable, KeyboardAvoidingView, Image } from 'react-native';
import TextColorSwitcher from '../../components/TextColorSwitcher';
import Styles from '../../assets/styles'
// import auth from '@react-native-firebase/auth';
// import { addUserMongoDB } from '../../services/MongoDBFetch';
import { ThemeContext } from '../../context/ThemeContext';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';


export default function Register({navigation, route}: any) {

  const [userName, setUserName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showNotif, setShowNotif] = useState(false)

//   let user = useContext(UserContext)
  let theme = useContext(ThemeContext)

  let Login = () => {
    // auth()
    //   .createUserWithEmailAndPassword(email, password)
    //   .then((user) => {
    //     console.log('User account created & signed in!');
    //     // navigation.navigate('Home')
    //     console.log(user.user)
    //     addUserMongoDB(user.user.uid)
    //     auth().currentUser?.updateProfile({displayName: userName})
    //   })
    //   .catch((error: any) => {
    //     if (error.code === 'auth/email-already-in-use') {
    //       console.log('That email address is already in use!');
    //     }

    //     if (error.code === 'auth/invalid-email') {
    //       console.log('That email address is invalid!');
    //     }

    //     console.error(error);
    //   });
  }

  return (
    <KeyboardAvoidingView style={[Styles.container, {
        backgroundColor: theme?.getColorTheme() == 'dark' ? '#1c1d1f' : 'white'
        }]}>
      <Image style={{width: 80, height: 25, alignSelf:'center', marginTop:15}} source = {require('../../assets/logo.png')} />
      <View style={Styles.homeContainer}>
        <TextColorSwitcher style = { Styles.homeHeader }>Please register</TextColorSwitcher>
        <TextInput style={Styles.input} placeholder="User name" onChangeText={(text)=>{setUserName(text)}}></TextInput>
        <TextInput style={Styles.input} placeholder="Email" onChangeText={(text)=>{setEmail(text)}}></TextInput>
        <TextInput secureTextEntry={true} style={Styles.input} placeholder="Password" onChangeText={(text)=>{setPassword(text)}}></TextInput>
        <Pressable
            onPress={() => {Login()}}
            style = {[Styles.showMoreButton, {margin:10}]}
            // onPress={() => {navigation.navigate('Browse'), setShowNotif(false)}}
        >
            <Text>Register and log in</Text>
        </Pressable>
        <Pressable onPress={()=>{navigation.navigate('Login')}}>
          <TextColorSwitcher style ={{alignSelf: 'center'}}>
            Already registered? <Text style={{textDecorationLine:'underline'}}>Log in</Text>
          </TextColorSwitcher>
        </Pressable>
        <View style = {{flexDirection: 'row', marginTop: 15, alignSelf: 'center'}}>
          <TextColorSwitcher>Sign in with:   </TextColorSwitcher>
          {/* <Pressable onPress={() => {GoogleSignin.signIn()}}>
            <Image style={{width: 80, height: 25}} source = {require('../../assets/google_logo.png')} />
          </Pressable> */}
        </View>
      </View>
     {showNotif && <Text style = {Styles.homeNotif}>Incorrect user name or password</Text>}
    </KeyboardAvoidingView>
  );
}
