import { createContext, useContext, useEffect, useState } from "react";
import React from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage";

const GlobalContext = createContext()
export const useGlobalContext =()=> useContext(GlobalContext)

const GlobalProvider = ({ children }) => {
    const [token, settoken] = useState(null)
    const [user, setuser] = useState(null)
    useEffect(() => {
        const getToken = async () => {
            try {
                const tokenData = await AsyncStorage.getItem("token")
                const userData = await AsyncStorage.getItem("user")
                tokenData && settoken(tokenData)
                userData && setuser(JSON.parse(userData))
            } catch (error) {
                console.log(error)
            }
        }
        getToken()
    }, [])

    return <GlobalContext.Provider
        value={{ token, user }}>
        {
            children
        }
    </GlobalContext.Provider>

}

export default GlobalProvider