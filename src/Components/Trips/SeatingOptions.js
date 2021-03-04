import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    ActivityIndicator,
} from "react-native";
import Svg from 'react-native-remote-svg';
import { translate } from "helpers/utils";
import R from "res/R";

export class SeatingOptions extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            details: props.details,
            game: props.game,
            seating: props.seating,
        };
    }

    initBundle = () => {
        var bundle = { ...this.props.bundle }
        const [details, game, seating] = formatBundle(bundle);
        this.setState({ bundle, details, game, seating })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bundle != this.props.bundle) {
            this.initBundle();
        }
    }

    render() {
        return (
            <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                    {translate('seatingOptions')}
                </Text>
                <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                    {this.state.seating?.SeatCode}
                </Text>
                <View style={R.styles.flexRow}>
                    <Image source={R.images.stadiumGrey_sm} />
                    <Text style={{ color: "gray", fontSize: 16, marginStart: 10 }}>
                        {this.state.game?.Stade}, {this.state.game?.StadeCity}
                    </Text>
                </View>
                <View style={R.styles.flexRow}>
                    <Image source={R.images.seatsGrey} />
                    <Text style={{ color: "gray", fontSize: 16, marginStart: 10 }}>
                        {this.state.details?.NumberOfTravelers + " " + translate('seats')}
                    </Text>
                </View>
                <Svg source={{ uri: this.state.seating?.StadiumMap_SVG_v3 }}
                    style={{ width: "100%", height: 230, marginTop: 30 }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({

});