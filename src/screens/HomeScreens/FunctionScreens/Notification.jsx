import { StyleSheet, Text, View, SafeAreaView, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, heigth } = Dimensions.get('window')
const Notification = ({ route }) => {
  const { title, desc, id } = route.params
  const nav = useNavigation()

  const uniqueId = toString(id)

  const saveCode = async()=>{
    await AsyncStorage.setItem("notifyToken", uniqueId)
    nav.dispatch(
      StackActions.replace("Bottom")
    )
  }


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <AntDesign style={styles.icon} name="notification" size={width * 0.15} color="#00FFFF" />
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.buttonView}>
          <TouchableOpacity onPress={()=>saveCode()}>
            <Text style={{...styles.button, backgroundColor: '#FF5733'}}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>saveCode()}>
            <Text style={{...styles.button, backgroundColor: '#19e63f'}}>Accept</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Notification

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#002f09',
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7FFFD4',
    marginHorizontal: 20,
    borderRadius: 15,
    paddingVertical: 20
  },

  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.045,
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  desc: {
    fontFamily: 'Poppins-Medium',
    marginTop: 10,
    textAlign: 'center',
    fontSize: width * 0.03,
    marginHorizontal: 20
  },
  icon: {
    marginBottom: 40,
    backgroundColor: 'darkred',
    padding: 20,
    borderRadius: 100
  },

  buttonView: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },

  button:{
    fontFamily: 'Poppins-Medium',
    marginHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: 'red',
    borderRadius: 12,
    width: width * 0.3,
    alignItems: 'center',
    textAlign: 'center'
  }
})