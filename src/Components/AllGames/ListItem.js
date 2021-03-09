import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, ActivityIndicator, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { getWithToken, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import Moment from 'moment';
import R from "res/R";

const ListItem = ({ item }) => {
    const navigation = useNavigation();
    const [variables, setVariables] = useState({
        loading: false,
        flagged: item.Flagged
    });

    const { loading, flagged } = variables;

    const flagBundle = () => {
        try {
            setVariables({ loading: true });
            var params = `?matchBundleCode=${item.BundleCode}&addOrRemove=${!flagged}`;
            getWithToken(servicesUrl.getFlagBundle + params)
                .then((response) => {
                    if (response == true)
                        setVariables({
                            loading: false,
                            flagged: !flagged
                        })
                    else setVariables({
                        loading: false,
                        flagged: flagged
                    })
                });
        }
        catch {
            setVariables({
                loading: false,
                flagged: !fllag
            })
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 1, flexDirection: "row", height: 120 }}>
                {/* game date */}
                <View style={{ width: '15%', alignItems: 'center', borderEndColor: "grey", borderEndWidth: 1, paddingTop: 10 }}>
                    <Text style={{ fontSize: 26, fontWeight: "bold", textTransform: 'uppercase' }}>
                        {Moment(new Date(item.GameDate)).format('DD')}
                    </Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold", textTransform: 'uppercase' }}>
                        {Moment(new Date(item.GameDate)).format('MMM')}
                    </Text>
                    <Text style={{ fontSize: 12, marginTop: 20, textTransform: 'uppercase' }}>
                        {item.TripDays + ' ' + translate('days')}
                    </Text>
                </View>

                {/* teams */}
                <View style={{ flex: 1, flexDirection: "column", width: '80%', paddingStart: 10, paddingTop: 10 }}>
                    {/* home team */}
                    <View style={R.styles.flexRow}>
                        <LinearGradient
                            colors={[item.Team1Color1, item.Team1Color2]}
                            style={R.styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingStart: 5 }}>
                            {item.HomeTeam}
                        </Text>
                    </View>
                    <View style={R.styles.flexRow}>
                        {/* away team */}
                        <LinearGradient
                            colors={[item.Team2Color1, item.Team2Color2]}
                            style={R.styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingStart: 5 }}>
                            {item.AwayTeam}
                        </Text>
                    </View>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 10 }}>
                        {item.LeagueName}
                    </Text>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 5 }}>
                        {item.City}
                    </Text>
                </View>

                {/* flag & share */}
                <View style={{ flexDirection: 'column', width: '10%', paddingTop: 10, alignItems: 'center' }}>
                    <View >
                        <TouchableOpacity style={{ width: 20, height: 20 }} onPress={flagBundle}>
                            {loading ? <ActivityIndicator size='small' color={R.colors.lightGreen} /> :
                                flagged ?
                                    <Image source={R.images.flag_green} style={{ width: 20, height: 20 }} />
                                    :
                                    <Image source={R.images.flag_grey} style={{ width: 20, height: 20 }} />
                            }
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopColor: 'grey', borderTopWidth: 1, paddingTop: 10, marginTop: 10 }}>
                        <TouchableOpacity style={{ width: 20, height: 20 }}>
                            <Image source={R.images.share} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            <View style={{ flexDirection: 'row', height: 50, marginTop: 10, borderTopColor: "grey", borderTopWidth: 1 }}>
                {/* price */}
                <View style={{ alignSelf: 'flex-start', width: '60%' }}>
                    {item.Price != null && item.Price > 0 ?
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingStart: 10, fontSize: 20, fontWeight: "bold" }}>{item.Price}$</Text>
                            <Text>/{translate('fan')}</Text>
                        </View>
                        : null
                    }
                </View>

                {/* book now OR request */}
                <TouchableOpacity
                    style={styles.greenButton}
                    onPress={item.Price != null  && item.Price > 0 ? () => navigation.navigate('tripOverview', { bundleCode: item.BundleCode }) : () => navigation.navigate('request', { bundleCode: item.BundleCode })}>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>
                        {item.Price != null && item.Price > 0 ? translate('bookNow') : translate('request')}
                    </Text>
                    <Image source={R.images.arrowRight} style={{ marginStart: 10 }} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFF",
        marginTop: 30,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    greenButton: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40%',
        height: '100%',
        backgroundColor: R.colors.lightGreen
    }
});

export default ListItem;