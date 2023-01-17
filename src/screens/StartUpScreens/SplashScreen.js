import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions, Alert } from 'react-native'
import React, { useEffect, useCallback } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../lib/Url'


const { width } = Dimensions.get("window")

const SplashScreen = () => {

  const navigation = useNavigation();

  const checkStatus = useCallback(
    async () => {
      setTimeout(async () => {
        try {
          const value = await AsyncStorage.getItem('token')
          if (value !== null) {

            const req = await fetch(`${URL}owner/get-notification/`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            })
            const res = await req.json()

            if (res) {
              console.log(res)
              const notifyToken = await AsyncStorage.getItem('notifyToken')
              console.log(res.id)
              console.log(JSON.parse(notifyToken).id === res.id)
              if (notifyToken === null) {
                navigation.dispatch(StackActions.replace("Notification", res))
              } else {
                if (JSON.parse(notifyToken).id === res.id) {
                  console.log(11)
                  navigation.dispatch(
                    StackActions.replace("Bottom")
                  )

                } else {
                  navigation.dispatch(StackActions.replace("Notification", res))
                }
              }
            }

          } else {
            navigation.dispatch(
              StackActions.replace("OnBoarding")
            )
          }
        } catch (e) {
          console.log(e)
        }
      }, 3000);
    },
    [],
  )


  useEffect(() => {
    checkStatus()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#002f09"} />
      <View style={styles.logoView}>
        <Image style={styles.logo} source={require('../../../assets/images/app-logo.png')} />
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