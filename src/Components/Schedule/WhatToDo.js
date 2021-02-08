import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";

export default class WhatToDo extends React.Component {

    state = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                <Text style={{ fontSize: 45, color: "white", marginLeft: 145, marginTop: 30 }}>WHAT TO DO</Text>
                <Text style={{ fontSize: 17, color: "white", marginLeft: 230, marginTop: 5, fontWeight: "bold" }}>IN BARCELONA </Text>
                <Text style={{ fontSize: 15, color: "white", marginLeft: 150, width: 310, marginTop: 10 }}>Liq
                uorrice pudding jelly caramels cheesecake </Text>
                <Text style={{ fontSize: 15, color: "white", marginLeft: 170, width: 310, marginTop: 5 }}>tart. Carrot cake jujubes muffin cake pie. </Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('museum')}>
                    <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 50 }}>MUSEUMS</Text>
                </TouchableOpacity>

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>TOURS</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>MARKETS</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>OPEN AIR</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>SHOPPING</Text>

                {/* carousal  */}

                <Text style={{ fontWeight: "bold", color: "white", marginLeft: 150, marginTop: 250 }}>ACTIVITIES</Text>

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
        backgroundColor: "#8B22AC",
    },
});
