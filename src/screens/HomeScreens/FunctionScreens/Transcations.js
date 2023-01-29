import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { useIsFocused, useNavigation, StackActions } from '@react-navigation/native';
import Loader from '../../../lib/Loader'
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../../lib/Url'
import Toast from 'react-native-toast-message';
import { useCallback, useEffect, useState } from 'react';




const { width, height } = Dimensions.get('window');

export default function Transaction() {
    const nav = useNavigation()
    const isFocus = useIsFocused()

    const [isLoad, setIsLoad] = useState(false)
    const [trans, setTrans] = useState([])

    const getUserTrans = useCallback(
        async () => {
            setIsLoad(true)
            let tokenop = await AsyncStorage.getItem('token');
            if (tokenop !== null) {
                const Infourl = `${URL}user/get-user-transaction/`;
                const UserRespo = await fetch(Infourl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ token: tokenop }),
                });
                const respData = await UserRespo.json();
                console.log(respData)

                if (JSON.stringify(respData).includes("Invalid")) {
                    Toast.show({
                        type: 'error',
                        text1: 'Login to continue',
                    });
                }
                setTrans(respData);
            };
            setIsLoad(false)
        },
        [isFocus],
    )

    useEffect(() => {
        getUserTrans()
    }, [isFocus])




    const data = [1, 5, 6, 5, 3, 1, 3, 54, 6, 3]
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={'#121212'} />
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
            {isLoad && <Loader />}
            {!isLoad && <ScrollView>

                {<View style={styles.transactionView}>
                    <Text style={styles.title}>Transaction</Text>
                    <View style={styles.cardView}>
                        {trans.length !== 0 ? trans.map((e, index) => {
                            return <View key={index} style={styles.card}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.logo}><FontAwesome5 name="box" size={24} style={styles.icon} color="#8ed335" /></Text>
                                    <View>
                                        <Text style={styles.name}>{e.title}</Text>
                                        <Text style={styles.category}>Category: {e.catagory}</Text>
                                        <Text style={styles.category}>Trans. ID: {e.transactionId}</Text>
                                    </View>
                                </View>
                                <Text style={{ ...styles.money, color: `${e.up_or_down === "down" ? "red" : "green"}` }}>₹{e.price}</Text>
                            </View>;
                        }) :
                            <Image style={{ width: width - 20, height: 300 }} source={require("../../../../assets/videos/cart.gif")} />

                        }
                    </View>
                </View>}
            </ScrollView>}
        </SafeAreaView>
    );
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
    transactionView: {
        marginTop: 5,
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        fontSize: 20,
    },
    cardView: {
        alignItems: 'center',
        marginVertical: 10,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: width - 30,
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 10,
        alignItems: 'center',
        borderRadius: 20,
        marginVertical: 8,
    },
    logo: {
        backgroundColor: '#00300b',
        borderRadius: 100,
        paddingVertical: 12,
        paddingHorizontal: 12,
        marginRight: 10,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
        fontSize: width * 0.03,
        textTransform: 'uppercase'
    },
    money: {
        paddingRight: 20,
        fontFamily: 'Poppins-Bold',
        // color: 'green',
        fontSize: width * 0.04,
    },
    category: {
        fontSize: 8,
        fontFamily: 'Poppins-Medium',
        color: '#111b21',
        marginTop: 4
    },
});
