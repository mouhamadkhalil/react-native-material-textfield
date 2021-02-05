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
import DownArrow from "../../assets/Images_Design/arrow_down.png";
import UpArrow from "../../assets/Images_Design/arrow_up.png";
import Location from "../../assets/Images_Design/location1.png";
import Fork from "../../assets/Images_Design/fork.png";

const sourceFile = require('../../helpers/services.js');

export default class Eticket extends React.Component {

    state = {
    };




    render() {
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
