import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

export default class WhereToEat extends React.Component {

    state = {
    };

    render() {
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>

                <Text style={{ fontSize: 45, color: "white", marginLeft: 145, marginTop: 30 }}>Where to eat</Text>
                <Text style={{ fontSize: 17, color: "white", marginLeft: 230, marginTop: 5, fontWeight: "bold" }}>IN BARCELONA </Text>
                <Text style={{ fontSize: 15, color: "white", marginLeft: 150, width: 310, marginTop: 10 }}>Liq
                uorrice pudding jelly caramels cheesecake tart. Carrot cake jujubes muffin cake pie. </Text>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('restaurant')}>
                    <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 50 }}>INTERNATIONAL FOOD</Text>
                </TouchableOpacity>



                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>TYPICAL RESTAURANT</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>VEGETARAIAN / VEGAN</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>HALLAL</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>CAFES</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>SHISHA BAR</Text>

                {/* carousal  */}

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
