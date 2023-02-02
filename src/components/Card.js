import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, Dimensions, Image, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { useNavigation, useIsFocused, StackActions } from '@react-navigation/native';
import URL from '../lib/Url';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'


const { width, height } = Dimensions.get('window')

const Card = ({item}) => {
    const isFocus = useIsFocused()
    const [isLoad, setisLoad] = useState(false)
    const [modalVisiable, setModalVisiable] = useState(false)
    const [investAmount, setInvestAmount] = useState(0)
    const [name, setName] = useState('')


    const buyProduct = async (unique_id) => {
        let tokenop = await AsyncStorage.getItem('token');
        if (tokenop !== null) {
            setisLoad(true);
            const Infourl = `${URL}products/buy/financeProduct/`;
            const UserRespo = await fetch(Infourl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'token': tokenop, 'unique_id': unique_id, amt: investAmount })
            });
            const respData = await UserRespo.json();
            if (respData.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Product buy successfully',
                });
                setModalVisiable(!modalVisiable)
            } else {
                Toast.show({
                    type: 'error',
                    text1: respData.message,
                });
                setModalVisiable(!modalVisiable)
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
        setisLoad(false);
    };
    return (
        <View>
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
                        <Text style={styles.durationTextModal}>Min. invest should be ₹{item.minimum_invest}</Text>
                        <TextInput
                            style={{ ...styles.inputArea }}
                            placeholder="Enter Amount"
                            placeholderTextColor={'black'}
                            keyboardType="numeric"
                            returnKeyType="next"
                            onChangeText={(e) => setInvestAmount(e)}
                            value={investAmount}
                        />
                        <TouchableOpacity style={{ ...styles.buttonModal }} onPress={() => buyProduct(item.unique_id)}>
                            <Text style={styles.buttonTextModal}>INVEST</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setModalVisiable(!modalVisiable)}>
                            <Text style={styles.buttonTextCancel}>CANCEL</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            <ImageBackground
                style={styles.img}
                source={require('../../assets/images/card.jpg')}
                resizeMode={'center'}
                borderRadius={25}
            >

                <LinearGradient
                    colors={['rgba(8, 233, 162, 0.7)', 'rgba(8, 233, 162, 0.7)', 'rgba(0, 0, 0, 0.75)']}
                    style={styles.financeProdCard}
                >


                    <View style={styles.financeCardView}>
                        <Text style={styles.financeCardTitle}>{item.name} ({item.daily_income}rs)</Text>
                    </View>
                    <View style={styles.financeCardDetailsView}>
                        <View style={styles.financeCardDetailsQue}>
                            <Text style={styles.financeCardDetailsTitle}>Duration <Entypo name="back-in-time" size={width * 0.038} color="black" /></Text>
                            <Text style={styles.financeCardDetailsTitle}>₹ Min. Invest</Text>
                        </View>
                        <View style={styles.financeCardDetailsAns}>
                            <Text style={styles.financeCardDetailsAns1}>{item.validity} Days</Text>
                            <Text style={styles.financeCardDetailsAns1}>₹ {item.minimum_invest}</Text>
                        </View>
                        <View style={styles.buttonView}>
                            <TouchableOpacity style={styles.button} onPress={() => setModalVisiable(!modalVisiable)}>
                                <Text style={styles.buttonText}>Invest Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>

            </ImageBackground>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.82,
        marginHorizontal: 10
    },
    financeHeader: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    financeHeaderTitle: {
        color: '#a6d699',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.045
    },


    financeProdFlatListView: {
        marginTop: 10,
        flexGrow: 0,
        marginLeft: 20
    },

    financeProdCard: {
        marginHorizontal: 10,
        width: width * 0.82,
        alignItems: 'center',
        borderRadius: 25,
        paddingBottom: 20
    },

    financeCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    financeCardTitle: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        textTransform: 'uppercase',
        fontSize: width * 0.04
    },

    financeCardDetailsView: {
        alignItems: 'center',
        width: '100%',
    },

    financeCardDetailsQue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 10
    },

    financeCardDetailsTitle: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.035
    },

    financeCardDetailsAns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 35,
        marginTop: 5
    },

    financeCardDetailsAns1: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.035
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        width: width * 0.35,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        marginBottom: 5
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(15, 14, 15, 0.79)'
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
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        justifyContent: 'center'
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
        marginTop: 10,
        width: width * 0.6,
        marginBottom: 20
    },
    buttonModal: {
        width: width * 0.5,
        paddingVertical: 9,
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginBottom: 20,
        borderColor: 'white',
        borderWidth: 3
    },
    buttonTextModal: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.04,
        color: 'yellow',
    },
    buttonTextCancel: {
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.04,
        color: 'red',
    },
    durationTextModal: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        marginRight: 8,
        fontSize: width * 0.033,
    }


})