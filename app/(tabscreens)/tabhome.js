import { ActivityIndicator, Animated, Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import logo from "../../assets/coinbasket.jpeg"
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import image1 from "../../assets/music.jpeg"
import image2 from "../../assets/flyer2.jpeg"
import { SvgUri } from 'react-native-svg';
import { apiConnector } from '../../service/Apiconnector';
import { AuthEndPoint, CategoryEndPoints, ProductEndPoints } from '../../service/Apis';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-notifications';


const Home = () => {

  const data = [
    { uri: require('../../assets/scrollimage1.jpeg') },
    { uri: require('../../assets/scrollImage3.jpeg') },
    { uri: require('../../assets/scrollImage2.jpeg') },

  ];


  const { GET_CATEGORY_API, GET_PRODUCT_BY_CATEGORY_ID_API } = CategoryEndPoints
  const { GET_PRODUCT_API } = ProductEndPoints
  const [category, setcategory] = useState([])
  const [product, setproduct] = useState([])

  const [user, setuser] = useState("")
  const [userData, setuserData] = useState("")
  const { GET_USER_BY_ID, ADD_TO_CART_API } = AuthEndPoint
  const [loading, setloading] = useState(false)
  const [counts, setCounts] = useState({});






  const handleIncrement = (productId) => {
    setCounts(prevCounts => ({
      [productId]: (prevCounts[productId] || 0) + 1
    }));
  };

  const handleDecrement = (productId) => {
    if (counts[productId] > 0) {
      setCounts(prevCounts => ({
        [productId]: (prevCounts[productId] || 1) - 1
      }));
    }
  };

  const addToCart = async (productId) => {
    try {
      const checkAlready = userData?.cart?.some(alreadyproductId => alreadyproductId.productId._id === productId)


      const hasZeroCount = Object.values(counts).some(count => console.log(count));
      if (Object.keys(counts).length <= 0 || hasZeroCount) {
        ToastAndroid.show("Atleast one item should be into cart", ToastAndroid.SHORT);
        return;
      }

      if (checkAlready) {
        ToastAndroid.show("Item already in cart", ToastAndroid.SHORT)
        return
      }
      else {
        const userId = user._id
        const response = await apiConnector("POST", ADD_TO_CART_API, { counts, userId })
        ToastAndroid.show("Item added to cart", ToastAndroid.SHORT)
        setCounts({})
      }
    } catch (error) {
      console.log(error)
    }
  }



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
  }, [user, addToCart])

  useEffect(() => {
    const categoryData = async () => {
      try {
        const response = await apiConnector("GET", GET_CATEGORY_API)
        setcategory(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
    categoryData()
  }, [])


  const getProducts = async () => {
    try {
      const response = await apiConnector("GET", GET_PRODUCT_API)
      setproduct(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    getProducts()
  }, [])


  const handleCategoryProduct = async (categoryId) => {
    const toastId = Toast.show("Please wait...")

    try {
      if (categoryId === undefined) {
        getProducts()
      } else {
        const response = await apiConnector("POST", GET_PRODUCT_BY_CATEGORY_ID_API, { categoryId })
        setproduct(response.data.data.product)
      }

    } catch (error) {
      console.log(error)
    }
    Toast.hide(toastId)
  }


  const scrollX = useRef(new Animated.Value(0)).current;

  const { width: screenWidth } = Dimensions.get('window');
  const flatListRef=useRef(); 
  const indexRef=useRef(0);
  const onScroll = (event) => {
    const ind = event.nativeEvent.contentOffset.x / screenWidth;
    const roundIndex = Math.round(ind);
    indexRef.current = roundIndex;     // update indexRef when flatList is scrolled
  }
  const startCarousel = () => {
    const intervalId = setInterval(() => {
      const newIndex = (parseInt(indexRef.current) + 1) % data.length;
      flatListRef.current?.scrollToIndex({ animated: true, index: newIndex });
    }, 3000);
  
    // Return a cleanup function to clear the interval when the component unmounts or when you want to stop the carousel
    return () => clearInterval(intervalId);
  }
  
  useEffect(() => {
    const clearCarouselInterval = startCarousel();
    return () => clearCarouselInterval();
  }, []);
  const AnimatedFlatList = Platform.OS === 'web' ? Animated.FlatList : Animated.createAnimatedComponent(FlatList);




  return (

    <View className=" h-full bg-white">

      {/* <ScrollView className=" w-full h-full"> */}

      {/* top */}





      <FlatList
        contentContainerStyle={{ paddingBottom: 20 }}
        ListHeaderComponent={
          <>
            <LinearGradient
              colors={['#87CEEB', '#ffffff']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              className=" space-y-5 pt-14 pb-4 px-5"
            >
              <View className=" flex-row items-center justify-center py-1  ">
                <View className="  flex-row items-center gap-1  bg-blue-500  px-7 py-2 rounded-lg">
                  <Image source={logo} className=" w-8 h-8 rounded-full" />
                  <Text className=" text-white font-semibold ">Coin basket</Text>
                </View>

              </View>
              {/* <View className=" flex-row items-center border border-gray-100 rounded-lg bg-white relative px-5 py-2 space-x-3">
          <Ionicons name='search' size={20} color={"gray"} className=" absolute bottom-0" />
          <TextInput
            placeholder='Search for product'
            className=""
          />
        </View> */}
            </LinearGradient>

            {/* Header Image */}

            <FlatList
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              data={data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
           
                <Image
                  source={item.uri}
                  style={{ width: Dimensions.get('window').width, height: 260 }}
                  resizeMode="cover"
                />
              )}
              getItemLayout={(data, index) => ({
                length: screenWidth,
                offset: screenWidth * index,
                index,
              })}
            
              ref={flatListRef}
                    onScroll={onScroll}
                    initialNumToRender={0}
            />

            {/* Top Categories */}
            <View className="px-3 py-2">
              <Text className="text-2xl font-semibold text-gray-500">
                Top Categories
              </Text>
              <View className=" flex-row">
                <FlatList
                  horizontal
                  data={['All', ...category]}
                  keyExtractor={(item, index) => index.toString()}
                  contentContainerStyle={{ paddingRight: 20, marginTop: 10 }}

                  renderItem={({ item }) => {
                    return (
                      <TouchableOpacity onPress={() => handleCategoryProduct(item._id)}>
                        <View className="items-center justify-center space-y-3 mr-4">
                          <View className="border border-gray-200 rounded-full overflow-hidden shadow-lg shadow-gray-600">
                            {item === 'All' ? (
                              <Image
                                source={logo}
                                className="w-16 h-16 rounded-full object-cover "
                              />
                            ) : (
                              <Image
                                source={{ uri: item?.categoryImage }}
                                className="w-16 h-16 rounded-full object-cover"
                              />
                            )}
                          </View>
                          <Text className="text-xs text-gray-400">
                            {item === 'All' ? 'All' : item?.name?.slice(0, 10)}
                          </Text>
                        </View>
                      </TouchableOpacity>

                    );
                  }}
                />
              </View>

            </View>

            {/* Newest Products */}
            <Text className="px-3 text-2xl font-semibold text-gray-500">
              Newest Products
            </Text>
          </>
        }
        data={product}
        numColumns={2}
        renderItem={({ item }) => {
          return (
            <View className=" overflow-hidden border bg-white shadow-xl shadow-gray-400 border-gray-200 w-44 my-4 rounded-xl items-center justify-between py-2 ">
              <Image source={{ uri: item?.productImage }} className=" w-40 h-44 object-cover rounded-xl" />
              <View className=" py-4 w-full items-start px-4">
                <Text className=" text-base font-semibold">{item?.productName}</Text>
                <View className=" flex-row space-x-4">
                  <Text className=" line-through text-gray-400"><FontAwesome name='rupee' size={15} />{" "}{item?.purchaseprice}</Text>
                  <Text ><FontAwesome name='rupee' size={15} />{" "}{item?.mrp}</Text>
                </View>
              </View>
              <View className=" w-full flex-row justify-between items-center  px-2 ">
                <View className="flex-row items-center space-x-5">
                  <TouchableOpacity onPress={() => handleDecrement(item._id)}>
                    <AntDesign name="minussquareo" size={20} color="#1BA7DF" />
                  </TouchableOpacity>

                  <Text>{counts[item._id] || 0}</Text>
                  <TouchableOpacity onPress={() => handleIncrement(item._id)}>
                    <AntDesign name="plussquareo" size={20} color="#1BA7DF" />
                  </TouchableOpacity>
                </View>
                <View className=" absolute right-0 rounded-full bg-[#1BA7DF] px-2 py-5">
                  {
                    userData?.cart?.some(alreadyproductId => alreadyproductId?.productId?._id === item?._id) ? <AntDesign name="checkcircle" size={24} color="#ffffff" /> : <AntDesign onPress={() => {
                      addToCart(item._id)
                    }} name="pluscircle" size={28} color="#ffffff" />
                  }
                </View>
              </View>
            </View>
          );
        }}
        columnWrapperStyle={{ justifyContent: "space-between", paddingHorizontal: 15 }}
      />

    </View>

  )
}

export default Home
