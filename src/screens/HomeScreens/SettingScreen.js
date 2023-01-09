import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, StatusBar, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')

const SettingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"#002f09"} />
      <ScrollView style={styles.container}>
        <View style={styles.roundShape}>
          <Text style={styles.headerTitle}>My Account</Text>
          <Image style={styles.headerImage} source={require('../../../assets/images/user.png')} />
          <Text style={styles.headerDescTitle}>Mohit rana</Text>
          <Text style={styles.headerDesc}>+91 9399902289</Text>
        </View>

        {/* wallet */}

        <View style={styles.walletView}>
          <Text style={styles.walletTitle}>Wallet</Text>
          <TouchableOpacity style={styles.walletCard}>
            <View style={styles.wallentContent}>

              <Ionicons style={styles.walletIcon} name="wallet-outline" size={24} color="white" />
              <Text style={styles.walletText}>Your Balance</Text>
            </View>
            <Text style={styles.walletMoney}>₹ 300</Text>
          </TouchableOpacity>
        </View>

        {/* Manage Acoount */}

        <View style={{ ...styles.walletView, marginTop: 50 }}>
          <Text style={styles.walletTitle}>Account</Text>
          <TouchableOpacity style={styles.walletCard}>
            <View style={styles.wallentContent}>
              <FontAwesome5 name="money-bill-alt" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Withdraw Money</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.walletCard, marginTop: 15 }}>
            <View style={styles.wallentContent}>
              <AntDesign name="swap" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Deposit Money</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.walletCard, marginTop: 15 }}>
            <View style={styles.wallentContent}>
              <FontAwesome5 name="history" size={24} style={styles.walletIcon} color="white" />
              <Text style={styles.walletText}>Transcation</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Refer and earn */}

        <View style={{ ...styles.walletView, marginTop: 50 }}>
          <Text style={styles.walletTitle}>Refer and earn</Text>
          <TouchableOpacity style={styles.walletCard}>
            <View style={styles.wallentContent}>
              <Feather name="users" size={24} style={styles.walletIcon} color="white" />
              <Text style={styles.walletText}>Total refer</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.walletCard, marginTop: 15 }}>
            <View style={styles.wallentContent}>
              <MaterialIcons name="connect-without-contact" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Refer code</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.walletCard, marginTop: 15 }}>
            <View style={styles.wallentContent}>
              <Ionicons name="ios-gift-outline" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Redeem Gift Card</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        {/* Contact us */}

        <View style={{ ...styles.walletView, marginTop: 50 }}>
          <Text style={styles.walletTitle}>Contact</Text>
          <TouchableOpacity style={styles.walletCard}>
            <View style={styles.wallentContent}>
              <MaterialIcons name="support-agent" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Contact us</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>

          <TouchableOpacity style={{ ...styles.walletCard, marginTop: 15 }}>
            <View style={styles.wallentContent}>
              <MaterialIcons name="system-update-alt" style={styles.walletIcon} size={24} color="white" />
              <Text style={styles.walletText}>Ask update</Text>
            </View>
            <FontAwesome5 name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>


      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#002f09"
  },

  roundShape: {
    flex: 1,
    backgroundColor: 'white',
    height: 330,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 150,
    borderBottomEndRadius: 150
  },

  headerImage: {
    resizeMode: 'contain',
    height: width * 0.35,
    width: width * 0.35,
    borderRadius: 100,
    borderColor: '#a6d699',
    borderWidth: 4
  },

  headerTitle: {
    color: 'black',
    fontFamily: 'Poppins-Bold',
    marginBottom: 10,
    fontSize: width * 0.06
  },
  headerDescTitle: {
    fontFamily: 'Poppins-Bold',
    color: 'black',
    marginTop: 20
  },
  headerDesc: {
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.03,
    color: 'grey'
  },

  walletView: {
    marginTop: 30,
    paddingHorizontal: 30,
  },


  walletTitle: {
    color: 'white',
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.045,
  },

  walletCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between'
  },

  wallentContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  walletIcon: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    backgroundColor: '#002f09',
    borderRadius: 20,
    marginRight: 10
  },

  walletText: {
    fontFamily: 'Poppins-Medium',
    fontSize: width * 0.035
  },

  walletMoney: {
    fontFamily: 'Poppins-Bold',
    fontSize: width * 0.04,
    marginRight: 10
  }

})