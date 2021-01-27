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
import Card from "../../assets/games/Card.png";

const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Leagues extends React.Component {

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
        };
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "lightblue", marginTop: 0, height: 200 }}>
                    <Text style={styles.pageTitleText}>
                        Gift card
                    </Text>
                    <View style={{ height: 200, width: "100%", marginTop: 150 }}></View>
                </View>


                <View style={{}}>
                    <Image source={Card} style={{width:150,height:100,marginTop:-30,marginLeft:20}}/>
                    <Text style={{marginLeft:190,fontSize:11,fontWeight:"bold",marginTop:-40}}>Make someone’s day in a moment. Send a Fly-Foot gift card 
                    to your friends and treat them to anything in their city. They’re easy to use and fun to send.</Text>
                </View>

               

               
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
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: 130
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});