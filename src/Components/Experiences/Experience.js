import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { translate } from "helpers/utils.js";
import Moment from 'moment';
import R from "res/R";

const Experience = ({ item }) => {
    return (<View style={{ marginTop: 20, backgroundColor: 'white', elevation: 5, padding: 20 }}>
        <Text style={{ color: 'grey', textTransform: 'uppercase' }}>
            {item.ServiceCategory}
        </Text>
        <Text style={{ color: R.colors.blue, fontSize: 18 }}>
            {item.ServiceName}
        </Text>
        <Image source={{uri:item.ImageReference}} style={{ width: '100%', height: 300, resizeMode: 'cover' }} />
        <Text style={{ color: 'grey' }}>
            {item.Description}
        </Text>
    </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFF",
        marginTop: 30,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    greenButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '100%',
        backgroundColor: R.colors.lightGreen
    }
});

export default Experience;