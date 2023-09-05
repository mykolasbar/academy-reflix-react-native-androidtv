import React, { createContext, useState, useEffect, FunctionComponent }  from 'react';
import { useNavigate } from "react-router-dom";
import {signUserOut, signInUser, firebaseObserver, googleSignIn} from '../services/Firebase'


interface ContextProps {
    readonly getUser: () => string | null
    readonly getEmail: () => string | null
    readonly getToken: () => string | null
    readonly getUid: () => string | null
    readonly isLoggedin: () => boolean
    readonly login: (email: string, password: string) => void
    readonly logout: () => void
    readonly googleLogin: () => void
  }

export let AuthContext = createContext<ContextProps | null>(null)

export let AuthProvider = ({children}: any) => {
    let [userName, setUserName] = useState<string|null>(null)
    let [email, setEmail] = useState<string|null>(null)
    let [token, setToken] = useState<string|null>(localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken") || ''))
    let [uid, setUid] = useState<string|null>(null)
    let [loggedIn, setLoggedIn] = useState<boolean>(false)
    let navigate = useNavigate()

    useEffect(() => {
        firebaseObserver.subscribe('checkingState', (user: any)=>user && (setLoggedIn(true)))

        const userData = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData") || "") : ""
        const tokenInfo = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("accessToken") || "") : ""

        setToken(localStorage.getItem("accessToken") && JSON.parse(localStorage.getItem("accessToken") || ''))
        userData !== "" && setUserName(userData.displayName)
        userData !== "" && setEmail(userData.email)
        userData !== "" && setUid(userData.uid)

        // userData !== "" && setLoggedIn(true)

        // tokenInfo !== "" && setToken(tokenInfo)
        // console.log(token)
    }, []);
    
    let getUser = () => {return userName};
    let getEmail = () => {return email};
    let getToken = () => {return token};
    let getUid = () => {return uid};
    let isLoggedin = () => {return token ? true : false};
    let logout = () => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
        localStorage.removeItem('userId')
        signUserOut()
        return 'Success'
    }
    let login = (email: string, password: string) => {
        signInUser(email, password)
        .then(() => {console.log('Signing in'); firebaseObserver.subscribe('loggedIn', (userCredential: any)=>userCredential && (setLoggedIn(true), navigate('/')))})
    }
    let googleLogin = () => {
        googleSignIn()
        .then(() => {console.log('Signing in'); setLoggedIn(true); navigate('/')})
    }

    return (
        <AuthContext.Provider value={{ isLoggedin, getUser, getEmail, getToken, getUid, logout, login, googleLogin }}>
            {children}
        </AuthContext.Provider>
    );


}