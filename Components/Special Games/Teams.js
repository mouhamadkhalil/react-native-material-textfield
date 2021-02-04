import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import LocationIcon from "../../assets/Images_Design/location-icon.png";
import CalendarIcon from "../../assets/Images_Design/calendar.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import Liverppol from "../../assets/Images_Design/liverpool.png";
import Real from "../../assets/Images_Design/real.png";
import Carousel from 'react-native-snap-carousel';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Brazil from "../../assets/games/brazil.png";
import headerBg from "../../assets/images/teams-list-mobile-background.jpg";

import { Separator, Thumbnail } from 'native-base';
import { AccordionList, Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";



const sourceFile = require('../../helpers/services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;

        this.state = {
            Picture1: "",
            Picture2: "",
            Picture3: "",
            Picture4: "",
            isDone: false,
            searchText: "",
            activeIndex: 0,
            carouselItems: [{
                idMatch: "",
                City: "",
                AwayTeam: "",
            }],

            list: [
                {
                    id: 1,
                    title: 'Brazil',
                    body: 'CR FLAMENGO'
                },
                {
                    id: 2,
                    title: 'Denmark',
                    body: 'FC Midtjylland'
                },
                {
                    id: 3,
                    title: 'France',
                    body: 'DIJON'
                },
                {
                    id: 4,
                    title: 'Germany',
                    body: 'BAYERN MUNICH'
                },

                {
                    id: 5,
                    title: 'Italy',
                    body: 'AC MILAN'
                },
                {
                    id: 6,
                    title: 'Spain',
                    body: 'ATELTECO MADRID'
                },
                {
                    id: 7,
                    title: 'United Kingdom',
                    body: 'ARSENAL'
                },
            ]
        };
    }

    // popularTeamsItem = ({ item, index }) => {
    //     return (
    //         <TouchableOpacity style={{ marginTop: 40, width: 270, height: 250, marginLeft: 10, marginBottom: 0, shadowColor: "red", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 5.84, elevation: 5 }}>
    //             <Image source={Liverppol} style={{ borderRadius: 20 }} />
    //         </TouchableOpacity>
    //     );
    // };

    _head(item) {
        console.log(this.state);
        return (
            <Separator bordered style={{ paddingLeft: 30, paddingRight: 30, backgroundColor: "#f7f7f7" }}>
                <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
            </Separator>
        );
    }

    _body(item) {
        return (
            <View style={{ padding: 30, backgroundColor: "#eee", alignItems: "center", flexDirection: "row" }}>
                <Image source={Brazil} style={{}} />
                <Text style={{ textAlign: 'center' }}>{item.body}</Text>
            </View>
        );
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "#eee", marginTop: 0 }}>
                    <ImageBackground source={headerBg} style={styles.headerBg}>
                        <Text style={styles.pageTitleText}>Teams</Text>
                    </ImageBackground>
                </View>
                <View style={{ textAlign: "center", alignItems: "center", marginTop: 60, marginBottom: 60 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 23, marginBottom: 20 }}>Start booking a trip</Text>
                    <Text style={{ fontSize: 15 }}>Choose between a single, multi-destination</Text>
                    <Text style={{ fontSize: 15 }}> or group trip and gift your friends a fun</Text>
                    <Text style={{ fontSize: 15 }}> stadium experience.</Text>
                </View>
                <AccordionList
                    list={this.state.list}
                    header={this._head}
                    body={this._body}
                    keyExtractor={item => `${item.id}`}
                />
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fafafa",
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    teamImage: {
        marginTop: 50,
        width: 70,
        height: 70,
        marginLeft: 20,
        marginRight: 20
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    teamsWrap: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
        marginTop: 35
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});