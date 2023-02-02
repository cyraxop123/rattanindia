import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity, Image } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../../lib/Loader'
import URL from '../../../lib/Url'
import { Toast } from 'react-native-toast-message/lib/src/Toast';



const { width, height } = Dimensions.get('window');

export default function MyRefers() {
    const data = [1, 5, 6, 5, 3, 1, 3, 54, 6, 3]
    const nav = useNavigation()
    const [isLoad, setIsLoad] = useState(false)
    const [refer, setRefer] = useState([])
    const [level1, setLevel1] = useState(0)
    const [level2, setLevel2] = useState(0)
    const [level3, setLevel3] = useState(0)


    const isFocus = useIsFocused()

    const getUserTrans = useCallback(
        async () => {
          setIsLoad(true)
          let tokenop = await AsyncStorage.getItem('token');
          if (tokenop !== null) {
            const Infourl = `${URL}user/get-referUsers-level/`;
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
              return
            }
            setRefer(respData.users)
            respData.users.map((e)=>{
                if (e.level == 1){
                    setLevel1(level1 + 1)
                }else if(e.level == 2){
                    setLevel2(level2 + 1)
                }else if(e.level == 3){
                    setLevel3(level3 + 1)
                }
            })
          };
          setIsLoad(false)
        },
        [isFocus],
      )
    
      useEffect(() => {
        getUserTrans()
      }, [isFocus])

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
                    <Text style={styles.title}>Total refers ({refer.length})</Text>
                    <View style={styles.chooseView}>
                    <TouchableOpacity>
                        <Text style={{...styles.chooseText}}>Level 1 ({level1}) </Text>

                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{...styles.chooseText}}>Level 2 ({level2}) </Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{...styles.chooseText}}>Level 3 ({level3}) </Text>
                    </TouchableOpacity>
                </View>
                    <View style={styles.cardView}>
                        {refer.length !== 0 ? refer.map((e, index) => {
                            return <View key={index} style={styles.card}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={styles.logo}><FontAwesome5 name="user" size={24} style={styles.icon} color="#8ed335" /></Text>
                                    <View>
                                        <Text style={styles.name}>{e.name}</Text>
                                        <Text style={styles.category}>Number: {e.number}</Text>
                                        <Text style={styles.category}>Join on: {e.joinon.replace("T", " ")}</Text>
                                    </View>
                                </View>
                                <Text style={{ ...styles.money }}>LEVEL {e.level}</Text>
                            </View>;
                        }):
                        <Image style={{ width: width - 20, height: 300 }} source={require("../../../../assets/videos/cart.gif")} />

                        }
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
    },
    chooseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        width: width,
        paddingHorizontal: 10,
        marginVertical: 30
    },

    chooseText: {
        fontFamily: 'Poppins-Medium',
        paddingVertical: 12,
        paddingHorizontal: 15,
        color: 'white',
        borderColor: '#a6d699',
        borderWidth: 1,
        borderRadius: 10,
        alignItems: 'center',
        textAlign: 'center',
        fontSize: width * 0.03,
        justifyContent: 'center'
    },
});
