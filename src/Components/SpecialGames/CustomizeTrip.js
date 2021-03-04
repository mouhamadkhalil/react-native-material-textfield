import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
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
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import RatingStars from "components/Common/RatingStars";
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
            seating: {},
            seatingOptions: [],
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
                this.initBundle({...response});
            });
    }

    initBundle = (bundle = null) => {
        if (bundle == null)
            bundle = {...this.state.bundle};

        var game = bundle.MatchBundleDetail[0].Game;
        var hotel = {...bundle.SelectedHotel};

        // convert array of String to array of Objects 
        var hotelImages = getHotelImages(hotel.Images);

        var hotelList = bundle.HotelList.Items;
        var seating = bundle.MatchBundleDetail[0].GameSeat;
        var seatingOptions = bundle.MatchBundleDetail[0].GameSeats;
        var stadiumMap = seating.StadiumMap_SVG_v3;
        var perks = [
            {
                Title: translate('onSpotService'),
                Price: bundle.Price_OnSpot,
                Image: R.images.onspotWhite,
                ImageGrey: R.images.onspotGrey,
                Selected: true
            },
            {
                Title: translate('airportPickup'),
                Price: bundle.Price_AirtportPickup,
                Image: R.images.car,
                ImageGrey: R.images.carGrey,
                Selected: bundle.Service_AirPortPickup
            },
            {
                Title: translate('airportDropOff'),
                Price: bundle.Price_AirportDropoff,
                Image: R.images.car,
                ImageGrey: R.images.carGrey,
                Selected: bundle.Service_AirPortDropOff
            },
            {
                Title: translate('stadiumTour'),
                Price: bundle.Price_StadiumTour,
                Image: R.images.stadium,
                ImageGrey: R.images.stadiumGrey,
                Selected: bundle.Service_StadiumTour
            },
            {
                Title: translate('cityTour'),
                Price: bundle.Price_CityTour,
                Image: R.images.hotel,
                ImageGrey: R.images.hotelGrey,
                Selected: bundle.Service_CityTour
            },
            /*{
                Title: translate('train'),
                Price: bundle.Price_Train,
                Image: R.images.onspot,
                ImageGrey: R.images.onspotGrey,
                Selected: bundle.Service_Train
            },*/
            {
                Title: translate('insurance'),
                Price: bundle.Price_Insurance,
                Image: R.images.insurance,
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
        this.setState({ bundle, game, hotel, hotelImages, hotelList, seating, seatingOptions, stadiumMap, perks, details, isLoading: false },
            function () {
                this.getCancelPolicy(hotel.HotelId);
            })
    }

    getCancelPolicy = (hotelId) => {
        try {
            // check if the policy already exist
            const policy = this.state.cancelPolicies.find(policy => policy.HotelId === hotelId);

            if (policy != undefined)
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
                        hotelSource: "R",
                        hotelUniqueKey: bundle.uniqueKey,
                        idMatchBundle: bundle.MatchBundleDetail[0].idMatchBundle,
                        internalCode: null,
                        roomInfo: bundle.RoomInfoList
                    }
                    post(servicesUrl.viewCancelPolicy, cancelPolicyRequest)
                        .then((response) => {
                            bundle.SelectedHotel.Policies = response;
                            var cancelPolicy = response.Policy[0];
                            cancelPolicy.HotelId = bundle.SelectedHotel.HotelId;

                            var cancelPolicies = this.state.cancelPolicies;
                            cancelPolicies.push(cancelPolicy)
                            this.setState({ cancelPolicies, isGettingPolicy: false });
                        });
                })
            }
        } catch { }
    }

    browseHotels = () => {
        try {
            this.setState({ isBrowsing: true }, function () {
                var bundle = this.state.bundle;
                post(servicesUrl.searchHotel, bundle)
                    .then((response) => {
                        this.setState({ bundle: response, hotelList: response.HotelList.Items, isBrowsing: false, isCustomized: false })
                    });
            })
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

    openPictures = (images) => {
        var hotelImages = getHotelImages(images);
        this.setState({ hotelImages, showPictures: true });
    }

    selectHotel = (selectedHotel) => {
        try {
            var bundle = { ...this.state.bundle };
            var hotel = { ...bundle.SelectedHotel };
            selectedHotel.Selected = true;
            bundle.SelectedHotel = hotel = selectedHotel;
            this.setState({ bundle, hotel }, function () {
                this.getCancelPolicy(hotel.HotelId);
            })
        }
        catch { }
    };

    selectInfant = (index) => {
        var bundle = this.state.bundle;
        bundle.RoomInfoList[index].AdultNum.RQBedChild = !bundle.RoomInfoList[index].AdultNum.RQBedChild;
        if (bundle.RoomInfoList[index].AdultNum.RQBedChild)
            bundle.NumberOfChildren++;
        else
            bundle.NumberOfChildren--;
        this.setState({ bundle })
    }

    selectSeat = (option) => {
        var bundle = { ...this.state.bundle };
        var seating = { ...this.state.seating };
        option.Selected = true;
        bundle.MatchBundleDetail[0].GameSeat = seating = option;
        this.setState({ bundle, seating, stadiumMap: option.StadiumMap_SVG_v3 })
    }

    selectPerk = (index) => {
        if (index > 0) {
            var bundle = this.state.bundle;
            var perks = [...this.state.perks];
            perks[index].Selected = !perks[index].Selected;
            switch (index) {
                case 1:
                    bundle.Service_AirPortPickup = perks[index].Selected;
                    break;
                case 2:
                    bundle.Service_AirPortDropOff = perks[index].Selected;
                    break;
                case 3:
                    bundle.Service_StadiumTour = perks[index].Selected;
                    break;
                case 4:
                    bundle.Service_CityTour = perks[index].Selected;
                    break;
                case 5:
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
        this.props.navigation.navigate('tripoverview', { bundleCode: this.state.bundleCode });
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

    hotelItem = ({ item, index }) => {
        var rating = parseInt(item.Rating);
        var selected = this.state.bundle?.SelectedHotel?.HotelId === item.HotelId;
        var policy = this.state.cancelPolicies.find(p => p.HotelId === item.HotelId);
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: selected ? R.colors.blue : 'white', height: 200, marginTop: 10 }}>
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
                            {policy != undefined ?
                                <>
                                    {policy.Refundable ?
                                        (<>
                                            <Image source={selected ? R.images.refundWhite : R.images.refundGrey} style={{ width: 25 }} />
                                            <Text style={{ color: selected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                                {translate('refundable')}
                                            </Text>
                                            <Tooltip popover={<Text>{policy.RefundableText}</Text>} withOverlay={false} width={350} backgroundColor='white'>
                                                <Image source={selected ? R.images.infoWhite : R.images.infoGrey} style={{ width: 25 }} />
                                            </Tooltip>
                                        </>
                                        )
                                        :
                                        (
                                            <>
                                                <Image source={selected ? R.images.norefundWhite : R.images.norefundGrey} style={{ width: 25 }} />
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
        );
    };

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
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
            </View>
        );
    };

    renderPerks = () => {
        const perks = this.state.perks.filter((perk, index) => (perk.Price != null && perk.Price > 0) || index == 0);
        return perks.map((perk, index) => {
            return (
                index % 2 == 0 ? (
                    <View key={'perk' + index} style={styles.perksRow}>
                        <TouchableOpacity style={[styles.perk], { backgroundColor: perks[index].Selected ? R.colors.blue : '#fff' }}
                            onPress={() => this.selectPerk(index)}>
                            {index == 0 ? null :
                                <CheckBox
                                    checked={perks[index].Selected}
                                    containerStyle={{ backgroundColor: perks[index].Selected ? R.colors.blue : 'white', borderWidth: 0 }}
                                    checkedColor='white'
                                    onPress={() => this.selectPerk(index)} />
                            }
                            <Image source={perks[index].Selected ? perks[index].Image : perks[index].ImageGrey} style={styles.perkImage} />
                            <Text style={[styles.perkLabel, { color: perks[index].Selected ? '#fff' : '#ddd' }]}>
                                {perks[index].Title}
                            </Text>
                        </TouchableOpacity>
                        {perks[index + 1] != undefined ?
                            <TouchableOpacity style={[styles.perk], { backgroundColor: perks[index + 1].Selected ? R.colors.blue : '#fff' }}
                                onPress={() => this.selectPerk(index + 1)}>
                                <CheckBox
                                    checked={perks[index + 1].Selected}
                                    containerStyle={{ backgroundColor: perks[index + 1].Selected ? R.colors.blue : 'white', borderWidth: 0 }}
                                    checkedColor='white'
                                    onPress={() => this.selectPerk(index + 1)} />
                                <Image source={perks[index + 1].Selected ? perks[index + 1].Image : perks[index + 1].ImageGrey} style={styles.perkImage} />
                                <Text style={[styles.perkLabel, { color: perks[index + 1].Selected ? '#fff' : '#ddd' }]}>
                                    {perks[index + 1].Title}
                                </Text>
                            </TouchableOpacity>
                            : null
                        }
                    </View>)
                    : null
            )
        })
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('customizeTrip')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{...this.state.bundle}} />

                {/* package details */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('semiPackageDetails')}
                    </Text>
                    {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.blue} style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
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
                        </>
                    }
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
                            <View style={{ height: '100%' }} >
                                <FlatList
                                    data={this.state.bundle?.RoomInfoList}
                                    renderItem={this.roomItem}
                                    keyExtractor={(index) => index.toString()}
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

                    {/* hotels list */}
                    <View style={{ marginTop: 20 }}>
                        {this.state.isCustomized ?
                            <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black', opacity: 0.5, zIndex: 2 }} >
                                {this.state.isBrowsing ?
                                    <ActivityIndicator size='large' color={R.colors.lightGreen} />
                                    : null}
                            </View>
                            : null}
                        <FlatList
                            data={this.state.hotelList}
                            renderItem={this.hotelItem}
                            keyExtractor={item => item.HotelId}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>
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
                            <Svg source={{ uri: this.state.stadiumMap }}
                                style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
                        </View>
                    </View>

                    {/* seating options */}
                    <View style={{ backgroundColor: 'white', padding: 20 }}>
                        <Text style={{ fontSize: 14, color: "gray", fontWeight: "bold", textTransform: 'uppercase' }}>
                            {translate('seatingOptions')}
                        </Text>
                        <View>
                            {this.state.seatingOptions.map((option, index) => {
                                const checked = this.state.seating.SeatCode === option.SeatCode;
                                return (
                                    <CheckBox key={'seat' + index} title={
                                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <Text style={{ color: checked ? 'white' : 'black' }}>{option.SeatCode}</Text>
                                            <Text style={{ color: checked ? 'white' : 'black' }}>+{option.ExtraCostPerFan}$</Text>
                                        </View>}
                                        checked={checked}
                                        containerStyle={{ backgroundColor: checked ? R.colors.blue : 'white', borderWidth: 0 }}
                                        checkedColor='white'
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        onPress={() => this.selectSeat(option)}
                                    />
                                );
                            })}
                        </View>
                    </View>
                </View>

                {/* perks */}
                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('perks')}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
                        {this.renderPerks()}
                    </View>
                </View>

                {/* buttons */}
                <View style={{ marginStart: 15, marginEnd: 15, alignSelf: 'center', flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
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
                            <View style={{ flex: 1, flexDirection: 'row', height: '10%', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
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
                                        dropDownStyle={{ width: 100 }}
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
    perksRow: { flexDirection: "row", justifyContent: "space-between" },
    perkImage: { width: 42, height: 44 },
    perk: { width: "50%", alignItems: "center", height: 100 },
    perkLabel: { fontSize: 13, marginTop: 15 },
    close: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
