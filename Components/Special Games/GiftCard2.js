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
import Gift1 from "../../assets/games/GiftCard23.png";


const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Leagues extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            Picture: Gift1
        };
    }


    Proceed = () => {
        this.props.navigation.navigate('giftcard2')
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
                <Text style={{ width: 130, marginLeft: 210, fontSize: 12, fontWeight: "bold", marginTop: 80 }}>
                    Make someone’s day in a moment.
                    Send a Fly-Foot gift card
                    to your friends and treat them to anything in their city. They’re easy to use and fun to send.
                    </Text>
                <View>
                    <Image source={this.state.Picture} style={{ width: 170, height: 200, marginTop: -140, marginLeft: 20 }} />
                </View>

                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>THIS GIFT IS FOR</Text>

                <View style={{ backgroundColor: "white", width: 310, height: 400, marginLeft: 20, marginTop: 20 }}>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: 0 }}></View>

                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />


                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -50 }}></View>
                </View>


                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>THIS GIFT IS FROM</Text>

                <View style={{ backgroundColor: "white", width: 310, height: 400, marginLeft: 20, marginTop: 20 }}>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: 0 }}></View>

                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />


                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -50 }}></View>
                </View>

                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>ADD A MESSAGE</Text>


                <ScrollView style={{ backgroundColor: "white", width: 310, height: 150, marginLeft: 20, marginTop: 50,marginBottom:30 }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        placeholder="Additional requests? Please write them here..."
                        style={{ fontSize: 12, marginTop: -20, paddingLeft: 20 }}
                    />
                </ScrollView>

                <Text style={{marginLeft:20,marginBottom:30,marginTop:-20}}>I’ve read and accepted the
                    <TouchableOpacity >
                    <Text style={{color:"blue",marginTop:0}}>Terms & Conditions</Text>
                    </TouchableOpacity> 
                </Text>

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1000,
        width: 500,
        backgroundColor: "#F0DADA",
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

});