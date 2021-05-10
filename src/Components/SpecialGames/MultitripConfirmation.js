import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    ToastAndroid,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';
import Chat from "../FanChat/chat";
import R from "res/R";
import { get, post } from "../../helpers/services.js";


export default class MultitripConfirmation extends React.Component {

    state = {
        isDone: false,
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <View>
                    <Image source={R.images.all_games_bg} style={{ width: '100%' }} />
                    <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginLeft: 80, marginTop: -30 }} >Thank You!</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 160, marginTop: 40 }}>Your request has successfully been made.</Text>
                <Text style={{ marginLeft: 210, marginTop: 10 }}> We will be in touch shortly.</Text>
                <TouchableOpacity style={{ marginLeft: 220, marginTop: 50, backgroundColor: "black", width: 150, height: 50 }} onPress={() => this.props.navigation.navigate('book a trip')}>
                    <Text style={{ textTransform: 'uppercase', color: "white", paddingLeft: 40, paddingTop: 15, fontWeight: "bold" }}>Back home</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 120, marginLeft: 100 }}>
                    <Chat />
                </View>
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
    },
});