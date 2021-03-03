import React, { useState } from "react";
import {
    Text,
    Image,
    View,
    TouchableOpacity,
} from "react-native";
import R from "res/R";
import {  translate } from "helpers/utils";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import Svg from 'react-native-remote-svg';
import moment from 'moment';

const FlightItem = ({ item }) => {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const Outbound = item.Destinations[0], Return = item.Destinations[1];
    const min = moment(Outbound.FlightSegment[Outbound.FlightSegment.length - 1].ArrivalDateTime).diff(moment(Outbound.FlightSegment[0].DepartureDateTime), "minutes");
    const time = Math.floor(min / 60) + "h " + (min % 60) + "min"
    const min2 = moment(Return.FlightSegment[Return.FlightSegment.length - 1].ArrivalDateTime).diff(moment(Return.FlightSegment[0].DepartureDateTime), "minutes");
    const time2 = Math.floor(min2 / 60) + "h " + (min2 % 60) + "min"

    return (
        <View style={{ flex: 1, flexDirection: 'column', marginTop: 20, backgroundColor: '#fff' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", padding: 15, paddingRight: 30 }}>
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
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", marginTop: 10, marginBottom: 10, padding: 15, paddingRight: 30, paddingTop: 0 }}>
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
                    <Text style={{ fontSize: 17.5, color: R.colors.green }}>${item.AmountPerFan}/<Text style={{ fontSize: 12 }}>1 fan roundtrip</Text></Text>
                </View>
                <View style={{ width: '50%', alignItems: 'center', justifyContent: "center", padding: 15 }}>
                    <BouncyCheckbox text={translate('selectFlight')} borderColor='black' fillColor={R.colors.blue}></BouncyCheckbox>
                </View>
            </View>
            <TouchableOpacity style={{ position: "absolute", top: 7, right: 7 }} onPress={() => setIsDetailsOpen(!isDetailsOpen)}>
                <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
            </TouchableOpacity>
            <View style={{ display: isDetailsOpen ? "flex" : "none", paddingStart: 30, paddingEnd: 30, paddingBottom: 30 }}>
                <Text style={{ fontSize: 21, fontWeight: "bold" }}>Outbound</Text>
                {Outbound.FlightSegment.map((fs, index) => {
                    return <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                                <Svg source={{ uri: fs.Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>{fs.Airline.Code} {fs.FlightNumber}-{fs.Airline.CompanyName}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", width: 70, paddingRight: 7 }}>
                                <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>2h 0m</Text>
                                <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 7 }}>
                                <Text style={{ width: "80%" }}>{moment(fs.DepartureDateTime).format("HH:mm") + " " + fs.DepartureAirport.LocationCode + " " + fs.DepartureAirport.CityName + " " + fs.DepartureAirport.AirportName} </Text>
                                <Text style={{ width: "80%" }}>{moment(fs.ArrivalTime).format("HH:mm") + " " + fs.ArrivalAirport.CityName + " " + fs.ArrivalAirport.AirportName} </Text>
                            </View>
                        </View>
                    </View>
                })}

                <Text style={{ fontSize: 21, fontWeight: "bold", marginTop: 30 }}>Return</Text>
                {Return.FlightSegment.map((fs, index) => {
                    return <View style={{ marginTop: 30 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                                <Svg source={{ uri: fs.Airline.LogoUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>{fs.Airline.Code} {fs.FlightNumber}-{fs.Airline.CompanyName}</Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", width: 70, paddingRight: 7 }}>
                                <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>2h 0m</Text>
                                <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                            </View>
                            <View style={{ flex: 1, paddingLeft: 7 }}>
                                <Text style={{ width: "80%" }}>{moment(fs.DepartureDateTime).format("HH:mm") + " " + fs.DepartureAirport.LocationCode + " " + fs.DepartureAirport.CityName + " " + fs.DepartureAirport.AirportName} </Text>
                                <Text style={{ width: "80%" }}>{moment(fs.ArrivalTime).format("HH:mm") + " " + fs.ArrivalAirport.CityName + " " + fs.ArrivalAirport.AirportName} </Text>
                            </View>
                        </View>
                    </View>
                })}

            </View>
        </View >
    );
};

export default FlightItem;