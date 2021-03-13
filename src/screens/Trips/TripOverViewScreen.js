import React from "react";
import { StyleSheet, Text, FlatList, View, TouchableHighlight, ActivityIndicator, SafeAreaView } from "react-native";
import { get, servicesUrl } from "helpers/services.js";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { TripDetails } from "components/Trips/TripDetails";
import { SeatingOptions } from "components/Trips/SeatingOptions";
import { Perks } from "components/Trips/Perks";
import { formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import R from "res/R";

export default class TripOverViewScreen extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundleCode: props?.route?.params?.bundleCode,
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
            this.init();
        } catch { }
    }

    init = () => {
        if (this.state.bundle == null)
            this.getBundle();
        else
            this.initBundle();
    }

    getBundle = () => {
        const params = `?customize=false&validateHotelPrice=false&hotelId=-1`;
        get(servicesUrl.getGameV2 + this.state.bundleCode + params)
            .then((response) => {
                this.initBundle({ ...response });
            });
    }

    initBundle = (bundle = null) => {
        if (bundle == null)
            bundle = { ...this.state.bundle };
        const [details, game, hotel, seating, perks] = formatBundle(bundle);
        this.setState({ bundle, details, game, hotel, seating, perks, isLoading: false })
    }

    customize = () => {
        this.props.navigation.navigate('customize', { bundleCode: this.state.bundleCode });
    };

    flight = () => {
        this.props.navigation.navigate('flight', { bundle: this.state.bundle });
    };

    keyExtractor = (item, index) => {
        return "part-" + index;
    }

    renderHeader = () => {
        return (
            <>
                {/* banner */}
                <HeaderBackground title={translate('tripOverview')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={this.state.bundle} />
            </>
        )
    }

    renderFooter = () => {
        return (
            <>
                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                    :
                    <>
                        {/* package details */}
                        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                            {translate('semiPackageDetails')}
                        </Text>

                        <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                            {/* trip details + hotel */}
                            <TripDetails details={this.state.details} game={this.state.game} hotel={this.state.hotel} />

                            {/* seating options */}
                            <SeatingOptions details={this.state.details} game={this.state.game} seating={this.state.seating} />

                            {/* perks */}
                            <Perks perks={this.state.perks} />
                        </View>

                        {/* buttons */}
                        <View style={{ marginStart: 15, marginEnd: 15, alignSelf: 'center', flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                            <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.blue, alignItems: "center", justifyContent: "center" }} onPress={this.customize}>
                                <Text style={{ fontWeight: "bold", color: "#fff", textTransform: 'uppercase' }}>
                                    {translate('customize')}
                                </Text>
                            </TouchableHighlight>
                            <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.lightGreen, alignItems: "center", justifyContent: "center" }} onPress={this.flight}>
                                <Text style={{ fontWeight: "bold", textTransform: 'uppercase' }}>
                                    {translate('selectFlight')}
                                </Text>
                            </TouchableHighlight>
                        </View>
                    </>
                }
            </>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={[]}
                    keyExtractor={this.keyExtractor}
                    renderItem={null}
                    ListHeaderComponent={this.renderHeader}
                    ListFooterComponent={this.renderFooter}
                />
            </SafeAreaView  >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
        flex: 1
    },
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    }
});
