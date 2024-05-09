import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, RefreshControl } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from 'expo-router';

import { apiConnector } from '../../service/Apiconnector';
import { AuthEndPoint } from '../../service/Apis';
import { SvgUri } from 'react-native-svg';
import { Entypo, AntDesign, FontAwesome6 } from '@expo/vector-icons';
import CustomButton from '../../components/common/CustomButton';


const MyProfile = () => {
  const [user, setuser] = useState("")
  const [userData, setuserData] = useState("")
  const { GET_USER_BY_ID } = AuthEndPoint
  const [loading, setloading] = useState(false)
  const [image, setimage] = useState("")
  const navigation = useNavigation()
  const [refreshing, setRefreshing] = useState(false);

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
  }, [navigation])
  const getUserById = async () => {
    const userId = user._id
    setloading(true)
    try {
      const response = await apiConnector("POST", GET_USER_BY_ID, { userId })
      setuserData(response?.data?.data)
      setimage(response.data.data.image)


    } catch (error) {
      console.log(error)
    }
    setloading(false)
  }
  useEffect(() => {
    getUserById()
  }, [user])

  const onRefresh = async () => {
    setRefreshing(true);
    getUserById()
    setRefreshing(false);
  }
  

  return (
    <View className=" w-full h-full bg-white">
     <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
     >
     <View className=" w-full items-center justify-center  ">
        <Text className=" text-3xl text-[#1BA7DF] font-semibold py-8">
          Welcome To Coin Basket
        </Text>
        <View style={{ borderRadius: 75, overflow: 'hidden' }} >
          <SvgUri
            uri={image}
            width="90"
            height="90"
            style={{ width: 90, height: 90 }}
          />
        </View>
        <Text className=" text-black py-3 text-xl font-semibold">
          {
            userData?.username
          }
        </Text>
        <View className=" space-y-5 py-14 ">
          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <Entypo name="user" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.firstname}</Text>
            <Text className=" text-base font-serif">{userData?.lastname}</Text>
            </View>
          </View>

          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <Entypo name="mail" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.email}</Text>
            </View>
          </View>

          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <AntDesign name="contacts" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.phoneNum}</Text>
            </View>
          </View>

          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <Entypo name="location" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.address}</Text>
            </View>
          </View>
      
          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <AntDesign name="creditcard" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.panNum}</Text>
            </View>
          </View>

          <View className=" w-80 px-3 rounded-xl py-3 items-center  flex flex-row space-x-4 bg-gray-200">
            <AntDesign name="user" size={28} color="#303232" />
            <View className=" flex-row items-center space-x-2">
            <Text className=" text-base font-serif" >{userData?.gstNum}</Text>
            </View>
          </View>

         
        </View>
      </View>
     </ScrollView>
    </View>
  )
}

export default MyProfile