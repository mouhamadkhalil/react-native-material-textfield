import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { translate } from "helpers/utils";
import moment from 'moment';
import R from "res/R";

export class MatchHeader extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            isButtonPressed: false,
            hotelUpgrade: 0,
            ticketUpgrade: 0,
            perksUpgrade: 0,
            totalPerFan: 0,
            total: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.hotel !== this.props.hotel) {
            this.calculHotel();
        }
        if (prevProps.ticket !== this.props.ticket) {
            this.calculTicket();
        }
        if (prevProps.perks !== this.props.perks) {
            this.calculPerks();
        }
    }

    calculHotel = () => {
        if (this.props.hotel != null) {
            var hotelUpgrade = this.props.hotel?.SelectedCategory?.ExtraCostPerFan;
            var totalPerFan = this.calculPerFan(hotelUpgrade, this.state.ticketUpgrade, this.state.perksUpgrade);
            var total = totalPerFan * this.props.details.NumberOfTravelers;
            this.setState({ hotelUpgrade, totalPerFan, total });
        }
    }

    calculTicket = () => {
        var ticketUpgrade = this.props.ticket?.ExtraCostPerFan;
        var totalPerFan = this.calculPerFan(this.state.hotelUpgrade, ticketUpgrade, this.state.perksUpgrade);
        var total = totalPerFan * this.props.details.NumberOfTravelers;
        this.setState({ ticketUpgrade, totalPerFan, total });
    }

    calculPerks = () => {
        var selectedPerks = this.props.perks.filter((perk, index) => perk.Selected == true && index > 0);
        var perksUpgrade = selectedPerks.reduce(function (total, perk) {
            return total + perk.Price
        }, 0);
        var totalPerFan = this.calculPerFan(this.state.hotelUpgrade, this.state.ticketUpgrade, perksUpgrade);
        var total = totalPerFan * this.props.details.NumberOfTravelers;
        this.setState({ perksUpgrade, totalPerFan, total });
    }

    calculPerFan = (hotel, ticket, perks) => {
        return this.props.details.BasePricePerFan + hotel + ticket + perks + this.props.details.ExtraFeesPerFan;
    }

    render() {
        return (
            <>
                {this.props.isLoading ? <ActivityIndicator size="large" color={R.colors.blue} style={{ marginTop: 120 }} /> :
                    <View style={[styles.container, { height: this.state.isButtonPressed ? 425 : 250 }]}>
                        {/* game */}
                        <View style={{ flexDirection: "row" }}>
                            {/* teams */}
                            <View style={{ width: "50%", padding: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.props.game.Team1Color1, this.props.game.Team1Color2]}
                                        style={R.styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    />
                                    <Text style={[styles.blueText, { marginStart: 10 }]}>
                                        {this.props.game.HomeTeam}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.props.game.Team2Color1, this.props.game.Team2Color2]}
                                        style={R.styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    />
                                    <Text style={[styles.blueText, { marginStart: 10 }]}>
                                        {this.props.game.AwayTeam}
                                    </Text>
                                </View>
                            </View>

                            {/* game date */}
                            <Text style={[styles.blueText, { width: "50%", padding: 20 }]}>
                                {moment(this.props.game.GameDate).format('DD.MM.YY')}
                            </Text>
                        </View>

                        {/* trip info */}
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
                            <Text style={[styles.darkText, { width: "50%", padding: 20, textTransform: "uppercase", borderRightWidth: 1, borderColor: "#eee" }]}>
                                {this.props.details.TripDays + " " + translate('days')}
                            </Text>
                            <Text style={[styles.darkText, { width: "50%", padding: 20, textTransform: "uppercase" }]}>
                                {this.props.game.StadeCity}
                            </Text>
                        </View>

                        {/* trip price */}
                        <TouchableOpacity style={{ position: "absolute", width: "100%", top: 155, height: this.state.isButtonPressed ? 140 : 80, backgroundColor: "#fff", zIndex: 1 }}
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
                                        {this.props.details.BasePricePerFan}$
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
                                        {this.props.details.ExtraFeesPerFan}$
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
                    </View>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
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
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    priceDetailsContainer: {
        height: 170,
        width: "100%",
        backgroundColor: R.colors.lightGrey,
        padding: 20,
        zIndex: 2,
        borderTopWidth: 0.5
    }
});