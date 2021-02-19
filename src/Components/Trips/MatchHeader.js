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
import { translate } from "../../helpers/utils";
import moment from 'moment';
import R from "res/R";

export class MatchHeader extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            isButtonPressed: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        return (
            <>
                {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.blue} style={{ marginTop: 120, marginStart: 15 }} /> :
                    <View style={{
                        backgroundColor: "white", height: this.state.isButtonPressed ? 425 : 250, marginStart: 15, marginEnd: 15, marginTop: -40, padding: 0, shadowColor: "#000",
                        shadowOffset: { width: 0, height: 5 },
                        shadowOpacity: 1.2,
                        shadowRadius: 2,
                        elevation: 5,
                    }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "50%", padding: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.props.game.Team1Color1, this.props.game.Team1Color2]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>{this.props.game.HomeTeam}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.props.game.Team2Color1, this.props.game.Team2Color2]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>
                                        {this.props.game.AwayTeam}
                                    </Text>
                                </View>

                            </View>
                            <Text style={{ width: "50%", ...styles.blueText, padding: 20 }}>
                                {moment(this.props.game.GameDate).format('DD.MM.YY')}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
                            <Text style={{ width: "50%", ...styles.darkText, padding: 20, borderRightWidth: 1, borderColor: "#eee" }}>
                                {this.props.details.TripDays + " " + translate('days')}
                            </Text>
                            <Text style={{ width: "50%", ...styles.darkText, padding: 20, textTransform: "uppercase" }}>
                                {this.props.game.StadeCity}
                            </Text>
                        </View>

                        <TouchableOpacity style={{ position: "absolute", width: "100%", top: 155, height: this.state.isButtonPressed ? 140 : 80, backgroundColor: "#fff", zIndex: 1 }}
                            onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                                <View>
                                    <Text style={{ fontSize: 17.5, color: R.colors.green, fontWeight: "bold" }}>
                                        {this.props.details.BasePricePerFan + "$ /" + translate('fan')}
                                    </Text>
                                    <Text style={{ fontSize: 14, marginTop: 5 }}>
                                        {this.props.details.FinalPrice + "$ " + translate('total') + " *"}
                                    </Text>
                                </View>
                                <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
                            </View>
                            <TouchableOpacity onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })} style={{
                                height: 170, width: "100%", backgroundColor: "#fff", display: this.state.isButtonPressed ? "flex" : "none", padding: 20, width: "100%",
                                zIndex: 2
                            }}>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 13, color: "#666" }}>
                                        {translate('basePrice')}
                                    </Text>
                                    <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>
                                        {this.props.details.BasePricePerFan}$
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                    <Text style={{ fontSize: 11.5, color: R.colors.blue }}>+ ON-SPOT SERVICE</Text>
                                    <Text style={{ fontSize: 11.5, fontWeight: "bold", color: R.colors.blue }}>
                                        {this.props.details.ExtraFeesPerFan}$
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 13, color: "#212121" }}>
                                        {translate('totalFan')}
                                    </Text>
                                    <Text style={{ fontWeight: "bold", color: R.colors.green }}>
                                        {this.props.details.FinalPricePerFan}$
                                    </Text>
                                </View>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <Text style={{ fontSize: 16, color: "#212121" }}>
                                        {translate('total')}
                                    </Text>
                                    <Text style={{ fontWeight: "bold", color: R.colors.green }}>
                                        {this.props.details.FinalPrice}$
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
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 20,
        width: 20,
    },
});