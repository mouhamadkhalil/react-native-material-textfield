import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Image,
    Button,
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

export default class Eticket extends React.Component {

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
                <Text style={{ marginTop: 70, marginLeft: 150, width: 280 }}>Liquorice pudding jelly caramels heesecake
                tart. Carrot cake jujubes muffin cake pie.
                Cheesecake tart. Carrot cake jujubes
                muffin cake pie liquorice</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>MATCH TIME</Text>
                <Text style={{ marginLeft: 150, marginTop: 10 }}>14:00 - 15:30</Text>
                <Text style={{ marginLeft: 150, color: "black", fontWeight: "bold", marginTop: 20, width: 230 }}>We suggest to arrive 2 hours before the match starts</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>STADIUM</Text>
                <Text style={{ marginLeft: 150, marginTop: 10 }}>Camp Nou</Text>
                <Text style={{ marginLeft: 150, marginTop: 10 }}>C. d’Aristides Maillol, 12, </Text>
                <Text style={{ marginLeft: 150, marginTop: 10 }}>08028 Barcelona </Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>HOW TO GET THERE</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 250 }}>Detailed to users accommodation and
                their seating. Liquorice pudding jelly
                caramels heesecake tart. Carrot cake jujubes
                muffin cake pie. Cheesecake tart.
                Carrot cake jujubes muffin</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>WEATHER</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 180 }}>Chance of rain, don’t forget your umbrella!</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>FACTS</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 270 }}>Liquorice pudding jelly caramels
                heesecake tart. Carrot cake jujubes
                muffin cake pie. Cheesecake tart.
                Carrot cake jujubes muffin</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>SONGS</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 270 }}>EL CANT DEL BARCA</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 270 }}>ALÉ ALÉ FORÇA BARCELONA ALÉ</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 270 }}>ANTHEM 3</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>HOW TO RETURN THE TICKET</Text>
                <Text style={{ marginLeft: 150, marginTop: 10, width: 270 }}>Liquorice pudding jelly caramels
                heesecake tart. Carrot cake jujubes
                muffin cake pie. Cheesecake tart.
                Carrot cake jujubes muffin</Text>
                <Text style={{ marginLeft: 170, fontWeight: "bold", color: "white", marginTop: 40, fontSize: 19 }}>YOUR TICKET</Text>
                <View style={{ marginLeft: 150, marginTop: 30, width: 280, marginBottom: 30 }}>
                    <Button
                        onPress={this.Game}
                        title="GAME TICKETS"
                        color="gray"
                    />
                </View>
                <TouchableOpacity style={{ marginLeft: 370, marginTop: -20 }} onPress={() => {
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
        backgroundColor: "#76FF02",
    },
});
