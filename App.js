import { StyleSheet, Text, View } from 'react-native';
import OnBoardingScreen from './src/screens/StartUpScreens/OnBoardingScreen';
import * as Fonts from 'expo-font'
import { useEffect } from 'react';
import ChooseScreen from './src/screens/StartUpScreens/ChooseScreen';
import LoginScreen from './src/screens/AuthScreens/LoginScreen';
import SignUpScreen from './src/screens/AuthScreens/RegisterScreens/SignUpScreen';
import OtpScreen from './src/screens/AuthScreens/RegisterScreens/OtpScreen';
import CreatePasswordScreen from './src/screens/AuthScreens/RegisterScreens/CreatePasswordScreen';
import HomeScreen from './src/screens/HomeScreens/HomeScreen';
import MyProd from './src/screens/HomeScreens/MyProd';
import MyBank from './src/screens/HomeScreens/MyBank';
import SettingScreen from './src/screens/HomeScreens/SettingScreen'
import WithdrawScreen from './src/screens/HomeScreens/FunctionScreens/WithdrawScreen';
import DepositScreen from './src/screens/HomeScreens/FunctionScreens/DepositScreen';
import Products from './src/screens/HomeScreens/Products';
import Transaction from './src/screens/HomeScreens/FunctionScreens/Transcations';
import MyReferCode from './src/screens/HomeScreens/FunctionScreens/MyReferCode';
import MyRefers from './src/screens/HomeScreens/FunctionScreens/MyRefers';
import LifafaScreen from './src/screens/HomeScreens/FunctionScreens/LifafaScreen';
import SplashScreen from './src/screens/StartUpScreens/SplashScreen';
import HomeNavigation from './src/navigation/navigation';

export default function App() {

  const [fontsLoaded] = Fonts.useFonts({
    'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
      'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-ExtraBold': require('./assets/fonts/Poppins-ExtraBold.ttf'),
      'Lexend-Medium': require('./assets/fonts/Lexend-Medium.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <HomeNavigation />
  );
}
