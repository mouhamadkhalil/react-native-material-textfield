import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
import Chat from "../../assets/Images_Design/chat1.png";
import AwesomeAlert from "react-native-awesome-alerts";
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import DownArrow from "../../assets/Images_Design/arrow_down.png";
import UpArrow from "../../assets/Images_Design/arrow_up.png";
import Location from "../../assets/Images_Design/location1.png";
import Fork from "../../assets/Images_Design/fork.png";

const sourceFile = require('../../services.js');

export default class NightLife extends React.Component {

    state = {
        showAlert: false,
    };

    showAlert = () => {
        this.setState({
            showAlert: true,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };

    renderCustomAlertView = () => {
        return (
            <>
                <View style={{ height: 200, width: 200 }}>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Messanger</Text>
                        <Image source={Messanger} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Whatsapp</Text>
                        <Image source={Whatsapp} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Feedback</Text>
                        <Image source={Feedback} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                </View>
            </>
        );
    };

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>

                <Text style={{ fontSize: 45, color: "white", marginLeft: 200, marginTop: 30 }}>Night life</Text>
                <Text style={{ fontSize: 17, color: "white", marginLeft: 230, marginTop: 5, fontWeight: "bold" }}>IN BARCELONA </Text>

                <Text style={{ fontSize: 15, color: "white", marginLeft: 150, width: 310, marginTop: 10 }}>Liq
                uorrice pudding jelly caramels cheesecake </Text>

                <Text style={{ fontSize: 15, color: "white", marginLeft: 170, width: 310, marginTop: 10 }}>tart. Carrot cake jujubes muffin cake pie. </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('nightlife1')}>
                    <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 50 }}>BARS</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>CLUBS</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>LIVE MUSIC</Text>

                {/* carousal  */}

                <TouchableOpacity style={{ marginLeft: 370, marginTop: 80 }} onPress={() => {
                    this.showAlert();
                }}>
                    <Image source={Chat} style={{ width: 100, height: 100, marginTop: 10 }} />
                </TouchableOpacity>
                <View>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="CHAT WITH US ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}
                    />
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1400,
        marginLeft: -110,
        width: 500,
        marginTop: 0,
        backgroundColor: "#031892",
    },
});
