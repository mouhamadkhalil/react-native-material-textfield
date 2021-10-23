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
import Swiper from 'react-native-swiper';
import { getHotelImages } from "helpers/tripHelper.js";
import { translate } from "helpers/utils";
import R from "res/R";
const { width } = Dimensions.get('window')


export default class MyHotelScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            hotel: null,
            hotelImages: [],
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
        var hotel = this.props.route.params.data;
        var hotelImages = getHotelImages(hotel.Images);
        this.setState({ hotel, hotelImages, isLoading: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator color='blue' size='large' />
                    :
                    <ScrollView>
                        <Swiper showsPagination={true} height={240} paginationStyle={{ marginStart: width - 80 }}  >
                            {this.state.hotel.Images.map((image, index) => {
                                return <View style={styles.slide} key={index} >
                                    <Image style={styles.image} source={{ uri: image }} />
                                </View>
                            })}
                        </Swiper>
                        <Text style={styles.hotelName}>{this.state.hotel.HotelName}</Text>

                        <View style={[styles.division, { marginTop: 25 }]}>
                            <Text style={styles.title}>
                                {translate('contact')}
                            </Text>
                            <View style={styles.contactInfo}>
                                <Image style={styles.img} source={R.images.location_sm}/>
                                <Text style={styles.info}>
                                    Carrer de la Duquessa d’Orleans, 56, 08034 Barcelona
                                </Text>
                            </View>
                            <View style={styles.contactInfo}>
                            <Image style={styles.img} source={R.images.phone_sm}/>
                                <Text style={styles.info}>+34 932 05 09 61</Text>
                            </View>
                            <View style={styles.contactInfo}>
                            <Image style={styles.img} source={R.images.mail_sm}/>
                                <Text style={styles.info}>info@hotelmirabella.com</Text>
                            </View>
                        </View>

                        <View style={styles.division}>
                            <Text style={styles.title}>
                                {translate('bookingDetails')}
                            </Text>
                            <View style={styles.row}>
                                <View style={styles.checkin}>
                                    <Text style={styles.infoRegular}>
                                        {translate('checkIn')}
                                    </Text>
                                    <Text style={styles.infoBold}>
                                        7 Octobre
                                    </Text>
                                    <Text style={styles.day}>
                                        sunday
                                    </Text>
                                </View>
                                <View style={styles.checkout}>
                                    <Text style={styles.infoRegular}>
                                        {translate('checkOut')}
                                    </Text>
                                    <Text style={styles.infoBold}>
                                        13 Octobre
                                    </Text>
                                    <Text style={styles.day}>
                                        saturday
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.row , styles.padding]}>
                                <View style={styles.divisionStart}>
                                    <Image style={styles.img} source={R.images.bedGrey} />
                                    <Text style={styles.info}>1 {translate('doubleRoom')}</Text>
                                </View>
                                <View style={styles.divisionEnd}>
                                    <Image style={styles.img} source={R.images.adult} />
                                    <Text style={styles.info}>2 {translate('adults')}</Text>
                                </View>
                            </View>
                            <View style={styles.divisionBorder}>
                                <Image style={styles.img} source={R.images.coffeeCupGrey} />
                                <Text style={styles.info}>{translate('breakfastIncluded')}</Text>
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
    title: {
        color: R.colors.blue,
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    division: {
        backgroundColor: '#fff',
        margin: 15,
        marginTop: 0
    },
    row: {
        flexDirection: 'row',
    },
    padding:{
        padding: 15
    },
    divisionBorder: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: 'gray',
        padding: 15
    },
    divisionStart: {
        flexDirection: "row",
        width: '50%'
    },
    divisionEnd: {
        flexDirection: "row",
        width: '50%'
    },
    checkin: {
        width: '50%',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    checkout: {
        width: '50%',
        borderStartWidth: 0.5,
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    infoRegular: {
        color: 'gray',
        textTransform: 'uppercase',
        padding: 15,
        paddingTop: 0
    },
    infoBold: {
        textTransform: 'capitalize',
        padding: 15,
        paddingBottom: 0,
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 0
    },
    image: {
        resizeMode: 'stretch',
        width: '100%',
        height: '100%'
    },
    contactInfo: {
        flexDirection: 'row',
        padding: 15
    },
    info: {
        paddingStart: 10,
        paddingEnd: 10,
    },
    day: {
        textTransform: 'capitalize',
        padding: 15,
        paddingTop: 0
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
    hotelName: {
        marginTop: -50,
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        paddingStart: 15
    }
});