import { StyleSheet, Text, View, StatusBar, SafeAreaView, Image, Dimensions, TextInput, KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import React, { useCallback } from 'react';
import { useState, useEffect } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation, StackActions, useIsFocused } from '@react-navigation/native';
import URL from '../../../lib/Url'
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import AsyncStorage from '@react-native-async-storage/async-storage';




const { width, height } = Dimensions.get('window');

export default function AddBank() {
    const nav = useNavigation()
    const [isUpi, setIsUpi] = useState(false)
    const isFocus = useIsFocused()

    const [holdername, setHoldername] = useState('')
    const [accountNumber, setAccountNumber] = useState('')
    const [IFSC, setIFSC] = useState('')
    const [bankAccountName, setBankAccountName] = useState('')
    const [upiId, setUpiId] = useState('')

    const getExtra = useCallback(
        async () => {
            const respo = await fetch(`${URL}owner/get-extra/`)
            const data = await respo.json()
            setIsUpi(data.is_upi)
        },
        [isFocus],
    )

    const handleOnSubmit = async () => {
            const url = `${URL}user/bindBank/`
            const tokenop = await AsyncStorage.getItem("token")
            if (tokenop !== null) {
                const req = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({token: tokenop, accountNumber, holdername, IFSC, bankAccountName, upiId })
                })

                const res = await req.json()
                if(res.success){
                    Toast.show({
                        type: 'success',
                        text1: res.message,
                    });
                    nav.navigate("My Bank")
                }else{
                    Toast.show({
                        type: 'error',
                        text1: res.message,
                    });
                }
            }else {
                Toast.show({
                    type: 'error',
                    text1: "Login to continue",
                });
                nav.dispatch(
                    StackActions.replace("Login")
                )
            }
        }

    useEffect(() => {
      getExtra()

    }, [])
    


    return (
        <SafeAreaView style={styles.container}>
            {<ScrollView keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <StatusBar backgroundColor={'black'} />
                <View style={styles.backNav}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} onPress={
                        () => {
                            nav.goBack()
                        }
                    }>
                        <FontAwesome5 name="chevron-left" size={30} style={styles.icon} color="white" />
                        <Text style={{ color: 'white', fontSize: 20, fontFamily: 'Poppins-Medium', paddingTop: 5 }}>Back</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Bold', fontSize: 18 }}>Enter Your Bank Details</Text>
                </View>
                <View style={styles.logInForm}>

                    <View style={styles.logInInput}>
                        <KeyboardAvoidingView enabled={false}>
                            <TextInput
                                style={{ ...styles.inputArea }}
                                placeholder="Holder Name"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                returnKeyType="next"
                                value={holdername}
                                onChangeText={(e) => setHoldername(e)}
                                cursorColor={'black'}

                            />
                            <TextInput
                                style={{ ...styles.inputArea }}
                                placeholder="Account Number"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                returnKeyType="next"
                                value={`${accountNumber}`}
                                onChangeText={(e) => setAccountNumber(e)}
                                cursorColor={'black'}

                            />
                            <TextInput
                                style={{ ...styles.inputArea }}
                                placeholder="IFSC code"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                returnKeyType="next"
                                value={IFSC}
                                onChangeText={(e) => setIFSC(e)}
                                cursorColor={'black'}

                            />
                            <TextInput
                                style={{ ...styles.inputArea }}
                                placeholder="Bank Account Name"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                returnKeyType="next"
                                value={bankAccountName}
                                onChangeText={(e) => setBankAccountName(e)}
                                cursorColor={'black'}

                            />
                            {isUpi ? <TextInput
                                style={{ ...styles.inputArea }}
                                placeholder="UPI id"
                                placeholderTextColor={'grey'}
                                keyboardType="default"
                                returnKeyType="next"
                                value={upiId}
                                onChangeText={(e) => setUpiId(e)}
                                cursorColor={'black'}


                            /> : ""}
                        </KeyboardAvoidingView>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity style={styles.button} onPress={()=>handleOnSubmit()}>
                            <Text style={styles.buttonText}>Bind Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09",
        alignItems: 'center',
    },
    backNav: {
        height: 60,
        backgroundColor: '#00300b',
        width: width,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 30
    },
    icon: {
        marginLeft: 25,
        marginRight: 15,
    },
    logo: {
        resizeMode: 'contain',
        width: width - 250,
        height: height - 550,
    },
    logInForm: {
        flex: 1,
        backgroundColor: '#002f09',
        width: width,
        marginTop: 5,
    },
    loginHead: {
        marginHorizontal: 23,
    },
    loginTitle: {
        fontSize: 33,
        fontFamily: 'Poppins-Bold',
        color: 'white',
        letterSpacing: 3,
    },
    loginDesc: {
        color: '#e2e1e6',
        fontFamily: 'Poppins-Medium',
        fontSize: 20,
        letterSpacing: 2,
    },
    logInInput: {
        flex: 1,
        marginVertical: 20,
        marginHorizontal: 23,
    },
    inputArea: {
        backgroundColor: 'white',
        paddingVertical: 12,
        paddingHorizontal: 15,
        borderRadius: 10,
        fontFamily: 'Poppins-Regular',
        fontWeight: '400',
        color: 'black',
        fontSize: 15,
        marginVertical: 10,
        width: width - 50,
    },
    button: {
        backgroundColor: 'black',
        width: width - 50,
        paddingVertical: 12,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
    buttonText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 15,
        color: 'white',
    },
    forgetPass: {
        color: '#6a6c7c',
        marginTop: 16,
        letterSpacing: 1,
        fontFamily: 'Poppins-Medium',
        textDecorationLine: 'underline',
    },
    signUpText: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        letterSpacing: 1,
    },
    signUp: {
        color: '#6ef4ff',
    },
});
