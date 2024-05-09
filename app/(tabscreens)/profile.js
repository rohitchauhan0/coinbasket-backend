import { View, Text } from 'react-native'
import React from 'react'
import { Redirect, useNavigation, useRouter } from 'expo-router'

const Profile = () => {
    const navigation = useNavigation()
    const router = useRouter()
  return (
   <Redirect href={"/my-profile"}/>
  )
}

export default Profile