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
import Flyfoot from "../../assets/images/flyfoot.png";
import Flag from "../../assets/images/flag.png";
import Chat from "../../assets/images/chat.png";
import Question from "../../assets/images/question.png";
import Setting from "../../assets/images/setting.png";

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

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 70 }}>
                    <Image source={Flyfoot} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>About us</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Flag} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Loyalty Program</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Chat} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Get in touch</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Question} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>FAQ</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Settings</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
                    </TouchableOpacity>
                </ScrollView>

                <ScrollView style={{ backgroundColor: "white", width: 320, height: 60, marginLeft: 130, marginTop: 25 }}>
                    <Image source={Setting} style={{ width: 20, height: 20, marginLeft: 20, marginTop: 20 }} />
                    <TouchableOpacity>
                        <Text style={{ color: "blue", fontSize: 15, marginLeft: 60, marginTop: -22 }}>Terms & conditions</Text>
                        <Text style={{ fontSize: 17, fontWeight: "bold", color: "#55E620", marginLeft: 280, marginTop: -20 }}>&gt;</Text>
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
