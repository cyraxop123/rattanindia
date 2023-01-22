import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, TextInput, Linking } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Toast } from 'react-native-toast-message/lib/src/Toast'
import URL from '../../../lib/Url'
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window')



export default function DepositScreen() {

    const [isModal, setIsModal] = useState(false)

    const nav = useNavigation()
    const isFocus = useIsFocused()
    const [min_withdraw, setMin_withdraw] = useState(0)
    const [amount, setAmount] = useState(0)
    const [isLoad, setIsLoad] = useState(false)
    const [channel1, setChannel1] = useState(false)
    const [channel2, setChannel2] = useState(false)
    const [channel3, setChannel3] = useState(false)

    const getExtra = useCallback(
        async () => {
            setIsLoad(true)
            const respo = await fetch(`${URL}owner/get-extra/`)
            const data = await respo.json()
            setMin_withdraw(data.minimum_recharge)
            setChannel1(data.recharge_channel1)
            setChannel2(data.recharge_channel2)
            setChannel3(data.recharge_channel3)

            setIsLoad(false)
        },
        [isFocus],
    )

    useEffect(() => {
        getExtra()
    }, [])


    const onSubmit = async (id) => {
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

                let url = `https://payment.rattanindiaapower.in/channel${id}.php?amt=${amount}&t=${tokenop}&channel=channel${1}`;
                let linkValid = Linking.canOpenURL(url);
                if (linkValid) {
                    Linking.openURL(url);
                }
                setTimeout(() => {
                    nav.dispatch(
                        StackActions.replace("Transcations")
                    )
                }, 4000);
            }

            setIsLoad(false)


        } catch (error) {
            console.log(error)
        }
    }



    return (
        <SafeAreaView style={styles.container}>
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
                <Text style={styles.withdrawText}>Deposit</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.withdrawInputBox} placeholder={"0"}
                        placeholderTextColor="#98dc31" keyboardType={'number-pad'} maxLength={6} defaultValue="0" value={amount} onChangeText={(e) => setAmount(e)} />
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', marginLeft: 2 }}>RS.</Text>
                </View>
                <Text style={styles.withdrawTotalBalance}>Min. deposit: ₹{min_withdraw}</Text>
            </View>

            <Modal
                animationType="fade"
                transparent={false}
                visible={isModal}
                onRequestClose={() => {
                    setIsModal(!isModal);
                }}

            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.durationTextModal}>Select server!</Text>
                        <View style={styles.serverView}>
                            <TouchableOpacity style={styles.server} onPress={() => {
                                if (channel1) {
                                    onSubmit(1)
                                } else { }
                            }}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04 }}>CHANNEL 1</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10 }}>Status: </Text>
                                        <Text style={{ color: `${channel1 ? "blue" : "grey"}`, fontFamily: 'Poppins-Bold', marginTop: 10 }}>Active</Text>
                                    </View>
                                </View>
                                <AntDesign name="doubleright" size={18} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.server} onPress={() => {
                                if (channel2) {
                                    onSubmit(2)
                                } else { }
                            }}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04 }}>CHANNEL 2</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10 }}>Status: </Text>
                                        <Text style={{ color: `${channel2 ? "blue" : "grey"}`, fontFamily: 'Poppins-Bold', marginTop: 10 }}>Active</Text>
                                    </View>
                                </View>
                                <AntDesign name="doubleright" size={18} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.server} onPress={() => {
                                if (channel3) {
                                    onSubmit(3)
                                } else { }
                            }}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{ color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04 }}>CHANNEL 3</Text>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Text style={{ color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10 }}>Status: </Text>
                                        <Text style={{ color: `${channel3 ? "blue" : "grey"}`, fontFamily: 'Poppins-Bold', marginTop: 10 }}>Active</Text>
                                    </View>
                                </View>
                                <AntDesign name="doubleright" size={18} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.payButtom}>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button} onPress={() => setIsModal(!isModal)}>
                        <Text style={styles.buttonText}>{`${isModal ? "Cancle" : "Deposit"}`}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
        width: width,
        flex: 1,
        marginTop: 30
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
        alignItems: 'center'
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
        backgroundColor: 'black',
    },
    modalView: {
        backgroundColor: "black",
        borderRadius: 10,
        width: width * 0.8,
        height: height * 0.6,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 5,
        paddingVertical: 20,
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
    },

    server: {
        flexDirection: 'row',
        width: width * 0.7,
        backgroundColor: 'white',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
        borderRadius: 20,
        paddingVertical: 20
    }

})