import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Chat from "../../helpers/chat";

const sourceFile = require('../../helpers/services.js');

export default class Help1Screen extends React.Component {

    Back = () => {
        this.props.navigation.navigate('Menu');
    };

    Help2 = () => {
        window.location = "help2";
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
        const url = `${API_URL}/mobile/about/faq`;

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
                    <TouchableOpacity onPress={this.Back} style={{ width: 100 }}>
                        <Text style={{ fontSize: 35, color: "yellow", marginLeft: 10, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
                    </TouchableOpacity>
                    <Text
                        style={{
                            color: "white",
                            fontSize: 20,
                            fontWeight: "bold",
                            textAlign: "center",
                            marginTop: -30,
                            marginLeft: -30
                        }}
                    >
                        FAQ'S
          </Text>
                </ScrollView>
                <ScrollView style={{ width: "50%", height: 1500, backgroundColor: "#F7EEE8" }}>
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
                            marginTop: 10,
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
                            width: 150,
                        }}
                    >
                        <TouchableOpacity onPress={this.Answer0}>
                            <Text style={{ width: 310, marginTop: -10, fontWeight: "bold", color: "blue" }}>{this.state.LName0}</Text>
                            <Text id="demo" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: 5,
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
                            marginTop: 10,
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
                            marginTop: 10,
                            fontSize: 30
                        }}
                    >
                        &gt;
          </Text>
                    <Text style={{ marginLeft: 85 }}>
                        {this.state.isDone ? console.log("Component is Ready!") : <ActivityIndicator size="large"
                            color="blue" style={{ width: 200, marginTop: 0, marginLeft: 0 }}
                        />}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            marginTop: -30,
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
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: 10,
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
                            <Text style={{ fontWeight: "bold", width: 300, marginTop: -15, color: "blue" }}>{this.state.LName4}</Text>
                            <Text id="demo3" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: 10,
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
                            <Text style={{ fontWeight: "bold", width: 300, marginTop: -15, color: "blue" }}>{this.state.LName5}</Text>
                            <Text id="demo3" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        style={{
                            color: "pink",
                            fontWeight: "bold",
                            paddingLeft: 20,
                            marginTop: 10,
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
                            <Text style={{ fontWeight: "bold", width: 300, marginTop: -15, color: "blue" }}>{this.state.LName6}</Text>
                            <Text id="demo3" style={{ color: "black" }}></Text>
                        </TouchableOpacity>
                    </Text>
                    <Text
                        style={{
                            marginBottom: 100,
                            fontSize: 16,
                            paddingTop: 20,
                            color: "#61E912",
                            marginLeft: 50,
                        }}
                    >
                    </Text>
                </ScrollView>
                <ScrollView
                    style={{
                        marginTop: -830,
                        color: "#E912E9",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: -140,
                    }}
                >
                </ScrollView>
                <ScrollView
                    style={{
                        paddingTop: 30,
                        color: "#E912E9",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginLeft: -198,
                    }}
                >
                </ScrollView>
                <Chat />
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1300,
        marginLeft: 0,
        marginTop: 0,
        width: 800,
        marginBottom: 0,
    },
});
