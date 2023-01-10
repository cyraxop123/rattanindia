import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, StatusBar, ScrollView, Dimensions, KeyboardAvoidingView } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const { width, height } = Dimensions.get('window')

const CreatePasswordScreen = () => {

    const nav = useNavigation()

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>
                <View style={styles.roundShape}>
                    <Text style={styles.headerDescTitle}>Create Password</Text>
                    <Text style={styles.headerDesc}>Create strong password to login account!</Text>
                </View>
                <View style={styles.loginView}>
                    <TextInput
                        style={styles.loginInput}
                        cursorColor={'black'}
                        placeholder={'Password'}
                        placeholderTextColor={'black'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={styles.loginInput}
                        cursorColor={'black'}
                        placeholder={'Confirm password'}
                        placeholderTextColor={'black'}
                        keyboardType={'default'}
                        secureTextEntry={true}
                    />

                    <View style={styles.buttonView}>
                        <TouchableOpacity style={styles.button} onPress={
                            () => {
                                nav.navigate("Login")
                            }
                        }>
                            <Text style={styles.buttonText}>Create</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default CreatePasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09"
    },

    roundShape: {
        flex: 1,
        backgroundColor: 'white',
        height: height * 0.3,
        alignItems: 'flex-start',
        justifyContent: 'center',
        borderBottomLeftRadius: 100,
        borderBottomEndRadius: 100
    },
    headerDescTitle: {
        fontFamily: 'Poppins-Bold',
        color: '#a6d699',
        marginHorizontal: 30,
        fontSize: width * 0.06
    },
    headerDesc: {
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.027,
        color: '#486e59',
        marginHorizontal: 30
    },

    loginView: {
        height: height * 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    loginInput: {
        backgroundColor: 'white',
        width: width - 80,
        paddingVertical: 10,
        borderRadius: 20,
        paddingLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.031,
        color: 'black',
        marginBottom: 20
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
        borderColor: '#a6d699',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

})