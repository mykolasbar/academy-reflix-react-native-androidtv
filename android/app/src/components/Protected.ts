import React, { useContext, useState, useEffect }  from 'react';
import auth from '@react-native-firebase/auth';


const Protected = ({ navigation, children }: any) => {

    let [loaded, setLoaded] = useState(false)

    // auth().onAuthStateChanged((user) => {
    //     if (user) {
          
    //     }
    //   });
      

    useEffect(()=>{setLoaded(true)},[auth().currentUser])

    if (loaded) {
        if (auth().currentUser) {
            return children;
            }

        if (auth().currentUser === null || auth().currentUser === undefined) {
            return navigation.navigate('Login')
            }
        }
    };

export default Protected;