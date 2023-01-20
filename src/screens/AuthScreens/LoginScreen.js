import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, StackActions } from '@react-navigation/native'
import URL from '../../lib/Url'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../lib/Loader'
import JWT from 'expo-jwt'

const { width, height } = Dimensions.get('window')

const LoginScreen = () => {
    const nav = useNavigation()
    const [number, setNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [isNum, setIsNum] = useState(false)
    const [isPass, setIsPass] = useState(false)

    
    const handleOnLogin = async () => {
        setIsLoad(true)
        try {
            if (!isNum) {
                Toast.show({
                    type: 'error',
                    text1: "Invalid Number",
                })
                setIsLoad(false)
                return 0
            }
            if (!isPass) {
                Toast.show({
                    type: 'error',
                    text1: "Password length should be greater than 8",
                })
                setIsLoad(false)
                return 0
            }
            const url = `${URL}auth/login/`
            const textEnc = JWT.encode({ number, password }, 'mohit@rana09', { algorithm: 'HS256' })
            const req = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ number, password, data: textEnc })
            })
            const res = await req.json()

            if (JSON.stringify(res).includes("token")) {
                await AsyncStorage.setItem("token", res.token)
                Toast.show({
                    type: 'success',
                    text1: res.message,
                })
                nav.dispatch(
                    StackActions.replace("Bottom")
                )
            } else {
                Toast.show({
                    type: 'error',
                    text1: res.message,
                })
            }
        } catch (error) {
            console.log(error)
        }
        setIsLoad(false)
    }

    useEffect(() => {
        if (number.length === 10) {
            setIsNum(true)
        } else {
            setIsNum(false)

        }
        if (password.length >= 8) {
            setIsPass(true)
        } else {
            setIsPass(false)
        }

    }, [number, password])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad ? <Loader /> : ""}
            <ScrollView style={styles.container}>

                <ImageBackground style={styles.img}
                    source={require('../../../assets/images/loginBackgroundImage.png')}
                    resizeMode={'stretch'}
                >

                    <LinearGradient
                        colors={['rgba(4, 81, 7, 0.65)', 'rgba(4, 81, 7, 0.10)', '#002f09']}
                        style={{ height: '100%', width: '100%' }}
                    >

                        <View style={styles.header}>
                            <Text style={styles.title}>Welcome!</Text>
                            <Text style={styles.desc}>Login and get started.</Text>
                        </View>

                        <View style={styles.loginView}>
                            <TextInput
                                style={styles.loginInput}
                                cursorColor={'#002f09'}
                                placeholder={'Enter your 10 digit number'}
                                placeholderTextColor={'#002f09'}
                                keyboardType={'phone-pad'}
                                maxLength={10}
                                onChangeText={(e) => setNumber(e)}
                                value={number}
                            />
                            <TextInput
                                style={styles.loginInput}
                                cursorColor={'#002f09'}
                                placeholder={'Enter your password'}
                                placeholderTextColor={'#002f09'}
                                keyboardType={'default'}
                                secureTextEntry={true}
                                onChangeText={(e) => setPassword(e)}
                                value={password}
                            />

                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.button} onPress={
                                    () => handleOnLogin()
                                }>
                                    <Text style={styles.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=> nav.navigate('Forget')}>

                                <Text style={styles.forgetText}>Forget your password?</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.signupView}>

                            <TouchableOpacity onPress={
                                () => {
                                    nav.navigate("Signup")
                                }
                            }>
                                <Text style={styles.signupText}>Dont Have an account? Signup</Text>

                            </TouchableOpacity>


                        </View>

                    </LinearGradient>

                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        height: height,
        width: width,
        alignItems: 'center',
    },

    header: {
        height: height * 0.27,
        width: width,
        backgroundColor: '#002f09',
        borderBottomRightRadius: 120,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30
    },

    title: {
        color: 'white',
        fontFamily: 'Lexend-Medium',
        letterSpacing: 1,
        fontSize: width * 0.07,
        lineHeight: 50
    },

    desc: {
        color: '#a6d699',
        letterSpacing: 2,
        fontSize: width * 0.04,
        fontStyle: 'Poppins-Medium'
    },

    loginView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginInput: {
        backgroundColor: 'rgba(152, 152, 152, 0.78)',
        width: width - 80,
        paddingVertical: 10,
        borderRadius: 20,
        paddingLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.031,
        color: 'white',
        marginBottom: 20
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
        width: width - 100,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

    forgetText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: width * 0.03
    },

    signupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    signupText: {
        color: '#a6d699',
        fontFamily: 'Poppins-Regular',
        fontSize: width * 0.03
    }
})