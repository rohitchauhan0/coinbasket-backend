import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import React from 'react'

const CustomButton = ({ title, handlePress, containerStyle, textStyles, isLoading }) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`${containerStyle}  bg-blue-400 rounded-xl min-h-[62px] justify-center items-center`} disabled={isLoading}>
      <Text className={` text-white font-psemibold text-xl ${textStyles}`}>
        {
          isLoading ?
            <ActivityIndicator size={"large"} color={"#161622"} /> :
            title
        }
      </Text>
    </TouchableOpacity>
  )
}

export default CustomButton