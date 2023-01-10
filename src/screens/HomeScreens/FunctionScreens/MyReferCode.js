import { StyleSheet, Text, View, SafeAreaView, StatusBar, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



const { width, height } = Dimensions.get('window');

export default function MyReferCode() {
    const nav = useNavigation()

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
                                        <Text style={styles.category}>Url: https://opk</Text>
                                    </View>
                                </View>
                                <Text style={{ ...styles.money }}><EvilIcons name="share-google" size={30} color="black" /></Text>
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