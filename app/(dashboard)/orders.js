import { View, Text, Image, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {  useEffect, useState } from 'react'

import { AuthEndPoint, OrderEndPoints } from '../../service/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConnector } from '../../service/Apiconnector';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


import { useNavigation, useRouter } from 'expo-router';
const Orders = () => {
    const router = useRouter( )
    const [user, setuser] = useState("")
    const [userData, setuserData] = useState("")
    const { GET_USER_BY_ID } = AuthEndPoint
    const [loading, setloading] = useState(false)
   
    const navigation = useNavigation()
  
    useEffect(() => {
      const getUser = async () => {
        try {
          const getUser = await AsyncStorage.getItem("user")
          setuser(JSON.parse(getUser))
        } catch (error) {
          console.log(error)
        }
      }
      getUser()
    }, [])
  
    const getUserById = async () => {
      const userId = user._id
      setloading(true)
      try {
        const response = await apiConnector("POST", GET_USER_BY_ID, { userId })
        setuserData(response?.data?.data)
      } catch (error) {
        console.log(error)
      }
      setloading(false)
    }


    useEffect(() => {
      getUserById()
    
     
    }, [user])

  
  return (
    <ScrollView>
      <View className=" flex  h-full w-full bg-white">
      {
        userData?.vendorProfile?.order?.length <= 0 ? <Text className=" text-lg text-blue-500 underline"
        onPress={()=>router.replace("product")}
        >Create an order</Text> : userData?.vendorProfile?.order?.map((data, index)=>{
       return <View key={data._id} className="my-3 mx-2 border py-2 border-gray-200 rounded-xl flex-row space-x-10">
            <Image source={{ uri: data?.product?.productImage }} className="h-32 w-32 object-cover" />
            <View className=" space-y-1">
              <Text className="text-base font-semibold">{data?.product?.productName}</Text>
                <Text><FontAwesome name='rupee' size={15} />{" "}{data?.product?.mrp}</Text>
              <Text className="text-base font-semibold"><Text className=" text-gray-400">Total pieces: </Text>{data?.piece}</Text>
            </View>
          </View>
          })
        }
    </View>
    </ScrollView>
  )
}

export default Orders