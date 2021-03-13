import React from 'react';
import { StyleSheet, View, Image, Text } from "react-native";
import R from "res/R";

const PerkItem = ({ item, height }) => {
    return (
        <View style={[styles.perk, { height: height }]}>
            <Image source={item.Selected ? item.Image : item.ImageGrey} style={styles.perkImage} />
            <Text style={[styles.perkLabel, { color: item.Selected ? R.colors.blue : "#ddd" }]}>
                {item.Title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    perk: {
        width:"50%",
        alignItems: "center"
    },
    perkImage: {
        width: 44,
        height: 44,
        resizeMode: 'contain'
    },
    perkLabel: {
        fontSize: 13,
        marginTop: 15
    }
})

export default PerkItem;