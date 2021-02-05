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
import Gift1 from "../../assets/games/gift1.png";
import Gift2 from "../../assets/games/gift2.png";
import Gift3 from "../../assets/games/gift3.png";
import Gift4 from "../../assets/games/gift4.png";
import Gift5 from "../../assets/games/gift5.png";
import GiftCard from "../../assets/games/GiftCard.png";
import Chat from "../../helpers/chat";



const sourceFile = require('../../helpers/services.js');
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

    Card1 = () => {
        this.setState({ Picture: Gift1 })
    }

    Card2 = () => {
        this.setState({ Picture: Gift2 })
    }

    Card3 = () => {
        this.setState({ Picture: Gift3 })
    }

    Card4 = () => {
        this.setState({ Picture: Gift4 })
    }

    Card5 = () => {
        this.setState({ Picture: Gift5 })
    }

    Proceed = () => {
        this.props.navigation.navigate('giftcard2')
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={GiftCard} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        Gift card
                    </Text>
                </ImageBackground>
                <View>
                    <Image source={Card} style={{ width: 150, height: 100, marginTop: -30, marginLeft: 20 }} />
                    <Text style={{ width: 155, marginLeft: 190, fontSize: 9, fontWeight: "bold", marginTop: -60 }}>Make someone’s day in a moment.
                    Send a Fly-Foot gift card
                    to your friends and treat them to anything in their city. They’re easy to use and fun to send.</Text>
                </View>
                <View >
                    <Text style={{ fontWeight: "bold", color: "gray", marginLeft: 20, marginTop: 30 }}>CHOOSE AN AMOUNT</Text>
                    <View style={{ width: 50, marginLeft: 20, marginTop: 30 }}>
                        <Button
                            onPress={this.Card1}
                            title="100 $"
                            color="#F2C8C8"
                        />
                    </View>
                    <View style={{ width: 50, marginLeft: 90, marginTop: -50 }}>
                        <Button
                            onPress={this.Card2}
                            title="200 $"
                            color="#F2C8C8"
                        />
                    </View>
                    <View style={{ width: 50, marginLeft: 160, marginTop: -50 }}>
                        <Button
                            onPress={this.Card3}
                            title="300 $"
                            color="#F2C8C8"
                        />
                    </View>
                    <View style={{ width: 50, marginLeft: 230, marginTop: -50 }}>
                        <Button
                            onPress={this.Card4}
                            title="400 $"
                            color="#F2C8C8"
                        />
                    </View>
                    <View style={{ width: 50, marginLeft: 300, marginTop: -50 }}>
                        <Button
                            onPress={this.Card5}
                            title="500 $"
                            color="#F2C8C8"
                        />
                    </View>
                    <Text style={{ fontWeight: "bold", color: "gray", marginLeft: 20, marginTop: 30 }}>PERSONALIZE YOUR GIFT</Text>
                    <Image source={this.state.Picture} style={{ width: 330, marginLeft: 20, marginTop: 30 }} />
                    <View style={{ width: 150, marginLeft: 200, marginTop: 30, height: 100 }}>
                        <Button
                            onPress={this.Proceed}
                            title="PROCEED &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; >"
                            color="#52F232"
                        />
                    </View>
                    <Chat />
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 500,
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
        marginTop: 0,
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: -120
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },

});