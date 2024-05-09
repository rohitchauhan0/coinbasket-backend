import { View, Text, Image, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthEndPoint, OrderEndPoints } from '../../service/Apis'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiConnector } from '../../service/Apiconnector';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';


const Product = () => {
  const [user, setuser] = useState("")
  const [userData, setuserData] = useState("")
  const { GET_USER_BY_ID, REMOVE_FROM_CART_API } = AuthEndPoint
  const {CREATE_ORDER_API} = OrderEndPoints
  const [loading, setloading] = useState(false)
  const [refreshing, setRefreshing] = useState(false);
  const [counts, setCounts] = useState({}); 
  const navigation = useNavigation()
  const router = useRouter()
  const [processing, setprocessing] = useState(false)


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
    } catch (error) {
      console.log(error)
    }
    setloading(false)
  }


  useEffect(() => {
    getUserById();
  }, [user]);

  useEffect(() => {
    userData?.cart?.forEach((data, index) => {
      setCounts(prevCounts => ({
        ...prevCounts,
        [data.productId._id]: parseInt(data.piece)
      }));
    });
  }, [userData]);

  useFocusEffect(
    useCallback(() => {
      getUserById();
    }, [user])
  );

  const removeFromCart = async (cartId) => {
    setloading(true)
    try {
      const userId = user._id
      const response = await apiConnector("POST", REMOVE_FROM_CART_API, { cartId, userId })
      getUserById()
    } catch (error) {
      console.log(error)
    }
    setloading(false)
  }

  const onRefresh = async () => {
    setRefreshing(true);
    getUserById()
    setCounts({})
    setRefreshing(false);
  }

  const handleIncrement = (productId, piece) => {
    setCounts(prevCounts => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || parseInt(piece)) + 1
    }));
  };
  
  const handleDecrement = (productId, piece) => {
    if (counts[productId] > 1 || piece> 1) {
      setCounts(prevCounts => ({
        ...prevCounts,
        [productId]: (prevCounts[productId] || parseInt(piece)) - 1
      }));
    }
  };
  
  
  
  const getTotalPrice = () => {
    let totalPrice = 0;
    userData?.cart?.forEach(item => {
      const count = counts[item?.productId?._id] || item.piece;
      totalPrice += count * parseInt(item.productId?.mrp);
    });
    return totalPrice;
  };

  const buyOrder = async()=>{
    setprocessing(true)
    try {
      const hasZeroCount = Object.values(counts).some(count => count === 0);
    if (Object.keys(counts).length <= 0 || hasZeroCount) {
      ToastAndroid.show("Some items in the cart have zero count", ToastAndroid.SHORT);
      setprocessing(false);
      return;
    }
      const userId = user._id
      await apiConnector("POST", CREATE_ORDER_API, {counts, userId})
    navigation.navigate("(dashboard)", {
      screen: "Orders",
    });
    

    } catch (error) {
      console.log(error)
    }
    setprocessing(false)
  }

  return (
    // <SafeAreaView className="flex h-full bg-white">
    <View className=" h-full bg-white">

   
   
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        
      >
         <LinearGradient
              colors={['#87CEEB', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className=" space-y-5 h-full flex-1    "
            >
        <View className="w-full items-center py-4">
          <Text className="text-3xl font-semibold"> My Cart</Text>
        </View>

        {loading ? (
          <ActivityIndicator size={"large"} color={"#161622"} />
        ) : userData?.cart?.length > 0 ? (
          userData?.cart?.map((data, index) => (
            <View key={data._id} className=" bg-white my-3 mx-2 border py-5 border-gray-200 rounded-xl flex-row space-x-8 items-center shadow-lg shadow-gray-300">
              <Image source={{ uri: data?.productId?.productImage }} className="h-32 w-32 object-cover" />


              <View className="space-x-4 space-y-5">
                <Text className=" text-lg font-semibold">{data?.productId?.productName}</Text>
                <View className="flex-row space-x-2 items-center">
                  <Text className="line-through text-gray-400"><FontAwesome name='rupee' size={15} />{" "}{data?.productId?.purchaseprice}</Text>
                  <Text><FontAwesome name='rupee' size={15} />{" "}{data?.productId?.mrp}</Text>
                </View>
                <View className="flex-row items-center space-x-5">
                  <TouchableOpacity onPress={() => handleDecrement(data?.productId?._id, data.piece)}>
                    <AntDesign name="minussquareo" size={25} color="#4ACD58" />
                  </TouchableOpacity>
                  <Text>{counts[data?.productId?._id] || data.piece}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(data?.productId?._id, data.piece)}>
                    <AntDesign name="plussquareo" size={25} color="#4ACD58" />
                  </TouchableOpacity>
                </View>
              </View>


                <TouchableOpacity onPress={() => removeFromCart(data?._id)}>
                <AntDesign name="delete" size={25} color="#FF253C" />
                </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text className="w-full text-center text-lg">No item in cart</Text>
        )}
        
      {
        userData?.cart?.length > 0 &&   <View className="">
        <View className="px-6 w-full items-center flex-row  justify-between py-4">
          <Text className="font-semibold text-gray-400 text-xl" >Sub Total</Text>
          <Text><FontAwesome name='rupee' size={15} />{" "}{getTotalPrice()}</Text>
        </View>
        <TouchableOpacity className="w-full items-center">
         {
          processing ? <ActivityIndicator size={"large"}/> :  <Text className="bg-green-500 px-32 py-3 text-lg  text-white rounded-lg"
          onPress={buyOrder}
          >Order Now</Text>
         }
        </TouchableOpacity>
      </View>
      }
      </LinearGradient>
      </ScrollView>
   
     </View>
  )
}


export default Product;