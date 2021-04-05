import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, } from "react-native";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { TripDetails } from "components/Trips/TripDetails";
import { SeatingOptions } from "components/Trips/SeatingOptions";
import { Perks } from "components/Trips/Perks";
import FlightItem from "components/Flights/FlightItem";
import { formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import R from "res/R";

export default class SummaryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: props?.route?.params?.bundle,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: [],
        };
    }

    componentDidMount() {
        try {
            this.initBundle();
        } catch { }
    }

    initBundle = () => {
        const [details, game, hotel, seating, perks] = formatBundle(this.state.bundle);
        this.setState({ details, game, hotel, seating, perks, isLoading: false })
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        this.props.navigation.navigate('checkoutFanInfo', { bundle: this.state.bundle });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('summary')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                {/* booking summary */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('bookingSummary')}
                </Text>
                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                {/* trip details + hotel */}
                                <TripDetails details={this.state.details} game={this.state.game} hotel={this.state.hotel} />

                                {/* seating options */}
                                <SeatingOptions details={this.state.details} game={this.state.game} seating={this.state.seating} />

                                {/* perks */}
                                <Perks perks={this.state.perks} />
                            </View>

                            {/* buttons */}
                            <View style={{ height: 60, marginStart: 15, marginEnd: 15, flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <TouchableHighlight style={R.styles.blackButton}
                                    onPress={this.goBack}>
                                    <Text style={{ fontWeight: "bold", color: "#fff", textTransform: 'uppercase' }}>
                                        {translate('back')}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={R.styles.greenButton}
                                    onPress={this.continue}>
                                    <Text style={{ fontWeight: "bold", textTransform: 'uppercase' }}>
                                        {translate('checkout')}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </>
                    }
                </View>

                {/* flight summary */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('flightSummary')}
                </Text>
                <FlightItem item={this.state.bundle.SelectedFlight} index={0} sessionId={this.state.bundle?.flightSession}  />

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#eeeeee",
    }
});
