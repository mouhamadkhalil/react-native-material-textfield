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

export default class Restaurant extends React.Component {

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
                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, fontSize: 20, marginTop: 70 }}>Monday - Saturday </Text>
                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, fontSize: 14, marginTop: 10 }}>12:00 - 15:00 | 19:30 - 23:00
                </Text>
                <Text style={{ color: "#76FF02", marginLeft: 380, marginTop: -18 }}>OPEN NOW </Text>
                <Text style={{ color: "white", marginLeft: 150, marginTop: 30, width: 300, fontSize: 16 }}>Liquorice pudding jelly caramels heesecake
                tart. Carrot cake jujubes muffin cake pie.
                heesecaketart Liquorice pudding jellycaramels carrot.
                </Text>
                <Text style={{ color: "#999999", marginLeft: 150, fontWeight: "bold", fontSize: 25, marginTop: 40 }}>RATING</Text>
                <Text style={{ color: "#999999", marginLeft: 330, fontWeight: "bold", fontSize: 25, marginTop: -33 }}>PRICE</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 60 }}>Carrer de la Duquessa d’Orleans, 56</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>+34 932 05 09 61</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>info@bellanapoli.com</Text>
                <Text style={{ marginLeft: 170, color: "white", marginTop: 15 }}>www.bellanapoli.com</Text>
                <TouchableOpacity style={{ marginLeft: 370, marginTop: 0 }} onPress={() => {
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
        backgroundColor: "#FF6310",
    },
});
