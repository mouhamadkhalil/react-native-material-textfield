import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, FlatList } from "react-native";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { FanInfo } from "components/Trips/FanInfo";
import { post, get, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils";
import R from "res/R";

export default class CheckoutFanInfoScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: props?.route?.params?.bundle,
            countries: []
        };
    }

    componentDidMount() {
        try {
            this.init();
        } catch { }
    }

    init = async () => {
        var offerContacts = new Array(this.state.bundle.NumberOfTravelers);;
        for (let i = 0; i < this.state.bundle.NumberOfTravelers; i++) {
            offerContacts[i] = {
                Title: '',
                FirstName: '',
                LastName: '',
                DOB: '',
                CountryName: '',
                idCountry: 0,
                PhonePrefix: '',
                //Phone: '',
                //Email: '',
                Sequence: i + 1,
                IsChild: false,
                IsFlightOnly: false,
                IsMainContact: i == 0,
            };
        }
        var bundle = { ...this.state.bundle };
        bundle.OfferContacts = offerContacts;
        var countries = await this.getCountries();
        this.setState({ bundle, countries, isLoading: false })
    }

    getCountries = () => {
        return get(servicesUrl.getCountry)
            .then((response) => {
                var countries = [];
                if (response) {
                    countries = response.map(function (country) {
                        return {
                            value: country.ID,
                            label: country.Value,
                            phonePrefix: country.ExtraField
                        };
                    });
                }
                return countries;
            });
    }

    updateContact = (index, contact) => {
        var bundle = { ...this.state.bundle };
        bundle.OfferContacts[index] = {
            Title: contact.Title,
            FirstName: contact.FirstName,
            LastName: contact.LastName,
            DOB: contact.DOB,
            CountryName: contact.CountryName,
            idCountry: contact.idCountry,
            PhonePrefix: contact.PhonePrefix,
            IsChild: contact.IsChild,
            IsFlightOnly: contact.IsFlightOnly,
            IsMainContact: contact.IsMainContact,
            Sequence: contact.Sequence
        };
        if (contact.Phone !== '')
            bundle.OfferContacts[index].Phone = contact.Phone;

        if (contact.Email !== '')
            bundle.OfferContacts[index].Email = contact.Email;

        this.setState({ bundle });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        post(servicesUrl.saveBundle, this.state.bundle)
            .then((response) => {
                this.props.navigation.navigate('checkoutSummary', { bundle: { ...response } });
            });
    };

    renderItem = ({ item, index }) => {
        return <FanInfo index={index} countries={this.state.countries} updateContact={this.updateContact} />
    }

    keyExtractor = (item, index) => 'fan-' + item.Sequence;

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('checkout')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                {/* fan info */}
                <View style={{ marginTop: 20 }}>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>
                                <FlatList
                                    data={this.state.bundle.OfferContacts}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                />
                            </View>

                            {/* buttons */}
                            <View style={{ height: 60, marginStart: 15, marginEnd: 15, flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <TouchableHighlight style={R.styles.blackButton}
                                    onPress={this.goBack}>
                                    <Text style={{ fontWeight: "bold", color: "#fff", textTransform: 'uppercase' }}>
                                        {translate('back')}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={R.styles.greenButton}
                                    onPress={this.continue}>
                                    <Text style={{ fontWeight: "bold", textTransform: 'uppercase' }}>
                                        {translate('continue')}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </>
                    }
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#eeeeee",
    }
});
