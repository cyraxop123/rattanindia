import { StyleSheet, Text, View, SafeAreaView, Image, StatusBar, Dimensions, TouchableOpacity, ImageBackground } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'


const { width, height } = Dimensions.get("window")

const ChooseScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ImageBackground
                style={styles.img}
                source={require('../../../assets/images/ChooseScreenImage.png')}
                resizeMode={'stretch'}
            >
                <LinearGradient
                    colors={['rgba(245, 39, 145, 0)', 'rgba(5, 117, 9, 0.77)', '#002f09']}
                    style={{ height: '100%', width: '100%' }}
                >

                    <View style={styles.logoView}>
                        <Image style={styles.logo} source={require('../../../assets/images/app-logo-trans.png')} />
                    </View>

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button}>
                            <Text style={styles.buttonText}>Sign up</Text>
                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </ImageBackground>
        </SafeAreaView>
    )
}

export default ChooseScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    img: {
        height: height,
        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    },

    logoView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logo: {
        resizeMode: 'contain',
        width: width * 0.58
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