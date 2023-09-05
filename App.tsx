/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './android/app/src/screens/login';
import Register from './android/app/src/screens/register';
import Main from './android/app/src/screens/films';
import FullCategoryScreen from './android/app/src/screens/category';
import MovieDetails from './android/app/src/screens/filmInfo';
import Profile from './android/app/src/screens/profile';
import Search from './android/app/src/screens/searchResults';
import { ThemeProvider } from './android/app/src/context/ThemeContext';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): JSX.Element {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const [signedIn, setSignedIn] = useState<boolean>(false)

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const firebaseConfig = {
    apiKey: "AIzaSyACXjdizzhp4-5Qn8jxFuz8I6rL8rulsDM",
    authDomain: "reflix-auth-d87c8.firebaseapp.com",
    // authDomain: "http://localhost:3000/",
    projectId: "reflix-auth-d87c8",
    storageBucket: "reflix-auth-d87c8.appspot.com",
    messagingSenderId: "923359454044",
    appId: "1:923359454044:web:c8db157a8f594c8a191799",
    databaseURL: ''
  };


  if (!firebase.apps.length) {firebase.initializeApp(firebaseConfig)}

  useEffect(()=> {
    auth().onAuthStateChanged((user) => {console.log(user); user !== null ? setSignedIn(true) : setSignedIn(false); console.log('Testing google sign in: ' + user)})
  })

  console.log(signedIn)

  return (
    <ThemeProvider>
      <NavigationContainer>
          <Stack.Navigator>
            {signedIn === true ?
              (<>
                <Stack.Screen name="Home" component={Main} />
                <Stack.Screen name="MovieDetails" component={MovieDetails} />
                <Stack.Screen name="FullCategoryScreen" component={FullCategoryScreen}/>
                <Stack.Screen name="Profile" component={Profile}/>
                <Stack.Screen name="Search" component={Search}/>
              </>)
              :
              (<>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
              </>)
            }
          </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
    );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
