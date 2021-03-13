import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import moment from 'moment';
import R from "res/R";

const MatchHeaderItem = ({ item }) => {
    return (
        <View style={{ flexDirection: "row" }}>
            {/* teams */}
            <View style={{ width: "50%", padding: 20 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <LinearGradient
                        colors={[item.Game?.Team1Color1, item.Game?.Team1Color2]}
                        style={R.styles.linearGradient}
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.5, 0.5]}
                    />
                    <Text style={[styles.blueText, { marginStart: 10 }]}>
                        {item.Game?.HomeTeam}
                    </Text>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <LinearGradient
                        colors={[item.Game?.Team2Color1, item.Game?.Team2Color2]}
                        style={R.styles.linearGradient}
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.5, 0.5]}
                    />
                    <Text style={[styles.blueText, { marginStart: 10 }]}>
                        {item.Game?.AwayTeam}
                    </Text>
                </View>
            </View>

            {/* game date */}
            <Text style={[styles.blueText, { width: "50%", padding: 20 }]}>
                {moment(item.Game?.GameDate).format('DD.MM.YY')}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
});
export default MatchHeaderItem;