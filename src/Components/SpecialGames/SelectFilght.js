import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    FlatList
} from "react-native";
import R from "res/R";
import { get, post, servicesUrl } from "../../helpers/services.js";
import { getTripDays, translate } from "../../helpers/utils";
import { HeaderBackground } from "../Common/HeaderBackground";
import { MatchHeader } from "../Trips/MatchHeader";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import Svg from 'react-native-remote-svg';
import moment from 'moment';

export default class SelectFlightScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idHotel: props?.route?.params?.idHotel,
            bundleCode: props?.route?.params?.bundleCode,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: [],
            cities: [],
            data: {},
            flights: [],
            flightsData: [],
            airlines: [],
            pageCount: 1,
            pageNumber: 1,
            isLoading: true,
            isLoadingMore: false,
            isVisibleDropdownPicker: false
        };
    }

    componentDidMount() {
        try {
            this.getData();
            this.getCities();
        } catch { }
    }

    getData = () => {
        const params = `?customize=true&validateHotelPrice=false&hotelId=-1`;
        get(servicesUrl.getGameV2 + this.state.bundleCode + params)
            .then((response) => {
                var game = response.MatchBundleDetail[0].Game;
                var hotel = response.SelectedHotel;
                var seating = response.MatchBundleDetail[0].GameSeat;
                var perks = [
                    {
                        Title: translate('onSpotService'),
                        Price: response.Price_OnSpot,
                        Selected: true
                    },
                    {
                        Title: translate('airportPickup'),
                        Price: response.Price_AirtportPickup,
                        Selected: response.Service_AirPortPickup
                    },
                    {
                        Title: translate('airportDropOff'),
                        Price: response.Price_AirportDropoff,
                        Selected: response.Service_AirPortDropOff
                    },
                    {
                        Title: translate('stadiumTour'),
                        Price: response.Price_StadiumTour,
                        Selected: response.Service_StadiumTour
                    },
                    {
                        Title: translate('cityTour'),
                        Price: response.Price_CityTour,
                        Selected: response.Service_CityTour
                    },
                    /*{
                        Title: translate('train'),
                        Price: response.Price_Train,
                        Selected: response.Service_Train
                    },*/
                    {
                        Title: translate('insurance'),
                        Price: response.Price_Insurance,
                        Selected: response.Service_Insurance
                    }
                ];
                var details = {
                    idMatchBundle: response.idMatchBundle,
                    BundleCode: response.BundleCode,
                    StartDate: response.StartDate,
                    EndDate: response.EndDate,
                    TripDays: getTripDays(response.StartDate, response.EndDate),
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

    searchFlights = () => {
        post(servicesUrl.searchFlights, this.state.data)
            .then((response) => {
                var airlines = response.Item1.Lookups.Airlines.map(function (airline) {
                    return {
                        value: airline.ID,
                        label: airline.Value,
                    };
                });
                var flightsData = response.Item1.Items.map(function (flight) {
                    var OriginDestinationOptions = [];
                    OriginDestinationOptions.push(flight.AirItinerary.OriginDestinationOptions[0]);
                    OriginDestinationOptions.push(flight.AirItinerary.OriginDestinationOptions[1]);
                    return {
                        Destinations:
                            OriginDestinationOptions.map(function (destination) {
                                return {
                                    FlightSegment:
                                        destination.FlightSegment.map(function (segment) {
                                            return {
                                                Airline: {
                                                    LogoUrl: segment.OperatingAirline.LogoUrl,
                                                    Code: segment.OperatingAirline.Code,
                                                    CompanyName: segment.OperatingAirline.CompanyShortName
                                                },
                                                DepartureAirport: {
                                                    AirportName: segment.DepartureAirport.AirportName,
                                                    CityName: segment.DepartureAirport.CityName,
                                                    CountryName: segment.DepartureAirport.CountryName,
                                                    LocationCode: segment.DepartureAirport.LocationCode,
                                                },
                                                ArrivalAirport: {
                                                    AirportName: segment.ArrivalAirport.AirportName,
                                                    CityName: segment.ArrivalAirport.CityName,
                                                    CountryName: segment.ArrivalAirport.CountryName,
                                                    LocationCode: segment.ArrivalAirport.LocationCode,
                                                },
                                                FlightNumber: segment.FlightNumber,
                                                DepartureDateTime: segment.DepartureDateTime,
                                                ArrivalDateTime: segment.ArrivalDateTime
                                            }
                                        })
                                }
                            }),
                        AmountPerFan: flight.AirItineraryPricingInfo.ItinTotalFare.TotalFare.AmountPerFan
                    }
                })
                this.setState({ flights: response.Item1.items, airlines: airlines, flightsData: flightsData, pageCount: response.PageCount, isLoading: false, isLoadingMore: false })
            });
    }

    Back = () => {
        this.props.navigation.navigate('tripoverview');
    };

    flightItem = ({ item }) => {
        const Outbound = item.Destinations[0], Return = item.Destinations[1];
        console.log(Outbound, Return);
        const min = moment(Outbound.FlightSegment[Outbound.FlightSegment.length - 1].ArrivalDateTime).diff(moment(Outbound.FlightSegment[0].DepartureDateTime), "minutes");
        const time = Math.floor(min / 60) + "h " + (min % 60) + "min"
        const min2 = moment(Return.FlightSegment[Return.FlightSegment.length - 1].ArrivalDateTime).diff(moment(Return.FlightSegment[0].DepartureDateTime), "minutes");
        const time2 = Math.floor(min2 / 60) + "h " + (min2 % 60) + "min"

        return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, backgroundColor: '#fff' }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", padding: 15 }}>
                    <Svg source={{ uri: Outbound.FlightSegment[0].Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                    <View style={{ flexDirection: 'column', marginStart: 10, width: 40 }}>
                        <Text style={{ fontWeight: "bold" }}>{moment(Outbound.FlightSegment[0].DepartureDateTime).format('HH:mm')}</Text>
                        <Text>{Outbound.FlightSegment[0].DepartureAirport.LocationCode}</Text>
                    </View>
                    <View style={{ flex: 1, paddingStart: 15, paddingEnd: 15, position: "relative" }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{time}</Text>
                        <View style={{ borderBottomWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            {Outbound.FlightSegment.map((value, index) => {
                                if (!index) return null
                                return <View style={{ width: 18, height: 18, marginStart: 4, marginEnd: 4, borderRadius: 15, backgroundColor: "#da353d", borderWidth: 3, borderColor: "#fff", marginBottom: -9 }}></View>
                            })}
                        </View>
                        <Text style={{ textAlign: "center", marginTop: 5, color: "#da353d" }}>{Outbound.FlightSegment.length - 1} Stop</Text>
                    </View>
                    <Image source={R.images.airplane} style={{ width: 20, height: 16, marginTop: 5, marginStart: 0, marginEnd: 8 }}></Image>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{moment(Outbound.FlightSegment[1].ArrivalDateTime).format('HH:mm')}</Text>
                        <Text>{Outbound.FlightSegment[1].ArrivalAirport.LocationCode}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", marginTop: 10, marginBottom: 10, padding: 15, paddingTop: 0 }}>
                    <Svg source={{ uri: Return.FlightSegment[0].Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                    <View style={{ flexDirection: 'column', marginStart: 10, width: 40 }}>
                        <Text style={{ fontWeight: "bold" }}>{moment(Return.FlightSegment[0].DepartureDateTime).format('HH:mm')}</Text>
                        <Text>{Return.FlightSegment[0].DepartureAirport.LocationCode}</Text>
                    </View>
                    <View style={{ flex: 1, paddingStart: 15, paddingEnd: 15, position: "relative" }}>
                        <Text style={{ textAlign: "center", fontWeight: "bold" }}>{time2}</Text>
                        <View style={{ borderBottomWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            {Return.FlightSegment.map((value, index) => {
                                if (!index) return null
                                return <View style={{ width: 18, height: 18, marginStart: 4, marginEnd: 4, borderRadius: 15, backgroundColor: "#da353d", borderWidth: 3, borderColor: "#fff", marginBottom: -9 }}></View>
                            })}
                        </View>
                        <Text style={{ textAlign: "center", marginTop: 5, color: "#da353d" }}>{Return.FlightSegment.length - 1} Stop</Text>
                    </View>
                    <Image source={R.images.airplane} style={{ width: 20, height: 16, marginTop: 5, marginStart: 0, marginEnd: 8 }}></Image>
                    <View>
                        <Text style={{ fontWeight: "bold" }}>{moment(Return.FlightSegment[1].ArrivalDateTime).format('HH:mm')}</Text>
                        <Text>{Return.FlightSegment[1].ArrivalAirport.LocationCode}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: "#eee" }}>
                    <View style={{ width: '50%', alignItems: 'center', justifyContent: "center", borderRightWidth: 1, borderColor: "#eee", padding: 15 }}>
                        <Text style={{ fontSize: 17.5, color: R.colors.green }}>${item.AmountPerFan}/<Text style={{ fontSize: 12 }}>/1 fan roundtrip</Text></Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center', justifyContent: "center", padding: 15 }}>
                        <BouncyCheckbox text={translate('selectFlight')} borderColor='black' fillColor={R.colors.blue}></BouncyCheckbox>
                    </View>
                </View>
            </View >
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
                        style={R.styles.loadMoreButton}>
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

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('selectYourFlight')} image={R.images.trip_bg}></HeaderBackground>

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} game={this.state.game} details={this.state.details} hotel={this.state.hotel} ticket={this.state.seating} perks={this.state.perks} />

                {/* flight options */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('flightOptions')}
                </Text>
                <View style={{ marginStart: 15, marginEnd: 15, backgroundColor: "white", marginTop: 30 }}>
                    <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate('tripDates')}</Text>
                        <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                            {moment(this.state.details.StartDate).format('DD.MM.YY')} - {moment(this.state.details.EndDate).format('DD.MM.YY')}
                        </Text>
                    </View>
                    <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate('flyingFrom')}</Text>
                        <View style={{ flexDirection: "row", alignItems: "center", zIndex: 10 }}>
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
                                        this.searchFlights();
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
                {/* render flights begin*/}
                <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>
                    {/* <View style={{ marginTop: 80 }}> */}
                    {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.green} />
                        :
                        <FlatList
                            data={this.state.flightsData}
                            renderItem={item => this.flightItem(item)}
                            keyExtractor={item => item.AmountPerFan.toString()}
                            ListFooterComponent={this.renderFooter.bind(this)}
                        />}
                    {/* </View> */}
                    {/* render flights end*/}

                    {/* buttons begin */}
                    <View style={{ zIndex: -5, flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                        <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.buttonBlack }}
                            onPress={this.Back}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>{translate('back')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.buttonBlack }}
                            onPress={this.Continue}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>{translate('continue')}</Text>
                        </TouchableOpacity>
                    </View>
                    {/* buttons end*/}

                    <View style={{ marginTop: 20, marginBottom: 20 }}>
                        <BouncyCheckbox text={translate('dontWantFlights')} borderRadius={0} borderColor='black' fillColor={R.colors.blue} />
                    </View>

                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    colorBlue: {
        color: R.colors.blue
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
});
