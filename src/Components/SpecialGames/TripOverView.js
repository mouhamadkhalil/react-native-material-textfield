import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableHighlight,
    ActivityIndicator,
    Modal,
    TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import { get, servicesUrl } from "helpers/services.js";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import RatingStars from "components/Common/RatingStars";
import { getHotelImages, formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import Svg from 'react-native-remote-svg';
import moment from 'moment';
import R from "res/R";

export default class TripOverViewScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundleCode: props?.route?.params?.bundleCode,
            bundle: props?.route?.params?.bundle,
            details: {},
            game: {},
            hotel: {},
            hotelImages: [],
            seating: {},
            perks: [],
            showPictures: false
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
        const hotelImages = getHotelImages(hotel.Images);
        this.setState({ bundle, details, game, hotel, hotelImages, seating, perks, isLoading: false })
    }

    customize = () => {
        this.props.navigation.navigate('customize', { bundleCode: this.state.bundleCode });
    };

    flight = () => {
        this.props.navigation.navigate('flight', { bundle: this.state.bundle });
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('tripOverview')} image={R.images.trip_bg}></HeaderBackground>

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={this.state.bundle} />

                {/* package details */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('semiPackageDetails')}
                </Text>
                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                                {/* trip dates */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('tripDates')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {moment(this.state.details?.StartDate).format('DD.MM.YY')} - {moment(this.state.details?.EndDate).format('DD.MM.YY')}
                                    </Text>
                                </View>

                                {/* fans */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('fans')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                        {this.state.details?.NumberOfTravelers}
                                    </Text>
                                </View>

                                {/* hotel */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                                        {translate('hotel')}
                                    </Text>
                                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold", maxWidth: 200 }}>
                                        {this.state.hotel.HotelName}
                                    </Text>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <RatingStars rating={parseInt(this.state.hotel.Rating)} />
                                    </View>
                                    <View style={[R.styles.flexRow, { marginTop: 30 }]}>
                                        <Image source={R.images.bedGrey} />
                                        <Text style={{ color: "gray", fontSize: 16, marginStart: 10 }}>
                                            {this.state.hotel.HotelRoomType + " x " + this.state.hotel.NumberOfRooms}
                                        </Text>
                                    </View>

                                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.setState({ showPictures: true })}>
                                        <View>
                                            <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                                <Icon key='eye' name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                                            </View>
                                            <Image source={{ uri: this.state.hotel?.Image }} style={{ width: "100%", height: 250 }} />
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                {/* seating options */}
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

                                {/* perks */}
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                                        {translate('perks')}
                                    </Text>
                                    {this.state.perks?.length > 0 ?
                                        <>
                                            <View style={styles.perksRow}>
                                                {/* on spot service */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[0].Selected ? R.images.onspot : R.images.onspotGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[0].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[0].Title}
                                                    </Text>
                                                </View>
                                                {/* airport pick up */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[1].Selected ? R.images.car : R.images.carGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[1].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[1].Title}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.perksRow}>
                                                {/* airport drop off */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[2].Selected ? R.images.car : R.images.carGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[2].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[2].Title}
                                                    </Text>
                                                </View>
                                                {/* stadium tour */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[3].Selected ? R.images.stadium : R.images.stadiumGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[3].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[3].Title}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={styles.perksRow}>
                                                {/* city tour */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[4].Selected ? R.images.hotel : R.images.hotelGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[4].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[4].Title}
                                                    </Text>
                                                </View>
                                                {/* insurance */}
                                                <View style={styles.perk}>
                                                    <Image source={this.state.perks[5].Selected ? R.images.insurance : R.images.insuranceGrey} style={styles.perkImage} />
                                                    <Text style={[styles.perkLabel, { color: this.state.perks[5].Selected ? R.colors.blue : "#ddd" }]}>
                                                        {this.state.perks[5].Title}
                                                    </Text>
                                                </View>
                                            </View>
                                        </>
                                        :
                                        <ActivityIndicator size='small' />
                                    }
                                </View>
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
                </View>
                <Modal visible={this.state.showPictures} transparent={true}
                    onRequestClose={() => this.setState({ showPictures: false })}>
                    <ImageViewer imageUrls={this.state.hotelImages} />
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
    perksRow: { flexDirection: "row", justifyContent: "space-between" },
    perkImage: { width: 42, height: 44, resizeMode: 'contain' },
    perk: { width: "50%", alignItems: "center", height: 100 },
    perkLabel: { fontSize: 13, marginTop: 15 }
});
