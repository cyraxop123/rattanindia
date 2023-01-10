import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'


const {width} = Dimensions.get("window")

const SplashScreen = () => {

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.dispatch(
        StackActions.replace("OnBoarding")
      )
    }, 3000);
  }, [])
  

  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#002f09"}/>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={require('../../../assets/images/app-logo.png')}/>
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: "#002f09"
    },

    logoView: {
        flex: 1.2,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },

    logo: {
        resizeMode: 'contain',
        width: width * 0.58
    },


})