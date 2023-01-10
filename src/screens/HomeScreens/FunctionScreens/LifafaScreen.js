import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons';


const { width, height } = Dimensions.get("window")

const LifafaScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <View style={styles.desc}>
                <FontAwesome5 name="gift" style={styles.icon} size={40} color="#8ed335" />
                <Text style={styles.descTitle}>Redeem gift card</Text>
                <TextInput
                    style={styles.loginInput}
                    cursorColor={'#002f09'}
                    placeholder={'XXXX-XXXX-XXXX'}
                    placeholderTextColor={'#002f09'}
                    keyboardType={'default'}
                    maxLength={10}
                />
                <View style={styles.buttonView}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default LifafaScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09",
        justifyContent: 'center',
        alignItems: 'center'
    },

    icon: {
        marginBottom: 20,
        backgroundColor: '#4c7d36',
        padding: 30,
        borderRadius: 100
    },

    desc: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    descTitle: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.06,
        textAlign: 'center',
        marginHorizontal: 60,
        letterSpacing: 1,
        marginBottom: 10
    },

    loginInput: {
        backgroundColor: 'white',
        width: width - 150,
        paddingVertical: 10,
        borderRadius: 10,
        paddingLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.031,
        color: 'white',
        marginBottom: 20,
        marginTop: 20
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    buttonText: {
        width: width * 0.5,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 10,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

})