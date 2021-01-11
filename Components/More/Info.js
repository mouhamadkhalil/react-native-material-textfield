import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    Linking,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Flyfoot from "../../assets/Images_Design/flyfoot1.png";
import Flag2 from "../../assets/Images_Design/flag2.png";
import Chat from "../../assets/Images_Design/msg1.png";
import Question from "../../assets/Images_Design/faq1.png";
import Setting from "../../assets/Images_Design/setting1.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";

export default class Info extends React.Component {


    FAQ = () => {
        this.props.navigation.navigate('FAQ 1');
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 40,
                        fontSize: 15,
                        marginLeft: 230
                    }}
                >
                    MONDAY 12 SEPT
                </Text>
                <View style={{ marginTop: -35, marginLeft: 380, width: 40, height: 50 }}>
                    <TouchableOpacity>
                        <Image source={Search} style={{ width: 40, height: 40, marginLeft: 0, marginTop: 4 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: -40, marginLeft: 430, width: 40, height: 50 }}>
                    <TouchableOpacity>
                        <Image source={Notifictaion} style={{ width: 20, height: 20, marginLeft: 0, marginTop: 4 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: -49, width: 190 }}>
                    <TouchableOpacity>
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onpress={() => Linking.openURL('http://google.com')}>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 70 }}>
                        <Image source={Flyfoot} style={{ width: 20, height: 25, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ marginLeft: 100, color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/aboutus');
                            }}>
                            About us
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Flag2} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Loyalty Program</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Chat} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/contact');
                            }}>
                            Get in touch
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.FAQ}>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Question} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>FAQ</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Settings</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                        <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}
                            onPress={() => {
                                Linking.openURL('https://fly-foot.com/en/about/TC');
                            }}>
                            Terms & conditions
                        </Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </ScrollView>
                </TouchableOpacity>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 0,
        marginBottom: 10,
        backgroundColor: "#F5F7EC",
    },
});
