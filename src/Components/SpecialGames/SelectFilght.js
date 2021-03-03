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
import BouncyCheckbox from "react-native-bouncy-checkbox";
import DropDownPicker from "react-native-dropdown-picker";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import FlightItem from "components/Flights/FlightItem";
import { get, post, servicesUrl } from "helpers/services.js";
import { getTripDays } from "helpers/tripHelper.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export default class SelectFlightScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bundle: props?.route?.params?.bundle,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: [],
            cities: [],
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
            this.initBundle();
            this.getCities();
        } catch { }
    }

    initBundle = () => {
        var bundle = this.state.bundle;
        var game = bundle.MatchBundleDetail[0].Game;
        var hotel = bundle.SelectedHotel;
        var seating = bundle.MatchBundleDetail[0].GameSeat;
        var perks = [
            {
                Title: translate('onSpotService'),
                Price: bundle.Price_OnSpot,
                Selected: true
            },
            {
                Title: translate('airportPickup'),
                Price: bundle.Price_AirtportPickup,
                Selected: bundle.Service_AirPortPickup
            },
            {
                Title: translate('airportDropOff'),
                Price: bundle.Price_AirportDropoff,
                Selected: bundle.Service_AirPortDropOff
            },
            {
                Title: translate('stadiumTour'),
                Price: bundle.Price_StadiumTour,
                Selected: bundle.Service_StadiumTour
            },
            {
                Title: translate('cityTour'),
                Price: bundle.Price_CityTour,
                Selected: bundle.Service_CityTour
            },
            /*{
                Title: translate('train'),
                Price: bundle.Price_Train,
                Selected: bundle.Service_Train
            },*/
            {
                Title: translate('insurance'),
                Price: bundle.Price_Insurance,
                Selected: bundle.Service_Insurance
            }
        ];
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
        this.setState({ game, hotel, seating, perks, details, isLoading: false })
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
        post(servicesUrl.searchFlights, this.state.bundle)
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
                this.setState({ flights: response.Item1.items, airlines, flightsData, pageCount: response.PageCount, isLoading: false, isLoadingMore: false })
            });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    keyExtractor = ({ item, index }) => {
        return 'flight' + index
    }

    renderItem = ({ item }) => {
        return <FlightItem item={item} />
    }

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
                <HeaderBackground title={translate('selectYourFlight')} image={R.images.trip_bg}/>

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
                                    var bundle = this.state.bundle;
                                    bundle.idDepartureCity = item.value;
                                    bundle.flightClass = 2;
                                    this.setState({ bundle, isLoading: true }, function () {
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
                    {this.state.isLoading ? <ActivityIndicator size="large" color={R.colors.lightGreen} />
                        :
                        <FlatList
                            data={this.state.flightsData}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            ListFooterComponent={this.renderFooter.bind(this)}
                            />}
                    {/* render flights end*/}

                    {/* buttons begin */}
                    <View style={{ zIndex: -5, flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                        <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.buttonBlack }}
                            onPress={this.goBack}
                        >
                            <Text style={{ color: 'white', fontSize: 20 }}>{translate('back')}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '50%', alignItems: 'center', justifyContent: 'center', textTransform: 'uppercase', backgroundColor: R.colors.buttonBlack }}
                            onPress={this.continue}
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
