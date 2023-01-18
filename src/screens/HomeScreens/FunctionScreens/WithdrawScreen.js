import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import URL from '../../../lib/Url'
import Loader from '../../../lib/Loader'
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Modal } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window')



export default function WithdrawScreen({ route }) {
    const nav = useNavigation()
    const { balance } = route.params
    const isFocus = useIsFocused()
    const [min_withdraw, setMin_withdraw] = useState(0)
    const [amount, setAmount] = useState(0)
    const [isLoad, setIsLoad] = useState(false)
    const [modalVisiable, setModalVisiable] = useState(false)

    const getExtra = useCallback(
        async () => {
            setIsLoad(true)
            const respo = await fetch(`${URL}owner/get-extra/`)
            const data = await respo.json()
            setMin_withdraw(data.minimum_withdraw)
            setIsLoad(false)
        },
        [isFocus],
    )

    useEffect(() => {
        getExtra()
    }, [])


    const onSubmit = async () => {
        setIsLoad(true)
        try {
            if (amount < min_withdraw) {
                setIsLoad(false)
                Toast.show({
                    type: 'error',
                    text1: 'Minimum amount should be ' + min_withdraw,
                });
                return 0
            }

            let tokenop = await AsyncStorage.getItem('token');
            if (tokenop !== null) {

                const req = await fetch(`${URL}user/submit-withdrawalRequest/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'token': tokenop, amount })
                })
                const res = await req.json()

                if (res.success) {
                    setIsLoad(false)
                    Toast.show({
                        type: 'success',
                        text1: res.message,
                    });
                    setModalVisiable(true)
                } else {
                    setIsLoad(false)
                    Toast.show({
                        type: 'error',
                        text1: res.message,
                    });
                }

            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login to continue',
                });
                nav.dispatch(
                    StackActions.replace('Login')
                );
            }

            setIsLoad(false)


        } catch (error) {
            console.log(error)
        }
    }





    return (
        <>
            {isLoad && <Loader />}
            {!isLoad && <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor={'#00300b'} />
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

                <View style={styles.textInputView}>
                    <Text style={styles.withdrawText}>Withdraw</Text>
                    <View style={styles.inputView}>
                        <TextInput style={styles.withdrawInputBox} placeholder={"0"}
                            placeholderTextColor="#98dc31" keyboardType={'number-pad'} value={amount} maxLength={6} defaultValue={`${amount}`} onChangeText={(e)=> setAmount(e)}/>
                        <Text style={{ color: 'white', fontFamily: 'Poppins-Medium' }}>RS.</Text>
                    </View>
                    <Text style={styles.withdrawTotalBalance}>Your balance: ₹{balance}</Text>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisiable}
                    onRequestClose={() => {
                        setModalVisiable(!modalVisiable);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.durationTextModal}>You'll recive your payment in 48 hours</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', paddingHorizontal: 15, marginTop: 20 }}>
                                <TouchableOpacity style={{ ...styles.buttonModal }} onPress={() => nav.dispatch(
                                    StackActions.replace("Transcations")
                                )}>
                                    <Text style={styles.buttonTextModal}>OK</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                <View style={styles.payButtom}>
                    <View style={styles.buttonView}>
                        <Text style={{ marginBottom: 20, color: 'grey', fontFamily: 'Poppins-Medium', fontSize: width * 0.03 }}>MINIMUM WITHDRAW: ₹{min_withdraw}</Text>
                        <TouchableOpacity style={styles.button} onPress={() => onSubmit()}>
                            <Text style={styles.buttonText}>Withdraw</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00300b',
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

    textInputView: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flex: 1,
        marginTop: 30,
    },

    withdrawText: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.06
    },

    withdrawInputBox: {
        marginVertical: 5,
        fontFamily: 'Poppins-Medium',
        fontSize: 30,
        alignItems: 'center',
        justifyContent: 'center',
        color: '#98dc31',
        height: 100,
    },

    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    withdrawTotalBalance: {
        color: 'grey',
        fontFamily: 'Poppins-Medium'
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
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

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'black'
    },
    modalView: {
        backgroundColor: "#002f09",
        borderRadius: 10,
        width: width * 0.8,
        height: height * 0.32,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center'
    },
    buttonModal: {
        width: width * 0.34,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
        marginTop: 20
    },
    buttonTextModal: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.03,
        color: 'black',
    },
    buttonTextCancel: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.03,
        color: 'white',
    },
    durationTextModal: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.04,
        textAlign: 'center',
        paddingHorizontal: 15
    }

})