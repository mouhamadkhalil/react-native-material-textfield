import React, { useCallback } from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Button,
    Modal,
    ToastAndroid,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from "../Common/HeaderBackground";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from 'react-native-datepicker';
import RadioButtonRN from 'radio-buttons-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import moment from 'moment';
import R from "res/R";
import { get, post, servicesUrl } from "../../helpers/services.js";
import { translate } from "../../helpers/utils";
import DatepickerRange from 'react-native-range-datepicker';
import Svg from 'react-native-remote-svg';
import RangeSlider from 'rn-range-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

const data = [
    {
        label: 'Doesnt matter, at least Iam there!',
        value: 4
    },
    {
        label: 'I want a good view of the game',
        value: 3
    },
    {
        label: 'I want to be close to the players',
        value: 2
    },
    {
        label: 'Once in a lifetime! Give me the best ',
        value: 1
    },
];

const dataHotel = [
    {
        label: new Array(5).fill(1).map(star => <Icon name='star' style={R.styles.hotelStar} />),
        value: 5
    },
    {
        label: new Array(4).fill(1).map(star => <Icon name='star' style={R.styles.hotelStar} />),
        value: 4
    },
    {
        label: new Array(3).fill(1).map(star => <Icon name='star' style={R.styles.hotelStar} />),
        value: 3
    },
];

