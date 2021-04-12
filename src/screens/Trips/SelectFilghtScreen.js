import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Modal
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import { CheckBox } from 'react-native-elements';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import FlightItem from "components/Flights/FlightItem";
import { formatDetails } from "helpers/tripHelper.js";
import { get, post, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export default class SelectFlightScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bundle: props?.route?.params?.bundle,
            bundleCode: props?.route?.params?.bundleCode,
            hotelId: props?.route?.params?.hotelId,
            details: {},
            cities: [],
            airlines: [],
            flightClass: 2,
            selectedCity: '',
            selectedFlight: {
                combo: { Selected: false },
                pricedItinerary: {}
            },
            isLoading: true,
            isBrowsing: false,
            isLoadingMore: false,
            canContinue: false,
            showFilter: false,
            showFareRules: false,
            fareRulesInfo: ''
        };
    }

    componentDidMount() {
        try {
            this.init();
        } catch { }
    }

    init = async () => {
        var bundle = this.state.bundle;
        if (this.state.bundle == null || this.state.bundle == undefined) {
            bundle = await this.getBundle();
            await this.getCancelPolicy(bundle);
        }
        var details = formatDetails(bundle);
        var cities = await this.getCities();

        bundle.Days = details?.TripDays;
        bundle.CustomPageIsClicked = false;
        bundle.ExtraServiceCount = 0;
        bundle.flightClass = 2;
        bundle.firstGame = bundle?.MatchBundleDetail[0];
        bundle.sortHotelBy = "cheapest";
        if (bundle.OtherMatches == null)
            bundle.OtherMatches = [];
        bundle.RoomInfoList.map((room, index) => {
            room.ChildAges.ChildAge = [null, null];
            room.id = index+1;
        })

        delete bundle.RequestSource;
        
        this.setState({ bundle, details, cities, isLoading: false })
    }

    getBundle = () => {
        const params = `?customize=true&validateHotelPrice=false&hotelId=${this.state.hotelId}`;
        return get(servicesUrl.getGameV2 + this.state.bundleCode + params)
            .then((response) => {
                return response;
            });
    }

    getCancelPolicy = async (bundle) => {
        try {
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
                    if (response) {
                        var hotel = bundle.HotelList?.Items[0];
                        hotel.HasPolicy = true;
                        hotel.Policies = response;
                        hotel.SelectedPolicy = response.Policy[0];
                        bundle.SelectedHotel.HasPolicy = true;
                        bundle.SelectedHotel.Policies = response;
                        bundle.SelectedHotel.SelectedPolicy = response.Policy[0];
                    }
                });
        } catch { }
    }

    getCities = () => {
        return get(servicesUrl.getAmadeusCities)
            .then((response) => {
                var cities = response.map(function (city) {
                    return {
                        value: city.ID,
                        label: city.Value,
                    };
                });
                return cities;
            });
    }

    filterFlight = () => {
        if (!this.state.isBrowsing) {
            var bundle = this.state.bundle;
            if (this.state.flightClass != bundle.flightClass)
                this.searchFlights(this.state.selectedCity, bundle.flightClass);
            else {
                this.setState({ isBrowsing: true, showFilter: false }, function () {
                    var _this = this;
                    var params = `?pageNumber=1&pageSize=${bundle.FlightList.PageSize}`;
                    post(servicesUrl.getPagedFlights + params, bundle)
                        .then((response) => {
                            if (response && response.Items) {
                                var selectedFlight = {
                                    combo: { Selected: false },
                                    pricedItinerary: {}
                                }
                                response.Items.map(pi => {
                                    _this.initPricedItinerary(pi);
                                });
                                bundle.FlightList = response;

                                var airlines = response.Lookups.Airlines.map(function (airline) {
                                    return {
                                        value: airline.ID,
                                        label: airline.Value,
                                    };
                                });
                                this.setState({ bundle, airlines, selectedFlight, isBrowsing: false });
                            }
                        });
                })

            }
        }
    }

    loadMore = () => {
        if (!this.state.isLoadingMore) {
            this.setState({ isLoadingMore: true }, function () {
                var _this = this;
                var bundle = this.state.bundle;
                if (bundle) {
                    var params = `?pageNumber=${bundle.FlightList.PageNumber + 1}&pageSize=${bundle.FlightList.PageSize}`;
                    post(servicesUrl.getPagedFlights + params, bundle)
                        .then((response) => {
                            if (response && response.Items) {
                                response.Items.map(pi => {
                                    _this.initPricedItinerary(pi);
                                });
                                var items = [...bundle.FlightList.Items.push(response.Items)];
                                bundle.FlightList = response;
                                bundle.FlightList.Items = items;
                                this.setState({ bundle, isLoadingMore: false });
                            }
                        });
                }
            })
        }
    }

    searchFlights = (value, flightClass) => {
        if (value !== '' && !this.state.isBrowsing) {
            var _this = this;
            var selectedCity = value;
            var selectedFlight = {
                combo: { Selected: false },
                pricedItinerary: {}
            }
            var bundle = this.state.bundle;
            bundle.idDepartureCity = value;
            bundle.flightClass = flightClass;

            this.setState({ bundle, selectedCity, flightClass, selectedFlight, isBrowsing: true, showFilter: false }, function () {
                post(servicesUrl.searchFlights, bundle)
                    .then((response) => {
                        if (response) {
                            bundle.flightSession = response.Item2;
                            bundle.uniqueKeyFlight = response.Item3;

                            if (response.Item1 && response.Item1.Items) {
                                response.Item1.Items.map(pi => {
                                    _this.initPricedItinerary(pi);
                                });
                                bundle.FlightList = response.Item1;
                            }

                            var airlines = response.Item1.Lookups.Airlines.map(function (airline) {
                                return {
                                    value: airline.ID,
                                    label: airline.Value,
                                };
                            });

                            /*post(servicesUrl.searchFlightInventory, bundle)
                                .then((response) => {
                                    if (response) {
                                        response.map(pi => {
                                            _this.initPricedItinerary(pi);
                                        });
                                        bundle.FlightInventory = response;
                                    }
                                    //this.setState({ bundle, airlines, isBrowsing: false, isLoadingMore: false })
                                });*/
                            this.setState({ bundle, airlines, selectedCity, isBrowsing: false, isLoadingMore: false })
                        }
                    });
            });
        }
    }

    initPricedItinerary = (pi) => {
        var _this = this;
        pi.AirItinerary.OriginDestinationCombinations.map(odc => {
            odc.firstWay = pi.AirItinerary.OriginDestinationOptions.find(a => a.DirectionId == 0 && a.RefNumber === odc.IndexListLeft.toString());
            odc.secondWay = pi.AirItinerary.OriginDestinationOptions.find(a => a.DirectionId == 1 && a.RefNumber === odc.IndexListRight.toString());
            if (odc.firstWay.FlightSegment.length - 1 >= 1) {
                let lastDate = null;
                let beginDate = moment(odc.firstWay.FlightSegment[0].DepartureDateTime);
                let endDate = moment(odc.firstWay.FlightSegment[odc.firstWay.FlightSegment.length - 1].ArrivalDateTime);
                let totalLayover = 0;
                let totalDuration = 0;
                odc.firstWay.FlightSegment.map((fs, index) => {
                    if (lastDate) {
                        totalLayover = _this.getTotalMinutes(fs.DepartureDateTime, lastDate);
                        var hours = Math.floor(totalLayover / 60);
                        var mins = totalLayover % 60;

                        if (index === 1) {
                            fs.LayOver1Hours = hours;
                            fs.LayOver1Minutes = mins;
                        }

                        if (index === 2) {
                            fs.LayOver2Hours = hours;
                            fs.LayOver2Minutes = mins;
                        }
                    }

                    fs.FlightDuration = moment(fs.FlightDuration ? fs.FlightDuration : new Date(null));
                    totalDuration += (fs.FlightDuration.hour() * 60 + fs.FlightDuration.minutes());
                    totalDuration += totalLayover;
                    lastDate = fs.ArrivalDateTime;
                    fs.FlightDuration = fs.FlightDuration.format('lll');
                });
                if ((endDate.day() - beginDate.day()) > 0) {
                    odc.firstWay.NextDay = true;
                }
                var hours = Math.floor(totalDuration / 60);
                var mins = totalDuration % 60;
                odc.firstWay.TotalDuration = hours.toString() + "h " + mins.toString() + "min";
            }
            if (odc.secondWay.FlightSegment.length - 1 >= 1) {
                let lastDate = null;
                let beginDate = moment(odc.secondWay.FlightSegment[0].DepartureDateTime);
                let endDate = moment(odc.secondWay.FlightSegment[odc.secondWay.FlightSegment.length - 1].ArrivalDateTime);
                let totalLayover = 0;
                let totalDuration = 0;
                odc.secondWay.FlightSegment.map((fs, index) => {
                    if (lastDate) {
                        totalLayover = _this.getTotalMinutes(fs.DepartureDateTime, lastDate);
                        var hours = Math.floor(totalLayover / 60);
                        var mins = totalLayover % 60;

                        if (index === 1) {
                            fs.LayOver1Hours = hours;
                            fs.LayOver1Minutes = mins;
                        }

                        if (index === 2) {
                            fs.LayOver2Hours = hours;
                            fs.LayOver2Minutes = mins;
                        }
                    }

                    fs.FlightDuration = moment(fs.FlightDuration ? fs.FlightDuration : new Date(null));
                    totalDuration += (fs.FlightDuration.hour() * 60 + fs.FlightDuration.minutes());
                    totalDuration += totalLayover;
                    lastDate = fs.ArrivalDateTime;
                    fs.FlightDuration = fs.FlightDuration.format('lll')
                });
                if ((endDate.day() - beginDate.day()) > 0) {
                    odc.secondWay.NextDay = true;
                }
                var hours = Math.floor(totalDuration / 60);
                var mins = totalDuration % 60;
                odc.secondWay.TotalDuration = hours.toString() + "h " + mins.toString() + "min";
            }

            if (odc.firstWay.FlightSegment.length - 1 === 0) {
                totalDuration = 0;
            }
            odc;
        });

    };

    getTotalMinutes = (date1, date2) => {
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return firstDate.diff(secondDate, 'minutes');;
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        var bundle = this.state.bundle;
        bundle.SelectedFlight = this.state.selectedFlight.combo;
        var bodyRequest = {
            StartDate: moment(this.state.bundle.StartDate).format('YYYY-MM-DD'),
            EndDate: moment(this.state.bundle.EndDate).format('YYYY-MM-DD'),
            idCity: this.state.bundle.idCity,
            idMatch: this.state.bundle.idDefaultMatch,
            idMatchBundle: this.state.bundle.idMatchBundle
        }
        post(servicesUrl.getExtraServices, bodyRequest)
            .then((response) => {
                if (response.length == 0)
                    this.props.navigation.navigate('summary', { bundle: bundle })
                else
                    this.props.navigation.navigate('experiences', { bundle: bundle, extraServices: response })
            })
    }

    dontFlight = () => {
        var bundle = { ...this.state.bundle };
        bundle.NoFlight = !bundle.NoFlight;
        if (bundle.NoFlight) {
            bundle.SelectedFlight = null;
            bundle.FlightExtraPrice = 0;
            bundle.OnlineBookingFees = 0;
            bundle.FlightExtraPricePerFan = 0;
            bundle.OnlineBookingFeesPerFan = 0;
        }
        else {
            var selectedFlight = this.state.selectedFlight;
            if (selectedFlight.pricedItinerary) {
                bundle.FlightExtraPrice = selectedFlight.pricedItinerary.ItinTotalFare?.TotalFare?.Amount;
                bundle.OnlineBookingFees = selectedFlight.pricedItinerary?.ItinTotalFare?.TotalFare?.AmountPerFan;
                bundle.FlightExtraPricePerFan = selectedFlight.pricedItinerary?.ItinTotalFare?.TotalFare?.OnlineBookingFeesPerFan;
                bundle.OnlineBookingFeesPerFan = selectedFlight.pricedItinerary?.ItinTotalFare?.TotalFare?.OnlineBookingFees;
            }
        }
        var canContinue = bundle.NoFlight || this.state.selectedFlight.combo != null;
        this.setState({ bundle, canContinue });
    }

    selectFlight = (combo, airItineraryPricingInfo) => {
        var selectedFlight = this.state.selectedFlight;
        selectedFlight.combo.Selected = false;

        combo.Selected = true;
        selectedFlight.combo = combo;
        selectedFlight.pricedItinerary = airItineraryPricingInfo;

        var bundle = { ...this.state.bundle };
        if (!bundle.NoFlight) {
            bundle.FlightExtraPrice = airItineraryPricingInfo?.ItinTotalFare?.TotalFare?.Amount;
            bundle.FlightExtraPricePerFan = airItineraryPricingInfo?.ItinTotalFare?.TotalFare?.AmountPerFan;
            bundle.OnlineBookingFeesPerFan = airItineraryPricingInfo?.ItinTotalFare?.TotalFare?.OnlineBookingFeesPerFan;
            bundle.OnlineBookingFees = airItineraryPricingInfo?.ItinTotalFare?.TotalFare?.OnlineBookingFees;
        }
        var canContinue = bundle.NoFlight || selectedFlight.combo != null;
        this.setState({ bundle, selectedFlight, canContinue });
    }

    fareRules = (fareRulesInfo) => {
        this.setState({ fareRulesInfo, showFareRules: true })
    }

    keyExtractor = (item, index) => {
        return 'flight-' + index
    }

    renderItem = ({ item, index }) => {
        return <FlightItem item={item} index={index} selectFlight={this.selectFlight} sessionId={this.state.bundle?.flightSession} fareRules={this.fareRules} />
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.bundle.FlightList == undefined || this.state.bundle.FlightList.IsLastPage ? null
                    : (
                        <TouchableOpacity
                            activeOpacity={0.9}
                            onPress={this.loadMore}
                            style={R.styles.loadMoreButton}>
                            {this.state.isLoadingMore ?
                                <ActivityIndicator color="white" />
                                :
                                <Text style={R.styles.loadMoreText} >
                                    {translate('loadMore')}
                                </Text>
                            }
                        </TouchableOpacity>
                    )}
            </View>
        );
    };

    render() {
        return (
            <ScrollView style={styles.container}>

                {/* banner */}
                <HeaderBackground title={translate('selectYourFlight')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                    :
                    <>
                        {/* flight options */}
                        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                            {translate('flightOptions')}
                        </Text>
                        <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                            <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                                    {translate('tripDates')}
                                </Text>
                                <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                                    {moment(this.state.details.StartDate).format('DD.MM.YY')} - {moment(this.state.details.EndDate).format('DD.MM.YY')}
                                </Text>
                            </View>
                            <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate('flyingFrom')}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", }}>
                                    <Image source={R.images.location3} style={{ width: 15, height: 21, marginRight: 5 }} />
                                    <View style={{ flex: 1, borderBottomWidth: 1 }}>
                                        <Picker
                                            selectedValue={this.state.selectedCity}
                                            onValueChange={(itemValue) => this.searchFlights(itemValue, this.state.flightClass)}
                                            style={{ width: '100%', height: 40 }}
                                        >
                                            <Picker.Item key='none' label='' value='' />
                                            {this.state.cities?.map(function (city) { return <Picker.Item key={city.label} label={city.label} value={city.value} /> })}
                                        </Picker>
                                    </View>
                                </View>
                            </View>

                            {/* filter */}
                            <TouchableOpacity style={{ height: 60, backgroundColor: '#ccc' }} onPress={() => this.setState({ showFilter: true })}>
                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 16, color: '#222', textTransform: 'uppercase' }}>
                                        {translate('filter')}
                                    </Text>
                                    <Icon name='chevron-down-outline' style={{ fontSize: 16, color: '#222', marginStart: 5 }} />
                                </View>
                            </TouchableOpacity>
                        </View>
                        {/* render flights begin*/}
                        <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>
                            {this.state.isBrowsing ? <ActivityIndicator size="large" color={R.colors.lightGreen} />
                                :
                                <FlatList
                                    data={this.state.bundle?.FlightList?.Items}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                    ListFooterComponent={this.renderFooter.bind(this)}
                                />}
                            {/* render flights end*/}

                            {/* buttons begin */}
                            <View style={{ flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                                <TouchableOpacity style={R.styles.blackButton}
                                    onPress={this.goBack}>
                                    <Text style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}>
                                        {translate('back')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={this.state.canContinue ? R.styles.greenButton : R.styles.greyButton}
                                    onPress={this.continue}
                                    activeOpacity={this.state.canContinue ? 0 : 1}
                                    disabled={!this.state.canContinue}>
                                    <Text style={{ color: this.state.canContinue ? 'black' : 'white', fontSize: 16, textTransform: 'uppercase' }}>
                                        {translate('continue')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {/* buttons end*/}

                            <View style={{ marginTop: 20, marginBottom: 20 }}>
                                <CheckBox title={translate('dontWantFlights')}
                                    containerStyle={{ backgroundColor: R.colors.lightGrey, borderWidth: 0 }}
                                    checkedColor={R.colors.blue}
                                    textStyle={{ color: 'black' }}
                                    checked={this.state.bundle?.NoFlight}
                                    onPress={this.dontFlight} />
                            </View>
                        </View>
                    </>
                }

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
                                <ScrollView>
                                    {/* stops */}
                                    <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                        <Text style={{ textTransform: 'uppercase' }}>
                                            {translate('stops')}:
                                    </Text>
                                        <CheckBox title={translate('direct')}
                                            checked={this.state.bundle?.stopsDirect}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.stopsDirect = !bundle.stopsDirect;
                                                this.setState({ bundle })
                                            }}
                                        />
                                        <CheckBox title={translate('1stop')}
                                            checked={this.state.bundle?.stops1}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.stops1 = !bundle.stops1;
                                                this.setState({ bundle })
                                            }}
                                        />
                                        <CheckBox title={translate('2+stops')}
                                            checked={this.state.bundle?.stops2}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.stops2 = !bundle.stops2;
                                                this.setState({ bundle })
                                            }}
                                        />
                                    </View>

                                    {/* class */}
                                    <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                        <Text style={{ textTransform: 'uppercase' }}>
                                            {translate('class')}:
                                    </Text>
                                        <CheckBox title={translate('economyClass')}
                                            checked={this.state.flightClass == 2}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.flightClass = 2;
                                                this.setState({ bundle })
                                            }}
                                        />
                                        <CheckBox title={translate('businessClass')}
                                            checked={this.state.flightClass == 1}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.flightClass = 1;
                                                this.setState({ bundle })
                                            }}
                                        />
                                        <CheckBox title={translate('firstClass')}
                                            checked={this.state.flightClass == 0}
                                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                            checkedColor={R.colors.blue}
                                            checkedIcon='dot-circle-o'
                                            uncheckedIcon='circle-o'
                                            onPress={() => {
                                                var bundle = this.state.bundle;
                                                bundle.flightClass = 0;
                                                this.setState({ bundle })
                                            }}
                                        />
                                    </View>

                                    {/* airlines */}
                                    <View style={{ padding: 20, borderBottomColor: R.colors.lightGrey, borderBottomWidth: 1 }}>
                                        <Text style={{ textTransform: 'uppercase' }}>
                                            {translate('airlines')}:
                                    </Text>
                                        {this.state.airlines?.map((airline) => {
                                            return (<CheckBox key={'airline-' + airline.value} title={airline.label}
                                                checked={this.state.bundle?.filterAirlines?.includes(airline.value)}
                                                containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                                checkedColor={R.colors.blue}
                                                onPress={() => {
                                                    var bundle = this.state.bundle;
                                                    if (bundle.filterAirlines) {
                                                        if (bundle.filterAirlines.includes(airline.value))
                                                            bundle.filterAirlines = array.filter((value) => {
                                                                value != airline.value;
                                                            });
                                                        else
                                                            bundle.filterAirlines.push(airline.value);
                                                    }
                                                    else
                                                        bundle.filterAirlines = [airline.value];
                                                    this.setState({ bundle })
                                                }}
                                            />)
                                        })}
                                    </View>
                                </ScrollView>

                                {/* apply */}
                                <TouchableOpacity style={{ width: '50%', marginTop: 20, padding: 20, backgroundColor: R.colors.lightGreen, alignSelf: 'center' }}
                                    onPress={() => this.filterFlight}>
                                    <Text style={{ fontSize: 15, textTransform: 'uppercase', alignSelf: 'center' }}>
                                        {translate('applyFilters')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>


                {/* fare rules modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showFareRules}
                    onRequestClose={() => this.setState({ showFareRules: false })}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            {/* logo + close */}
                            <View style={{ flex: 0, flexDirection: 'row', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                                <View style={{ width: '80%', padding: 10 }}>
                                    <Image source={R.images.flyfoot_grey}></Image>
                                </View>
                                <TouchableHighlight style={{ width: '20%', backgroundColor: R.colors.blue, alignContent: 'center', justifyContent: 'center' }}
                                    onPress={() => {
                                        this.setState({ showFareRules: false });
                                    }}>
                                    <Icon name='close-outline' style={styles.close} />
                                </TouchableHighlight>
                            </View>

                            {/* info */}
                            <ScrollView style={{ flex: 1, height: '90%', backgroundColor: '#fff' }}>
                                <Text>this.state.fareRulesInfo</Text>
                            </ScrollView>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: R.colors.lightGrey
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    close: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
