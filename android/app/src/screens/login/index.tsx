import React, { useState, useContext, useRef, useEffect }  from 'react';
import { Text, View, Image, TextInput, Pressable, KeyboardAvoidingView, Dimensions } from 'react-native';
import Styles from '../../assets/styles'
import auth from '@react-native-firebase/auth';
import TextColorSwitcher from '../../components/TextColorSwitcher';
import { ThemeContext } from '../../context/ThemeContext';
// import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

export default function Login({navigation, route}: any) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showNotif, setShowNotif] = useState(false)
  const [emailFocus, setEmailFocus] = useState<boolean | undefined>(true)
  const [passwordFocus, setPasswordFocus] = useState<boolean | undefined>()
  const [loginFocus, setLoginFocus] = useState<boolean>(false)
  const [registerFocus, setRegisterFocus] = useState<boolean>(false)
  let emailRef = useRef<TextInput | null>(null)
  let passwordRef = useRef<TextInput | null>(null)
  // let registerRef = useRef<TextInput>(null)

  let theme = useContext(ThemeContext)

  useEffect(()=>{
    setTimeout(()=>{emailRef.current && emailRef.current.focus()},100)
  }, [])

  let Login = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
      })
      .catch((error: any) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View style={[Styles.container, {backgroundColor: '#1c1d1f', height: Dimensions.get('screen').height}]}>
      <Image style={{width: 80, height: 25, alignSelf:'center', marginTop:20}} source = {require('../../assets/logo.png')} />
      <View style={Styles.homeContainer}>
        <Text style = { [Styles.homeHeader, {color:'white'}] }>Please log in</Text>
        <TextInput 
            // autoFocus={emailFocus ? true : false}
            // blurOnSubmit={true}
            style={[Styles.input, {borderWidth: emailFocus ? 2 : 0, borderColor: emailFocus ? 'red' : 'black'}]}
            placeholder="Email" 
            onChangeText={(text)=>{setEmail(text)}} 
            // onFocus={()=>{setEmailFocus(true)}} 
            // onBlur={()=>{setEmailFocus(false)}}
          //   ref={(ref)=>{ 
          //     if (ref !== undefined && ref && !ref.isFocused() ) {ref.focus()}
          // }
          // }
          // nextFocusDown={1}
            ref={emailRef}
            
            onSubmitEditing={()=>{{setTimeout(() => {setEmailFocus(false); passwordRef.current && passwordRef.current.focus()}, 200)}}}
        ></TextInput>
        <TextInput 
            secureTextEntry={true}
            style={[Styles.input, {borderWidth: passwordFocus ? 2 : 0, borderColor: passwordFocus ? 'red' : 'black'}]}
            placeholder="Password"
            onChangeText={(text)=>{setPassword(text)}}
            onFocus={()=>{setPasswordFocus(true)}}
            onBlur={()=>{setPasswordFocus(false)}}
            ref={passwordRef}
            // ref={(ref)=>{ 
            //       if (passwordFocus && ref !== undefined && ref && !ref.isFocused()) {setTimeout(()=>{ref.focus()}, 100)}}}
        ></TextInput>
        <Pressable
            onFocus={()=>{setLoginFocus(true)}}
            onBlur={()=>{setLoginFocus(false)}}
            onPress={() => {Login()}}
            style = {[Styles.showMoreButton, {margin:10, width:170, borderWidth: loginFocus ? 2 : 0, borderColor: loginFocus ? 'red' : 'black'}]}
            // ref={loginRef}
        >
            <Text style={{color:'white'}}>Log in</Text>
        </Pressable>
        <Pressable 
            onPress={()=>{navigation.navigate('Register')}} 
            style = {{borderWidth: registerFocus ? 2 : 0, borderColor: registerFocus ? 'red' : 'black'}}
            onFocus={()=>{setRegisterFocus(true)}} 
            onBlur={()=>{setRegisterFocus(false)}}
            // ref={registerRef}
        >
          <Text style ={{alignSelf: 'center', color:'white'}}>
            Register
          </Text>
        </Pressable>
        <View style = {{flexDirection: 'row', marginTop: 15, alignSelf: 'center'}}>
          {/* <TextColorSwitcher>Sign in with:   </TextColorSwitcher> */}
          {/* <Pressable onPress={() => {GoogleSignin.signIn()}}>
            <Image style={{width: 80, height: 25}} source = {require('../../assets/google_logo.png')} />
          </Pressable> */}
        </View>
      </View>
     {showNotif && <Text style = {[Styles.homeNotif, {color:'red'}]}>Incorrect user name or password</Text>}
    </View>
  );
}
