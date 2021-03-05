import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, FlatList } from "react-native";
import { CheckBox } from 'react-native-elements';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { TripDetails } from "components/Trips/TripDetails";
import { SeatingOptions } from "components/Trips/SeatingOptions";
import { Perks } from "components/Trips/Perks";
import { formatBundle } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import moment from 'moment';
import R from "res/R";

export default class CheckoutSummaryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: props?.route?.params?.bundle,
            details: {},
            game: {},
            hotel: {},
            seating: {},
            perks: [],
            acceptTerms: false,
        };
    }

    componentDidMount() {
        try {
            this.initBundle();
        } catch { }
    }

    initBundle = () => {
        const [details, game, hotel, seating, perks] = formatBundle(this.state.bundle);
        this.setState({ details, game, hotel, seating, perks, isLoading: false })
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        this.props.navigation.navigate('checkoutPayment', { bundle: this.state.bundle });
    };


    keyExtractor = (item, index) => {
        return "fan" + index;
    }

    renderHeader = () => {
        return (
            <>
                {/* banner */}
                <HeaderBackground title={translate('checkout')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={this.props.bundle } />

                {/* package details */}
                <View style={{ marginStart: 15, marginEnd: 15 }}>
                    <View style={[R.styles.flexRow, { marginTop: 30 }]}>
                        <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17 }}>
                            {translate('bookingSummaryRef')}:
                    </Text>
                        <Text style={{ color: R.colors.green, fontWeight: "bold", fontSize: 17, marginStart: 5 }}>
                            {this.state.bundle.RequestCode}
                        </Text>
                    </View>
                    <View style={{marginTop:10}}>
                    {/* trip details + hotel */}
                    <TripDetails details={this.state.details} game={this.state.game} hotel={this.state.hotel} />

                    {/* seating options */}
                    <SeatingOptions details={this.state.details} game={this.state.game} seating={this.state.seating} />

                    {/* perks */}
                    <Perks perks={this.state.perks} />
                    </View>
                </View>
            </>
        );
    };


    renderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: 20, marginStart:15, marginEnd:15 }}>
                {/* fan number */}
                <Text style={{ color: 'grey', fontWeight: 'bold', fontSize: 20 }}>
                    {index == 0 ? translate('mainFan') : translate('fan') + " #" + (index + 1)}
                </Text>
                <View style={{ marginTop: 10 }}>
                    {/* full name */}
                    <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                        <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                            {translate('fullName')}
                        </Text>
                        <Text style={{ color: R.colors.blue, fontSize: 20 }}>
                            {item.Title + " " + item.FirstName + " " + item.LastName}
                        </Text>
                    </View>
                    {/* date of birth */}
                    <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                        <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                            {translate('dateOfBirth')}
                        </Text>
                        <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                            {moment(item.DOB).format('DD.MM.YY')}
                        </Text>
                    </View>
                    {/* nationality */}
                    <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                        <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                            {translate('nationality')}
                        </Text>
                        <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                            {item.CountryName}
                        </Text>
                    </View>
                    {/* phone */}
                    {item.Phone !== '' ?
                        <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                            <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                                {translate('phoneNumber')}
                            </Text>
                            <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                                {item.PhonePrefix + " - " + item.Phone}
                            </Text>
                        </View>
                        : null}
                    {/* email */}
                    {item.Email !== '' ?
                        <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                            <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                                {translate('email')}
                            </Text>
                            <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                                {item.Email}
                            </Text>
                        </View>
                        : null}
                </View>
            </View>
        )
    }

    renderFooter = () => {
        return (
            <View style={{marginStart:15, marginEnd:15}}>
                {/* buttons */}
                <View style={{ height: 60, flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                    <TouchableHighlight style={R.styles.blackButton}
                        onPress={this.goBack}>
                        <Text style={{ color: 'white', fontSize: 16, textTransform: 'uppercase' }}>
                            {translate('back')}
                        </Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={this.state.acceptTerms ? R.styles.greenButton : R.styles.greyButton}
                        activeOpacity={this.state.acceptTerms ? 0 : 1}
                        disabled={!this.state.acceptTerms}
                        onPress={this.continue}>
                        <Text style={{ color: this.state.acceptTerms ? 'black' : 'white', fontSize: 16, textTransform: 'uppercase' }}>
                            {translate('checkout')}
                        </Text>
                    </TouchableHighlight>
                </View>

                {/* terms & conditions */}
                <View style={[R.styles.flexRow, { marginTop: 10, marginBottom: 30 }]}>
                    <CheckBox
                        checked={this.state.acceptTerms}
                        title={translate('iAgree')}
                        containerStyle={{ backgroundColor: '#eee', borderWidth: 0, padding: 0, margin: 0 }}
                        checkedColor={R.colors.blue}
                        textStyle={{ color: 'black' }}
                        onPress={() => this.setState({ acceptTerms: !this.state.acceptTerms })} />
                    <Text style={{ color: R.colors.blue, textDecorationLine: 'underline' }}>
                        {translate('termsConditions')}
                    </Text>
                </View>
            </View>
        );
    };

    render() {
        return (
            <>
                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                    :
                    <>
                        {/* fans */}
                        <FlatList
                            data={this.state.bundle.OfferContacts}
                            ListHeaderComponent={this.renderHeader}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            ListFooterComponent={this.renderFooter.bind(this)}
                        />
                    </>
                }
            </>
        );
    }
}

const styles = StyleSheet.create({

});
