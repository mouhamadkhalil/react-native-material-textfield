import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { CheckBox } from 'react-native-elements';
import moment from 'moment';
import R from "res/R";

const OtherMatchHeader = ({ item, index, selectMatch }) => {
    var selected = item.Selected, container = styles.container, checkbox = styles.checkbox,
        teamName = styles.teamName, date = styles.date, stadeCity = styles.stadeCity;
    if (selected) {
        container = styles.containerActive;
        checkbox = styles.checkboxActive;
        teamName = styles.teamNameActive;
        date = styles.dateActive;
        stadeCity = styles.stadeCityActive;
    }
    return (
        <TouchableOpacity style={container} onPress={() => { selectMatch(index) }}>
            <View style={[R.styles.flexRow, styles.teamsContainer]}>
                <CheckBox
                    containerStyle={checkbox}
                    checkedColor='white'
                    textStyle={{ color: 'white' }}
                    onPress={() => selectMatch(index)}
                    checked={selected} />
                <View style={{ width: "50%", padding: 20 }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <LinearGradient
                            colors={[item.Team1Color1, item.Team1Color2]}
                            style={R.styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={teamName}>
                            {item.HomeTeam}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <LinearGradient
                            colors={[item.Team2Color1, item.Team2Color2]}
                            style={R.styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={teamName}>
                            {item.AwayTeam}
                        </Text>
                    </View>
                </View>
                <Text style={date}>
                    {moment(item.GameDate).format('DD.MM.YY')}
                </Text>
            </View>
            <View style={R.styles.flexRow}>
                <View style={styles.cell}></View>
                <View style={styles.cell}>
                    <Text style={stadeCity}>
                        {item.StadeCity}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: R.colors.lightGrey
    },
    containerActive: {
        backgroundColor: R.colors.blue
    },
    teamsContainer:
    {
        alignItems: 'center',
        padding: 20
    },
    checkbox:
    {
        backgroundColor: R.colors.lightGrey,
        borderWidth: 0
    },
    checkboxActive:
    {
        backgroundColor: R.colors.blue,
        borderWidth: 0
    },
    teamName:
    {
        color: R.colors.blue,
        marginStart: 10
    },
    teamNameActive:
    {
        color: 'white',
        marginStart: 10
    },
    date:
    {
        color: R.colors.blue
    },
    dateActive:
    {
        color: 'white'
    },
    cell:
    {
        width: '50%',
        borderWidth: 2,
        borderColor: 'white'
    },
    stadeCity:
    {
        color: 'black',
        textTransform: 'uppercase',
        padding: 20
    },
    stadeCityActive:
    {
        color: 'white',
        textTransform: 'uppercase',
        padding: 20
    }
});

export default OtherMatchHeader;