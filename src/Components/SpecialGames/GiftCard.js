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
import Card from "../../../assets/images/games/Card.png";
import Gift1 from "../../../assets/images/games/gift1.png";
import Gift2 from "../../../assets/images/games/gift2.png";
import Gift3 from "../../../assets/images/games/gift3.png";
import Gift4 from "../../../assets/images/games/gift4.png";
import Gift5 from "../../../assets/images/games/gift5.png";
import Chat from "../FanChat/chat";
import R from "res/R";

const sourceFile = require('../../helpers/services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class GiftCard extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            Picture: Gift1,
        };
    }

    Card1 = () => {
        this.setState({ Picture: Gift1 });
    };

    Card2 = () => {
        this.setState({ Picture: Gift2 });
    };

    Card3 = () => {
        this.setState({ Picture: Gift3 });
    };

    Card4 = () => {
        this.setState({ Picture: Gift4 });
    };

    Card5 = () => {
        this.setState({ Picture: Gift5 });
    };

    Proceed = () => {
        this.props.navigation.navigate('giftcard2');
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={R.images.gift_card} style={styles.headerBg}>
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