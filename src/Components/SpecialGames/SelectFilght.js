import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    FlatList
} from "react-native";
import Chat from "../FanChat/chat";
import R from "res/R";
import { get, post, servicesUrl } from "../../helpers/services.js";
import { translate } from "../../helpers/utils";
import { HeaderBackground } from "../Common/HeaderBackground";
import { LinearGradient } from "expo-linear-gradient";
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
        };
    }

    componentDidMount() {
        try {
            this.getData();
            this.getCities();
        } catch { }
    }

    getData = () => {
        const params = `?customize=true&validateHotelPrice=true&hotelId=${this.state.hotelId}&hotelSource=R`;
        //servicesUrl.getGameV2 + '/' + this.state.bundleCode + params
        const path = '/mobile/game/v2/EUR-19-20-ENG-CRO?customize=false&validateHotelPrice=true&hotelId=511819&hotelSource=R';
        get(path)
            .then((response) => {
                var game = response.MatchBundleDetail[0].Game;
                var hotel = {
                    HotelCode: response.HotelCode,
                    HotelName: response.HotelName,
                    HotelStars: response.HotelStars,
                    IncludeBreakfast: response.IncludeBreakfast,
                    HotelRoomType: response.HotelRoomType,
                    HotelRoomCategory: response.HotelRoomCategory,
                    NumberOfRooms: response.NumberOfRooms,
                    CancellationPolicyData: response.CancellationPolicyData,
                    FacilitiesData: response.FacilitiesData,
                    Image: response.Image,
                    Images: response.Images,
                    Notes: response.SharingRoomNote
                }
                var seating = response.MatchBundleDetail[0].GameSeat;
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
                    NumberOfTravelers: response.NumberOfTravelers,
                    BasePricePerFan: response.BasePricePerFan,
                    PricePerFan: response.PricePerFan,
                    FinalPrice: response.FinalPrice,
                    FinalPricePerFan: response.FinalPricePerFan,
                    SharingRoomNote: response.SharingRoomNote,
                }
                this.setState({ data: response, game: game, hotel: hotel, seating: seating, pearks: pearks, details: details })
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
        const Outboubnd = item.Destinations[0], Return = item.Destinations[1]; 

        return (
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, backgroundColor: 'white' }}>
                <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                    <Svg source={{ uri: Outboubnd.FlightSegment[0].Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>{moment(Outboubnd.FlightSegment[0].DepartureDateTime).format('HH:mm')}</Text>
                        <Text>{Outboubnd.FlightSegment[0].DepartureAirport.LocationCode}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>{moment(Outboubnd.FlightSegment[1].ArrivalDateTime).format('HH:mm')}</Text>
                        <Text>{Outboubnd.FlightSegment[1].ArrivalAirport.LocationCode}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                    <Svg source={{ uri: Return.FlightSegment[0].Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>{moment(Return.FlightSegment[0].DepartureDateTime).format('HH:mm')}</Text>
                        <Text>{Return.FlightSegment[0].DepartureAirport.LocationCode}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <Text>{moment(Return.FlightSegment[1].ArrivalDateTime).format('HH:mm')}</Text>
                        <Text>{Return.FlightSegment[1].ArrivalAirport.LocationCode}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <Text>${item.AmountPerFan}</Text>
                    </View>
                    <View style={{ width: '50%', alignItems: 'center' }}>
                        <BouncyCheckbox text={translate('selectFlight')} borderColor='black' fillColor={R.colors.blue}></BouncyCheckbox>
                    </View>
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
                            <ActivityIndicator color="#fff" />
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <HeaderBackground title={translate('selectYourFlight')} image={R.images.trip_bg}></HeaderBackground>
                <View style={{ flex: 1, flexDirection: 'column', alignSelf: 'center', width: '90%', marginTop: -50, backgroundColor: '#fff' }}>
                    <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>
                        <View style={{ width: '50%', alignSelf: 'flex-start' }} >
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <LinearGradient
                                    colors={[this.state.game.Team1Color1, this.state.game.Team1Color2]}
                                    style={styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={{ paddingStart: 5, fontSize: 16, fontWeight: 'bold', color: R.colors.blue }}>{this.state.game.HomeTeam}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 5 }}>
                                <LinearGradient
                                    colors={[this.state.game.Team2Color1, this.state.game.Team2Color2]}
                                    style={styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={{ paddingStart: 5, fontSize: 16, fontWeight: 'bold', color: R.colors.blue }}>{this.state.game.AwayTeam}</Text>
                            </View>
                        </View>
                        <View style={{ width: '50%', alignSelf: 'baseline', alignItems: 'flex-end' }} >
                            <Text style={{ fontWeight: 'bold', fontSize: 16, color: R.colors.blue }}>{moment(this.state.game.GameDate).format('D.MM.YY')}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '50%', alignContent: 'center', borderTopColor: 'grey', borderTopWidth: 0.2, borderBottomWidth: 0.2, borderBottomColor: 'grey', borderEndColor: 'grey', borderEndWidth: 0.2 }}>
                            <Text style={{ padding: 20, textTransform: 'uppercase' }}>04 {translate('days')}</Text>
                        </View>
                        <View style={{ width: '50%', alignContent: 'center', borderTopColor: 'grey', borderTopWidth: 0.2, borderBottomWidth: 0.2, borderBottomColor: 'grey' }}>
                            <Text style={{ padding: 20, textTransform: 'uppercase' }}>{this.state.game.City}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', padding: 20 }}>

                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                        {translate('flightOptions')}
                    </Text>
                    <View style={{ height: 200, marginTop: 10 }}>
                        <View style={{ height: '50%', backgroundColor: R.colors.lightGrey, padding: 20 }}>
                            <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                                {translate('tripDates')}
                            </Text>
                            <Text style={{ fontSize: 16, color: R.colors.blue, fontWeight: "bold", paddingTop: 10 }}>
                                {moment(this.state.details.StartDate).format('DD.MM.YY')} - {moment(this.state.details.EndDate).format('DD.MM.YY')}
                            </Text>
                        </View>
                        <View style={{ backgroundColor: 'white', padding: 20 }}>
                            <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                                {translate('flyingFrom')}
                            </Text>
                            <DropDownPicker
                                items={this.state.cities}
                                style={{
                                    marginBottom: 100,
                                    borderWidth: 0, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0,
                                    borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                                }}
                                itemStyle={{ justifyContent: "flex-start", }}
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
                                }
                                }
                                searchable={true}
                                searchablePlaceholder=''
                                searchableStyle={{ backgroundColor: '#dfdfdf' }}
                                searchableError={() => <Text>{translate('msgNotFound')}</Text>}
                            />
                        </View>
                    </View>

                    {/* render flights begin*/}
                    <View style={{ marginTop: 80 }}>
                        {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.green} />
                            :
                            <FlatList
                                data={this.state.flightsData}
                                renderItem={item => this.flightItem(item)}
                                keyExtractor={item => item.AmountPerFan.toString()}
                                ListFooterComponent={this.renderFooter.bind(this)}
                            />}
                    </View>
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

                <Chat />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        borderWidth: 0.5,
        height: 20,
        width: 20,
    },
    colorBlue: {
        color: R.colors.blue
    }
});
