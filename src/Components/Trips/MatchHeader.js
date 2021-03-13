import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, ActivityIndicator, FlatList } from "react-native";
import OtherMatchHeader from "components/CustomizeTrip/OtherMatchHeader";
import MatchHeaderItem from "components/Trips/MatchHeaderItem";
import { formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import R from "res/R";

export class MatchHeader extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            bundle: props.bundle,
            otherMatches: [],
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: [],
            isButtonPressed: false,
            hotelUpgrade: 0,
            ticketUpgrade: 0,
            perksUpgrade: 0,
            totalPerFan: 0,
            total: 0,
        };
    }

    initBundle = () => {
        const bundle = { ...this.props.bundle }
        const [details, game, hotel, seating, perks] = formatBundle(bundle);
        var otherMatches = bundle.OtherMatches;

        if (otherMatches != null) {
            otherMatches.forEach((match, index) => {
                var found = bundle.MatchBundleDetail?.findIndex(m => m.Game?.idMatch == match.idMatch) > 0
                otherMatches[index].Selected = found;
            });
        }

        this.setState({ bundle, details, game, hotel, seating, perks, otherMatches })
    }


    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bundle != this.props.bundle) {
            this.initBundle();
        }
        if (prevState.hotel !== this.state.hotel) {
            this.calculHotel();
        }
        if (prevState.seating !== this.state.seating) {
            this.calculTicket();
        }
        if (prevState.perks !== this.state.perks) {
            this.calculPerks();
        }
    }

    calculHotel = () => {
        if (this.state.hotel != null) {
            var hotelUpgrade = this.state.hotel?.SelectedCategory?.ExtraCostPerFan;
            var totalPerFan = this.calculPerFan(hotelUpgrade, this.state.ticketUpgrade, this.state.perksUpgrade);
            var total = totalPerFan * this.state.details?.NumberOfTravelers;
            this.setState({ hotelUpgrade, totalPerFan, total });
        }
    }

    calculTicket = () => {
        var ticketUpgrade = this.state.seating?.ExtraCostPerFan;
        var totalPerFan = this.calculPerFan(this.state.hotelUpgrade, ticketUpgrade, this.state.perksUpgrade);
        var total = totalPerFan * this.state.details?.NumberOfTravelers;
        this.setState({ ticketUpgrade, totalPerFan, total });
    }

    calculPerks = () => {
        var selectedPerks = this.state.perks.filter((perk, index) => perk.Selected == true && index > 0);
        var perksUpgrade = selectedPerks.reduce(function (total, perk) {
            return total + perk.Price
        }, 0);
        var totalPerFan = this.calculPerFan(this.state.hotelUpgrade, this.state.ticketUpgrade, perksUpgrade);
        var total = totalPerFan * this.state.details?.NumberOfTravelers;
        this.setState({ perksUpgrade, totalPerFan, total });
    }

    calculPerFan = (hotel, ticket, perks) => {
        return this.state.details?.BasePricePerFan + hotel + ticket + perks + this.state.details?.ExtraFeesPerFan;
    }

    selectMatch = (index) => {
        var otherMatches = [...this.state.otherMatches]
        otherMatches[index].Selected = !otherMatches[index].Selected;
        this.setState({ otherMatches })
    }

    addMatch = (item) => {
        if (this.props.isCustomize)
            this.props.addMatch(item);
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
                                {this.state.game?.StadeCity}
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
                                        {this.state.details?.ExtraFeesPerFan}$
                                    </Text>
                                </View>

                                {/* total/fan */}
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 13, color: "#212121" }}>
                                        {translate('totalFan')}
                                    </Text>
                                    <Text style={{ fontWeight: "bold", color: R.colors.green }}>
                                        {this.state.totalPerFan}$
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
                            <>
                                {/* add other games */}
                                <TouchableOpacity style={styles.addGames}>
                                    <Text style={styles.textButton}>
                                        + {translate('addOtherGame')}
                                    </Text>
                                </TouchableOpacity>
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

                            </>
                            : null}
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        height:'auto',
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
        flex:1,
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
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        textTransform: 'uppercase'
    },
    addGames: {
        backgroundColor: R.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center'
    }
});