import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Modal,
    ActivityIndicator,
    FlatList
} from "react-native";
import DatepickerRange from 'react-native-range-datepicker';
import DropDownPicker from "react-native-dropdown-picker";
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Tooltip } from 'react-native-elements';
import Svg from 'react-native-remote-svg';
import RatingStars from "components/Trips/RatingStars";

import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import HotelItem from "components/CustomizeTrip/HotelItem";
import { Hotels } from "components/CustomizeTrip/Hotels";
import { Stadium } from "components/CustomizeTrip/Stadium";
import { Perks } from "components/CustomizeTrip/Perks";

//import RadioButtonRN from 'radio-buttons-react-native';
import { get, post, servicesUrl } from "helpers/services.js";
import { getHotelImages, getTripDays } from "helpers/tripHelper.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export default class CustomizeTripScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bundleCode: props?.route?.params?.bundleCode,
            bundle: props?.route?.params?.bundle,
            details: {},
            game: {},
            hotel: {},
            hotelList: [],
            hotelImages: [],
            cancelPolicies: [],
            perks: [],
            stadiumMap: null,
            roomsHeight: 200,
            isLoading: true,
            isLoadingMore: false,
            isBrowsing: false,
            isCustomized: false,
            isGettingPolicy: true,
            showDatePicker: false,
            showFilter: false,
            showPictures: false,
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
        const params = `?customize=true&validateHotelPrice=false&hotelId=-1`;
        get(servicesUrl.getGameV2 + this.state.bundleCode + params)
            .then((response) => {
                this.initBundle(response);
            });
    }

    initBundle = (bundle = null) => {
        if (bundle == null)
            bundle = { ...this.state.bundle };

        var game = bundle.MatchBundleDetail[0].Game;
        var hotel = bundle.SelectedHotel;

        // convert array of String to array of Objects 
        var hotelImages = hotel ? getHotelImages(hotel.Images) : [];

        var hotelList = bundle.HotelList?.Items;
        var perks = [
            {
                Title: translate('onSpotService'),
                Label: 'onSpotService',
                Sequence: 0,
                Price: bundle.Price_OnSpot,
                Image: R.images.onspotWhite,
                ImageGrey: R.images.onspotGrey,
                Selected: true
            },
            {
                Title: translate('train'),
                Label: 'train',
                Sequence: 1,
                Price: bundle.Price_Train,
                Image: R.images.trainWhite,
                ImageGrey: R.images.trainGrey,
                Selected: bundle.Service_Train
            },
            {
                Title: translate('airportPickup'),
                Label: 'airportPickup',
                Sequence: 2,
                Price: bundle.Price_AirtportPickup,
                Image: R.images.carWhite,
                ImageGrey: R.images.carGrey,
                Selected: bundle.Service_AirPortPickup
            },
            {
                Title: translate('airportDropOff'),
                Label: 'airportDropOff',
                Sequence: 3,
                Price: bundle.Price_AirportDropoff,
                Image: R.images.carWhite,
                ImageGrey: R.images.carGrey,
                Selected: bundle.Service_AirPortDropOff
            },
            {
                Title: translate('stadiumTour'),
                Label: 'stadiumTour',
                Sequence: 4,
                Price: bundle.Price_StadiumTour,
                Image: R.images.stadiumWhite,
                ImageGrey: R.images.stadiumGrey,
                Selected: bundle.Service_StadiumTour
            },
            {
                Title: translate('cityTour'),
                Label: 'cityTour',
                Sequence: 5,
                Price: bundle.Price_CityTour,
                Image: R.images.hotelWhite,
                ImageGrey: R.images.hotelGrey,
                Selected: bundle.Service_CityTour
            },
            {
                Title: translate('insurance'),
                Label: 'insurance',
                Sequence: 6,
                Price: bundle.Price_Insurance,
                Image: R.images.insuranceWhite,
                ImageGrey: R.images.insuranceGrey,
                Selected: bundle.Service_Insurance
            }
        ]
        var details = {
            idMatchBundle: bundle.idMatchBundle,
            BundleCode: bundle.BundleCode,
            StartDate: bundle.StartDate,
            EndDate: bundle.EndDate,
            TripDays: getTripDays(bundle.StartDate, bundle.EndDate),
            NumberOfTravelers: bundle.NumberOfTravelers,
            BasePricePerFan: bundle.BasePricePerFan,
            PricePerFan: bundle.PricePerFan,
            ExtraFeesPerFan: bundle.ExtraFeesPerFan,
            FinalPrice: bundle.FinalPrice,
            FinalPricePerFan: bundle.FinalPricePerFan,
            NumberOfRooms: bundle.NumberOfRooms,
            SharingRoomNote: bundle.SharingRoomNote,
        }
        this.setState({ bundle, game, hotel, hotelImages, hotelList, perks, details, isLoading: false },
            function () {
                if (hotel != null)
                    this.getCancelPolicy();
            })
    }

    getCancelPolicy = () => {
        try {
            var hotel = this.state.bundle.SelectedHotel;
            if (hotel.HasPolicy)
                return;
            else {
                this.setState({ isGettingPolicy: true }, function () {
                    var bundle = this.state.bundle;
                    var cancelPolicyRequest = {
                        bundleCode: bundle.BundleCode,
                        cancelPolicyID: "-1",
                        checkIn: moment(bundle.StartDate).format('YYYY-MM-DD'),
                        checkout: moment(bundle.EndDate).format('YYYY-MM-DD'),
                        flagAvail: false,
                        hotel: bundle.SelectedHotel,
                        hotelId: bundle.SelectedHotel.HotelId,
                        hotelSource: bundle.HotelSource,
                        hotelUniqueKey: bundle.uniqueKey,
                        idMatchBundle: bundle.MatchBundleDetail[0].idMatchBundle,
                        internalCode: null,
                        roomInfo: bundle.RoomInfoList
                    }
                    post(servicesUrl.viewCancelPolicy, cancelPolicyRequest)
                        .then((response) => {
                            bundle.SelectedHotel.Policies = response;
                            this.setPolicy(bundle.SelectedHotel);
                            var cancelPolicy = response.Policy[0];
                            cancelPolicy.HotelId = bundle.SelectedHotel.HotelId;

                            var cancelPolicies = this.state.cancelPolicies;
                            cancelPolicies.push(cancelPolicy)
                            this.setState({ bundle, cancelPolicies, isGettingPolicy: false });
                        });
                })
            }
        } catch { }
    }

    setPolicy(hotel) {
        hotel.SelectedPolicy = null;
        if (hotel.HotelSource == "R" && hotel.Policies && hotel.Policies.Policy) {
            hotel.SelectedPolicy = hotel.Policies.Policy[0];
            hotel.HasPolicy = true;
            return;
        }

        const categ = hotel.SelectedCategory.Code;
        const bfType = hotel.SelectedCategory.BFType;
        hotel.HasPolicy = true;
        if (hotel && hotel.Policies && hotel.Policies.Policy) {
            let list = hotel.Policies.Policy.find(a => a.RoomCatgCode && a.RoomCatgCode.Text == categ && a.RoomCatgCode.BFType == bfType);
            if (list) {
                hotel.SelectedPolicy = list;
                return;
            }
            list = hotel.Policies.Policy.find(a => a.RoomCatgCode && a.RoomCatgCode.Text == categ && a.RoomCatgCode.BFType == null);
            if (list) {
                hotel.SelectedPolicy = list;
                return;
            }

            list = hotel.Policies.Policy.find(a => a.RoomCatgCode == null || a.RoomCatgCode.Text == null);
            if (list) {
                hotel.SelectedPolicy = list;
                return;
            }
        }
        hotel.SelectedPolicy = {
            Refundable: false,
            ExCancelDays: 9999999
        };
    }

    

    browseHotels = () => {
        try {
            if (!this.state.isBrowsing) {
                this.setState({ isBrowsing: true }, function () {
                    var bundle = this.state.bundle;
                    post(servicesUrl.searchHotel, bundle)
                        .then((response) => {
                            this.setState({ bundle: response, hotelList: response.HotelList.Items, isBrowsing: false, isCustomized: false })
                        });
                })
            }
        } catch { }
    }

    loadMoreHotels = () => {
        try {
            if (!this.state.isLoadingMore) {
                var bundle = this.state.bundle;
                var params = `?pageNumber=${bundle.HotelList.PageNumber + 1}&pageSize=${bundle.HotelList.PageSize}&getCancellationPolicy=false`;
                this.setState({ isLoadingMore: true });
                post(servicesUrl.getPagedHotels + params, bundle)
                    .then((response) => {
                        var joined = this.state.hotelList.concat(response.Items);
                        bundle.HotelList.PageNumber = response.PageNumber;
                        bundle.HotelList.PageCount = response.PageCount;
                        this.setState({ bundle: bundle, hotelList: joined, isLoadingMore: false })
                    });
            }
        } catch { }
    }

    setIsCustomized = (isCustomized) => {
        this.setState({isCustomized});
    }

    openPictures = (images) => {
        var hotelImages = getHotelImages(images);
        this.setState({ hotelImages, showPictures: true });
    }

    addMatch = (otherMatches) => {
        var bundle = { ...this.state.bundle };
        var isModified = false;
        otherMatches.forEach(match => {
            var index = bundle.MatchBundleDetail.findIndex(m => m.Game?.idMatch == match.idMatch);

            if (match.Selected) {
                // add match
                if (index == -1) {
                    var game = { 'Game': match, idMatches: match.idMatch }
                    bundle.MatchBundleDetail.push(game)
                    bundle.firstGame = bundle.MatchBundleDetail[0];
                    isModified = true
                }
            }
            // remove match
            else {
                if (index > -1) {
                    bundle.MatchBundleDetail.splice(index, 1);
                    isModified = true
                }
            }
        });

        if (isModified)
            post(servicesUrl.addGames, bundle)
                .then((response) => {
                    bundle = { ...response };
                    this.setState({ bundle });
                });
    }

    selectHotel = (selectedHotel) => {
        try {
            var bundle = { ...this.state.bundle };
            var hotel = { ...bundle.SelectedHotel };
            selectedHotel.Selected = true;
            bundle.SelectedHotel = hotel = selectedHotel;
            this.setState({ bundle, hotel })
        }
        catch { }
    };

    selectInfant = (index) => {
        var bundle = this.state.bundle;
        bundle.RoomInfoList[index].AdultNum.RQBedChild = !bundle.RoomInfoList[index].AdultNum.RQBedChild;
        this.setState({ bundle })
    }

    selectSeat = (option, index) => {
        var bundle = { ...this.state.bundle };
        var option = { ...option };
        option.Selected = true;
        var match = { ...this.state.bundle.MatchBundleDetail[index] };
        match.GameSeat = { ...option };
        bundle.MatchBundleDetail = [...this.state.bundle.MatchBundleDetail];
        bundle.MatchBundleDetail[index] = match;
        this.setState({ bundle })
    }

    selectPerk = (index) => {
        if (index > 1) {
            var bundle = { ...this.state.bundle };
            var perks = [...this.state.perks];
            perks[index].Selected = !perks[index].Selected;
            switch (index) {
                case 2:
                    bundle.Service_AirPortPickup = perks[index].Selected;
                    break;
                case 3:
                    bundle.Service_AirPortDropOff = perks[index].Selected;
                    break;
                case 4:
                    bundle.Service_StadiumTour = perks[index].Selected;
                    break;
                case 5:
                    bundle.Service_CityTour = perks[index].Selected;
                    break;
                case 6:
                    bundle.Service_Insurance = perks[index].Selected;
                    break;
            }
            this.setState({ bundle, perks });
        }
    }

    incrementFan = () => {
        var bundle = this.state.bundle;
        if (bundle.NumberOfTravelers < 8) {
            var fanNumbers = bundle.NumberOfTravelers + 1;
            var roomNumbers = Math.ceil(fanNumbers / 3);
            var roomsHeight = 200 + (roomNumbers * 100);
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                if (restFanNumbers >= 3) {
                    item.AdultNum.RoomType = 'Triple';
                    item.AdultNum.Text = '3';
                    restFanNumbers = restFanNumbers - 3;
                }
                else if (restFanNumbers >= 2) {
                    item.AdultNum.RoomType = 'Double';
                    item.AdultNum.Text = '2';
                    restFanNumbers = restFanNumbers - 2;
                }
                roomInfoList.push(item)
            }
            var details = { ...this.state.details };
            bundle.NumberOfTravelers = details.NumberOfTravelers = fanNumbers;
            bundle.NumberOfRooms = details.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.setState({ bundle, details, roomsHeight, isCustomized: true });
        }
    };

    decrementFan = () => {
        var bundle = this.state.bundle;
        if (bundle.NumberOfTravelers > 1) {
            var fanNumbers = bundle.NumberOfTravelers - 1;
            var roomNumbers = Math.ceil(fanNumbers / 3);
            var roomsHeight = this.state.roomsHeight > 200 ? this.state.roomsHeight - (100) : 200;
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                if (restFanNumbers >= 3) {
                    item.AdultNum.RoomType = 'Triple';
                    item.AdultNum.Text = '3';
                    restFanNumbers = restFanNumbers - 3;
                }
                else if (restFanNumbers >= 2) {
                    item.AdultNum.RoomType = 'Double';
                    item.AdultNum.Text = '2';
                    restFanNumbers = restFanNumbers - 2;
                }
                roomInfoList.push(item)
            }
            var details = { ...this.state.details };
            bundle.NumberOfTravelers = details.NumberOfTravelers = fanNumbers;
            bundle.NumberOfRooms = details.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.setState({ bundle, details, roomsHeight, isCustomized: true });
        }
    };

    incrementRoom = () => {
        var bundle = this.state.bundle;
        if (bundle.NumberOfTravelers > bundle.NumberOfRooms) {
            var fanNumbers = bundle.NumberOfTravelers;
            var roomNumbers = bundle.NumberOfRooms + 1;
            var roomsHeight = 200 + (roomNumbers * 100);
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            var restRoomNumber = roomNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var fanRoom = Math.ceil(restFanNumbers / restRoomNumber);
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                switch (fanRoom) {
                    case 2:
                        item.AdultNum.RoomType = 'Double';
                        item.AdultNum.Text = '2';
                        break
                    case 3:
                        item.AdultNum.RoomType = 'Triple';
                        item.AdultNum.Text = '3';
                        break
                }
                restFanNumbers -= fanRoom;
                restRoomNumber--;
                roomInfoList.push(item)
            }
            var details = { ...this.state.details };
            bundle.NumberOfRooms = details.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.setState({ bundle, details, roomsHeight, isCustomized: true });
        }
    };

    decrementRoom = () => {
        var bundle = this.state.bundle;
        if (Math.ceil(bundle.NumberOfTravelers / 3) < bundle.NumberOfRooms) {
            var fanNumbers = bundle.NumberOfTravelers;
            var roomNumbers = bundle.NumberOfRooms - 1;
            var roomsHeight = this.state.roomsHeight > 200 ? this.state.roomsHeight - (100) : 200;
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            var restRoomNumber = roomNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var fanRoom = Math.ceil(restFanNumbers / restRoomNumber);
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                switch (fanRoom) {
                    case 2:
                        item.AdultNum.RoomType = 'Double';
                        item.AdultNum.Text = '2';
                        break
                    case 3:
                        item.AdultNum.RoomType = 'Triple';
                        item.AdultNum.Text = '3';
                        break
                }
                restFanNumbers -= fanRoom;
                restRoomNumber--;
                roomInfoList.push(item)
            }
            var details = { ...this.state.details };
            bundle.NumberOfRooms = details.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.setState({ bundle, details, roomsHeight, isCustomized: true });
        }
    };

    cancel = () => {
        this.props.navigation.navigate('tripOverview', { bundleCode: this.state.bundleCode });
    };

    continue = () => {
        this.props.navigation.navigate('flight', { bundle: this.state.bundle });
    };

    roomItem = ({ item, index }) => {
        const roomType = item.AdultNum.RoomType, infantBed = item.AdultNum.RQBedChild;
        return (
            <View style={{ flex: 1, flexDirection: 'column', height: '100%' }}>
                <Text style={{ color: 'grey', fontSize: 20, fontWeight: "bold" }}>
                    #{index + 1}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Single' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Single' ? 'white' : 'black' }}>
                            {translate('single')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Double' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Double' ? 'white' : 'black' }}>
                            {translate('double')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Triple' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Triple' ? 'white' : 'black' }}>
                            {translate('triple')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {roomType === 'Triple' ? (
                    <CheckBox title={translate('infantBed')} checked={infantBed}
                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                        checkedColor='white'
                        textStyle={{ color: 'black' }}
                        onPress={() => this.selectInfant(index)} />
                ) : null}
            </View>
        )
    }

    renderRooms = (index, roomInfoList) => {
        return (
            <>
                {/* rooms */}
                <View key={"rooms-" + index} style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", height: 'auto', marginTop: 5, padding: 20 }}>
                        <View style={{ height: 80 }}>
                            <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                                {translate('rooms')}
                            </Text>

                            {/* increment/decrement */}
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: 25 }} onPress={this.decrementRoom}>
                                    <Icon name='remove-circle-outline' style={styles.textStyle} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10 }}>
                                    {this.state.bundle?.NumberOfRooms}
                                </Text>
                                <TouchableOpacity style={{ width: 25 }} onPress={this.incrementRoom}>
                                    <Icon name='add-circle-outline' style={styles.textStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* rooms details */}
                        <View style={{ width: '100%' }}>
                            <FlatList
                                data={this.state.bundle?.RoomInfoList ? this.state.bundle?.RoomInfoList : roomInfoList}
                                extraData={this.state}
                                renderItem={this.roomItem}
                                keyExtractor={(item, index) => 'room-' + index}
                                listKey={(item, index) => 'room-list-' + index}
                            />
                        </View>
                    </View>

                    {/* browse */}
                    {this.state.isCustomized ?
                        <View style={{ width: '60%', marginTop: 40, padding: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: R.colors.lightGreen, height: 60, alignItems: 'center', justifyContent: 'center' }}
                                onPress={this.browseHotels}>
                                <Text style={{ fontSize: 20, textTransform: 'uppercase' }}>
                                    {translate('browse')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    {/* filter */}
                    <TouchableOpacity style={{ marginTop: 10, height: 60, backgroundColor: '#ccc' }} onPress={() => this.setState({ showFilter: true })}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#222', textTransform: 'uppercase' }}>
                                {translate('filter')}
                            </Text>
                            <Icon name='chevron-down-outline' style={{ fontSize: 16, color: '#222', marginStart: 5 }} />
                        </View>
                    </TouchableOpacity>
                </View>
            </>
        )
    }

    renderHotel = (item) => {
        var rating = parseInt(item.Rating);
        var selected = this.state.bundle?.SelectedHotel?.HotelId === item.HotelId;
        var policy = item.SelectedPolicy;
        return (
            <>
                {this.state.isCustomized ?
                    <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black', opacity: 0.5, zIndex: 2 }} >
                        {this.state.isBrowsing ?
                            <ActivityIndicator size='large' color={R.colors.lightGreen} />
                            : null}
                    </View>
                    : null}
                <View key={"hotel-" + item.HotelId} style={{ flex: 1, flexDirection: 'column', backgroundColor: selected ? R.colors.blue : 'white', height: 200, marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {/* images */}
                        <View style={{ width: '30%', height: '100%' }}>
                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.openPictures(item.Images)}>
                                <View>
                                    <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                        <Icon name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                                    </View>
                                    <Image source={{ uri: item.Image }} style={{ width: "100%", height: '100%' }} />
                                </View>
                            </TouchableOpacity>
                        </View>

                        {/* details */}
                        <View style={{ width: '70%', flex: 1, flexDirection: 'column', padding: 10 }}>
                            {/* hotel name */}
                            <Text style={{ fontSize: 14, fontWeight: 'bold', color: selected ? 'white' : 'black' }}>
                                {item.HotelName}
                            </Text>

                            {/* rating + cost */}
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <RatingStars rating={rating} tag={item.HotelId} />
                                </View>
                                <Text style={{ fontWeight: 'bold', color: selected ? R.colors.lightGreen : 'black', alignSelf: 'flex-end', }}>
                                    + {item.SelectedCategory.ExtraCostPerFan} $
                            </Text>
                            </View>

                            {/* category */}
                            {item.SelectedCategory?.Name ? (
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <Image source={selected ? R.images.bedWhite : R.images.bedGrey} style={{ width: 25 }} />
                                    <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '80%', color: selected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>{item.SelectedCategory.Name}</Text>
                                </View>
                            ) : null}

                            {/* breakfast */}
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <Image source={selected ? R.images.coffeeCupWhite : R.images.coffeeCupGrey} style={{ width: 25 }} />
                                <Text style={{ color: selected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                    {item.SelectedCategory.NoBreakFast ? translate('noBreakfast') : translate('includeBreakfast')}
                                </Text>
                            </View>

                            {/* policy */}
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                {this.state.isGettingPolicy && selected ? (<ActivityIndicator size='small' color='white' />) : null}
                                {item.HasPolicy ?
                                    <>
                                        {policy.Refundable ?
                                            (<>
                                                <Image source={selected ? R.images.refundWhite : R.images.refundGrey} style={{ width: 25 }} />
                                                <Text style={{ color: selected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                                    {translate('refundable')}
                                                </Text>
                                                <Tooltip popover={<Text>{policy.RefundableText}</Text>} withOverlay={false} width={350} backgroundColor='white'>
                                                    <Image source={selected ? R.images.infoWhite : R.images.infoGrey} style={{ width: 25, height: 25, resizeMode: 'contain', marginStart: 10 }} />
                                                </Tooltip>
                                            </>
                                            )
                                            :
                                            (
                                                <>
                                                    <Image source={selected ? R.images.norefundWhite : R.images.norefundGrey} style={{ width: 25, height: 25, resizeMode: 'contain' }} />
                                                    <Text style={{ color: selected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                                        {translate('nonRefundable')}
                                                    </Text>
                                                </>
                                            )
                                        }
                                    </>
                                    : null}
                            </View>
                        </View>
                    </View>

                    {/* selection */}
                    <View style={{ borderTopWidth: 0.2 }}>
                        <CheckBox title={translate('selectHotel')}
                            checked={selected}
                            containerStyle={{ backgroundColor: selected ? R.colors.blue : 'white', borderWidth: 0 }}
                            checkedColor='white'
                            textStyle={{ color: selected ? 'white' : 'black', textTransform: 'uppercase' }}
                            center
                            checkedIcon='dot-circle-o'
                            uncheckedIcon='circle-o'
                            onPress={() => this.selectHotel(item)} />
                    </View>
                </View>
            </>
        );
    }

    renderHeader = () => {
        var bundleHotels = null;
        if (this.state.bundle?.MatchBundleHotels && this.state.bundle?.MatchBundleHotels?.length > 0) {
            var bundleHotels = [...this.state.bundle.MatchBundleHotels];
            bundleHotels.map((bundleHotel) => {
                var hotelList = [...bundleHotel.LocalHotels];
                if (bundleHotel.HotelList != null)
                    bundleHotel.HotelList.Items.map((hotel) => {
                        hotelList.push({ ...hotel })
                    })
                bundleHotel.HotelList = hotelList;
            })
        }
        return (
            <>
                {/* banner */}
                <HeaderBackground title={translate('customizeTrip')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} isCustomize={true} bundle={{ ...this.state.bundle }} addMatch={this.addMatch} />

                {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.blue} style={{ marginTop: 120, marginStart: 15 }} />
                    :
                    //* package details *//
                    <View style={{ marginStart: 15, marginEnd: 15, marginTop: 50 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
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
                                            {moment(this.state.bundle?.StartDate).format('DD.MM.yyy') + " - " + moment(this.state.bundle?.EndDate).format('DD.MM.yyyy')}
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
                                    <TouchableOpacity style={{ width: 25 }} onPress={this.decrementFan}>
                                        <Icon name='remove-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10 }}>
                                        {this.state.bundle?.NumberOfTravelers}
                                    </Text>
                                    <TouchableOpacity style={{ width: 25 }} onPress={this.incrementFan}>
                                        <Icon name='add-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        {/* hotels */}
                        <Hotels bundle={this.state.bundle} isCustomized={this.state.isCustomized} setIsCustomized={this.setIsCustomized} 
                        openPictures={this.openPictures} selectHotel={this.selectHotel} />
                    </View>
                }
            </>
        )
    }

    renderFooter = () => {
        return (
            <>
                {/* Footer View with Load More button */}
                {this.state.bundle?.HotelList != undefined && (this.state.bundle?.HotelList.PageCount > this.state.bundle?.HotelList.PageNumber) ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMoreHotels}
                        style={[R.styles.loadMoreButton, { marginTop: 10 }]}>
                        {this.state.isLoadingMore ?
                            <ActivityIndicator color="white" />
                            :
                            <Text style={R.styles.loadMoreText} >
                                {translate('loadMore')}
                            </Text>
                        }
                    </TouchableOpacity>
                ) : null}
                <View style={{ marginStart: 15, marginEnd: 15 }}>
                    {/* stadium */}
                    <Stadium matchBundleDetails={this.state.bundle?.MatchBundleDetail} selectSeat={this.selectSeat} />

                    {/* perks */}
                    <Perks perks={this.state.perks} selectPerk={this.selectPerk} />

                    {/* buttons */}
                    <View style={{ alignSelf: 'center', flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                        <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: 'black', alignItems: "center", justifyContent: "center" }}
                            onPress={this.cancel}>
                            <Text style={{ color: 'white', fontSize: 20, textTransform: 'uppercase' }}>
                                {translate('cancel')}
                            </Text>
                        </TouchableHighlight>
                        <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.lightGreen, alignItems: "center", justifyContent: "center" }}
                            onPress={this.continue}>
                            <Text style={{ color: 'black', fontSize: 20, textTransform: 'uppercase' }}>
                                {translate('continue')}
                            </Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </>
        );
    };

    hotelsKeyExtractor = (item) => {
        return 'hotel-' + item.HotelId
    }

    render() {
        return (
            <View style={styles.container}>

                <FlatList
                    data={this.state.hotelList}
                    extraData={this.state}
                    keyExtractor={this.hotelsKeyExtractor}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={null}
                    ListFooterComponent={this.renderFooter}
                />

                {/* date picker modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showDatePicker}>
                    <View style={styles.modalView}>
                        <DatepickerRange
                            startDate={moment(this.state.bundle?.StartDate).format("DDMMyyyy")}
                            untilDate={moment(this.state.bundle?.EndDate).add(1, 'year').format("DDMMyyyy")}
                            placeHolderStart='Start Date'
                            placeHolderUntil='Until Date'
                            selectedBackgroundColor={R.colors.blue}
                            buttonColor={R.colors.blue}
                            onClose={() => this.setState({ showDatePicker: false })}
                            onConfirm={(fromDate, toDate) => {
                                var bundle = { ...this.state.bundle };
                                bundle.StartDate = fromDate;
                                bundle.EndDate = toDate;
                                var details = { ...this.state.details };
                                details.TripDays = getTripDays(fromDate, toDate);
                                this.setState({ bundle, details, showDatePicker: false })
                            }
                            }
                        />
                    </View>
                </Modal>

                {/* filter modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showFilter}
                    onRequestClose={() => this.setState({ showFilter: false })}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            {/* logo + close */}
                            <View style={{ flex: 0, flexDirection: 'row', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                                <View style={{ width: '80%', padding: 10 }}>
                                    <Image source={R.images.flyfoot_grey}></Image>
                                </View>
                                <TouchableHighlight style={{ width: '20%', backgroundColor: R.colors.blue, alignContent: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.setState({ showFilter: false });
                                    }}>
                                    <Icon name='close-outline' style={styles.close} />
                                </TouchableHighlight>
                            </View>

                            {/* filters */}
                            <View style={{ flex: 1, flexDirection: 'column', height: '90%', backgroundColor: '#fff' }}>
                                {/* ratings */}
                                <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                    <Text style={{ textTransform: 'uppercase' }}>
                                        {translate('ratings')}:
                                    </Text>
                                    <CheckBox title={translate('3stars')}
                                        checked={this.state.bundle?.stars3}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        onPress={() => {
                                            var bundle = this.state.bundle;
                                            bundle.stars3 = !bundle.stars3;
                                            this.setState({ bundle, isCustomized: true })
                                        }}
                                    />
                                    <CheckBox title={translate('4stars')}
                                        checked={this.state.bundle?.stars4}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        onPress={() => {
                                            var bundle = this.state.bundle;
                                            bundle.stars4 = !bundle.stars4;
                                            this.setState({ bundle, isCustomized: true })
                                        }}
                                    />
                                    <CheckBox title={translate('5stars')}
                                        checked={this.state.bundle?.stars5}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        onPress={() => {
                                            var bundle = this.state.bundle;
                                            bundle.stars5 = !bundle.stars5;
                                            this.setState({ bundle, isCustomized: true })
                                        }}
                                    />
                                </View>

                                {/* add ons */}
                                <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                    <Text style={{ textTransform: 'uppercase' }}>
                                        {translate('addOns')}:
                                    </Text>
                                    <CheckBox title={translate('breakfastIncluded')}
                                        checked={this.state.bundle?.includeBreakfastSearch}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        onPress={() => {
                                            var bundle = this.state.bundle;
                                            bundle.includeBreakfastSearch = !bundle.includeBreakfastSearch;
                                            this.setState({ bundle, isCustomized: true })
                                        }}
                                    />
                                </View>

                                {/* sort by */}
                                <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                    <Text style={{ textTransform: 'uppercase' }}>
                                        {translate('sortBy')}:
                                    </Text>
                                    <DropDownPicker
                                        items={[
                                            { label: translate("cheapestFirst"), value: "cheapest" },
                                            { label: translate("topRated"), value: "rate" },
                                        ]}
                                        defaultValue={this.state.orderBy}
                                        containerStyle={{ height: 30 }}
                                        selectedLabelStyle={{ color: '#374bbf', textDecorationLine: 'underline' }}
                                        style={{ backgroundColor: "#EEEEEE", borderWidth: 0, width: 100 }}
                                        itemStyle={{ justifyContent: "flex-start", textTransform: 'uppercase' }}
                                        arrowStyle={{ color: 'black' }}
                                        dropDownStyle={{}}
                                        onChangeItem={(item) => {
                                            var bundle = this.state.bundle;
                                            bundle.sortHotelBy = item.value;
                                            this.setState({ bundle, isCustomized: true });
                                        }
                                        }
                                    />
                                </View>

                                {/* apply */}
                                <TouchableOpacity style={{ width: '50%', marginTop: 20, padding: 20, backgroundColor: R.colors.lightGreen, alignSelf: 'center' }}
                                    onPress={() => this.browseHotels}>
                                    <Text style={{ fontSize: 15, textTransform: 'uppercase', alignSelf: 'center' }}>
                                        {translate('applyFilters')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>

                {/* pictures modal */}
                <Modal visible={this.state.showPictures} transparent={true}
                    onRequestClose={() => this.setState({ showPictures: false })}>
                    <ImageViewer imageUrls={this.state.hotelImages} />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
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
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
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
    perksRow: { flexDirection: "row" },
    perkImage: { width: 42, height: 44 },
    perk: { width: "50%", alignItems: "center", height: 150, flex: 0, justifyContent: "center" },
    perkLabel: { fontSize: 13, marginTop: 15 },
    close: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
