import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, Image, TouchableOpacity, Modal, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { StackActions, useIsFocused, useNavigation } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { Entypo } from '@expo/vector-icons';
import Loader from '../../lib/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../lib/Url';
import { Toast } from 'react-native-toast-message/lib/src/Toast';





const { width, height } = Dimensions.get('window')

const MyProd = () => {

    const nav = useNavigation()
    const isFocus = useIsFocused()
    const [isLoad, setisLoad] = useState(false)
    const [modalVisiable, setModalVisiable] = useState(false)
    const [choose, setChoose] = useState("prod")
    const [extra, setExtra] = useState(0)


    const [financeData, setfinanceData] = useState([])
    const [topProducts, setTopProducts] = useState([])

    const buyProduct = async (unique_id) => {
        let tokenop = await AsyncStorage.getItem('token');
        if (tokenop !== null) {
            setisLoad(true);
            const Infourl = `${URL}products/withdraw/financeProduct/`;
            const UserRespo = await fetch(Infourl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'token': tokenop, 'unique_id': unique_id })
            });
            const respData = await UserRespo.json();
            if (respData.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Product withdraw successfully',
                });
                nav.navigate("Home")
            } else {
                Toast.show({
                    type: 'error',
                    text1: respData.message,
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
        setisLoad(false);
    }

    const getFinanceProducts = useCallback(
        async () => {
            setisLoad(true);
            const url = `${URL}user/get-finance/`
            let tokenop = await AsyncStorage.getItem('token');
            if (tokenop !== null) {
                const UserRespo = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: tokenop }),
                });
                const respData = await UserRespo.json();
                console.log(respData)
                setfinanceData(respData);
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login to continue',
                });
                nav.dispatch(
                    StackActions.replace('Login')
                );
            }
        },
        [isFocus],
    )

    const getExtra = useCallback(
        async () => {
            const respo = await fetch(`${URL}owner/get-extra/`)
            const data = await respo.json()
            setExtra(data.tax_on_withdraw)
        },
        [isFocus],
    )

    const getProducts = useCallback(
        async () => {
            const url = `${URL}user/get-product/`
            let tokenop = await AsyncStorage.getItem('token');
            if (tokenop !== null) {
                const prRespo = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: tokenop }),
                });
                const prData = await prRespo.json();
                if (JSON.stringify(prData).includes("false")) {
                    setTopProducts([])
                }
                console.log(prData)
                setTopProducts(prData)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login to continue',
                });
                nav.dispatch(
                    StackActions.replace('Login')
                );
            }
            setisLoad(false)

        },
        [isFocus],
    )

    useEffect(() => {
        getExtra()
        getFinanceProducts()
        getProducts()
    }, [isFocus])




    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad && <Loader />}
            {!isLoad && <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Purchases</Text>
                </View>
                <View style={styles.chooseView}>
                    <TouchableOpacity onPress={() => setChoose("fin")}>
                        <Text style={{...styles.chooseText, color: `${choose === "fin" ? "red" : 'white'}`}}>My finances</Text>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setChoose("prod")}>

                        <Text style={{...styles.chooseText, color: `${choose === "prod" ? "red" : 'white'}`}}>My products</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    {choose === "prod" ? <View style={{ ...styles.prodFlatListView, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            topProducts.length > 0 ? topProducts.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <View style={styles.prodCard}>
                                            <Image style={styles.prodImage} source={{ uri: item.image_url }} />
                                            <View style={{ justifyContent: 'center' }}>
                                                <Text style={{ fontSize: width * 0.045, fontFamily: 'Poppins-Bold', marginBottom: 3 }}>{item.length > 14 ? item.title.slice(0, 14) + "..." : item.title}</Text>


                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <Text style={{ color: 'grey', fontSize: width * 0.03, fontFamily: 'Poppins-Medium', marginRight: 20 }}>Validity: </Text>

                                                    <Text style={{ color: 'black', fontSize: width * 0.033, fontFamily: 'Poppins-Bold' }}>{item.validity} DAYS</Text>
                                                </View>


                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
                                                    <Text style={{ color: 'grey', fontSize: width * 0.03, fontFamily: 'Poppins-Medium', marginRight: 20 }}>Profit: </Text>
                                                    <Text style={{ color: 'black', fontSize: width * 0.033, fontFamily: 'Poppins-Bold' }}>{item.hourly_income}rs / DAY</Text>
                                                </View>


                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                                :
                                <Image style={{ width: width - 20, height: 300 }} source={require("../../../assets/videos/cart.gif")} />
                        }

                    </View>
                        : financeData.length > 0 ? financeData.map((item, index) => {
                            return (
                                <View key={index}><>
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
                                                <Text style={styles.durationTextModal}>Fee of {extra}% on the withdrawal of Invesment product will be deducted</Text>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 15, marginTop: 20 }}>
                                                    <TouchableOpacity style={{ ...styles.buttonModal, backgroundColor: 'darkred' }} onPress={() => setModalVisiable(!modalVisiable)}>
                                                        <Text style={styles.buttonTextCancel}>CANCEL</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={{ ...styles.buttonModal }} onPress={() => buyProduct(item.unique_id)}>
                                                        <Text style={styles.buttonTextModal}>WITHDRAW</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    </Modal>
                                    <ImageBackground
                                        style={styles.img}
                                        source={require('../../../assets/images/card.jpg')}
                                        resizeMode={'center'}
                                        borderRadius={25}
                                    >

                                        <LinearGradient
                                            colors={['rgba(8, 233, 162, 0.7)', 'rgba(8, 233, 162, 0.7)', 'rgba(0, 0, 0, 0.75)']}
                                            style={styles.financeProdCard}
                                        >


                                            <View style={styles.financeCardView}>
                                                <Text style={styles.financeCardTitle}>Reliant finance</Text>
                                            </View>
                                            <View style={styles.financeCardDetailsView}>
                                                <View style={styles.financeCardDetailsQue}>
                                                    <Text style={styles.financeCardDetailsTitle}>Expire on <Entypo name="back-in-time" size={width * 0.038} color="black" /></Text>
                                                    <Text style={styles.financeCardDetailsTitle}>₹ You Invest</Text>
                                                </View>
                                                <View style={styles.financeCardDetailsAns}>
                                                    <Text style={styles.financeCardDetailsAns1}>{item.expire_on}</Text>
                                                    <Text style={styles.financeCardDetailsAns1}>₹ {item.user_invest}</Text>
                                                </View>
                                                <View style={styles.buttonView}>
                                                    <TouchableOpacity style={styles.button} onPress={() => setModalVisiable(!modalVisiable)}>
                                                        <Text style={styles.buttonText}>Withdraw</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </LinearGradient>

                                    </ImageBackground></>
                                </View>
                            )
                        }) : <Image style={{ width: 250, height: 250 }} source={require("../../../assets/videos/cart.gif")} />
                    }
                </View>
            </ScrollView>}
        </SafeAreaView>
    )
}

