import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView
} from "react-native";
import Map from "components/TripInfo/Map";
import { translate } from "helpers/utils";
import Moment from 'moment';
import R from "res/R";

export default class MyGameScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            match: null,
            isLoading: true
        }
    }

    componentDidMount() {
        try {
            this.init();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    init = () => {
        var match = this.props.route.params.data;
        this.setState({ match, isLoading: false });
    }

    renderItem = ({ item, index }) => {
        return (
            <View style={[styles.passengerItem, index % 2 == 0 ? {} : { borderStartWidth: 0.5, paddingStart: 15 }]}>
                <Text style={styles.passengerTitle}>
                    {translate('passenger') + " " + (index + 1)}
                </Text>
                <Text style={styles.passengerName}>
                    {item.FirstName + " " + item.LastName}
                </Text>
            </View>
        )
    }

    keyExtractor = (item, index) => {
        return "ticket-" + index;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator color='blue' size='large' />
                    :
                    <ScrollView>
                        <View style={styles.division}>
                            <Text style={styles.title}>
                                {translate('ticketDetails')}
                            </Text>
                            <View style={styles.row}>
                                <Text style={styles.teamsStart}>
                                    {translate('teams')}
                                </Text>
                                <View style={styles.teamsEnd}>
                                    <Text style={styles.bold}>
                                        {this.state.match.Game.HomeTeamShortName + " vs " + this.state.match.Game.AwayTeamShortName}
                                    </Text>
                                </View>
                            </View>
                            <View style={styles.divisionBorder}>
                                <View style={styles.divisionStart}>
                                    <Text style={styles.greyText}>Game start</Text>
                                    <Text>{Moment(this.state.match.Game.GameDate).format('HH:mm')}h</Text>
                                </View>
                                <View style={styles.divisionEnd}>
                                    <Text style={styles.greyText}>Arrival</Text>
                                    <Text>match.Game.Arrival</Text>
                                </View>
                            </View>
                            <View style={styles.padding}>
                                <Text style={styles.greyText}>Location</Text>
                                <Text>{this.state.match.Game.Stade}</Text>
                            </View>
                        </View>
                        <Map></Map>
                    </ScrollView>
                }
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        margin: 15
    },
    division: {
        backgroundColor: '#fff',
        marginBottom: 15,
    },
    divisionBorder: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        borderTopColor: 'gray',
        borderBottomWidth: 0.5,
        borderBottomColor: 'gray'
    },
    divisionStart: {
        width: '50%',
        padding: 15
    },
    divisionEnd: {
        borderStartWidth: 0.5,
        width: '50%',
        padding: 15
    },
    row: {
        flexDirection: 'row',
    },
    title: {
        color: R.colors.blue,
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    teamsStart: {
        width: '20%',
        color: 'grey',
        textTransform: 'uppercase',
        padding: 15,
        paddingTop: 0
    },
    teamsEnd: {
        width: '80%',
        padding: 15,
        paddingTop: 0,
        alignItems: 'flex-end',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    img: {

    },
    info: {

    },
    greyText: {
        color: 'grey',
        textTransform: 'uppercase'
    },
    padding:{
        padding:15
    },
    passengerItem: {
        width: "50%",
        height: 60,
        paddingStart: 15,
        paddingEnd: 15,
    },
    passengerTitle: {
        color: 'gray',
        textTransform: 'uppercase',
        marginBottom: 5
    },
    passengerName: {
        fontSize: 18
    }

});