import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer"
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useNavigation, useRouter } from 'expo-router';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Orders from './orders';
import Wishlist from './wishlist';
import logo from "../../assets/coinbasket.jpeg"
import { Ionicons } from '@expo/vector-icons';
import MyProfile from './my-profile';
import { apiConnector } from '../../service/Apiconnector';
import { AuthEndPoint } from '../../service/Apis';
import { SvgUri } from 'react-native-svg';
import Settings from './settings';


const Drawer = createDrawerNavigator();
const BottomTab = createBottomTabNavigator();
const Stack = createStackNavigator();


const CustomDrawerContent = (props) => {
  const router = useRouter()
  const [user, setuser] = useState("")
  const [userData, setuserData] = useState("")
  const { GET_USER_BY_ID } = AuthEndPoint
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
      setimage(response.data.data.image)


    } catch (error) {
      console.log(error)
    }
    setloading(false)
  }
  useEffect(() => {
    getUserById()
  }, [user])

  return (
    <DrawerContentScrollView {...props}>
      {
        !loading && <View className=" w-full items-center justify-center py-8 space-y-2">
          <View style={{ borderRadius: 35, overflow: 'hidden' }}>
            <SvgUri
              uri={image}
              width="70"
              height="70"
              style={{ width: 70, height: 70 }}
            />
          </View>
          <Text className=" text-black text-xl font-semibold">
            {
              userData?.username
            }
          </Text>
          <Text className=" text-sm">
            {
              userData?._id
            }
          </Text>
        </View>
      }
      <DrawerItemList {...props} />
      <DrawerItem
        label="Sign out"
        icon={({ focused, color, size }) => (
          <Ionicons name={focused ? 'exit' : 'exit-outline'} size={size} color={color} />
        )}
        onPress={async () => {
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");
          router.replace("/")
        }}
      />
    </DrawerContentScrollView>
  );
};






const PageLayout = () => {
  return (
    <>
      <Drawer.Navigator initialRouteName="my-profile"
        drawerContent={props => <CustomDrawerContent {...props} />}
        screenOptions={({ route }) => ({
          drawerIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'My-profile') {
              iconName = focused ? 'person-circle' : 'person-circle-outline';
            } else if (route.name === 'Orders') {
              iconName = focused ? 'receipt' : 'receipt-outline';
            } else if (route.name === 'Wishlist') {
              iconName = focused ? 'heart' : 'heart-outline';
            }
            else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Drawer.Screen name='My-profile' component={MyProfile} />
        <Drawer.Screen name='Orders' component={Orders} />
        <Drawer.Screen name='Wishlist' component={Wishlist} />
        <Drawer.Screen name='Settings' component={Settings} />


      </Drawer.Navigator>
      <View className=" w-full bg-[#006BE8] py-7 flex-row justify-between px-6">
        <Ionicons name={"home"} size={24} color={"#ffffff"}
          onPress={() => router.replace("tabhome")}
        />
        <Ionicons name={"cart"} size={24} color={"#ffffff"} onPress={() => router.replace("cart")} />
        <Ionicons name={"person"} size={24} color={"#ffffff"} />

      </View>
    </>
  );
};

export default PageLayout;