export default MyProd

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00300b',
    },

    img: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.82,
    },


    header: {
        marginTop: 20,
        marginLeft: 20
    },

    headerTitle: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.06

    },

    chooseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        alignSelf: 'center',
        width: width,
        paddingHorizontal: 20,
        marginVertical: 30
    },

    chooseText: {
        fontFamily: 'Poppins-Medium',
        paddingVertical: 15,
        paddingHorizontal: 35,
        color: 'white',
        borderColor: '#a6d699',
        borderWidth: 2,
        borderRadius: 20
    },

    prodFlatListView: {
        marginTop: 10,
        flexGrow: 0,
    },

    prodCard: {
        backgroundColor: 'white',
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 25,
        marginLeft: 15,
        borderColor: '#baeb6b',
        borderWidth: 3,
        paddingVertical: 15,
        flexDirection: 'row',
        width: width - 80,
        paddingRight: 20,
        marginBottom: 20
    },

    prodImage: {
        resizeMode: 'center',
        width: 120,
        height: 120,
        backgroundColor: 'black',
        borderRadius: 15,
        marginHorizontal: 25
    },

    prodButtonView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    prodButton: {
        fontFamily: 'Poppins-Bold',
        backgroundColor: 'rgba(4, 225, 44, 1)',
        width: width * 0.4,
        textAlign: 'center',
        paddingVertical: 5,
        color: 'black',
        marginBottom: 10
    },

    prodRuppe: {
        fontFamily: 'Poppins-Medium'
    },

    financeHeader: {
        marginTop: 60,
        flexDirection: 'row',
        justifyContent: 'center',
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
        marginLeft: 10
    },

    financeProdCard: {
        width: width * 0.82,
        alignItems: 'center',
        borderRadius: 25,
        paddingBottom: 20,
    },

    financeCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    financeCardTitle: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
        fontSize: width * 0.05
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
    buttonModal: {
        width: width * 0.34,
        paddingVertical: 8,
        paddingHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
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