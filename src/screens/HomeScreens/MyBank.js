import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';


const { width, height } = Dimensions.get('window')

const MyBank = () => {
    const productData = [1, 2, 3]

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Bank's</Text>
                </View>

                {
                    productData.map((index)=>{
                        return(
                            <View key={index} style={styles.bankView}>
                                <View style={styles.bankLogo}>
                                <MaterialCommunityIcons name="bank-outline" size={width * 0.16} color="green" />
                                </View>
                                <View style={styles.bankContent}>
                                    <Text style={styles.bankHolderName}>Mohit rana</Text>
                                    <Text style={styles.bankName}>State bank of india</Text>
                                    <Text style={styles.bankPrimary}>Primary</Text>
                                </View>
                            </View>
                        )
                    })
                }

                <View style={styles.buttonView}>
                <MaterialIcons name="add-box" size={width * 0.1} color="white" />
                <View style={styles.buttonContent}>
                    <Text style={styles.buttonTitle}>Add bank account</Text>
                    <Text style={styles.buttonHead}>saving account</Text>
                </View>
                </View>
                
            </ScrollView>
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
        marginLeft: 20,
        marginTop: 20
    },

    bankLogo: {
        marginRight: 5
    },
    bankHolderName: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.04
    },
    
    bankName: {
        color: '#689694',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.03
    },
    
    bankPrimary: {
        color: '#48d0ff',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.025
    },

    buttonView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: 20,
        paddingHorizontal: 20
    },

    buttonContent: {
        marginLeft: 10
    },

    buttonTitle: {
        color: 'white',
        fontFamily: 'Poppins-Medium'
    },

    buttonHead: {
        color: '#689694'
    }


})