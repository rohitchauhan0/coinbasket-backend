import { View, Text, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormFeild from '../components/common/FormFeild'
import CustomButton from '../components/common/CustomButton'
import { useRouter } from 'expo-router'
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useForm } from 'react-hook-form'
import { AuthEndPoint } from '../service/Apis'
import { apiConnector } from '../service/Apiconnector'


const Profile = () => {
    const { register, handleSubmit, setValue, control, formState: { errors } } = useForm()
    const [loading, setloading] = useState(false)
    const router = useRouter()
    const { UPDATE_VENDOR_PROFILE_API } = AuthEndPoint
    const [userId, setuserId] = useState("")
    useEffect(() => {
        const getUserId = async () => {
            try {
                const getId = await AsyncStorage.getItem("userId")
                setuserId(getId)
            } catch (error) {
                console.log(error)
            }
        }
        getUserId()
    }, [])

    const onSubmitData = async (data) => {
        const { firstname, lastname, phoneNum, gstNum, panNum, address } = data
        setloading(true)
        try {
            const response = await apiConnector("PUT", UPDATE_VENDOR_PROFILE_API, { firstname, lastname, phoneNum, gstNum, panNum, userId, address })
            if (!response.data.success) {
                Alert.alert(response.data.message)
                setloading(false)
            }
            else {
                router.replace("/")
                await AsyncStorage.removeItem("userId")
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
          <View className=" w-full min-h-[85vh] items-center justify-center">
                        <FormFeild title="First name" register={register} placeholder={"Enter your first name"} errors={errors} control={control} customStyle={" w-full"} name={"firstname"} secureEntry={false} />

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

export default Profile