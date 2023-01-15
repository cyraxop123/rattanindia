import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Bottomnavigation from './Bottomnavigation';

// SPLASH SCREEN
import SplashScreen from '../screens/StartUpScreens/SplashScreen';
import OnBoardingScreen from '../screens/StartUpScreens/OnBoardingScreen';
import ChooseScreen from '../screens/StartUpScreens/ChooseScreen';

// Auth Screens
import LoginScreen from '../screens/AuthScreens/LoginScreen';
import SignUpScreen from '../screens/AuthScreens/RegisterScreens/SignUpScreen';
import OtpScreen from '../screens/AuthScreens/RegisterScreens/OtpScreen';
import CreatePasswordScreen from '../screens/AuthScreens/RegisterScreens/CreatePasswordScreen';
import ForgetPassword from '../screens/AuthScreens/ForgetPasswordScreen.js/ForgetPassword';
import ResetPassword from '../screens/AuthScreens/ForgetPasswordScreen.js/ResetPassword';
import ForgetOtp from '../screens/AuthScreens/ForgetPasswordScreen.js/ForgetOtp'

// Other Screens
import DepositScreen from '../screens/HomeScreens/FunctionScreens/DepositScreen';
import WithdrawScreen from '../screens/HomeScreens/FunctionScreens/WithdrawScreen';
import MyReferCode from '../screens/HomeScreens/FunctionScreens/MyReferCode';
import MyRefers from '../screens/HomeScreens/FunctionScreens/MyRefers';
import LifafaScreen from '../screens/HomeScreens/FunctionScreens/LifafaScreen';
import Transaction from '../screens/HomeScreens/FunctionScreens/Transcations';
import AddBank from '../screens/HomeScreens/FunctionScreens/AddBank';

const Stack = createNativeStackNavigator();

export default function HomeNavigation() {
  return (
    <NavigationContainer>
    <Stack.Navigator>
        {/* On Startup */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
        <Stack.Screen name="OnBoarding" component={OnBoardingScreen} options={{headerShown: false}}/>
        <Stack.Screen name="ChooseScreen" component={ChooseScreen} options={{headerShown: false}}/>

        {/* Auth Screen */}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Signup" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="CreatePassword" component={CreatePasswordScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Otp" component={OtpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Forget" component={ForgetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="ResetPassword" component={ResetPassword} options={{headerShown: false}}/>
        <Stack.Screen name="ForgetOtp" component={ForgetOtp} options={{headerShown: false}}/>


        {/* Bottom tab */}
        <Stack.Screen name="Bottom" component={Bottomnavigation} options={{headerShown: false}}/>

        {/* Other Screen */}
        <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Deposit" component={DepositScreen} options={{headerShown: false}}/>
        <Stack.Screen name="MyReferCode" component={MyReferCode} options={{headerShown: false}}/>
        <Stack.Screen name="MyRefers" component={MyRefers} options={{headerShown: false}}/>
        <Stack.Screen name="Lifafa" component={LifafaScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Transcations" component={Transaction} options={{headerShown: false}}/>
        <Stack.Screen name="AddBank" component={AddBank} options={{headerShown: false}}/>

    </Stack.Navigator>
  </NavigationContainer>
  )
}
