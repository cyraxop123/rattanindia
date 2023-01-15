import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, StatusBar, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, StackActions } from '@react-navigation/native'
import URL from '../../../lib/Url'
import Toast from 'react-native-toast-message';
import Loader from '../../../lib/Loader'

const { width, height } = Dimensions.get('window')

const ForgetPassword = ({route}) => {
    const nav = useNavigation()
    const [password, setPassword] = useState('')
    const [isLoad, setIsLoad] = useState(false)
    const [isPass, setIsPass] = useState(false)

    const handleOnSubmit = async()=>{
        setIsLoad(true)
        try {
            if (!isPass) {
                Toast.show({
                    type: 'error',
                    text1: "Invalid number",
                })
                setIsLoad(false)
                return 0
            }
            const url = `${URL}auth/forget-password/`
            const req = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ number: password })
            })
            const res = await req.json()

            if (JSON.stringify(res).includes("true")) {
                Toast.show({
                    type: 'success',
                    text1: res.message,
                })
                nav.dispatch(
                    StackActions.replace("ResetPassword", {
                        number: password
                    })
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
        if (password.length >= 10) {
            setIsPass(true)
        } else {
            setIsPass(false)

        }

    }, [password])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad ? <Loader /> : ""}
            <ScrollView style={styles.container}>
                <View style={styles.roundShape}>
                    <Text style={styles.headerDescTitle}>Enter your number</Text>
                    <Text style={styles.headerDesc}>Enter your account number to reset your password!</Text>
                </View>
                <View style={styles.loginView}>
                    <TextInput
                        style={styles.loginInput}
                        cursorColor={'black'}
                        placeholder={'Mobile number'}
                        placeholderTextColor={'black'}
                        keyboardType={'phone-pad'}
                        onChangeText={(e)=> setPassword(e)}
                        value={password}
                        maxLength={10}
                        />

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={
                            () => handleOnSubmit()
                        }>
                            <Text style={styles.buttonText}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ForgetPassword

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09"
    },

    roundShape: {
        flex: 1,
        backgroundColor: 'white',
        height: height * 0.3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomLeftRadius: 100,
        borderBottomEndRadius: 100
    },
    headerDescTitle: {
        fontFamily: 'Poppins-Bold',
        color: '#a6d699',
        marginHorizontal: 30,
        fontSize: width * 0.06
    },
    headerDesc: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.027,
        color: '#486e59',
        marginHorizontal: 30
    },

    loginView: {
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginInput: {
        backgroundColor: 'white',
        width: width - 80,
        paddingVertical: 10,
        borderRadius: 20,
        paddingLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.031,
        color: 'black',
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
        borderColor: '#a6d699',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

})