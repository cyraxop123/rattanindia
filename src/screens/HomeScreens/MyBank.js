import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused, useNavigation, StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import URL from '../../lib/Url';
import Loader from '../../lib/Loader';


const { width, height } = Dimensions.get('window')

const MyBank = () => {
    const nav = useNavigation()
    const isFocus = useIsFocused()
    const [banks, setBanks] = useState([])
    const [isLoad, setIsLoad] = useState(false)


    const getBanks = useCallback(
        async () => {
            setIsLoad(true)
            const url = `${URL}user/bankDetails/`
            const tokenop = await AsyncStorage.getItem("token")
            if (tokenop !== null) {

                const req = await fetch(url,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ 'token': tokenop })
                    })
                const res = await req.json()
                if (JSON.stringify(res).includes("You dont have any back account linked")) {
                    setBanks([])
                } else setBanks(res.data)
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Login to continue',
                });
                nav.dispatch(
                    StackActions.replace("Login")
                )
            }
            setIsLoad(false)
        },
        [isFocus],
    )

    const handleOnBankUpdate = async (accountNumber) => {
        setIsLoad(true)
        const url = `${URL}user/updateBankDetails/`
        const tokenop = await AsyncStorage.getItem("token")
        if (tokenop !== null) {

            const req = await fetch(url,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 'token': tokenop, accountNumber, is_primary: true })
                })
            const res = await req.json()
            console.log(res)
            if (JSON.stringify(res).includes("false")) {
                Toast.show({
                    type: 'error',
                    text1: res.message,
                });

            } else {
                Toast.show({
                    type: 'success',
                    text1: res.message,
                });
                getBanks()
            }
        } else {
            Toast.show({
                type: 'error',
                text1: 'Login to continue',
            });
            nav.dispatch(
                StackActions.replace("Login")
            )
        }
        setIsLoad(true)
    }

    useEffect(() => {
        getBanks()
    }, [isFocus])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            {isLoad && <Loader />}
            {!isLoad && <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Bank's</Text>
                </View>

                {
                    banks.map((e, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.bankView} onPress={() => handleOnBankUpdate(e.accountNumber)}>
                                <View style={styles.bankLogo}>
                                    <MaterialCommunityIcons name="bank-outline" size={width * 0.15} color="#a6d699" />
                                </View>
                                <View style={styles.bankContent}>
                                    <Text style={styles.bankHolderName}>{e.holderName}</Text>
                                    <Text style={styles.bankName}>{e.bankAccountName}</Text>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={styles.bankName}>{e.accountNumber}</Text>
                                        <Text style={{ ...styles.bankPrimary, color: `${e.primaryBank ? "red" : "black"}` }}>Primary</Text>

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }

                <TouchableOpacity style={styles.buttonView} onPress={
                    () => {
                        nav.navigate("AddBank")
                    }
                }>
                    <MaterialIcons name="add-box" size={width * 0.1} color="white" />
                    <View style={styles.buttonContent}>
                        <Text style={styles.buttonTitle}>Add bank account</Text>
                        <Text style={styles.buttonHead}>saving account</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>}
        </SafeAreaView>
    )
}

export default MyBank

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00300b',
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

    bankView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        marginHorizontal: 20,
        marginTop: 30,
        borderRadius: 25,
    },

    bankLogo: {
        marginRight: 5,
        backgroundColor: '#00300b',
        marginLeft: 10,
        padding: 8,
        borderRadius: 25
    },
    bankContent: {
        justifyContent: 'center',
        paddingVertical: 10,
        marginLeft: 5
    },
    bankHolderName: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.035
    },

    bankName: {
        color: 'grey',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03
    },

    bankPrimary: {
        color: 'grey',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.025,
        marginLeft: 30
    },

    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingHorizontal: 20
    },

    buttonContent: {
        marginLeft: 10,
        alignItems: 'center'
    },

    buttonTitle: {
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

    buttonHead: {
        color: '#689694'
    }


})