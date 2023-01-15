import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Share } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '../../../lib/Url'
import Loader from '../../../lib/Loader'
import Toast from 'react-native-toast-message';



const { width, height } = Dimensions.get('window');

export default function MyReferCode() {
    const nav = useNavigation()
    const [isLoad, setIsLoad] = useState(false)
    const [referCode, setReferCode] = useState('')

    const onShare = async () => {
        try {
          const result = await Share.share({
            message:
              'RattanIndia | YOUR REFER CODE: JDNJdjD',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          Alert.alert(error.message);
        }
      };

    const getUserInfo = useCallback(
        async () => {
            setIsLoad(true)
            let tokenop = await AsyncStorage.getItem('token');
            if (tokenop !== null) {
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
                setReferCode(respData.referId);
            };
            setIsLoad(false)
        },
        [],
    )

    useEffect(() => {
        getUserInfo()
    }, [])


    const data = [1]
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
            <ScrollView>

                {<View style={styles.transactionView}>
                    <Text style={styles.title}>Refer Code</Text>
                    <View style={styles.cardView}>
                        {data.map((e, index) => {
                            return <View key={index} style={styles.card}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.logo}><Entypo name="link" size={24} style={styles.icon} color="#8ed335" /></Text>
                                    <View>
                                        <Text style={styles.name}>Your refer link</Text>
                                        <Text style={styles.category}>Code: {`${referCode}`}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={()=> onShare()}>
                                <Text style={{ ...styles.money }}><EvilIcons name="share-google" size={30} color="black" /></Text>

                                </TouchableOpacity>
                            </View>;
                        })}
                    </View>
                </View>}
            </ScrollView>
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
        width: width - 60,
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
        paddingVertical: 13,
        paddingHorizontal: 13,
        marginRight: 13,
    },
    name: {
        fontFamily: 'Poppins-Bold',
        color: 'black',
        fontSize: width * 0.035,
        textTransform: 'uppercase'
    },
    money: {
        paddingRight: 20,
        fontFamily: 'Poppins-Bold',
        // color: 'green',
        fontSize: width * 0.04,
    },
    category: {
        fontSize: 10,
        fontFamily: 'Poppins-Medium',
        color: '#111b21',
        marginTop: 4
    },
});
