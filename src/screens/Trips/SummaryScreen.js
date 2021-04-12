import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, Modal, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { TripDetails } from "components/Trips/TripDetails";
import { SeatingOptions } from "components/Trips/SeatingOptions";
import { Perks } from "components/Trips/Perks";
import FlightItem from "components/Flights/FlightItem";
import Experience from "components/Experiences/Experience";
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
            experience: null,
            isShowMoreInfo: false,
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

    showMoreInfo = (item) => {
        this.setState({ isShowMoreInfo: true, experience: item })
    }

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
                                <TripDetails details={this.state.details} game={this.state.game} hotel={this.state.hotel} matchBundleHotels={this.state.bundle?.MatchBundleHotels} />

                                {/* seating options */}
                                {this.state.bundle?.MatchBundleDetail.map((matchBundle) => {
                                    return <SeatingOptions key={"seat-" + matchBundle.idMatchBundleDetail}
                                        details={this.state.details} game={matchBundle.Game} seating={matchBundle.GameSeat} />
                                })}
                                {/* perks */}
                                <Perks perks={this.state.perks} />
                            </View>

                            {/* flight summary */}
                            {this.state.bundle.NoFlight ? null :
                                <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                    <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                                        {translate('flightSummary')}
                                    </Text>
                                    <FlightItem item={this.state.bundle.SelectedFlight} price={this.state.bundle.FlightExtraPricePerFan} index={0} sessionId={this.state.bundle?.flightSession} isSummary={true} />
                                </View>
                            }

                            {/* experiences summary */}
                            {this.state.bundle.ExtraServices != null && this.state.bundle.ExtraServices.filter((service) => service.isAdded == true).length > 0 ?

                                <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                    <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                                        {translate('experiences')}
                                    </Text>
                                    {this.state.bundle.ExtraServices.map((item) => {
                                        return (<Experience key={"exp-" + item.idExtraService} details={this.state.details} item={item} showMoreInfo={this.showMoreInfo} isSummary={true} />)
                                    })}
                                </View>
                                : null
                            }

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
                <Modal visible={this.state.isShowMoreInfo} transparent={true}
                    onRequestClose={() => this.setState({ isShowMoreInfo: false })}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '10%', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                            <View style={{ width: '80%', height: '100%', padding: 10 }}>
                                <Image source={R.images.flyfoot_grey}></Image>
                            </View>
                            <View style={{ width: '20%', height: '100%', backgroundColor: '#000', alignContent: 'center', justifyContent: 'center' }}>
                                <TouchableHighlight onPress={() => { this.setState({ isShowMoreInfo: false }); }}>
                                    <Icon name='close-outline' style={styles.close} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: '90%', backgroundColor: '#fff' }}>
                            <Text style={{ color: 'grey', textTransform: 'uppercase' }}>
                                {this.state.experience?.ServiceCategory}
                            </Text>
                            <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                                {this.state.experience?.ServiceName}
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                {this.state.experience?.Description}
                            </Text>
                        </View>
                    </View>
                </Modal>
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
