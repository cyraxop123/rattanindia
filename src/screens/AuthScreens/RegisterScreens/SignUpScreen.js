import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ImageBackground, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

const SignUpScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>
                <ImageBackground style={styles.img}
                    source={require('../../../../assets/images/loginBackgroundImage.png')}
                    resizeMode={'stretch'}
                >


                    <LinearGradient
                        colors={['rgba(4, 81, 7, 0.65)', 'rgba(4, 81, 7, 0.10)', '#002f09']}
                        style={{ height: '100%', width: '100%' }}
                    >

                        <View style={styles.header}>
                            <Text style={styles.title}>New Account</Text>
                            <Text style={styles.desc}>signup and get started.</Text>
                        </View>

                        <View style={styles.loginView}>
                            <TextInput
                                style={styles.loginInput}
                                cursorColor={'#002f09'}
                                placeholder={'Enter your name'}
                                placeholderTextColor={'#002f09'}
                                keyboardType={'default'}
                            />
                            <TextInput
                                style={styles.loginInput}
                                cursorColor={'#002f09'}
                                placeholder={'Enter your number'}
                                placeholderTextColor={'#002f09'}
                                keyboardType={'number-pad'}
                                maxLength={10}
                            />

                            <View style={styles.buttonView}>
                                <TouchableOpacity style={styles.button}>
                                    <Text style={styles.buttonText}>Create acount</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                        <View style={styles.signupView}>

                            <Text style={styles.signupText}>Already Have an account? Login</Text>

                        </View>

                    </LinearGradient>

                </ImageBackground>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    img: {
        height: height,
        width: width,
        alignItems: 'center',
    },

    header: {
        height: height * 0.27,
        width: width,
        backgroundColor: '#002f09',
        borderBottomRightRadius: 120,
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingBottom: 30
    },

    title: {
        color: 'white',
        fontFamily: 'Lexend-Medium',
        letterSpacing: 1,
        fontSize: width * 0.06,
        lineHeight: 50
    },

    desc: {
        color: '#a6d699',
        letterSpacing: 2,
        fontSize: width * 0.039,
        fontStyle: 'Poppins-Medium'
    },

    loginView: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginInput: {
        backgroundColor: 'rgba(152, 152, 152, 0.78)',
        width: width - 80,
        paddingVertical: 10,
        borderRadius: 20,
        paddingLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.031,
        color: 'white',
        marginBottom: 20,
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20
    },

    buttonText: {
        width: width - 100,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

    signupView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    signupText: {
        color: '#a6d699',
        fontFamily: 'Poppins-Regular',
        fontSize: width * 0.03
    }
})