export default class Request extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundleCode: props?.route?.params?.bundleCode,
            idHotel: -1,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: {},
            data: {},
            isDone: false,
            suggestedGames: [],
            MultiDetails: [],
            StartDate: "",
            EndDate: "",
            NumberOfTravelers: 2,
            HotelStars: "",
            matchCategoryCode: "",
            budget: "",
            Message: "",
            idDepartureCity: "",
            OfferContacts: [],
            Title: "",
            FirstName: "",
            LastName: "",
            Email: "",
            Phone: "",
            hotGameSelection: [],
            GameCode: props.route.params.GameCode,
            showDatePicker: false,
            requestDetails: {},
            cities: []
        };
    }

    componentDidMount() {
        try {
            this.getGameData();
            this.getCities();
        } catch { }
    }

    getCities = () => {
        get(servicesUrl.getAmadeusCities)
            .then((response) => {
                var cities = response.map(function (city) {
                    return {
                        value: city.ID,
                        label: city.Value,
                    };
                });
                this.setState({ cities: cities });
            });
    }

    getTripDays(date1, date2) {
        if (!date1 || !date1)
            return 0;
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return secondDate.diff(firstDate, 'days') + 1;
    }

    getGameData = () => {
        const _this = this;
        const params = `?customize=false&validateHotelPrice=false&hotelId=${this.state.idHotel}&hotelSource=R`;
        get(servicesUrl.getGameV2 + this.state.GameCode + params)
            .then(response => {
                console.log("response:", response)
                var game = response.MatchBundleDetail[0].Game;
                var hotel = response.SelectedHotel;
                hotel.Stars = new Array(parseInt(hotel.Rating)).fill(1);

                var seating = response.MatchBundleDetail[0].GameSeat;
                var perks = {
                    OnSpot: response.Service_OnSpot,
                    AirPortPickup: response.Service_AirPortPickup,
                    AirPortDropOff: response.Service_AirPortDropOff,
                    StadiumTour: response.Service_StadiumTour,
                    CityTour: response.Service_CityTour,
                    Train: response.Service_Train,
                    Insurance: response.Service_Insurance,
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
                this.setState({ data: response, game, hotel, seating, perks, details, isLoading: false })
            });
    }

    SendRequest = () => {
        const _this = this;
        const data = {
            NumberOfTravelers: this.state.NumberOfTravelers,
            StartDate: this.state.StartDate,
            EndDate: this.state.EndDate,
            budget: this.state.budget,
            HotelStars: this.state.HotelStars,
            matchCategoryCode: this.state.matchCategoryCode,
            idDepartureCity: this.state.idDepartureCity,
            Message: this.state.Message,

            "offerContacts": [
                {
                    Title: this.state.Title,
                    FirstName: this.state.FirstName,
                    LastName: this.state.LastName,
                    Phone: this.state.Phone,
                    Email: this.state.Email,
                }
            ],
        }
        if (this.state.Title === "" || this.state.FirstName === "" || this.state.LastName === "" || this.state.Phone === "" || this.state.Email === "") {
            ToastAndroid.showWithGravity(
                'please fill out mendatory fields !',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
        else {
            post(`/mobile/game/saveBundleMulti`, data)
                .then(response => {
                    var dataContacts = response.OfferContacts.map(function (item) {
                        return {
                            Title: item.Title,
                            FirstName: item.FirstName,
                            LastName: item.LastName,
                            Email: item.Email,
                            Phone: item.Phone,
                        };
                    });
                    this.setState({ OfferContacts: dataContacts });
                    console.log("Message", this.state.Message)
                    console.log("OfferContacts", this.state.OfferContacts)
                    var dataBundle = {
                        StartDate: response.StartDate,
                        EndDate: response.EndDate,
                        NumberOfTravelers: response.NumberOfTravelers,
                        HotelStars: response.HotelStars,
                        matchCategoryCode: response.matchCategoryCode,
                        Message: response.Message,
                        idDepartureCity: response.idDepartureCity,
                        budget: response.budget,
                    };
                    this.setState({ MultiDetails: dataBundle });
                    console.log("MultiDetails", this.state.MultiDetails)
                    this.props.navigation.navigate('confirmation');
                });
        }
    }

    IncrementFan = () => {
        let num = this.state.NumberOfTravelers + 1;
        if (num > 8) num = 8
        this.setState({ NumberOfTravelers: this.state.NumberOfTravelers + 1 });
    };

    DecrementFan = () => {
        let num = this.state.NumberOfTravelers - 1
        if (num < 1) num = 1
        this.setState({ NumberOfTravelers: num });
    };

    renderThumb = () => <Thumb />


    render() {
        const { selectedStartDate } = this.state.StartDate;
        const StartDate = selectedStartDate ? selectedStartDate.toString() : '';

        // const renderThumb = useCallback(() => <Thumb />, []);
        // const renderRail = useCallback(() => <Rail />, []);
        // const renderRailSelected = useCallback(() => <RailSelected />, []);
        // const renderLabel = useCallback(value => <Label text={value} />, []);
        // const renderNotch = useCallback(() => <Notch />, []);
        // const handleValueChange = useCallback((low, high) => {
        //     setLow(low);
        //     setHigh(high);
        // }, []);


        return (
            <ScrollView style={styles.container}>
                <HeaderBackground title={translate("request")} image={R.images.all_games_bg}></HeaderBackground>

                <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>

                    {/* match header */}
                    <View>
                        <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>Game 1</Text>
                        <View style={{ backgroundColor: "white", flexDirection: "row" }}>
                            <View style={{ padding: 15, alignItems: "center", width: 100, borderRightWidth: 1, borderRightColor: "#eee" }}>
                                <Text style={{ fontSize: 44, fontWeight: "bold" }}>{moment(new Date(this.state.game.GameDate)).format('DD')}</Text>
                                <Text style={{ fontSize: 21, fontWeight: "bold" }}>{moment(new Date(this.state.game.GameDate)).format('MMM').toUpperCase()}</Text>
                            </View>
                            <View style={{ padding: 15, justifyContent: "center" }}>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.game.Team1Color1, this.state.game.Team1Color2]}
                                        style={R.styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{this.state.game.HomeTeam}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <LinearGradient
                                        colors={[this.state.game.Team2Color1, this.state.game.Team2Color2]}
                                        style={R.styles.linearGradient}
                                        start={[0, 0]}
                                        end={[1, 0]}
                                        locations={[0.5, 0.5]}
                                    ></LinearGradient>
                                    <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10 }}>{this.state.game.AwayTeam}</Text>
                                </View>
                                <Text style={{ fontSize: 12, fontWeight: "bold", marginTop: 5, textTransform: "uppercase" }}>{this.state.game.LeagueName}</Text>
                                <Text style={{ fontSize: 12, fontWeight: "bold", textTransform: "uppercase" }}>{this.state.game.City}</Text>
                            </View>
                        </View>
                    </View>


                    {/* {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 120 }} />
                        : */}
                    <>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>Travel Details</Text>
                            <View style={{ backgroundColor: "white" }}>
                                <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate('tripDates')}</Text>
                                    {/* trip dates */}
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
                                <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate('fans')}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                        <TouchableOpacity style={{ width: 25, height: 25, alignItems: "center", justifyContent: "center" }} onPress={this.DecrementFan} >
                                            <Svg source={R.images.minus} style={{ width: "100%" }} />
                                        </TouchableOpacity>
                                        <Text style={{ marginStart: 10, marginEnd: 10, width: 30, textAlign: "center", fontWeight: "bold", fontSize: 17.5 }}>{this.state.NumberOfTravelers}</Text>
                                        <TouchableOpacity style={{ width: 25, height: 25, alignItems: "center", justifyContent: "center" }} onPress={this.IncrementFan} >
                                            <Svg source={R.images.plus} style={{ width: "100%" }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>BUDGET</Text>
                                    <MultiSlider
                                        values={[1000]}
                                        onValuesChangeStart={this.disableScroll}
                                        onValuesChangeFinish={values => {
                                            this.enableScroll
                                            console.log(values)
                                        }}
                                        enabledTwo={true}
                                        enableLabel={true}
                                        min={0}
                                        max={10000}
                                        valuePrefix={"$"}
                                    />
                                </View>
                                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate("flight")}</Text>
                                    <View style={{ flexDirection: "row", alignItems: "center", zIndex: 10, marginTop: 15 }}>
                                        <Image source={R.images.location3} style={{ width: 15, height: 21, marginRight: 5 }} />
                                        <DropDownPicker
                                            items={this.state.cities}
                                            style={{
                                                width: 250, marginBottom: this.state.isVisibleDropdownPicker ? 200 : 0
                                            }}
                                            itemStyle={{ justifyContent: "flex-start" }}
                                            showArrow={false}
                                            labelStyle={{ fontSize: 14, textAlign: 'left', }}
                                            selectedLabelStyle={{ color: '#3333ff', fontWeight: 'bold', }}
                                            activeLabelStyle={{ color: '#3333ff' }}
                                            onChangeItem={(item) => {
                                                var data = this.state.data;
                                                data.idDepartureCity = item.value;
                                                data.flightClass = 2;
                                                this.setState({ data: data, isLoading: true }, function () {
                                                    console.log(data);
                                                });
                                            }}
                                            onOpen={() => this.setState({ isVisibleDropdownPicker: true })}
                                            onClose={() => this.setState({ isVisibleDropdownPicker: false })}
                                            searchable={true}
                                            searchablePlaceholder=''
                                            searchableStyle={{ backgroundColor: '#dfdfdf' }}
                                            searchableError={() => <Text>{translate('msgNotFound')}</Text>}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("hotel")}</Text>
                            <View style={{ backgroundColor: "white" }}>
                                <View style={{ padding: 25 }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate("hotelType")}</Text>
                                    <RadioButtonRN
                                        data={dataHotel}
                                        selectedBtn={(e) => this.setState({ HotelStars: e.value })}
                                        value={dataHotel.value}
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("stadium")}</Text>
                            <View style={{ backgroundColor: "white" }}>
                                <View style={{ padding: 25 }}>
                                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate("seatsCategory")}</Text>
                                    <RadioButtonRN
                                        data={data}
                                        selectedBtn={(e) => this.setState({ matchCategoryCode: e.value })}
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                            </View>
                        </View>

                        <View style={{ marginTop: 30 }}>
                            <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("yourContactDetails")}</Text>
                            <View style={{ backgroundColor: "white" }}>
                                <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>{translate("title")}*</Text>
                                <View style={{ padding: 25 }}>
                                    <View style={{ marginBottom: 30 }}>
                                        <DropDownPicker
                                            items={[
                                                { label: "Mr.", value: "Mr." },
                                                { label: "Ms.", value: "Ms." },
                                            ]}
                                            defaultValue={this.state.country}
                                            containerStyle={{ height: 50 }}
                                            style={{ backgroundColor: "#fafafa" }}
                                            itemStyle={{
                                                justifyContent: "flex-start",
                                            }}
                                            dropDownStyle={{ color: "gray", width: 150, marginLeft: 30 }}
                                            onChangeItem={(item) =>
                                                this.setState({
                                                    Title: item.value,
                                                })
                                            }
                                        />
                                    </View>
                                    <View style={{ marginBottom: 30 }}>
                                        <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20 }}>{translate("name")}*</Text>
                                        <TextInput
                                            multiline={false}
                                            value={this.state.FirstName}
                                            onChangeText={(FirstName) => this.setState({ FirstName })}
                                            style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 30 }}>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("surname")}*</Text>
                                        <TextInput
                                            multiline={false}
                                            value={this.state.LastName}
                                            onChangeText={(LastName) => this.setState({ LastName })}
                                            style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 30 }}>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("email")}*</Text>
                                        <TextInput
                                            autoCapitalize="none"
                                            type="email"
                                            value={this.state.Email}
                                            onChangeText={(Email) => this.setState({ Email })}
                                            keyboardType="email-address"
                                            autoCapitalize="none"
                                            style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                                        />
                                    </View>
                                    <View style={{ marginBottom: 30 }}>
                                        <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("phoneNumber")}*</Text>
                                        <TextInput
                                            value={this.state.Phone}
                                            keyboardType="number-pad"
                                            onChangeText={(Phone) => this.setState({ Phone })}
                                            style={{ borderBottomWidth: 1, bordercolor: "#ccc" }}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ backgroundColor: "white", marginTop: 30, padding: 25 }}>
                            <TextInput
                                multiline={true}
                                numberOfLines={8}
                                value={this.state.Message}
                                onChangeText={Message => this.setState({ Message })}
                                placeholder="Additional request..."
                                style={{ fontSize: 12 }}
                            />
                        </View>
                        <View style={{ marginTop: 30, width: 150, height: 80, marginBottom: 60, alignSelf: "center" }}>
                            <TouchableOpacity style={{ backgroundColor: R.colors.lightGreen, padding: 15 }}
                                onPress={this.SendRequest}
                            >
                                <Text style={{ fontWeight: "bold" }}>{translate("sendRequest")}</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                    {/* } */}
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showDatePicker}>
                    <View style={styles.modalView}>
                        <DatepickerRange
                            startDate={this.state.details.StartDate}
                            untilDate={this.state.details.EndDate}
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
                            }}
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
        backgroundColor: "#eeeeee",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
});