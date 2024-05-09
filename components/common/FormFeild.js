import { View, Text, TextInput } from 'react-native'
import React from 'react'
import { Controller } from 'react-hook-form'

const   FormFeild = ({ title, name, errors, control, placeholder, customStyle, secureEntry }) => {
  return (
    <View className={` ${customStyle}`}>
    <Text className="text-base text-black font-pmedium">{title}</Text>
    <View className="border-2 border-gray-400 h-14 w-full px-6 rounded-lg  items-center justify-center">
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            className="flex-1 text-black font-psemibold text-base w-full"
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            secureTextEntry={secureEntry}
            required 
            autoCapitalize={(name === "email" || name === "username") ? 'none' : undefined}
          />
        )}
        name={name}
        rules={{ required: `${name} is required` }}
        defaultValue=""
      />
      {errors[name] && <Text className=" text-red-300 text-xs">{errors[name].message}</Text>}
    </View>
  </View>
  )
}

export default FormFeild
