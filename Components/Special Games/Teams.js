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

import { Separator, Thumbnail } from 'native-base';
import { AccordionList, Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";



const sourceFile = require('../../services.js');
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

    popularTeamsItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginTop: 40, width: 270, height: 250, marginLeft: 10, marginBottom: 0, shadowColor: "red", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 5.84, elevation: 5 }}>
                <Image source={Liverppol} style={{ borderRadius: 20 }} />
            </TouchableOpacity>
        );
    };

    _head(item) {
        return (
            <Separator bordered style={{ alignItems: 'center', marginTop: 5 }}>
                <Text style={{ marginLeft: -320, fontWeight: "bold" }}>{item.title}</Text>
            </Separator>
        );
    }

    _body(item) {
        return (
            <View style={{ padding: 10 }}>
                <Text style={{ textAlign: 'center', marginLeft: -25, marginTop: 30 }}>{item.body}</Text>
                <Image source={Brazil} style={{ marginLeft: 70, marginTop: -25 }} />
            </View>
        );
    }


    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "#eee", marginTop: 0 }}>
                    <Text style={styles.pageTitleText}>
                        TEAMS
                    </Text>
                    <View style={{ backgroundColor: "white", height: 200, width: "100%", marginTop: 150 }}></View>
                    <View style={{ flex: 1, justifyContent: 'center', marginTop: -350 }}>
                        <Carousel
                            style={{ marginLeft: 0 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={485}
                            itemWidth={180}
                            renderItem={this.popularTeamsItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 23, marginLeft: 70 }}>Start booking a trip</Text>
                <Text style={{ fontSize: 15, marginLeft: 30, width: 290 }}>Choose between a single, multi-destination</Text>
                <Text style={{ fontSize: 15, marginLeft: 40, width: 290 }}> or group trip and gift your friends a fun</Text>
                <Text style={{ fontSize: 15, marginLeft: 100, width: 290 }}> stadium experience.</Text>


                <ScrollView style={{ marginTop: 30 }}></ScrollView>
                <AccordionList
                    list={this.state.list}
                    header={this._head}
                    body={this._body}
                    keyExtractor={item => `${item.id}`}
                />

                <ScrollView style={{ marginTop: 30 }}></ScrollView>





            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 2000,
        marginLeft: 0,
        width: 500,
        marginTop: 0,
        marginBottom: 0,
        backgroundColor: "#FFF",
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
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
        marginTop: 40,
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 150
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});