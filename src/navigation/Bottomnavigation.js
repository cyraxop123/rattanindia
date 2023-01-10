import React from 'react'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreens/HomeScreen';
import Products from '../screens/HomeScreens/Products';
import MyProd from '../screens/HomeScreens/MyProd';
import MyBank from '../screens/HomeScreens/MyBank';
import SettingScreen from '../screens/HomeScreens/SettingScreen';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';



export default function Bottomnavigation() {
    const Tab = createMaterialBottomTabNavigator();
    return (
        <Tab.Navigator
            barStyle={{ backgroundColor: 'white', height: 70 }}
            shifting={true}
        >

            <Tab.Screen name="Home" component={HomeScreen} options={{
                headerShown: false, tabBarIcon: () => {
                    return <Feather name="home" size={24} color="black" />
                }
            }} />
            <Tab.Screen name="My Cart" component={MyProd} options={{
                headerShown: false, tabBarIcon: () => {
                    return <Feather name="shopping-cart" size={24} color="black" />
                }
            }} />
            <Tab.Screen name="Products" component={Products} options={{
                headerShown: false, tabBarIcon: () => {
                    return <Feather name="shopping-bag" size={24} color="black" />
                }
            }} />
            <Tab.Screen name="My Bank" component={MyBank} options={{
                headerShown: false, tabBarIcon: () => {
                    return <AntDesign name="bank" size={24} color="black" />
                }
            }} />
            <Tab.Screen name="Setting" component={SettingScreen} options={{
                headerShown: false, tabBarIcon: () => {
                    return <Feather name="user" size={24} color="black" />
                }
            }} />
        </Tab.Navigator>
    )
}
