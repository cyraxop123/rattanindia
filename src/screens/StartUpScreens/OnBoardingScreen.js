import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const {width, height} = Dimensions.get("window")

const OnBoardingScreen = () => {
  const nav = useNavigation()
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor={"#002f09"}/>
      <View style={styles.logoView}>
        <Image style={styles.logo} source={require('../../../assets/images/app-logo.png')}/>
      </View>
      <View style={styles.desc}>
        <Text style={styles.descTitle}>You are ready to invest</Text>
        <Text style={styles.descPara}>As a medium risk invester you can create your best portfolio based on funds we prepared you.</Text>
      </View>
      <View style={styles.buttonBox}>
        <TouchableOpacity style={styles.button} onPress={
          ()=>{
            nav.navigate("ChooseScreen")
          }
        }>
          <Text style={styles.buttonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default OnBoardingScreen

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

    desc: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    descTitle: {
      color: 'white',
      fontFamily: 'Poppins-Medium',
      fontSize: width * 0.08,
      textAlign: 'center',
      marginHorizontal: 60,
      letterSpacing: 1,
      marginBottom: 10
    },

    descPara: {
      color: '#a7a7a7',
      fontFamily: 'Poppins-Regular',
      fontSize: width * 0.034,
      textAlign: 'center',
      paddingHorizontal: 40,
      letterSpacing: 1,
      lineHeight: 26
    },

    buttonBox: {
      flex: 0.6,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 70,
    },

    button: {
      alignItems: 'center',
      justifyContent: 'center'
    },

    buttonText: {
      width: width - 100,
      paddingVertical: 12,
      textAlign: 'center',
      borderColor: 'white',
      borderWidth: 1.5,
      borderRadius: 30,
      color: 'white',
      fontFamily: 'Poppins-Bold'
    }
})