import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    Button,
    ScrollView,
    View,
    CheckBox,
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    FlatList
} from "react-native";
import Lightbox from 'react-native-lightbox-v2';
import DatepickerRange from 'react-native-range-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import { HeaderBackground } from "../Common/HeaderBackground";
import { LinearGradient } from "expo-linear-gradient";
import Icon from 'react-native-vector-icons/Ionicons';
import { get, servicesUrl } from "../../helpers/services.js";
import { translate } from "../../helpers/utils";
import Chat from "../FanChat/chat";
import moment from 'moment';
import R from "res/R";
import BouncyCheckbox from "react-native-bouncy-checkbox";

const data = [
    {
        label: 'Category 1 '
    },
    {
        label: 'Category 2 +222$'
    },
    {
        label: 'Category 3  +0$'
    },
];

export default class CustomizeTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idHotel: -1,
            gameCode: props?.route?.params?.gameCode,
            details: {},
            game: {},
            hotel: {},
            hotelList: [],
            seating: {},
            seatingOptions: [],
            pearks: {},
            cities: [],
            data: {},
            flights: [],
            flightsData: [],
            airlines: [],
            pageCount: 1,
            pageNumber: 1,
            isLoading: false,
            isLoadingMore: false,
            isButtonPressed: false,
            showDatePicker: false,
            roomsHeight: 200,
            roomDetails: [
                {
                    index: 0,
                    active: 'double',
                    infant: false
                }
            ],
            stadiumMap: '',

            Infant1: false,
            Infant2: false,
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    getTripDays(date1, date2) {
        if (!date1 || !date1)
            return 0;
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return secondDate.diff(firstDate, 'days') + 1;
    }

    getData = () => {
        const params = `?customize=true&validateHotelPrice=true&hotelId=${this.state.idHotel}&hotelSource=R`;
        get(servicesUrl.getGameV2 + this.state.gameCode + params)
            .then((response) => {
                var game = response.MatchBundleDetail[0].Game;
                var hotel = response.SelectedHotel;
                var hotelList = response.HotelList.Items;
                var pageCount = response.HotelList.PageCount;
                var seating = response.MatchBundleDetail[0].GameSeat;
                var seatingOptions = response.MatchBundleDetail[0].GameSeats.map(function (option) {
                    return {
                        label: option.SeatCode + "                      +" + option.ExtraCostPerFan + "$",
                        image: option.StadiumMap_IMG_v3,
                        sequence: option.Sequence
                    }
                });
                var stadiumMap = seating.StadiumMap_IMG_v3;
                var pearks = {
                    Service_OnSpot: response.Service_OnSpot,
                    Service_AirPortPickup: response.Service_AirPortPickup,
                    Service_AirPortDropOff: response.Service_AirPortDropOff,
                    Service_StadiumTour: response.Service_StadiumTour,
                    Service_CityTour: response.Service_CityTour,
                    Service_Train: response.Service_Train,
                    Service_Insurance: response.Service_Insurance,
                }
                var details = {
                    idMatchBundle: response.idMatchBundle,
                    BundleCode: response.BundleCode,
                    StartDate: response.StartDate,
                    EndDate: response.EndDate,
                    TripDays: this.getTripDays(response.StartDate, response.EndDate),
                    NumberOfTravelers: response.NumberOfTravelers,
                    BasePricePerFan: response.BasePricePerFan,
                    PricePerFan: response.PricePerFan,
                    ExtraFeesPerFan: response.ExtraFeesPerFan,
                    FinalPrice: response.FinalPrice,
                    FinalPricePerFan: response.FinalPricePerFan,
                    NumberOfRooms: response.NumberOfRooms,
                    SharingRoomNote: response.SharingRoomNote,
                }
                this.setState({ data: response, game, hotel, hotelList, pageCount, seating, seatingOptions, stadiumMap, pearks, details })
            });
    }

    Cancel = () => {
        this.props.navigation.navigate('tripoverview', { idMatch: this.state.game.idMatch, gameCode: this.state.game.GameCode });
    };

    Flight = () => {
        this.props.navigation.navigate('flight', { gameCode: this.state.game.GameCode });
    };

    IncrementFan = () => {
        var details = this.state.details;
        var fanNumbers = this.state.details.NumberOfTravelers + 1;
        var roomNumbers = Math.ceil(fanNumbers / 3);
        var roomsHeight = 200 + (roomNumbers * 100);
        var roomDetails = [];
        var restFanNumbers = fanNumbers;
        for (let i = 0; i < roomNumbers; i++) {
            var item = {
                index: i,
                active: 'single',
                infant: false
            }
            if (restFanNumbers >= 3) {
                item.active = 'triple'
                restFanNumbers = restFanNumbers - 3;
            }
            else if (restFanNumbers >= 2) {
                item.active = 'double';
                restFanNumbers = restFanNumbers - 2;
            }
            roomDetails.push(item)
        }
        details.NumberOfTravelers = fanNumbers;
        details.NumberOfRooms = roomNumbers;
        this.setState({ details, roomDetails, roomsHeight });
    };

    DecrementFan = () => {
        var details = this.state.details;
        var fanNumbers = this.state.details.NumberOfTravelers - 1;
        var roomNumbers = Math.ceil(fanNumbers / 3);
        var roomsHeight = this.state.roomsHeight > 200 ? this.state.roomsHeight - (100) : 200;
        var roomDetails = [];
        var restFanNumbers = fanNumbers;
        for (let i = 0; i < roomNumbers; i++) {
            var item = {
                index: i,
                active: 'single',
                infant: false
            }
            if (restFanNumbers >= 3) {
                item.active = 'triple'
                restFanNumbers = restFanNumbers - 3;
            }
            else if (restFanNumbers >= 2) {
                item.active = 'double';
                restFanNumbers = restFanNumbers - 2;
            }
            roomDetails.push(item)
        }
        details.NumberOfTravelers = fanNumbers;
        details.NumberOfRooms = roomNumbers;
        this.setState({ details, roomDetails, roomsHeight });
    };

    IncrementRoom = () => {
        var details = this.state.details;
        var roomNumbers = this.state.details.NumberOfRooms + 1
        details.NumberOfRooms = roomNumbers;

        var roomDetails = this.state.roomDetails;
        this.setState({ details });
    };

    DecrementRoom = () => {
        var details = this.state.details;
        details.NumberOfRooms = this.state.details.NumberOfRooms - 1;
        this.setState({ details });
    };

    Infants1 = () => {
        this.setState({ Infant1: true });
    };

    Infants2 = () => {
        this.setState({ Infant2: true });
    };

    DisableInfant = () => {
        this.setState({ Infant1: false });
        this.setState({ Infant2: false });

    };

    roomItem = ({ item }) =>
        <View style={{ flex: 1, flexDirection: 'column', height: '100%' }}>
            <Text style={{ color: 'grey', fontSize: 20, fontWeight: "bold" }}>
                #{item.index + 1}
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                <TouchableOpacity style={[styles.roomButton, { backgroundColor: item.active === 'single' ? R.colors.blue : R.colors.lightGrey }]}>
                    <Text style={{ fontSize: 16, color: item.active === 'single' ? 'white' : 'black' }}>
                        {translate('single')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roomButton, { backgroundColor: item.active === 'double' ? R.colors.blue : R.colors.lightGrey }]}>
                    <Text style={{ fontSize: 16, color: item.active === 'double' ? 'white' : 'black' }}>
                        {translate('double')}
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.roomButton, { backgroundColor: item.active === 'triple' ? R.colors.blue : R.colors.lightGrey }]}>
                    <Text style={{ fontSize: 16, color: item.active === 'triple' ? 'white' : 'black' }}>
                        {translate('triple')}
                    </Text>
                </TouchableOpacity>
            </View>
            {item.active === 'triple' ? (
                <BouncyCheckbox text={translate('infantBed')} size={15} borderRadius={0} borderColor='black' fillColor={R.colors.blue} />
            ) : null}
        </View>

    hotelItem = ({ item }) => {
        const rating = new Array(parseInt(item.Rating)).fill(0);
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white', height: 200, marginTop: 10 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    {/* images */}
                    <View style={{ width: '30%', height: '100%' }}>
                        <Lightbox >
                            <Image source={{ uri: item.Image }} style={{ width: "100%", height: '100%' }} />
                        </Lightbox>
                    </View>

                    {/* details */}
                    <View style={{ width: '70%', flex: 1, flexDirection: 'column', padding: 10 }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item.HotelName}</Text>

                        {/* rating + cost */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {rating.map(star => {
                                    return (
                                        <Icon name='star-outline' style={styles.starStyle} />
                                    );
                                })}
                            </View>
                            <Text style={{ alignSelf: 'flex-end' }}>
                                + {item.SelectedCategory.ExtraCostPerFan} $
                            </Text>
                        </View>

                        {/* category */}
                        {item.SelectedCategory?.Name ? (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={R.images.bedGrey} style={{ width: 25 }}></Image>
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '80%', color: R.colors.grey, paddingStart: 10 }}>{item.SelectedCategory.Name}</Text>
                            </View>
                        ) : null}

                        {/* breakfast */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image source={R.images.coffeeCupGrey} style={{ width: 25 }}></Image>
                            <Text style={{ color: R.colors.grey, paddingStart: 10 }}>
                                {item.SelectedCategory.NoBreakFast ? translate('noBreakfast') : translate('includeBreakfast')}
                            </Text>
                        </View>

                        {/* refund */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                        </View>
                    </View>
                </View>

                {/* selection */}
                <View style={{ alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.2 }}>
                    <BouncyCheckbox text={translate('selectHotel')} borderColor='black' fillColor={R.colors.blue} />
                </View>
            </View>
        );
    };


    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.pageCount > this.state.pageNumber ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        //onPress={this.loadMore}
                        style={{ backgroundColor: "#4AD219", width: 150, height: 50, alignSelf: "center", alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20, zIndex: 100 }}>
                        <Text style={{ color: "white", fontWeight: "bold", textTransform: 'uppercase' }} >{translate('loadMore')}</Text>
                        {this.state.isLoadingMore ? (
                            <ActivityIndicator color={R.colors.greenLight} />
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <HeaderBackground title={translate('customizeTrip')} image={R.images.trip_bg}></HeaderBackground>
                <View style={{
                    backgroundColor: "white", height: this.state.isButtonPressed ? 425 : 250, marginStart: 15, marginEnd: 15, marginTop: -40, padding: 0, shadowColor: "#000",
                    shadowOffset: { width: 0, height: 5 },
                    shadowOpacity: 1.2,
                    shadowRadius: 2,
                    elevation: 5,
                }}>
                    <View style={{ padding: 0 }}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{ width: "50%", padding: 20 }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.game.Team1Color1, this.state.game.Team1Color2]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>{this.state.game.HomeTeam}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.game.Team2Color1, this.state.game.Team2Color2]}
                                        style={styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ ...styles.blueText, marginStart: 10 }}>{this.state.game.AwayTeam}</Text>
                                </View>

                            </View>
                            <Text style={{ width: "50%", ...styles.blueText, padding: 20 }}>{moment(this.state.game.GameDate).format('DD.MM.YY')}</Text>
                        </View>
                        <View style={{ flexDirection: "row", borderTopWidth: 1, borderBottomWidth: 1, borderColor: "#eee" }}>
                            <Text style={{ flexBasis: "50%", ...styles.darkText, padding: 20, borderRightWidth: 1, borderColor: "#eee" }}>{this.state.details.TripDays + " " + translate('days')}</Text>
                            <Text style={{ flexBasis: "50%", ...styles.darkText, padding: 20, textTransform: "uppercase" }}>{this.state.game.StadeCity}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={{ position: "absolute", width: "100%", top: 155, height: this.state.isButtonPressed ? 140 : 80, backgroundColor: "#fff", zIndex: 1 }}
                        onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 20 }}>
                            <View style={{}}>
                                <Text style={{ fontSize: 17.5, color: R.colors.green, fontWeight: "bold" }}>{this.state.details.BasePricePerFan + "$ /" + translate('fan')}</Text>
                                <Text style={{ fontSize: 14, marginTop: 5 }}>{this.state.details.FinalPrice + "$ " + translate('total') + " *"}</Text>
                            </View>
                            <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
                        </View>
                        <TouchableOpacity onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })} style={{
                            height: 170, width: "100%", backgroundColor: "#fff", display: this.state.isButtonPressed ? "flex" : "none", padding: 20, width: "100%",
                            zIndex: 2
                        }}>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 13, color: "#666" }}>{translate('basePrice')}</Text>
                                <Text style={{ fontSize: 13, fontWeight: "bold", color: "#666" }}>{this.state.details.BasePricePerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 15, marginBottom: 15 }}>
                                <Text style={{ fontSize: 11.5, color: R.colors.blue }}>+ ON-SPOT SERVICE</Text>
                                <Text style={{ fontSize: 11.5, fontWeight: "bold", color: R.colors.blue }}>{this.state.details.ExtraFeesPerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 13, color: "#212121" }}>{translate('totalFan')}</Text>
                                <Text style={{ fontWeight: "bold", color: R.colors.green }}>{this.state.details.FinalPricePerFan}$ </Text>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                <Text style={{ fontSize: 16, color: "#212121" }}>{translate('total')}</Text>
                                <Text style={{ fontWeight: "bold", color: R.colors.green }}>{this.state.details.FinalPrice}$ </Text>
                            </View>
                            <Text style={{ fontSize: 9, color: "#999", marginTop: 10, marginBottom: 10 }}>*Price for 2 fans traveling together </Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>

                {/* package details */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('semiPackageDetails')}
                    </Text>

                    {/* trip dates */}
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", height: 100, marginTop: 10, padding: 20 }}>
                        <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                            {translate('tripDates')}
                        </Text>
                        <TouchableOpacity style={{ marginTop: 10, borderBottomWidth: 0.5 }}
                            onPress={() => this.setState({ showDatePicker: true })}>
                            <View style={{ flexDirection: 'row' }}>
                                <Text style={{ height: 30, fontSize: 20, fontWeight: 'bold', width: '90%' }}>
                                    {moment(this.state.details.StartDate).format('DD.MM.yyy') + " - " + moment(this.state.details.EndDate).format('DD.MM.yyyy')}
                                </Text>
                                <Image source={R.images.calendar} style={{ width: 20, height: 20 }} ></Image>
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* fans */}
                    <View style={{ backgroundColor: "white", height: 100, marginTop: 5, padding: 20 }}>
                        <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                            {translate('fans')}
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                            <TouchableOpacity style={{ width: 25 }} onPress={this.DecrementFan}>
                                <Icon name='remove-circle-outline' style={styles.textStyle} />
                            </TouchableOpacity>
                            <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10 }}>
                                {this.state.details.NumberOfTravelers}
                            </Text>
                            <TouchableOpacity style={{ width: 25 }} onPress={this.IncrementFan}>
                                <Icon name='add-circle-outline' style={styles.textStyle} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* hotels */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('hotel')}
                    </Text>

                    {/* rooms */}
                    <View style={{ backgroundColor: 'white', marginTop: 10 }}>
                        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", height: this.state.roomsHeight, marginTop: 5, padding: 20 }}>
                            <View style={{ height: 80 }}>
                                <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                                    {translate('rooms')}
                                </Text>

                                {/* increment/decrement */}
                                <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                    <TouchableOpacity style={{ width: 25 }} onPress={this.DecrementRoom}>
                                        <Icon name='remove-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10 }}>
                                        {this.state.details.NumberOfRooms}
                                    </Text>
                                    <TouchableOpacity style={{ width: 25 }} onPress={this.IncrementRoom}>
                                        <Icon name='add-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* rooms details */}
                            <View style={{ height: '100%' }} >
                                <FlatList
                                    data={this.state.roomDetails}
                                    renderItem={item => this.roomItem(item)}
                                    keyExtractor={item => item.index.toString()}
                                />
                            </View>
                        </View>

                        {/* browse */}
                        <View style={{ width: '60%', marginTop: 40, padding: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: R.colors.greenLight, height: 60, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.Browser}
                            >
                                <Text style={{ fontSize: 20, textTransform: 'uppercase' }}>{translate('browse')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* hotels list */}
                    <FlatList
                        data={this.state.hotelList}
                        renderItem={item => this.hotelItem(item)}
                        keyExtractor={item => item.Id.toString()}
                        ListFooterComponent={this.renderFooter.bind(this)}
                    />
                </View>

                {/* stadium */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('stadium')}
                    </Text>

                    {/* stadium map */}
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: R.colors.lightGrey, height: 300, marginTop: 10, padding: 20 }}>
                        <Text style={{ fontSize: 16, textTransform: 'uppercase' }}>
                            {this.state.game.Stade}
                        </Text>
                        <View style={{ width: '100%', height: '100%', alignSelf: 'center' }}>
                            <Image source={{ uri: this.state.stadiumMap }}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                    </View>

                    {/* seating options */}
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold", textTransform: 'uppercase' }}>
                            {translate('seatingOptions')}
                        </Text>
                        <RadioButtonRN
                            data={this.state.seatingOptions}
                            activeColor='white'
                            deactiveColor='black'
                            boxActiveBgColor={R.colors.blue}
                            duration={100}
                            initial={this.state.seating.Sequence}
                            selectedBtn={(e) => this.setState({ stadiumMap: e.image })}
                            style={{ marginTop: 20 }}
                            textColor='grey'
                        />
                    </View>
                </View>

                {/* perks */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20 }}>
                        PERKS
                    </Text>
                    <TouchableOpacity>
                        <Image source={R.images.onspot} style={{ marginTop: 10, width:50, height:50, resizeMode:'contain' }} />
                        <Text style={{ marginLeft: 143, color: "blue", fontWeight: "bold", width: 50, fontSize: 9 }}>
                            On Spot Service
                    </Text>
                    </TouchableOpacity>
                </View>

                {/* buttons begin */}
                <View style={{ flex: 1, flexDirection: 'row', width:'90%',  alignSelf: 'center', height: 50, marginTop: 20 }}>
                    <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.buttonBlack }}
                        onPress={this.Cancel}
                    >
                        <Text style={{ color: 'white', fontSize: 20 }}>{translate('cancel')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.greenLight }}
                        onPress={this.Continue}
                    >
                        <Text style={{ color: 'black', fontSize: 20 }}>{translate('continue')}</Text>
                    </TouchableOpacity>
                </View>
                {/* buttons end*/}

                <View style={{ marginLeft: 100, marginTop: 20 }}>
                    <Chat />
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showDatePicker}>
                    <View style={styles.modalView}>
                        <DatepickerRange
                            startDate={moment(this.state.details.StartDate).format("DDMMyyyy")}
                            untilDate={moment(this.state.details.EndDate).add(1, 'year').format("DDMMyyyy")}
                            placeHolderStart='Start Date'
                            placeHolderUntil='Until Date'
                            selectedBackgroundColor={R.colors.blue}
                            buttonColor={R.colors.blue}
                            onClose={() => this.setState({ showDatePicker: false })}
                            onConfirm={(fromDate, toDate) => {
                                var details = this.state.details;
                                details.StartDate = fromDate;
                                details.EndDate = toDate;
                                this.setState({ details, showDatePicker: false })
                            }
                            }
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
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
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 20,
        width: 20,
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
    textStyle: {
        color: R.colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    roomButton: {
        width: '30%',
        backgroundColor: R.colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    starStyle: {
        color: "#f9d155",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
