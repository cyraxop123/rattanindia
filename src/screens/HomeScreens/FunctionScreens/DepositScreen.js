import { StyleSheet, Text, View, SafeAreaView, StatusBar, TouchableOpacity, Dimensions, TextInput } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')



export default function DepositScreen() {
    const nav = useNavigation()




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
                    <Text style={{ color: 'white', fontFamily: 'Poppins-Medium', marginLeft:2 }}>RS.</Text>
                </View>
                <Text style={styles.withdrawTotalBalance}>Min. deposit: ₹500</Text>
            </View>


            <View style={styles.payButtom}>
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Deposit</Text>
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
        width: width -100,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    }

})