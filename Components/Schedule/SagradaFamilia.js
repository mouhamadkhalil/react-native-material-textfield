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

const sourceFile = require('../../services.js');

export default class SagradaFamilia extends React.Component {

    state = {
    };

  

    render() {
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
                <Text style={{ color: "#999999", marginLeft: 170, fontWeight: "bold", fontSize: 25, marginTop: 40 }}>TIME</Text>
                <Text style={{ marginLeft: 150, color: "white", marginTop: 10 }}>09:30 - 16:30</Text>
                <Text style={{ color: "#999999", marginLeft: 350, fontWeight: "bold", fontSize: 25, marginTop: -63 }}>PRICE</Text>
                <Text style={{ marginLeft: 350, color: "white", marginTop: 10 }}>Free</Text>
                <Text style={{ color: "#999999", marginLeft: 170, fontWeight: "bold", fontSize: 25, marginTop: 60 }}>SCHEDULE</Text>
                <Text style={{ marginLeft: 150, color: "white", marginTop: 60 }}>09:30</Text>
                <Text style={{ marginLeft: 240, color: "white", marginTop: -20 }}>Parallel Metro Station meeting</Text>
                <Text style={{ marginLeft: 150, color: "white", marginTop: 30 }}>10:30</Text>
                <Text style={{ marginLeft: 240, color: "white", marginTop: -20 }}>Sagrada familia Tour</Text>
                <Text style={{ marginLeft: 150, color: "white", marginTop: 30 }}>13:30</Text>
                <Text style={{ marginLeft: 240, color: "white", marginTop: -19 }}>5D5</Text>
                <Text style={{ color: "#999999", marginLeft: 170, fontWeight: "bold", fontSize: 25, marginTop: 40 }}>INCLUDED</Text>
                <Text style={{ marginLeft: 150, color: "white", marginTop: 10 }}>Metro ticket, comfy shoes, smile</Text>
                <View style={{ marginLeft: 220, marginTop: 30, width: 150, marginBottom: 30 }}>
                    <Button
                        onPress={this.Buy}
                        title="BUY"
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
        backgroundColor: "#8B22AC",
    },
});
