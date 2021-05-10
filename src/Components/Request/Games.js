import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export class Games extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        if (!this.props.matches)
            return null;
        return (
            this.props.matches?.map((match, index) =>
                <View key={"game-" + index}>
                    <Text style={styles.title}>
                        {translate('game') + " " + (index + 1)}
                    </Text>
                    <View style={styles.container}>
                        <View style={styles.date}>
                            <Text style={styles.day}>
                                {moment(new Date(match.Game.GameDate)).format('DD')}
                            </Text>
                            <Text style={styles.month}>
                                {moment(new Date(match.Game.GameDate)).format('MMM').toUpperCase()}
                            </Text>
                        </View>
                        <View style={{ padding: 15, justifyContent: "center" }}>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <LinearGradient
                                    colors={[match.Game.Team1Color1, match.Game.Team1Color2]}
                                    style={R.styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={styles.team}>
                                    {match.Game.HomeTeam}
                                </Text>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center" }}>
                                <LinearGradient
                                    colors={[match.Game.Team2Color1, match.Game.Team2Color2]}
                                    style={R.styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={styles.team}>
                                    {match.Game.AwayTeam}
                                </Text>
                            </View>
                            <Text style={styles.leagueName}>
                                {match.Game.LeagueName}
                            </Text>
                            <Text style={styles.city}>
                                {match.Game.City}
                            </Text>
                        </View>
                    </View>
                </View>
            )
        )
    }
}

const styles = StyleSheet.create({
    title: {
        fontSize: 19.25,
        color: "gray",
        fontWeight: "bold",
        marginTop: 15,
        marginBottom: 15
    },
    date: {
        padding: 15,
        alignItems: "center",
        width: 100,
        borderRightWidth: 1,
        borderRightColor: "#eee"
    },
    container: {
        backgroundColor: "white",
        flexDirection: "row"
    },
    day: {
        fontSize: 44,
        fontWeight: "bold"
    },
    month: {
        fontSize: 21,
        fontWeight: "bold"
    },
    team: {
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 10
    },
    leagueName: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 5,
        textTransform: "uppercase"
    },
    city: {
        fontSize: 12,
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});