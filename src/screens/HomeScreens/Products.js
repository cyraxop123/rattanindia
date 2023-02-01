import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, Dimensions, Image, TouchableOpacity, Modal, TextInput, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useNavigation, useIsFocused, StackActions } from '@react-navigation/native';
import Loader from '../../lib/Loader';
import URL from '../../lib/Url'
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Card from '../../components/Card';


const { width, height } = Dimensions.get('window')


const Products = () => {

    const nav = useNavigation()
    const isFocus = useIsFocused()
    const [isLoad, setisLoad] = useState(false)
    const [modalVisiable, setModalVisiable] = useState(false)
    const [investAmount, setInvestAmount] = useState(0)
    const [name, setName] = useState('')


    const [financeData, setfinanceData] = useState([])
    const [topProducts, setTopProducts] = useState([])
    const [recProducts, setRecProducts] = useState([])

    const getUserInfo = useCallback(
        async () => {
            setisLoad(true)
            let tokenop = await AsyncStorage.getItem('token');
            console.log(tokenop)
            if (tokenop !== null) {
                setisLoad(true);
                const Infourl = `${URL}user/get-user-info/`;
                const UserRespo = await fetch(Infourl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: tokenop }),
                });
                const respData = await UserRespo.json();

                if (JSON.stringify(respData).includes("false")) {
                    Toast.show({
                        type: 'error',
                        text1: 'Login to continue',
                    });
                    nav.dispatch(
                        StackActions.replace('Login')
                    );
                }
                setName(respData.name);
            };
        },
        [],
    )

    const getFinanceProducts = useCallback(
        async () => {
            const url = `${URL}products/financeProducts/`
            const req = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await req.json()
            setfinanceData(res
            )


        },
        [],
    )

    const getProducts = useCallback(
        async () => {
            const url = `${URL}products/product/`
            const req = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await req.json()
            const recentprods = res.sort((a, b) => b.total_sell - a.total_sell)
            setTopProducts(recentprods
            )


        },
        [],
    )

    const getRecProducts = useCallback(
        async () => {
            const url = `${URL}products/product/`
            const req = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            const res = await req.json()
            setRecProducts(res)
            setisLoad(false)
        },
        [],
    )


    const handleOnSubmitProduct = async (unique_id) => {
        const url = `${URL}products/buy/product/`
        let tokenop = await AsyncStorage.getItem('token');
        if (tokenop !== null) {
            setisLoad(true);
            const UserRespo = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 'token': tokenop, 'unique_id': unique_id })
            });
            const respData = await UserRespo.json();
            if (respData.success) {
                Toast.show({
                    type: 'success',
                    text1: 'Product buy successfully',
                });
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
    };

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



    useEffect(() => {
        getUserInfo()
        getFinanceProducts()
        getProducts()
        getRecProducts()
    }, [isFocus])

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad && <Loader />}

            {!isLoad && <ScrollView style={styles.container}>


                <View style={styles.profileHeadView}>
                    <View style={styles.nameView}>
                        <Text style={styles.greeting}>Marketplace</Text>
                    </View>

                </View>


                {/* FlatList */}

                <View>
                    <Text style={styles.ratedProdTitle}>TOP RATED PRODUCT</Text>
                    <View style={styles.prodFlatListView}>
                        <FlatList
                            data={topProducts}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.unique_id}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <View key={item.unique_id}>
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


                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginLeft: 10 }}>
                                                    <Text style={{ color: 'black', fontSize: width * 0.04, fontFamily: 'Poppins-Bold' }}>₹ {item.price}</Text>
                                                    <TouchableOpacity onPress={() => handleOnSubmitProduct(item.unique_id)}>
                                                        <Text style={{ color: 'white', fontSize: width * 0.033, fontFamily: 'Poppins-Bold', marginLeft: 40, backgroundColor: '#2da44e', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10 }}>BUY NOW</Text>
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>


                <View style={styles}></View>


                {/* Finanace product slider */}


                <View>
                    <View style={styles.financeHeader}>
                        <Text style={styles.financeHeaderTitle}>Finance product</Text>
                        <TouchableOpacity onPress={
                            () => {
                                nav.navigate("Products")
                            }
                        }>

                        </TouchableOpacity>
                    </View>
                    <View style={styles.financeProdFlatListView}>
                        <FlatList
                            data={financeData}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.unique_id}
                            horizontal={true}
                            renderItem={({ item }) => {
                                return (
                                    <Card item={item}/>
                                )
                            }}
                        />
                    </View>
                </View>


                {/* ai products */}

                <View>
                    <View style={styles.financeHeader}>
                        <Text style={styles.financeHeaderTitle}>Recommended products</Text>
                        <TouchableOpacity onPress={
                            () => {
                                nav.navigate("Products")
                            }
                        }>

                        </TouchableOpacity>
                    </View>
                    <View style={{ ...styles.prodFlatListView, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            recProducts.map((item, index) => {
                                return (
                                    <View key={index}>
                                        <View style={{ ...styles.prodCard, marginTop: 20, marginLeft: 10 }}>
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


                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20, marginLeft: 10 }}>
                                                    <Text style={{ color: 'black', fontSize: width * 0.04, fontFamily: 'Poppins-Bold' }}>₹ {item.price}</Text>
                                                    <TouchableOpacity onPress={() => handleOnSubmitProduct(item.unique_id)}>
                                                        <Text style={{ color: 'white', fontSize: width * 0.033, fontFamily: 'Poppins-Bold', marginLeft: 40, backgroundColor: '#2da44e', paddingVertical: 5, paddingHorizontal: 10, borderRadius: 10 }}>BUY NOW</Text>
                                                    </TouchableOpacity>
                                                </View>


                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>




            </ScrollView >}
        </SafeAreaView >
    )
}

export default Products

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09"
    },
    img: {
        justifyContent: 'center',
        alignItems: 'center',
        width: width * 0.82,
        marginHorizontal: 10
    },

    profileHeadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 30,
        paddingVertical: 30
    },

    greeting: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: width * 0.06
    },

    greetingName: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: width * 0.05
    },

    icon: {
        color: 'white'
    },

    ratedProdTitle: {
        color: '#a6d699',
        marginLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.045
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
        // width: width - 80,
        paddingRight: 20,
        marginBottom: 10
    },

    prodImage: {
        resizeMode: 'center',
        width: 120,
        height: 120,
        backgroundColor: 'black',
        borderRadius: 15,
        marginHorizontal: 15
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
        color: 'white',
        marginBottom: 10
    },

    prodRuppe: {
        fontFamily: 'Poppins-Medium'
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