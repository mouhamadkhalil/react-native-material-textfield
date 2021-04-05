import React, { useState } from "react";
import {
    Text,
    Image,
    View,
    TouchableOpacity,
} from "react-native";
import R from "res/R";
import { translate } from "helpers/utils";
import { CheckBox, Tooltip } from 'react-native-elements';
import Svg from 'react-native-remote-svg';
import { get, servicesUrl } from "helpers/services";
import moment from 'moment';

const FlightItem = ({ item, index, selectFlight, sessionId, fareRules }) => {
    var combo = item?.AirItinerary?.OriginDestinationCombinations[0]
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const expand = (combo) => {
        setIsDetailsOpen(!isDetailsOpen);
        if (!combo.FareRules) {
            var params = `?combinationID=${combo.CombinationID.toString()}&recommendationID=${combo.RecommendationIDSpecified.toString()}`;
            params += '&passengerType=ADT&isOneWayCombinable=false&miniRuleEnabled=1&priceMessageEnabled=1&flightRuleEnabled=1&fareFamilyPackageID=0'
            params += `&sessionId=${sessionId}`
            get(servicesUrl.GetFlightRule + params)
                .then((response) => {
                    combo.FareRules = response;
                });
        }
    }

    return (
        combo?
        <View key={'flight-' + index} style={{ flex: 1, flexDirection: 'column', marginTop: 20, backgroundColor: combo.Selected ? R.colors.blue : 'white' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", padding: 15, paddingRight: 30 }}>
                <Svg source={{ uri: combo?.firstWay?.FlightSegment[0]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                <View style={{ flexDirection: 'column', marginStart: 10, width: 40 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {moment(combo?.firstWay?.FlightSegment[0]?.DepartureDateTime).format('HH:mm')}
                    </Text>
                    <Text>
                        {combo?.firstWay?.FlightSegment[0]?.DepartureAirport?.LocationCode}
                    </Text>
                </View>
                <View style={{ flex: 1, paddingStart: 15, paddingEnd: 15, position: "relative" }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        {combo?.firstWay?.TotalDuration}
                    </Text>
                    <View style={{ borderBottomWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {combo?.firstWay?.FlightSegment?.map((value, index) => {
                            if (!index) return null
                            return <View key={'segment-' + index} style={{ width: 18, height: 18, marginStart: 4, marginEnd: 4, borderRadius: 15, backgroundColor: "#da353d", borderWidth: 3, borderColor: "#fff", marginBottom: -9 }}></View>
                        })}
                    </View>
                    <Text style={{ textAlign: "center", marginTop: 5, color: "#da353d" }}>
                        {combo?.firstWay?.FlightSegment?.length - 1 === 0 ? 'Direct' : combo?.firstWay?.FlightSegment?.length - 1 === 1 ? '1 Stop' : '2 Stops'}
                    </Text>
                </View>
                <Image source={R.images.airplane} style={{ width: 20, height: 16, marginTop: 5, marginStart: 0, marginEnd: 8 }} />
                <View>
                    <View style={R.styles.flexRow}>
                        <Text style={{ fontWeight: "bold" }}>
                            {moment(combo?.firstWay?.FlightSegment[combo?.firstWay?.FlightSegment?.length - 1]?.ArrivalDateTime).format('HH:mm')}
                        </Text>
                        {combo?.firstWay?.NextDay ?
                            <Tooltip popover={<Text>Arrives on {moment(combo?.firstWay?.FlightSegment[combo?.firstWay?.FlightSegment?.length -
                                1]?.ArrivalDateTime).format('dddd - DD.MM.YY')}</Text>} withOverlay={false} width={200} backgroundColor='white'>
                                <Text style={{ color: 'red' }}>+1</Text>
                            </Tooltip>
                            : null}
                    </View>
                    <Text>
                        {combo?.firstWay?.FlightSegment[combo?.firstWay?.FlightSegment?.length - 1]?.ArrivalAirport?.LocationCode}
                    </Text>
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row', alignItems: "center", marginTop: 10, marginBottom: 10, padding: 15, paddingRight: 30, paddingTop: 0 }}>
                <Svg source={{ uri: combo?.secondWay?.FlightSegment[0]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                <View style={{ flexDirection: 'column', marginStart: 10, width: 40 }}>
                    <Text style={{ fontWeight: "bold" }}>
                        {moment(combo?.secondWay?.FlightSegment[0]?.DepartureDateTime).format('HH:mm')}
                    </Text>
                    <Text>
                        {combo?.secondWay?.FlightSegment[0]?.DepartureAirport?.LocationCode}
                    </Text>
                </View>
                <View style={{ flex: 1, paddingStart: 15, paddingEnd: 15, position: "relative" }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold" }}>
                        {combo?.secondWay?.TotalDuration}
                    </Text>
                    <View style={{ borderBottomWidth: 1, width: "100%", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        {combo?.firstWay?.FlightSegment?.map((value, index) => {
                            if (!index) return null
                            return <View key={'segment-' + index} style={{ width: 18, height: 18, marginStart: 4, marginEnd: 4, borderRadius: 15, backgroundColor: "#da353d", borderWidth: 3, borderColor: "#fff", marginBottom: -9 }}></View>
                        })}
                    </View>
                    <Text style={{ textAlign: "center", marginTop: 5, color: "#da353d" }}>
                        {combo?.secondWay?.FlightSegment.length - 1} Stop
                    </Text>
                </View>
                <Image source={R.images.airplane} style={{ width: 20, height: 16, marginTop: 5, marginStart: 0, marginEnd: 8 }}></Image>
                <View>
                    <View style={R.styles.flexRow}>
                        <Text style={{ fontWeight: "bold" }}>
                            {moment(combo?.secondWay?.FlightSegment[combo?.secondWay?.FlightSegment?.length - 1]?.ArrivalDateTime).format('HH:mm')}
                        </Text>
                        {combo?.secondWay?.NextDay ?
                            <Tooltip popover={<Text>Arrives on {moment(combo?.secondWay?.FlightSegment[combo?.secondWay?.FlightSegment?.length -
                                1]?.ArrivalDateTime).format('dddd - DD.MM.YY')}</Text>} withOverlay={false} width={200} backgroundColor='white'>
                                <Text style={{ color: 'red' }}>+1</Text>
                            </Tooltip>
                            : null}
                    </View>
                    <Text>
                        {combo?.secondWay?.FlightSegment[1].ArrivalAirport.LocationCode}
                    </Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', borderTopWidth: 1, borderColor: "#eee" }}>
                {/* price */}
                <View style={{ width: '50%', alignItems: 'center', justifyContent: "center", borderRightWidth: 1, borderColor: "#eee", padding: 15 }}>
                    <Text style={{ fontSize: 17.5, color: R.colors.green }}>
                        ${item?.AirItineraryPricingInfo?.ItinTotalFare?.TotalFare?.AmountPerFan}/<Text style={{ fontSize: 12 }}>1 fan roundtrip</Text>
                    </Text>
                </View>
                {/* checkbox */}
                <View style={{ width: '50%', alignItems: 'center', justifyContent: "center", padding: 15 }}>
                    <CheckBox title={translate('selectFlight')}
                        checked={combo.Selected}
                        containerStyle={{ backgroundColor: combo.Selected ? R.colors.blue : 'white', borderWidth: 0 }}
                        checkedColor='white'
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        textStyle={{ color: 'black' }}
                        onPress={() => selectFlight(combo, item.AirItineraryPricingInfo)} />
                </View>
            </View>
            <TouchableOpacity style={{ position: "absolute", top: 7, right: 7 }} onPress={() => expand(combo)}>
                <Image source={R.images.arrow_down} style={{ height: 14, width: 12 }} />
            </TouchableOpacity>

            {/* details */}
            <View style={{ display: isDetailsOpen ? "flex" : "none", paddingStart: 15, paddingEnd: 15, paddingBottom: 30 }}>
                {/* outbound */}
                <Text style={{ fontSize: 21, fontWeight: "bold" }}>
                    {translate('outbound')}
                </Text>
                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                            <Svg source={{ uri: combo?.firstWay?.FlightSegment[0]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>
                            {combo?.firstWay?.FlightSegment[0]?.MarketingAirline?.Code}
                            {combo?.firstWay?.FlightSegment[0]?.FlightNumber} -
                                    {combo?.firstWay?.FlightSegment[0]?.MarketingAirline?.CompanyShortName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", width: 80, paddingRight: 7 }}>
                            {combo?.firstWay?.FlightSegment[0]?.FlightDuration ?
                                <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>
                                    {moment(combo?.firstWay?.FlightSegment[0]?.FlightDuration).format('hh') + 'h ' + moment(combo?.firstWay?.FlightSegment[0]?.FlightDuration).format('mm') + 'm'}
                                </Text>
                                : null}
                            <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ width: "80%" }}>
                                {moment(combo?.firstWay?.FlightSegment[0]?.DepartureDateTime).format("HH:mm") + " " + combo?.firstWay?.FlightSegment[0]?.DepartureAirport?.LocationCode + " " + combo?.firstWay?.FlightSegment[0]?.DepartureAirport?.CityName + " - " + combo?.firstWay?.FlightSegment[0]?.DepartureAirport?.AirportName}
                            </Text>
                            <Text style={{ width: "80%" }}>
                                {moment(combo?.firstWay?.FlightSegment[0]?.ArrivalDateTime).format("HH:mm") + " " + combo?.firstWay?.FlightSegment[0]?.ArrivalAirport?.LocationCode + " " + combo?.firstWay?.FlightSegment[0]?.ArrivalAirport?.CityName + " - " + combo?.firstWay?.FlightSegment[0]?.ArrivalAirport?.AirportName}
                            </Text>
                        </View>
                    </View>
                    {combo?.firstWay?.FlightSegment.length > 1 ?
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ width: 80, fontWeight: 'bold', textAlign: "center" }} >
                                {combo?.firstWay?.FlightSegment[1]?.LayOver1Hours + 'h ' + combo?.firstWay?.FlightSegment[1]?.LayOver1Minutes + 'm'}
                            </Text>
                            <Text style={{ marginStart: 20, fontWeight: 'bold' }}>Connect in airport</Text>
                        </View>
                        : null}
                </View>
                {combo?.firstWay?.FlightSegment?.length > 1 ?
                    <View style={{ marginTop: 10 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                                <Svg source={{ uri: combo?.firstWay?.FlightSegment[1]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>
                                {combo?.firstWay?.FlightSegment[1]?.MarketingAirline?.Code}
                                {combo?.firstWay?.FlightSegment[1]?.FlightNumber} -
                                    {combo?.firstWay?.FlightSegment[1]?.MarketingAirline?.CompanyShortName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", width: 80, paddingRight: 7 }}>
                                {combo?.firstWay?.FlightSegment[1]?.FlightDuration ?
                                    <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>
                                        {moment(combo?.firstWay?.FlightSegment[1]?.FlightDuration).format('hh') + 'h ' + moment(combo?.firstWay?.FlightSegment[1]?.FlightDuration).format('mm') + 'm'}
                                    </Text>
                                    : null}
                                <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ width: "80%" }}>
                                    {moment(combo?.firstWay?.FlightSegment[1]?.DepartureDateTime).format("HH:mm") + " " + combo?.firstWay?.FlightSegment[1]?.DepartureAirport?.LocationCode + " " + combo?.firstWay?.FlightSegment[1]?.DepartureAirport?.CityName + " - " + combo?.firstWay?.FlightSegment[1]?.DepartureAirport?.AirportName}
                                </Text>
                                <Text style={{ width: "80%" }}>
                                    {moment(combo?.firstWay?.FlightSegment[1]?.ArrivalDateTime).format("HH:mm") + " " + combo?.firstWay?.FlightSegment[1]?.ArrivalAirport?.LocationCode + " " + combo?.firstWay?.FlightSegment[1]?.ArrivalAirport?.CityName + " - " + combo?.firstWay?.FlightSegment[1]?.ArrivalAirport?.AirportName}
                                </Text>
                            </View>
                        </View>
                        {combo?.firstWay?.FlightSegment.length > 2 ?
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ width: 80, fontWeight: 'bold', textAlign: "center" }} >
                                    {combo?.firstWay?.FlightSegment[2]?.LayOver2Hours + 'h ' + combo?.firstWay?.FlightSegment[2]?.LayOver2Minutes + 'm'}
                                </Text>
                                <Text style={{ marginStart: 20, fontWeight: 'bold' }}>Connect in airport</Text>
                            </View>
                            : null}
                    </View>
                    : null
                }
                <View style={[R.styles.flexRow, { marginTop: 10 }]}>
                    <View style={{ width: 80 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>Bag fees:</Text>
                        <View style={[R.styles.flexRow, { marginTop: 5 }]}>
                            <Text style={{ width: 110 }}>Carry on:</Text>
                            <Text style={{ marginStart: 5 }}>No fees</Text>
                        </View>
                        <View style={R.styles.flexRow}>
                            <Text style={{ width: 110 }}>1st Checked Bag:</Text>
                            <Text style={{ marginStart: 5 }}>No fees</Text>
                        </View>
                    </View>
                </View>

                {/* return */}
                <Text style={{ fontSize: 21, fontWeight: "bold", marginTop: 30 }}>
                    Return
                        </Text>
                <View style={{ marginTop: 30 }}>
                    <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                            <Svg source={{ uri: combo?.secondWay?.FlightSegment[0]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                        </View>
                        <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>
                            {combo?.secondWay?.FlightSegment[0]?.MarketingAirline?.Code}
                            {combo?.secondWay?.FlightSegment[0]?.FlightNumber} -
                                    {combo?.secondWay?.FlightSegment[0]?.MarketingAirline?.CompanyShortName}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                        <View style={{ flexDirection: "row", alignItems: "center", width: 80, paddingRight: 7 }}>
                            {combo?.secondWay?.FlightSegment[0]?.FlightDuration ?
                                <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>
                                    {moment(combo?.secondWay?.FlightSegment[0]?.FlightDuration).format('hh') + 'h ' + moment(combo?.secondWay?.FlightSegment[0]?.FlightDuration).format('mm') + 'm'}
                                </Text>
                                : null}
                            <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={{ width: "80%" }}>
                                {moment(combo?.secondWay?.FlightSegment[0]?.DepartureDateTime).format("HH:mm") + " " + combo?.secondWay?.FlightSegment[0]?.DepartureAirport?.LocationCode + " " + combo?.secondWay?.FlightSegment[0]?.DepartureAirport?.CityName + " - " + combo?.secondWay?.FlightSegment[0]?.DepartureAirport?.AirportName}
                            </Text>
                            <Text style={{ width: "80%" }}>
                                {moment(combo?.secondWay?.FlightSegment[0]?.ArrivalDateTime).format("HH:mm") + " " + combo?.secondWay?.FlightSegment[0]?.ArrivalAirport?.LocationCode + " " + combo?.secondWay?.FlightSegment[0]?.ArrivalAirport?.CityName + " - " + combo?.secondWay?.FlightSegment[0]?.ArrivalAirport?.AirportName}
                            </Text>
                        </View>
                    </View>
                    {combo?.secondWay?.FlightSegment.length > 1 ?
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                            <Text style={{ width: 80, fontWeight: 'bold', textAlign: "center" }} >
                                {combo?.secondWay?.FlightSegment[1]?.LayOver1Hours + 'h' + combo?.secondWay?.FlightSegment[1]?.LayOver1Minutes + 'm'}
                            </Text>
                            <Text style={{ marginStart: 20, fontWeight: 'bold' }}>Connect in airport</Text>
                        </View>
                        : null}
                </View>
                {combo?.secondWay?.FlightSegment?.length > 1 ?
                    <View style={{ marginTop: 5 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                            <View style={{ width: 70, alignItems: "flex-end", paddingRight: 7 }}>
                                <Svg source={{ uri: combo?.secondWay?.FlightSegment[1]?.MarketingAirline?.LogoUrl }} style={{ width: 30, height: 30 }} />
                            </View>
                            <Text style={{ color: "#9f9f9f", flex: 1, paddingLeft: 7 }}>
                                {combo?.secondWay?.FlightSegment[1]?.MarketingAirline?.Code}
                                {combo?.secondWay?.FlightSegment[1]?.FlightNumber} -
                                    {combo?.secondWay?.FlightSegment[1]?.MarketingAirline?.CompanyShortName}
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 15 }}>
                            <View style={{ flexDirection: "row", alignItems: "center", width: 80, paddingRight: 7 }}>
                                {combo?.secondWay?.FlightSegment[1]?.FlightDuration ?
                                    <Text style={{ flex: 1, marginRight: 7, textAlign: "right" }}>
                                        {moment(combo?.secondWay?.FlightSegment[1]?.FlightDuration).format('hh') + 'h ' + moment(combo?.secondWay?.FlightSegment[1]?.FlightDuration).format('mm') + 'm'}
                                    </Text>
                                    : null}
                                <Svg source={R.images.connectionIcon} style={{ width: 10, height: 30 }} />
                            </View>
                            <View style={{ flex: 1 }}>
                                <Text style={{ width: "80%" }}>
                                    {moment(combo?.secondWay?.FlightSegment[1]?.DepartureDateTime).format("HH:mm") + " " + combo?.secondWay?.FlightSegment[1]?.DepartureAirport?.LocationCode + " " + combo?.secondWay?.FlightSegment[1]?.DepartureAirport?.CityName + " - " + combo?.secondWay?.FlightSegment[1]?.DepartureAirport?.AirportName}
                                </Text>
                                <Text style={{ width: "80%" }}>
                                    {moment(combo?.secondWay?.FlightSegment[1]?.ArrivalDateTime).format("HH:mm") + " " + combo?.secondWay?.FlightSegment[1]?.ArrivalAirport?.LocationCode + " " + combo?.secondWay?.FlightSegment[1]?.ArrivalAirport?.CityName + " - " + combo?.secondWay?.FlightSegment[1]?.ArrivalAirport?.AirportName}
                                </Text>
                            </View>
                        </View>
                        {combo?.secondWay?.FlightSegment.length > 2 ?
                            <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                <Text style={{ width: 80, fontWeight: 'bold', textAlign: "center" }} >
                                    {combo?.secondWay?.FlightSegment[2]?.LayOver2Hours + 'h' + combo?.secondWay?.FlightSegment[2]?.LayOver2Minutes + 'm'}
                                </Text>
                                <Text style={{ marginStart: 20, fontWeight: 'bold' }}>Connect in airport</Text>
                            </View>
                            : null}
                    </View>
                    : null
                }
                <View style={[R.styles.flexRow, { marginTop: 10 }]}>
                    <View style={{ width: 80 }}></View>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold' }}>Bag fees:</Text>
                        <View style={[R.styles.flexRow, { marginTop: 5 }]}>
                            <Text style={{ width: 110 }}>Carry on:</Text>
                            <Text style={{ marginStart: 5 }}>No fees</Text>
                        </View>
                        <View style={R.styles.flexRow}>
                            <Text style={{ width: 110 }}>1st Checked Bag:</Text>
                            <Text style={{ marginStart: 5 }}>No fees</Text>
                        </View>
                    </View>
                </View>

                <TouchableOpacity style={[R.styles.flexRow, { marginTop: 10 }]} onPress={() => fareRules(combo.FareRules)}>
                    <Text>
                        Fare Rules
                            </Text>
                    <Image source={R.images.infoGrey} style={{ width: 25, height: 25, resizeMode: 'contain', marginStart: 10 }} />
                </TouchableOpacity>
            </View>
        </View >
        : null
    )
};

export default FlightItem;