import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import isEqual from "react-fast-compare";
import OtherMatchHeader from "components/CustomizeTrip/OtherMatchHeader";
import MatchHeaderItem from "components/Trips/MatchHeaderItem";
import { formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import R from "res/R";

export class MatchHeader extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            bundle: {},
            otherMatches: [],
            details: {},
            matches: [],
            hotel: {},
            seating: {},
            perks: [],
            hotelUpgrade: 0,
            ticketUpgrade: 0,
            perksUpgrade: 0,
            totalPerFan: 0,
            totalOnSpot: 0,
            total: 0,
            isButtonPressed: false,
            isOtherGameCollapse: true
        };
    }

    initBundle = (prevProps, prevState) => {
        const bundle = { ...this.props.bundle };
        const [details, game, hotel, seating, perks] = formatBundle(bundle);
        const matches = [...bundle.MatchBundleDetail];
        var otherMatches = bundle.OtherMatches;
        if (otherMatches != null) {
            otherMatches.forEach((match, index) => {
                var found = bundle.MatchBundleDetail?.findIndex(m => m.Game?.idMatch == match.idMatch) > 0
                otherMatches[index].Selected = found;
            });
        }

        var hotelUpgrade = this.state.hotelUpgrade, ticketUpgrade = this.state.ticketUpgrade,
            perksUpgrade = this.state.perksUpgrade;
        if (prevState.hotel != hotel) {
            hotelUpgrade = this.calculHotel(hotel);
        }
        if (!isEqual(prevProps.bundle?.MatchBundleDetail, matches)) {
            ticketUpgrade = this.calculTicket(matches);
        }
        if (!isEqual(prevState.perks, perks)) {
            perksUpgrade = this.calculPerks(perks);
        }

        const [totalPerFan, totalOnSpot, total] = this.calculTotals(details, hotelUpgrade, ticketUpgrade, perksUpgrade);

        this.setState({ bundle, details, hotel, perks, matches, otherMatches, hotelUpgrade, ticketUpgrade, perksUpgrade, totalPerFan, totalOnSpot, total })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bundle != this.props.bundle) {
            this.initBundle(prevProps, prevState);
        }
    }

    calculHotel = (hotel) => {
        if (hotel?.SelectedCategory != undefined) {
            var hotelUpgrade = hotel?.SelectedCategory?.ExtraCostPerFan;
            return hotelUpgrade;
        }
        return 0;
    }

    calculTicket = (matches) => {
        var ticketUpgrade = matches?.reduce((total, match) => total + match?.GameSeat?.ExtraCostPerFan, 0);
        return ticketUpgrade;
    }

    calculPerks = (perks) => {
        var selectedPerks = perks?.filter((perk, index) => perk.Selected == true && index > 1);
        var perksUpgrade = selectedPerks.reduce((total, perk) => total + perk?.Price, 0);
        return perksUpgrade;
    }

    calculTotalOnSpot = () => {
        var bundle = this.props.bundle;
        var totalOnSpot = bundle?.ExtraFeesPerFan;
        totalOnSpot += bundle?.MatchBundleDetail?.reduce((total, match) => total + match?.GameSeat?.ExtraFeesPerFan, 0);
        if (bundle?.SelectedHotel != undefined)
            totalOnSpot += bundle?.SelectedHotel?.SelectedCategory?.ExtraFeesPerFan;

        return totalOnSpot;
    }

    calculTotals = (details, hotelUpgrade, ticketUpgrade, perksUpgrade) => {
        var totalPerFan = details?.BasePricePerFan + hotelUpgrade + ticketUpgrade + perksUpgrade;
        var totalOnSpot = this.calculTotalOnSpot();
        var total = (totalPerFan + totalOnSpot) * details?.NumberOfTravelers;
        return [totalPerFan, totalOnSpot, total];
    }

    expandOtherGame = () => {
        this.setState({ isOtherGameCollapse: false })
    }

    selectMatch = (index) => {
        var otherMatches = [...this.state.otherMatches]
        otherMatches[index].Selected = !otherMatches[index].Selected;
        this.setState({ otherMatches })
    }

    addMatch = (item) => {
        if (this.props.isCustomize) {
            this.props.addMatch(item);
            this.setState({ isOtherGameCollapse: true })
        }
    }

    gamesKeyExtractor = (item) => {
        return 'game-' + item.Game?.idMatch;
    }

    gamesListKey = (item) => {
        return 'game-list-' + item.Game?.idMatch;
    }

    renderGames = ({ item }) => {
        return <MatchHeaderItem item={item} />
    }

    otherKeyExtractor = (item) => {
        return 'other-match-' + item.idMatch;
    }

    otherListKey = (item) => {
        return 'other-match-list-' + item.idMatch;
    }

    renderOtherMatch = ({ item, index }) => {
        return <OtherMatchHeader item={item} index={index} selectMatch={this.selectMatch} />
    }

    render() {
        return (
            <>
                {this.props.isLoading ? <ActivityIndicator size="large" color={R.colors.blue} style={{ marginTop: 120 }} /> :
                    <View style={[styles.container]}>
                        {/* games */}
                        <FlatList
                            data={this.state.bundle?.MatchBundleDetail}
                            extraData={this.state.bundle}
                            renderItem={this.renderGames}
                            keyExtractor={this.gamesKeyExtractor}
                            listKey={this.gamesListKey}
                        />

                        {/* trip info */}
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
                            <Text style={[styles.darkText, { width: "50%", padding: 20, textTransform: "uppercase", borderRightWidth: 1, borderColor: "#eee" }]}>
                                {this.state.details?.TripDays + " " + translate('days')}
                            </Text>
                            <Text style={[styles.darkText, { width: "50%", padding: 20, textTransform: "uppercase" }]}>
                                {this.state.matches[0]?.Game?.StadeCity}
                            </Text>
                        </View>

                        {/* trip price */}
                        <TouchableOpacity style={{ backgroundColor: "#fff", zIndex: 1 }}
                            onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                            {/* price */}
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                                <View>
                                    <Text style={{ fontSize: 17.5, color: R.colors.green, fontWeight: "bold" }}>
                                        {this.state.totalPerFan + "$ /" + translate('fan')}
                                    </Text>
                                    <Text style={{ fontSize: 14, marginTop: 5 }}>
                                        {this.state.total + "$ " + translate('total') + " *"}
                                    </Text>
                                </View>
                                <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
                            </View>

                            {/* price details */}
                            <TouchableOpacity style={[styles.priceDetailsContainer, { display: this.state.isButtonPressed ? "flex" : "none", }]}
                                onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })} >

                                {/* base price */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                        {translate('basePrice')}
                                    </Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                        {this.state.details?.BasePricePerFan}$
                                    </Text>
                                </View>

                                {/* hotel upgrade */}
                                {this.state.hotelUpgrade > 0 ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {translate('hotelUpgrade')}
                                        </Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {this.state.hotelUpgrade}$
                                    </Text>
                                    </View>
                                    :
                                    null
                                }

                                {/* ticket upgrade */}
                                {this.state.ticketUpgrade > 0 ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {translate('ticketUpgrade')}
                                        </Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {this.state.ticketUpgrade}$
                                    </Text>
                                    </View>
                                    :
                                    null
                                }

                                {/* perks upgrade */}
                                {this.state.perksUpgrade > 0 ?
                                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingTop: 5 }}>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {translate('perksUpgrade')}
                                        </Text>
                                        <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                            {this.state.perksUpgrade}$
                                    </Text>
                                    </View>
                                    :
                                    null
                                }

                                {/* on spot serive */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 11.5, color: R.colors.blue, fontWeight: 'bold', textTransform: 'uppercase' }}>
                                        + {translate('onSpotService')}
                                    </Text>
                                    <Text style={{ fontSize: 11.5, fontWeight: "bold", color: R.colors.blue }}>
                                        {this.state.totalOnSpot}$
                                    </Text>
                                </View>

                                {/* total/fan */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 13, color: "#212121" }}>
                                        {translate('totalFan')}
                                    </Text>
                                    <Text style={{ fontWeight: "bold", color: R.colors.green }}>
                                        {this.state.totalPerFan + this.state.totalOnSpot}$
                                    </Text>
                                </View>

                                {/* total */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 16, color: "#212121" }}>
                                        {translate('total')}
                                    </Text>
                                    <Text style={{ fontWeight: "bold", color: R.colors.green }}>
                                        {this.state.total}$
                                    </Text>
                                </View>

                                <Text style={{ fontSize: 9, color: "#999", marginTop: 10, marginBottom: 10 }}>
                                    *Price for 2 fans traveling together
                                </Text>
                            </TouchableOpacity>
                        </TouchableOpacity>

                        {this.props.isCustomize && this.state.otherMatches != null && this.state.otherMatches.length > 0 ?
                            <View style={{flex:1, display:'flex', height:'auto'}}>
                                {this.state.isOtherGameCollapse ?
                                    /* add other games */
                                    <TouchableOpacity style={styles.addGames} onPress={this.expandOtherGame }>
                                        <Text style={styles.textButton}>
                                            + {translate('addOtherGame')}
                                        </Text>
                                    </TouchableOpacity>
                                    :
                                    <View style={{ backgroundColor: R.colors.lightGrey }}>
                                        <FlatList
                                            data={this.state.otherMatches}
                                            extraData={this.state}
                                            renderItem={this.renderOtherMatch}
                                            keyExtractor={this.otherKeyExtractor}
                                            listKey={this.otherListKey}
                                        />
                                        <TouchableOpacity style={styles.closeAllButton} onPress={() => this.addMatch(this.state.otherMatches)}>
                                            <Text style={styles.textButton}>
                                                {translate('closeAll')}
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                }
                            </View>
                            : null}
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 'auto',
        backgroundColor: "white",
        marginStart: 15,
        marginEnd: 15,
        marginTop: -40,
        padding: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1.2,
        shadowRadius: 2,
        elevation: 5,
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    priceDetailsContainer: {
        flex: 1,
        height: 'auto',
        width: "100%",
        backgroundColor: R.colors.lightGrey,
        padding: 20,
        zIndex: 2,
        borderTopWidth: 0.5
    },
    closeAllButton: {
        backgroundColor: R.colors.grey,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    },
    textButton: {
        color: 'white',
        textTransform: 'uppercase'
    },
    addGames: {
        backgroundColor: R.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center',
        height: 40
    }
});