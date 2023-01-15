import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, StatusBar, ScrollView, Dimensions, Image, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'
import URL from '../../../lib/Url'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../lib/Loader';


const { width, height } = Dimensions.get('window')

const ForgetOtp = ({route}) => {

    const { number, password } = route.params

    const nav = useNavigation()
    const [otp1, setOtp1] = useState('')
    const [otp2, setOtp2] = useState('')
    const [otp3, setOtp3] = useState('')
    const [otp4, setOtp4] = useState('')
    const [otp5, setOtp5] = useState('')
    const [otp6, setOtp6] = useState('')

    const otp1Ref = useRef(null)
    const otp2Ref = useRef(null)
    const otp3Ref = useRef(null)
    const otp4Ref = useRef(null)
    const otp5Ref = useRef(null)
    const otp6Ref = useRef(null)

    const [isLoad, setIsLoad] = useState(false)

    const onSubmit = async () => {
        try {
            const url = `${URL}auth/verify-forget-otp/`
            setIsLoad(true)
            const repos = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ number, OTP: `${otp1}${otp2}${otp3}${otp4}${otp5}${otp6}`, password })
            })
            const data = await repos.json()
            if (data.success) {
                nav.dispatch(
                    StackActions.replace("Login")
                )
                Toast.show({
                    type: 'success',
                    text1: "Reset password successfully",
                })
            } else {
                Toast.show({
                    type: 'error',
                    text1: data.message,
                })
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoad(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad ? <Loader /> : ""}

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
                            <TextInput style={styles.inputBox} ref={otp1Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp1}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp1Ref.current.focus()
                                        setOtp1('')
                                    } else {
                                        setOtp1(nativeEvent.key)
                                        otp2Ref.current.focus()
                                    }
                                }}
                            />

                            <TextInput style={styles.inputBox} ref={otp2Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp2}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp1Ref.current.focus()
                                        setOtp2('')
                                    } else {
                                        setOtp2(nativeEvent.key)
                                        otp3Ref.current.focus()
                                    }
                                }}
                            />

                            <TextInput style={styles.inputBox} ref={otp3Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp3}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp2Ref.current.focus()
                                        setOtp3('')
                                    } else {
                                        setOtp3(nativeEvent.key)
                                        otp4Ref.current.focus()
                                    }
                                }}
                            />

                            <TextInput style={styles.inputBox} ref={otp4Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp4}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp3Ref.current.focus()
                                        setOtp4('')
                                    } else {
                                        setOtp4(nativeEvent.key)
                                        otp5Ref.current.focus()
                                    }
                                }}
                            />

                            <TextInput style={styles.inputBox} ref={otp5Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp5}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp4Ref.current.focus()
                                        setOtp5('')
                                    } else {
                                        setOtp5(nativeEvent.key)
                                        otp6Ref.current.focus()
                                    }
                                }}
                            />

                            <TextInput style={styles.inputBox} ref={otp6Ref} maxLength={1} cursorColor={'black'} textAlign='center' keyboardType={'numeric'} value={otp6}
                                onKeyPress={({ nativeEvent }) => {
                                    console.log(nativeEvent.key)
                                    if (nativeEvent.key === 'Backspace') {
                                        otp5Ref.current.focus()
                                        setOtp6('')
                                    } else {
                                        setOtp6(nativeEvent.key)
                                    }
                                }}
                            />
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={
                                () => onSubmit()
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

export default ForgetOtp

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
        width: width * 0.09,
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