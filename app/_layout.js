import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { Stack, useRouter } from 'expo-router'
import { ToastProvider } from 'react-native-toast-notifications'
import AsyncStorage from "@react-native-async-storage/async-storage"

const RootLayout = () => {
    const router = useRouter()
    useEffect(() => {
        const getToken = async () => {
            try {
                const token = await AsyncStorage.getItem("token")
                token && router.replace("tabhome")
            } catch (error) {
                console.log(error)
            }
        }
        getToken()
    }, [])
    return (
        <ToastProvider>

            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='(pages)/register' options={{ headerShown: false }} />
                <Stack.Screen name='vendorProfile' options={{ headerShown: false }} />
                <Stack.Screen name='(dashboard)' options={{ headerShown: false }} />
                <Stack.Screen name='(tabscreens)' options={{ headerShown: false }} />



            </Stack>
        </ToastProvider>
    )
}

export default RootLayout