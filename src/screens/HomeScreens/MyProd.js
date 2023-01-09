import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, Dimensions, Image } from 'react-native'
import React from 'react'


const { width, height } = Dimensions.get('window')

const MyProd = () => {
    const productData = [1, 2, 3, 4, 5, 6, 7, 8]

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>My Purchases</Text>
                </View>
                <View style={styles.chooseView}>
                    <Text style={styles.chooseText}>My finances</Text>
                    <Text style={styles.chooseText}>My products</Text>
                </View>
                <View>
                    <View style={{ ...styles.prodFlatListView, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
                        {
                            productData.map((index) => {
                                return (
                                    <View key={index}>
                                        <View style={{ ...styles.prodCard, marginVertical: 15 }}>
                                            <Image style={styles.prodImage} source={require("../../../assets/images/demoImage.png")} />
                                            <View style={styles.prodButtonView}>
                                                <Text style={styles.prodButton}>Buy now</Text>
                                                <Text style={styles.prodRuppe}>₹ 500</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        }

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default MyProd

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

    chooseView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 50,
        alignSelf: 'center',
        width: width,
        paddingHorizontal: 20
    },

    chooseText: {
        fontFamily: 'Poppins-Medium',
        paddingVertical: 15,
        paddingHorizontal: 35,
        color: 'white',
        borderColor: '#a6d699',
        borderWidth: 2,
        borderRadius: 20
    },

    prodFlatListView: {
        marginTop: 10,
        flexGrow: 0,
    },

    prodCard: {
        backgroundColor: 'white',
        width: width * 0.4,
        marginHorizontal: 10,
        alignItems: 'center',
        borderRadius: 25,
        paddingBottom: 10,
        marginLeft: 15,
        borderColor: '#98dc31',
        borderWidth: 3.5
    },

    prodImage: {
        resizeMode: 'center',
        width: '100%',
        height: height * 0.19,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: 'black',
    },

    prodButtonView: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    prodButton: {
        fontFamily: 'Poppins-Bold',
        backgroundColor: '#98dc31',
        width: width * 0.4,
        textAlign: 'center',
        paddingVertical: 5,
        color: 'white',
        marginBottom: 10
    },

    prodRuppe: {
        fontFamily: 'Poppins-Medium'
    },

})