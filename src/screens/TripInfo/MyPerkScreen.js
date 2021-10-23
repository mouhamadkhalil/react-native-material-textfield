import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions
} from "react-native";
import Swiper from 'react-native-swiper'
import { translate } from "helpers/utils";
import R from "res/R";
const { width } = Dimensions.get('window')


export default class MyPerkScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedHotel: null,
            isLoading: true
        }
    }

    componentDidMount() {
        try {
            this.init();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    init = () => {
        var selectedHotel = this.props.route.params.data;
        this.setState({ selectedHotel, isLoading: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator color='blue' size='large' />
                    :
                    <ScrollView>
                        <Swiper showsPagination={true} height={240} paginationStyle={{ marginStart: width - 80 }}  >
                            <View style={styles.slide1} >
                                <Text style={styles.text}>Hello Swiper</Text>
                            </View>
                            <View style={styles.slide2}>
                                <Text style={styles.text}>Beautiful</Text>
                            </View>
                            <View style={styles.slide3}>
                                <Text style={styles.text}>And simple</Text>
                            </View>
                        </Swiper>
                        <Text style={styles.hotelName}>Hotel Name</Text>

                        <View style={[styles.division, { marginTop: 25 }]}>
                            <Text style={styles.title}>
                                {translate('contact')}
                            </Text>
                            <View style={styles.contactInfo}>
                                <Text style={styles.img}>img</Text>
                                <Text style={styles.info}>
                                    Carrer de la Duquessa d’Orleans, 56, 08034 Barcelona
                                </Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.img}>img</Text>
                                <Text style={styles.info}>+34 932 05 09 61</Text>
                            </View>
                            <View style={styles.contactInfo}>
                                <Text style={styles.img}>img</Text>
                                <Text style={styles.info}>info@hotelmirabella.com</Text>
                            </View>
                        </View>

                        <View style={styles.division}>
                            <Text style={styles.title}>
                                {translate('bookingDetails')}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={styles.divisionStart}>
                                    <Text style={styles.referenceStart}>
                                        {translate('checkIn')}
                                    </Text>
                                    <Text style={styles.referenceEnd}>
                                        jez1209
                                    </Text>
                                </View>
                                <View style={styles.divisionEnd}>
                                    <Text style={styles.referenceStart}>
                                        {translate('checkOut')}
                                    </Text>
                                    <Text style={styles.referenceEnd}>
                                        jez1209
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.divisionBorder}>
                                <View style={styles.divisionStart}>
                                    <Text style={styles.img}>img</Text>
                                    <Text style={styles.info}>economy class</Text>
                                </View>
                                <View style={styles.divisionEnd}>
                                    <Text style={styles.img}>img</Text>
                                    <Text style={styles.info}>20 kg Luggage</Text>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                }
            </SafeAreaView>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
    },
    division: {
        backgroundColor: '#fff',
        margin: 15,
        marginTop: 0
    },
    divisionBorder: {
        flexDirection: 'row',

    },
    divisionStart: {
        width: '50%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    divisionEnd: {
        width: '50%',
        borderStartWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    title: {
        color: R.colors.blue,
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    referenceStart: {
        color: 'gray',
        textTransform: 'uppercase',
        padding: 15,
        paddingTop: 0
    },
    referenceEnd: {
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 0
    },
    img: {

    },
    contactInfo: {
        flexDirection:'row',
        padding:15
    },
    info: {
        paddingStart: 10,
        paddingEnd: 10,
    },
    passengerItem: {
        width: "50%",
        height: 60,
        paddingStart: 15,
        paddingEnd: 15,
    },
    passengerTitle: {
        color: 'gray',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    passengerName: {
        fontSize: 18
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    hotelName: {
        marginTop: -50,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        paddingStart: 15
    }
});