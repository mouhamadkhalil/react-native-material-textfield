import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import R from "res/R";

export class Game extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        var match = this.props.match;
        return (
            <View style={styles.container}>
                <View style={styles.date}>
                    <Text style={styles.day}>
                        {moment(new Date(match.Game.GameDate)).format('DD')}
                    </Text>
                    <Text style={styles.month}>
                        {moment(new Date(match.Game.GameDate)).format('MMM').toUpperCase()}
                    </Text>
                </View>
                <View style={{ padding: 15 }}>
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
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    date: {
        padding: 5,
        alignItems: "center",
        width: 100,
        borderEndWidth: 1,
        borderEndColor: "#eee"
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
        marginStart: 10
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