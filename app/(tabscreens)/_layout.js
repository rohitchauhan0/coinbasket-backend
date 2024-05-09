import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { Tabs, useNavigation, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';


const TabIcon = ({ iconName, color, focused }) => {
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={iconName} size={24} color={color} />
        </View>
    );
};



function DashboardStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="(dashboard)/my-profile" component={HomeScreen} />

        </Stack.Navigator>
    );
}

const TabsLayout = () => {
    const navigation = useNavigation();
    const router = useRouter()



    return (
        <Tabs screenOptions={{
            tabBarShowLabel: false, tabBarActiveTintColor: "#ffffff", tabBarInactiveTintColor: "#CDCDE0", tabBarStyle: {
                backgroundColor: "#006BE8",
                borderTopWidth: 1,
                height: 70
            }
        }}>
            <Tabs.Screen name='tabhome' options={{
                title: "Home",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    return <TabIcon iconName={focused ? 'home' : 'home-outline'} color={color} name={"Home"} focused={focused} />
                }
            }} />

            <Tabs.Screen name='cart' options={{
                title: "Cart",
                headerShown: false,
                tabBarIcon: ({ color, focused }) => {
                    return <TabIcon iconName={focused ? 'cart' : 'cart-outline'} color={color} name={"Cart"} focused={focused} />
                }
            }} />

            <Tabs.Screen
                name='profile'
                options={{
                    tabBarIcon: ({ color, focused }) => {
                        return (
                            <TabIcon
                                iconName={focused ? 'person' : 'person-outline'}
                                color={color}
                                focused={focused}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
