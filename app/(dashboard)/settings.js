import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { router, useNavigation } from 'expo-router'
import { AuthEndPoint } from '../../service/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { apiConnector } from '../../service/Apiconnector'
import FormFeild from '../../components/common/FormFeild'
import CustomButton from '../../components/common/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import { Toast } from 'react-native-toast-notifications'

const Settings = () => {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
    const [user, setuser] = useState("")
  const [userData, setuserData] = useState("")
  const { GET_USER_BY_ID, EDIT_USER_BY_ID } = AuthEndPoint
  const [loading, setloading] = useState(false)
  const [image, setimage] = useState("")
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
  }, [navigation])
  const getUserById = async () => {
    const userId = user._id
    setloading(true)
    try {
      const response = await apiConnector("POST", GET_USER_BY_ID, { userId })
      setuserData(response?.data?.data)
    setValue("username", response?.data?.data?.username)
    setValue("email", response?.data?.data?.email)
    setValue("firstname", response?.data?.data?.firstname)
    setValue("lastname", response?.data?.data?.lastname)
    setValue("phoneNum", response?.data?.data?.phoneNum)
    setValue("address", response?.data?.data?.address)
    setValue("gstNum", response?.data?.data?.gstNum)
    setValue("panNum", response?.data?.data?.panNum)

    } catch (error) {
      console.log(error)
    }
    setloading(false)
  }
  useEffect(() => {
    getUserById()
  }, [user])
  
  const onSubmitData = async(data)=>{
    setloading(true)
    try {
        const {username, email, firstname, lastname, address, phoneNum , gstNum, panNum} = data
    const userId = user._id

        const response = await apiConnector("PUT", EDIT_USER_BY_ID, {
            username, email, firstname, lastname, address, phoneNum, userId , gstNum, panNum
        })

        if(response.data.success){
            Toast.show("Profile updated")
            navigation.navigate("(dashboard)", {
                screen:"my-profile"
            })
        }
    } catch (error) {
        console.log(error)
    }
    setloading(false)
  }

  return (
    <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
>


<SafeAreaView className=" w-full  items-center justify-center bg-white">
<ScrollView className=" w-full px-5 h-full">
  <View className=" w-full min-h-[85vh] items-center justify-center pb-20">
  <Text className=" text-3xl text-[#1BA7DF] font-semibold py-8">
          Update Your Profile
        </Text>
  <FormFeild title="Username" register={register} placeholder={"Enter your username"} errors={errors} control={control} customStyle={" w-full"} name={"username"} secureEntry={false} />

  <FormFeild title="Email" register={register} placeholder={"Enter your email"} errors={errors} control={control} customStyle={" mt-3 w-full"} name={"email"} secureEntry={false} />
                <FormFeild title="First name" register={register} placeholder={"Enter your first name"} errors={errors} control={control} customStyle={" mt-3 w-full"} name={"firstname"} secureEntry={false} />

                <FormFeild title="Last name" register={register} placeholder={"Enter your last name"} errors={errors} control={control} customStyle={" mt-3 w-full"} name={"lastname"} secureEntry={false} />

                <FormFeild title="Contact number" register={register} placeholder={"Enter your contact number"} errors={errors} control={control} customStyle={"mt-3 w-full"} name={"phoneNum"} secureEntry={false} />

                <FormFeild title="Address" register={register} placeholder={"Enter your address"} errors={errors} control={control} customStyle={"mt-3 w-full"} name={"address"} secureEntry={false} />

                <FormFeild title="GSTIN" register={register} placeholder={"Enter your GST number"} errors={errors} control={control} customStyle={"mt-3 w-full"} name={"gstNum"} secureEntry={false} />

                <FormFeild title="PAN Number" register={register} placeholder={"Enter your PAN number"} errors={errors} control={control} customStyle={"mt-3 w-full"} name={"panNum"} secureEntry={false} />
                <CustomButton isLoading={loading} title={"Save"} handlePress={handleSubmit(onSubmitData)} containerStyle={"w-full text-white mt-10"} />

            </View>
        </ScrollView>
    </SafeAreaView>

</KeyboardAvoidingView>
  )
}

export default Settings