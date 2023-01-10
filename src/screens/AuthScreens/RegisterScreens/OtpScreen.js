import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, StatusBar, ScrollView, Dimensions, Image, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')

const OtpScreen = () => {
    const nav = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>
                <View style={styles.roundShape}>
                    <Text style={styles.headerTitle}>OTP verification</Text>
                    <Image style={styles.headerImage} source={require('../../../../assets/images/passwordImage.png')} />
                    <Text style={styles.headerDescTitle}>Enter OTP</Text>
                    <Text style={styles.headerDesc}>We've send OTP on your number!</Text>
                </View>
                <KeyboardAvoidingView behavior='padding'>

                    <View style={styles.otpView}>
                        <View style={styles.inputView}>
                            <TextInput style={styles.inputBox} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} />
                            <TextInput style={styles.inputBox} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} />
                            <TextInput style={styles.inputBox} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} />
                            <TextInput style={styles.inputBox} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} />
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={
                                () => {
                                    nav.navigate("CreatePassword")
                                }
                            }>
                                <Text style={styles.buttonText}>Next</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaView>
    )
}

export default OtpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09"
    },

    roundShape: {
        flex: 1,
        backgroundColor: 'white',
        height: height * 0.5,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 150,
        borderBottomEndRadius: 150
    },

    headerImage: {
        resizeMode: 'contain',
        width: width,
        height: 200
    },

    headerTitle: {
        color: '#a6d699',
        fontFamily: 'Poppins-Bold',
        marginBottom: 10
    },
    headerDescTitle: {
        fontFamily: 'Poppins-Bold',
        color: '#486e59'
    },
    headerDesc: {
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03,
        color: '#a6d699'
    },

    otpView: {
        flex: 1,
        height: height * 0.4,
        alignItems: 'center',
        justifyContent: 'center'
    },

    inputView: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row'
    },

    inputBox: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        width: width * 0.12,
        height: 50,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Poppins-Bold'
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    buttonText: {
        width: width * 0.6,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: '#a6d699',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginTop: 30
    },
})