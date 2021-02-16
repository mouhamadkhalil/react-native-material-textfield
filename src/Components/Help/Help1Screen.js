import React from "react";
import {
    StyleSheet,
    Text,
    Linking,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Chat from "../FanChat/chat";
import { get } from "../../helpers/services.js";

export default class Help1Screen extends React.Component {

    Back = () => {
        this.props.navigation.navigate('Menu');
    };

    Help2 = () => {
        this.props.navigation.navigate('FAQ 2');
    };

    state = {
        idLookup: "",
        LName0: "",
        LName1: "",
        LName2: "",
        LName3: "",
        LName4: "",
        LName5: "",
        LName6: "",
        LName7: "",
        LName8: "",
        LName9: "",
        LDescription0: "",
        LDescription1: "",
        LDescription2: "",
        LDescription3: "",
        LDescription4: "",
        LDescription5: "",
        LDescription6: "",
        LDescription7: "",
        LDescription8: "",
        LDescription9: "",
        isDone: false,

    };

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    getData = () => {
        const path = `/mobile/about/faq`;
        get(path).then((response) => {
            this.setState({ LName0: response[0].LName });
            this.setState({ LName1: response[1].LName });
            this.setState({ LName2: response[2].LName });
            this.setState({ LName3: response[3].LName });
            this.setState({ LName4: response[4].LName });
            this.setState({ LName5: response[5].LName });
            this.setState({ LName6: response[6].LName });
            this.setState({ LName7: response[7].LName });
            this.setState({ LName8: response[8].LName });
            this.setState({ LName9: response[9].LName });
            this.setState({ LDescription0: response[0].LDescription });
            this.setState({ LDescription1: response[1].LDescription });
            this.setState({ LDescription2: response[2].LDescription });
            this.setState({ LDescription3: response[3].LDescription });
            this.setState({ LDescription4: response[4].LDescription });
            this.setState({ LDescription5: response[5].LDescription });
            this.setState({ LDescription6: response[6].LDescription });
            this.setState({ LDescription7: response[7].LDescription });
            this.setState({ LDescription8: response[8].LDescription });
            this.setState({ LDescription9: response[9].LDescription });
            this.setState({ isDone: true });
        });
    }

    Answer0 = () => {
        var text = "";
        text += this.state.LDescription0;
        document.getElementById("demo").innerHTML = text;
    };

    Answer1 = () => {
        var text = "";
        text += this.state.LDescription1;
        document.getElementById("demo1").innerHTML = text;
    };

    Answer2 = () => {
        var text = "";
        text += this.state.LDescription2;
        document.getElementById("demo2").innerHTML = text;
    };

    Answer3 = () => {
        var text = "";
        text += this.state.LDescription3;
        document.getElementById("demo3").innerHTML = text;
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
                    <TouchableOpacity onPress={this.Back} style={{ width: 110, marginLeft: 0, height: 65, marginTop: 0 }}>
                        <Text style={{ fontSize: 35, color: "yellow", marginLeft: 20, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 19,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: -50,
                            marginLeft: -40,
                            marginBottom: 30
                        }}
                    >
                        help
          </Text>
                </ScrollView>
                <ScrollView style={{ width: "50%", height: 2050, backgroundColor: "#F7EEE8" }}>
                    <Text
                        style={{
                            color: "#E912E9",
                            fontWeight: "bold",
                            fontSize: 14,
                            paddingTop: 20,
                            marginLeft: 20,
                        }}
                    >
                        POPULAR FAQS
          </Text>
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: 18,
                            fontSize: 30
                        }}
                    >
                        &gt;
          </Text>
                    <Text style={{ marginLeft: 85 }}>
                        {this.state.isDone ? console.log("Component is Ready!") : <ActivityIndicator size="large"
                            color="blue" style={{ width: 200, marginTop: 40, marginLeft: 110 }}
                        />}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: -18,
                            color: "blue",
                            marginLeft: 50,
                            width: 150,
                        }}
                    >
                        <TouchableOpacity onPress={this.Answer0}>
                            <Text style={{ width: 310, marginTop: -30, fontWeight: "bold", color: "blue" }}>{this.state.LName0}</Text>
                            <Text id="demo" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>

                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: -10,
                            fontSize: 30
                        }}
                    >
                        &gt;
          </Text>

                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: -18,
                            color: "blue",
                            marginLeft: 50,
                            width: 320,
                        }}
                    >
                        <TouchableOpacity onPress={this.Answer1}>
                            <Text> {" "}</Text>
                            <Text style={{ marginTop: -35, width: 300, fontWeight: "bold", color: "blue" }}>{this.state.LName1}</Text>
                            <Text id="demo1" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>

                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: -10,
                            fontSize: 30
                        }}
                    >
                        &gt;
          </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: -18,
                            color: "blue",
                            marginLeft: 50,
                            width: 320,
                        }}
                    >
                        <TouchableOpacity onPress={this.Answer2}>
                            <Text>{" "}</Text>
                            <Text style={{ marginTop: -35, width: 300, fontWeight: "bold", color: "blue" }}> {this.state.LName2}</Text>
                            <Text id="demo2" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: -10,
                            fontSize: 30
                        }}
                    >
                        &gt;
          </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: -18,
                            color: "blue",
                            marginLeft: 50,
                            width: 320,
                        }}
                    >
                        <TouchableOpacity onPress={this.Answer3}>
                            <Text style={{ fontWeight: "bold", width: 300, marginTop: -15, color: "blue" }}>{this.state.LName3}</Text>
                            <Text id="demo3" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <TouchableOpacity onPress={this.Help2}>
                        <Text style={{ color: "#3BEE20", fontSize: 16, marginLeft: 50, marginTop: 30 }}>BROWSE ALL FAQS</Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: -2100,
                        color: "#E912E9",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: -70,
                    }}
                >


                    <Text style={{ fontSize: 18, marginLeft: 120, marginTop: 450, color: "#ff00ff", fontWeight: "bold" }}>EMERGANCY CONTACTS SPAIN</Text>

                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${112}`)}>
                        <Text style={{ paddingTop: 20, paddingLeft: 120, color: "black", fontWeight: "bold" }}>
                            112
          </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${+34902102112}`)}>
                        <Text style={{ paddingTop: 20, paddingLeft: 120, color: "black", fontWeight: "bold" }}>
                            +34 902 102 112
          </Text>
                    </TouchableOpacity>
                </ScrollView>
                <ScrollView
                    style={{
                        paddingTop: 30,
                        color: "#E912E9",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: 50,
                        marginBottom: 50
                    }}
                >
                    <Text style={{ fontSize: 18, marginLeft: 0, color: "#ff00ff", fontWeight: "bold" }}>CONTACT FLY-FOOT</Text>
                    <TouchableOpacity onPress={() => Linking.openURL(`tel:${+9112341234}`)}>
                        <Text style={{ paddingTop: 20, paddingLeft: 0, color: "black", fontWeight: "bold" }}>
                            + 91 1234 1234
          </Text>
                    </TouchableOpacity>
                    <Text style={{ paddingTop: 20, paddingLeft: 0, color: "black", fontWeight: "bold" }}>
                        help@fly-foot.com
          </Text>
                </ScrollView>
                <Chat />
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1200,
        marginLeft: 0,
        marginTop: 0,
        width: 800,
        marginBottom: 0,
    },
});
