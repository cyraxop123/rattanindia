import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React, { useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { Modal } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')



export default function DepositScreen() {

    const [isModal, setIsModal] = useState(false)



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
                        placeholderTextColor="#98dc31" keyboardType={'number-pad'} maxLength={6} defaultValue="500" />
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', marginLeft: 2 }}>RS.</Text>
                </View>
                <Text style={styles.withdrawTotalBalance}>Min. deposit: ₹500</Text>
            </View>

            <Modal
                animationType="slide"
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
                            <TouchableOpacity style={styles.server}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04}}>CHANNEL 1</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10}}>Status: </Text>
                                        <Text style={{color: 'blue', fontFamily: 'Poppins-Bold', marginTop: 10}}>Active</Text>
                                    </View>
                                </View>
                                <AntDesign name="doubleright" size={18} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.server}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04}}>CHANNEL 1</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10}}>Status: </Text>
                                        <Text style={{color: 'blue', fontFamily: 'Poppins-Bold', marginTop: 10}}>Active</Text>
                                    </View>
                                </View>
                                <AntDesign name="doubleright" size={18} color="black" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.server}>
                                <MaterialCommunityIcons name="contactless-payment" size={24} color="black" />
                                <View>
                                    <Text style={{color: 'black', fontFamily: 'Poppins-Medium', fontSize: width * 0.04}}>CHANNEL 1</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{color: '#634f4f', fontFamily: 'Poppins-Regular', marginTop: 10}}>Status: </Text>
                                        <Text style={{color: 'blue', fontFamily: 'Poppins-Bold', marginTop: 10}}>Active</Text>
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
        backgroundColor: "#363333",
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