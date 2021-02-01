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
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Image1 from "../../assets/games/image1.png";
import Image2 from "../../assets/games/image2.png";
import Image3 from "../../assets/games/image3.png";
import Image4 from "../../assets/games/image4.png";
import Image5 from "../../assets/games/image5.png";
import Image6 from "../../assets/games/image6.png";
import Image7 from "../../assets/games/image7.png";
import Image8 from "../../assets/games/image8.png";
import Image9 from "../../assets/games/image9.png";
import Image10 from "../../assets/games/image10.png";
import Image11 from "../../assets/games/image11.png";
import Image12 from "../../assets/games/image12.png";
import Image13 from "../../assets/games/image13.png";
import Image14 from "../../assets/games/image14.png";
import Image15 from "../../assets/games/image15.png";

const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Leagues extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            allLeagues: [{
                ID: "",
                Value: "",
                disabled: "",
                ExtraField: "",
            }],
        };
    }


    componentDidMount() {
        const url = `${API_URL}/mobile/leagues/all`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                var data = response.map(function (item) {
                    return {
                        ID: item.idMatch,
                        Value: item.Value,
                        disabled: item.disabled,
                        ExtraField: item.ExtraField,
                    };
                });
                this.setState({ allLeagues: data });
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "lightblue", marginTop: 0, height: 200 }}>
                    <Text style={styles.pageTitleText}>
                        LEAGUES
                    </Text>
                    <View style={{ height: 200, width: "100%", marginTop: 150 }}></View>
                </View>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 145, marginTop: 50 }}>European</Text>
                <TouchableOpacity style={{ width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image1} style={{ marginLeft: 30, marginTop: 50, width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 150, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image2} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 260, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image3} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 160, marginTop: 50 }}>Spain</Text>
                <TouchableOpacity style={{ width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image4} style={{ marginLeft: 30, marginTop: 50, width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 150, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image5} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 260, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image6} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 175, marginTop: 50 }}>Uk</Text>
                <TouchableOpacity style={{ width: 100, marginLeft: 80, marginTop: 50 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image7} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 210, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image8} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>

                <TouchableOpacity style={{ width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image9} style={{ marginLeft: 30, marginTop: 50, width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 150, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image10} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 260, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image11} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <Text style={{ fontWeight: "bold", fontSize: 18, marginLeft: 140, marginTop: 50 }}>International</Text>
                <TouchableOpacity style={{ width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image12} style={{ marginLeft: 30, marginTop: 50, width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 150, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image13} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <TouchableOpacity style={{ marginLeft: 270, marginTop: -70, width: 100 }} onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Image source={Image14} style={{ width: 70, height: 70 }} />
                </TouchableOpacity>
                <ScrollView style={{ marginBottom: 80 }}></ScrollView>
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
        backgroundColor: "#F0DADA",
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
        marginTop: 80,
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 140
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});