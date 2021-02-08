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
    AsyncStorage,
    Linking,
    Dimensions,
    CheckBox
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Gift1 from "../../../assets/images/games/GiftCard23.png";
import Chat from "../FanChat/chat";
import R from "res/R";

const sourceFile = require('../../helpers/services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class GiftCard2 extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            Picture: Gift1,
            NameFrom: "",
            SurNameFrom: "",
            EmailFrom: "",
            PhoneNumberFrom: "",
            NameTo: "",
            SurNameTo: "",
            EmailTo: "",
            PhoneNumberTo: "",
        };
    }


    Proceed = () => {
        this.props.navigation.navigate('giftcard2');
    };

    GiftCard = () => {
        this.props.navigation.navigate('giftcard');
    };

    getToken = async () => AsyncStorage.getItem('token');

    CompletePayment = async () => {
        var token = await this.getToken();
        const url = `${API_URL}/mobile/giftcard/completePayment`;

        const data = {
            NameFrom: this.state.NameFrom,
            SurNameFrom: this.state.SurNameFrom,
            EmailFrom: this.state.EmailFrom,
            PhoneNumberFrom: this.state.PhoneNumberFrom,
            NameTo: this.state.NameTo,
            SurNameTo: this.state.SurNameTo,
            EmailTo: this.state.EmailTo,
            PhoneNumberTo: this.state.PhoneNumberTo,
        };


        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
                "Authorization": 'Bearer ' + token

            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                // this.setState({})

            });
    };



    render() {
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={R.images.gift_card} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        Gift card
                    </Text>
                </ImageBackground>
                <Text style={{ width: 130, marginLeft: 210, fontSize: 12, fontWeight: "bold", marginTop: 80 }}>
                    Make someone’s day in a moment.
                    Send a Fly-Foot gift card
                    to your friends and treat them to anything in their city. They’re easy to use and fun to send.
                    </Text>
                <View>
                    <Image source={this.state.Picture} style={{ width: 170, height: 200, marginTop: -140, marginLeft: 20 }} />
                </View>

                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>THIS GIFT IS FOR</Text>

                <View style={{ backgroundColor: "white", width: 310, height: 370, marginLeft: 20, marginTop: 20 }}>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={(NameTo) => this.setState({ NameTo })}
                        value={this.state.NameTo}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        onChangeText={(SurNameTo) => this.setState({ SurNameTo })}
                        value={this.state.SurNameTo}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(EmailTo) => this.setState({ EmailTo })}
                        numberOfLines={8}
                        value={this.state.EmailTo}
                        type="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(PhoneNumberTo) => this.setState({ PhoneNumberTo })}
                        numberOfLines={8}
                        value={this.state.PhoneNumberTo}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                </View>


                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>THIS GIFT IS FROM</Text>

                <View style={{ backgroundColor: "white", width: 310, height: 370, marginLeft: 20, marginTop: 20 }}>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(NameFrom) => this.setState({ NameFrom })}
                        numberOfLines={8}
                        value={this.state.NameFrom}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(SurNameFrom) => this.setState({ SurNameFrom })}
                        numberOfLines={8}
                        value={this.state.SurNameFrom}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(EmailFrom) => this.setState({ EmailFrom })}
                        numberOfLines={8}
                        type="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                        value={this.state.EmailFrom}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        onChangeText={(PhoneNumberFrom) => this.setState({ PhoneNumberFrom })}
                        numberOfLines={8}
                        value={this.state.PhoneNumberFrom}
                        style={{ fontSize: 12, marginTop: -30, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 250, height: 1, marginLeft: 30, marginTop: -45 }}></View>
                </View>

                <CheckBox
                    style={{ marginLeft: 13, marginTop: 20 }}
                    selected="true"
                />
                <Text style={{ marginLeft: 50, fontSize: 11, color: "gray", fontWeight: "bold", marginTop: -25 }}>I want to receive a confirm of delivery on my e-mail</Text>

                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 20, marginTop: 30 }}>ADD A MESSAGE</Text>


                <ScrollView style={{ backgroundColor: "white", width: 310, height: 150, marginLeft: 20, marginTop: 50, marginBottom: 30 }}>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        placeholder="Additional requests? Please write them here..."
                        style={{ fontSize: 12, marginTop: -20, paddingLeft: 20 }}
                    />
                </ScrollView>
                <CheckBox
                    style={{ marginLeft: 13, marginTop: -10 }}
                    selected="true"
                />
                <Text style={{ marginLeft: 50, marginBottom: 30, marginTop: -27, color: "gray", fontSize: 11 }}>I’ve
                read and accepted the &nbsp;
                    <TouchableOpacity >
                        <Text style={{ color: "blue", marginTop: 0 }}>
                            <Text style={{ color: "blue", fontSize: 11, marginLeft: 70, marginTop: -22 }}
                                onPress={() => {
                                    Linking.openURL('https://fly-foot.com/en/about/TC');
                                }}>
                                Terms &amp; Conditions</Text>
                        </Text>
                    </TouchableOpacity>
                </Text>
                <View style={{ width: 80, marginLeft: 150, marginTop: 0 }}>
                    <Button
                        onPress={this.GiftCard}
                        title="BACK"
                        color="black"
                    />
                </View>

                <View style={{ width: 80, marginLeft: 250, marginTop: -35 }}>
                    <Button
                        onPress={this.CompletePayment}
                        title="PROCEED"
                        color="gray"
                    />
                </View>
                <Chat />
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