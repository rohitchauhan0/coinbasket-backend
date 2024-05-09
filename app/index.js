import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform, Image, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormFeild from '../components/common/FormFeild'
import { useForm } from 'react-hook-form'
import CustomButton from '../components/common/CustomButton'
import logo from "../assets/coinbasket.jpeg"
import { AuthEndPoint } from '../service/Apis'
import { apiConnector } from '../service/Apiconnector'
import AsyncStorage from "@react-native-async-storage/async-storage"

const Index = () => {
  const navigate = useNavigation()
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
  const [loading, setloading] = useState(false)
  const {LOGIN_API} = AuthEndPoint
  useEffect(() => {
    const getUserId = async()=>{
       try {
           const getId = await AsyncStorage.getItem("userId")
           getId  && router.replace("vendorProfile")
       } catch (error) {
           console.log(error)
       }
    }
    getUserId()
   }, [])


const onSubmitData = async (data) => {
    const { email, password } = data
    setloading(true)
    try {
        const response = await apiConnector("POST", LOGIN_API, { email, password })
        if (!response.data.success) {
            Alert.alert("Login Error", response.data.message)
        }
        const user = JSON.stringify(response.data.user)
        await AsyncStorage.setItem("token", response?.data?.token)
        await AsyncStorage.setItem("user", user)
        router.replace("my-profile")
    } catch (error) {
        console.log(error)
    }
    setloading(false)

}
  const router = useRouter()


  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
    >

      <SafeAreaView className=" w-full  items-center justify-center bg-white">
        <ScrollView className=" w-full px-5 h-full">
          <View className=" w-full min-h-[85vh] items-center justify-center">
          <Image source={logo} width={100} height={100} className=" w-20 h-20 rounded-full " />
            <FormFeild title="Email" register={register} placeholder={"Enter your email"} errors={errors} control={control} customStyle={" w-full"} name={"email"} secureEntry={false} />

            <FormFeild title="Password" register={register} placeholder={"Enter your password"} errors={errors} control={control} customStyle={"mt-3 w-full"} name={"password"} secureEntry={true} />
            <CustomButton isLoading={loading} title={"Login"} handlePress={handleSubmit(onSubmitData)} containerStyle={"w-full text-white mt-10"} />

            <TouchableOpacity className=" mt-4" onPress={() => router.replace("/register")}>
              <Text >Join as a vendor? <Text className=" font-semibold text-blue-500">Register</Text></Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  )
}

export default Index