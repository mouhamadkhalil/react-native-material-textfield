import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 20,
                        fontSize: 15,
                        marginLeft: 230
                    }}
                >
                    MONDAY 12 SEPT
                </Text>
                <TouchableOpacity>
                    <Image source={Search} style={{ width: 40, height: 40, marginLeft: 375, marginTop: -30 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Notifictaion} style={{ width: 20, height: 20, marginLeft: 430, marginTop: -30 }} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 130, marginTop: -31 }} />
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 130, marginTop: -5 }} />
                    <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 130, marginTop: -5 }} />
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 70 }}>
                    <Image source={Flyfoot} style={{ width: 20, height: 25, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -25 }}>About us</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Flag2} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Loyalty Program</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Chat} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Get in touch</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Question} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>FAQ</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Settings</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Terms & conditions</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -15 }}><Image source={Arrow1} /></Text>
                    </TouchableOpacity>
                </ScrollView>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 50,
        marginBottom: 10,
        backgroundColor: "#F5F7EC",
    },
});
