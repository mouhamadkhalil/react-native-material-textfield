import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "helpers/utils.js";
import R from "res/R";

const MatchItem = ({ item, height }) => {
    const navigation = useNavigation();
    const navigate = () => {
        if(item.Price != null  && item.Price > 0)
         navigation.navigate('tripoverview', { bundleCode: item.GameCode }) ;
         else navigation.navigate('request', { bundleCode: item.GameCode });
    }

    return (
        <TouchableOpacity style={[R.styles.flexColumn, styles.container, { height: height }]}
            onPress={navigate}>
            {/* home team */}
            <View style={[R.styles.flexRow, styles.team]}>
                <LinearGradient
                    colors={[item.Team1Color1, item.Team1Color2]}
                    style={R.styles.linearGradient}
                    start={[0, 0]}
                    end={[1, 0]}
                    locations={[0.5, 0.5]}
                />
                <Text style={styles.teamName}>
                    {item.HomeTeamShortName}
                </Text>
            </View>
            {/* away team */}
            <View style={[R.styles.flexRow, styles.team]}>
                <LinearGradient
                    colors={[item.Team2Color1, item.Team2Color2]}
                    style={R.styles.linearGradient}
                    start={[0, 0]}
                    end={[1, 0]}
                    locations={[0.5, 0.5]}
                />
                <Text style={styles.teamName}>
                    {item.AwayTeamShortName}
                </Text>
            </View>
            <Text>{item.LeagueName}</Text>
            <Text style={{ width: '80%' }}>{item.City + ", " + item.Stade}</Text>
            <Text style={styles.viewMatch}>{translate('viewMatch')}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '50%',
        marginTop: 30
    },
    team: {
        alignItems: 'center'
    },
    teamName:
    {
        fontSize: 18,
        fontWeight: "bold",
        textTransform: 'uppercase',
        paddingStart: 5
    },
    viewMatch: {
        marginTop: 10,
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: R.colors.grey
    }
})

export default MatchItem;