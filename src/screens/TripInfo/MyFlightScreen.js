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
import FlightItem from "components/Flights/FlightItem";
import { translate } from "helpers/utils";
import R from "res/R";

export default class MyFlightScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFlight: null,
            contacts: [],
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
        var selectedFlight = this.props.route.params.data[0];
        var contacts = this.props?.route?.params?.data[1];
        this.setState({ selectedFlight, contacts, isLoading: false });
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
        return "passenger-" + index;
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
                                {translate('bookingDetails')}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={styles.referenceStart}>
                                    {translate('reference')}
                                </Text>
                                <Text style={styles.referenceEnd}>
                                    jez1209
                                </Text>
                            </View>
                            <View style={styles.divisionBorder}>
                                <View style={styles.divisionStart}>
                                    <Text style={styles.img}>img</Text>
                                    <Text style={styles.info}>economy class</Text>
                                </View>
                                <View style={styles.divisionEnd}>
                                    <Text style={styles.img}>img</Text>
                                    <Text style={styles.info}>20 kg Luggage</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.division}>
                            <Text style={styles.title}>
                                {translate('passengers')}
                            </Text>
                            <FlatList
                                data={this.state.contacts}
                                renderItem={this.renderItem}
                                keyExtractor={this.keyExtractor}
                                getItemLayout={(data, index) => (
                                    { length: 60, offset: 60 * index, index }
                                )}
                                horizontal={false}
                                numColumns={2} />
                        </View>
                        {this.state.selectedFlight != null ?
                            <FlightItem item={this.state.selectedFlight} price={0} index={0} sessionId={this.state.flightSession} isSummary={true} />
                            : null
                        }
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
        borderTopColor: 'gray'
    },
    divisionStart: {
        flexDirection: 'row',
        width: '50%',
        padding: 15
    },
    divisionEnd: {
        borderStartWidth: 0.5,
        flexDirection: 'row',
        width: '50%',
        padding: 15
    },
    title: {
        color: R.colors.blue,
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    referenceStart: {
        width: '50%',
        color: 'gray',
        textTransform: 'uppercase',
        padding: 15,
        paddingTop: 0
    },
    referenceEnd: {
        width: '50%',
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18,
        paddingTop: 0
    },
    img: {

    },
    info: {
        paddingStart: 10,
        color: R.colors.blue
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