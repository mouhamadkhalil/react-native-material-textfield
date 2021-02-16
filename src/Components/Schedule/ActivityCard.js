import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity,
    ActivityIndicator
} from "react-native";
import R from "res/R";

export default class ActivityCard extends React.Component {

    state = {
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={{ color: "#4c0099", fontSize: 65, marginLeft: 135, marginTop: 40 }}>
                    GAME DAY
                </Text>
                <Text style={{ marginLeft: 230, fontSize: 20, color: "#4c0099", marginTop: 30 }}>Chance of rain,</Text>
                <Text style={{ marginLeft: 180, fontSize: 20, color: "#4c0099" }}>don't forget  your umbrella!</Text>
                <TouchableOpacity >
                    <View style={{ backgroundColor: "white", height: 85, width: 305, marginLeft: 140, marginTop: 30 }}>
                        <View style={{ backgroundColor: "#31CB02", marginLeft: 0, width: 10, height: 85 }}></View>
                        <Text style={{ marginTop: -80, marginLeft: 50, color: "#96A0DA" }}>10:30</Text>
                        <Text style={{ marginTop: -20, marginLeft: 100, color: "purple", fontSize: 16 }}>Barcelona - Chelsea</Text>
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: 10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Camp Nou, Barcelona</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WhereToEat')}>
                    <View style={{ marginTop: 60, marginLeft: 140 }}>
                        <Text style={{ marginTop: -30, marginLeft: 100, color: "#96A0DA", fontSize: 16 }}>Lunch Time</Text>
                        <Image source={R.images.fork} style={{ marginLeft: 40, width: 40, height: 40, marginTop: -20 }} />
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: -10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Camp Nou, Barcelona</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('WhatToDo')}>
                    <View style={{ backgroundColor: "white", height: 85, width: 305, marginLeft: 140, marginTop: 30 }}>
                        <View style={{ backgroundColor: "#374BBF", marginLeft: 0, width: 10, height: 85 }}></View>
                        <Text style={{ marginTop: -80, marginLeft: 50, color: "#96A0DA" }}>16:30</Text>
                        <Text style={{ marginTop: -20, marginLeft: 100, color: "purple", fontSize: 16 }}>Picasso Museum</Text>
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: 10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Carrer Montcada, 15-23,08003</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('sagrada')} >
                    <View style={{ backgroundColor: "white", height: 85, width: 305, marginLeft: 140, marginTop: 30 }}>
                        <View style={{ backgroundColor: "#DA353D", marginLeft: 0, width: 10, height: 85 }}></View>
                        <Text style={{ marginTop: -80, marginLeft: 50, color: "#96A0DA" }}>20:00</Text>
                        <Text style={{ marginTop: -20, marginLeft: 100, color: "purple", fontSize: 16 }}>Dinner at Rao</Text>
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: 10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Carrer de les Sitges, 3</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('nightlife')}>
                    <View style={{ backgroundColor: "white", height: 85, width: 305, marginLeft: 140, marginTop: 30 }}>
                        <View style={{ backgroundColor: "#374BBF", marginLeft: 0, width: 10, height: 85 }}></View>
                        <Text style={{ marginTop: -80, marginLeft: 50, color: "#96A0DA" }}>22:00</Text>
                        <Text style={{ marginTop: -20, marginLeft: 100, color: "purple", fontSize: 16 }}>Chambawamba concert</Text>
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: 10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Sala apollo</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('eticket')}>
                    <View style={{ backgroundColor: "white", height: 85, width: 305, marginLeft: 140, marginTop: 30 }}>
                        <View style={{ backgroundColor: "#374BBF", marginLeft: 0, width: 10, height: 85 }}></View>
                        <Text style={{ marginTop: -80, marginLeft: 50, color: "#96A0DA" }}>22:00</Text>
                        <Text style={{ marginTop: -20, marginLeft: 100, color: "purple", fontSize: 16 }}>E Ticket</Text>
                        <Image source={R.images.location} style={{ marginLeft: 100, width: 15, height: 15, marginTop: 10 }} />
                        <Text style={{ marginTop: -16, marginLeft: 125, color: "blue", fontSize: 11 }}>Sala apollo</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={R.images.arrow_down} style={{ marginLeft: 285, width: 20, height: 20, marginTop: 20 }} />
                </TouchableOpacity>



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
        marginBottom: 30,
        backgroundColor: "#F5F7EC",
    },
});
