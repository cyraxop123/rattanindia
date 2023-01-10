import { StyleSheet, Text, View, SafeAreaView, StatusBar, ScrollView, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window')


const HomeScreen = () => {

    const nav = useNavigation()


    const productData = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor={"#002f09"} />
            <ScrollView style={styles.container}>


                <View style={styles.profileHeadView}>
                    <View style={styles.nameView}>
                        <Text style={styles.greeting}>Hello,</Text>
                        <Text style={styles.greetingName}>Mohit Rana 👋</Text>
                    </View>
                    <View style={styles.walletView}>
                        <Ionicons name="wallet-outline" size={24} color="black" style={styles.icon} />
                    </View>
                </View>


                {/* FlatList */}

                <View>
                    <Text style={styles.ratedProdTitle}>TOP RATED PRODUCT</Text>
                    <View style={styles.prodFlatListView}>
                        <FlatList
                            data={productData}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            horizontal={true}
                            renderItem={(item) => {
                                return (
                                    <View key={item}>
                                        <View style={styles.prodCard}>
                                            <Image style={styles.prodImage} source={require("../../../assets/images/demoImage.png")} />
                                            <View style={styles.prodButtonView}>
                                                <Text style={styles.prodButton}>Buy now</Text>
                                                <Text style={styles.prodRuppe}>₹ 500</Text>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>


                <View style={styles}></View>


                {/* Finanace product slider */}

                <View>
                    <View style={styles.financeHeader}>
                        <Text style={styles.financeHeaderTitle}>Finance product</Text>
                        <TouchableOpacity onPress={
                            () => {
                                nav.navigate("Products")
                            }
                        }>
                            <MaterialIcons name="grid-view" size={24} color="white" />

                        </TouchableOpacity>
                    </View>
                    <View style={styles.financeProdFlatListView}>
                        <FlatList
                            data={productData}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item}
                            horizontal={true}
                            renderItem={(item) => {
                                return (
                                    <View key={item}>
                                        <LinearGradient
                                            colors={['#7fc71a', '#16460e']}
                                            style={styles.financeProdCard}
                                        >


                                            <View style={styles.financeCardView}>
                                                <Text style={styles.financeCardTitle}>Reliant finance</Text>
                                            </View>
                                            <View style={styles.financeCardDetailsView}>
                                                <View style={styles.financeCardDetailsQue}>
                                                    <Text style={styles.financeCardDetailsTitle}>Duration <Entypo name="back-in-time" size={width * 0.038} color="black" /></Text>
                                                    <Text style={styles.financeCardDetailsTitle}>₹ Min. Invest</Text>
                                                </View>
                                                <View style={styles.financeCardDetailsAns}>
                                                    <Text style={styles.financeCardDetailsAns1}>30 Days</Text>
                                                    <Text style={styles.financeCardDetailsAns1}>₹ 300</Text>
                                                </View>
                                                <View style={styles.buttonView}>
                                                    <TouchableOpacity style={styles.button}>
                                                        <Text style={styles.buttonText}>Invest Now</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </LinearGradient>
                                    </View>
                                )
                            }}
                        />
                    </View>
                </View>


                {/* ai products */}

                <View>
                    <View style={styles.financeHeader}>
                        <Text style={styles.financeHeaderTitle}>Recommended products</Text>
                        <TouchableOpacity onPress={
                            () => {
                                nav.navigate("Products")
                            }
                        }>
                            <MaterialIcons name="grid-view" size={24} color="white" />

                        </TouchableOpacity>
                    </View>
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




            </ScrollView >
        </SafeAreaView >
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#002f09"
    },

    profileHeadView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: width,
        paddingHorizontal: 30,
        paddingVertical: 30
    },

    greeting: {
        fontFamily: 'Poppins-Bold',
        color: 'white',
        fontSize: width * 0.06
    },

    greetingName: {
        fontFamily: 'Poppins-Medium',
        color: 'white',
        fontSize: width * 0.05
    },

    icon: {
        color: 'white'
    },

    ratedProdTitle: {
        color: '#a6d699',
        marginLeft: 20,
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.045
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

    financeHeader: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20
    },

    financeHeaderTitle: {
        color: '#a6d699',
        fontFamily: 'Poppins-Bold',
        fontSize: width * 0.045
    },


    financeProdFlatListView: {
        marginTop: 10,
        flexGrow: 0,
    },

    financeProdCard: {
        marginHorizontal: 10,
        width: width * 0.82,
        alignItems: 'center',
        borderRadius: 25,
        paddingBottom: 20
    },

    financeCardView: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginVertical: 10
    },
    financeCardTitle: {
        color: 'white',
        fontFamily: 'Poppins-Bold',
        textTransform: 'uppercase',
        fontSize: width * 0.05
    },

    financeCardDetailsView: {
        alignItems: 'center',
        width: '100%',
    },

    financeCardDetailsQue: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 30,
        marginTop: 10
    },

    financeCardDetailsTitle: {
        color: 'black',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.035
    },

    financeCardDetailsAns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 35,
        marginTop: 5
    },

    financeCardDetailsAns1: {
        color: 'white',
        fontFamily: 'Poppins-Medium',
        fontSize: width * 0.035
    },

    buttonView: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonText: {
        width: width * 0.35,
        paddingVertical: 10,
        textAlign: 'center',
        borderColor: 'white',
        borderWidth: 1.5,
        borderRadius: 30,
        color: 'white',
        fontFamily: 'Poppins-Bold',
        marginBottom: 5
    },



})