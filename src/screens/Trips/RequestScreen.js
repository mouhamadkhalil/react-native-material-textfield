import React, { useCallback } from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Modal
} from "react-native";
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DatepickerRange from 'react-native-range-datepicker';
import DropDownPicker from "react-native-dropdown-picker";
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements';
import RangeSlider from 'rn-range-slider';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { Games } from "components/Request/Games";
import CustomLabel from "components/Request/CustomLabel";
import RatingStars from "components/Trips/RatingStars";
import { FanInfo } from "components/Trips/FanInfo";
import { get, post, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils";
import moment from 'moment';
import R from "res/R";


const hotelStars = [
    {
        label: <RatingStars rating={5} tag='5-stars' />,
        value: 5
    },
    {
        label: <RatingStars rating={4} tag='4-stars' />,
        value: 4
    },
    {
        label: <RatingStars rating={3} tag='3-stars' />,
        value: 3
    },
];

const seatsCategories = [
    {
        label: "Doesn't matter, at least Iam there!",
        value: "onbudget"
    },
    {
        label: "I want a good view of the game",
        value: "fair"
    },
    {
        label: "I want to be close to the players",
        value: "vip"
    },
    {
        label: "Once in a lifetime! Give me the best",
        value: "vvip"
    },
];
export default class RequestScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: {},
            bundleCode: props?.route?.params?.bundleCode,
            Message: "",
            showDatePicker: false,
            cities: [],
            countries: []
        };
    }

    componentDidMount() {
        try {
            this.init();
        } catch { }
    }

    init = async () => {
        var bundle = await this.getBundle();
        var countries = await this.getCountries();
        var cities = await this.getCities();
        this.setState({ bundle, countries, cities, isLoading: false })
    }

    getBundle = () => {
        const params = `?customize=false&validateHotelPrice=false&hotelId=-1`;
        return get(servicesUrl.getGameV2 + this.state.bundleCode + params)
            .then(response => {
                var bundle = null;
                if (response) {
                    bundle = response;
                    bundle.HotelStars = 5;
                    bundle.matchCategoryCode = "onbudget";
                    bundle.budget = "1000";
                }
                return bundle;
            });
    }

    getCities = () => {
        return get(servicesUrl.getAmadeusCities)
            .then((response) => {
                var cities = [];
                if (response) {
                    cities = response.map(function (city) {
                        return {
                            value: city.ID,
                            label: city.Value,
                        };
                    });
                }
                return cities;
            });
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

    SendRequest = () => {
        if (this.state.Title === "" || this.state.FirstName === "" || this.state.LastName === "" || this.state.Phone === "" || this.state.Email === "") {
            global.toast.show('Please fill out the mendatory fields !', { type: "danger" });
        }
        else {
            post(servicesUrl.saveBundleMulti, bundle)
                .then(response => {
                    if (response)
                        this.props.navigation.navigate('confirmation');
                    else
                        global.toast.show(translate('msgErrorOccurred'), { type: "danger" });
                });
        }
    }

    IncrementFan = () => {
        var bundle = this.state.bundle;
        if (bundle && bundle.NumberOfTravelers < 8) {
            bundle.NumberOfTravelers++;
            this.setState({ bundle });
        }
    };

    DecrementFan = () => {
        var bundle = this.state.bundle;
        if (bundle && bundle.NumberOfTravelers > 1) {
            bundle.NumberOfTravelers--;
            this.setState({ bundle });
        }
    };

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
            Phone: contact.Phone,
            Email: contact.Email,
            IsChild: contact.IsChild,
            IsFlightOnly: contact.IsFlightOnly,
            IsMainContact: contact.IsMainContact,
            Sequence: contact.Sequence
        };
        this.setState({ bundle });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <HeaderBackground title={translate("request")} image={R.images.all_games_bg} />
                <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>

                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                        :
                        <>
                            {/* games */}
                            <Games matches={this.state.bundle?.MatchBundleDetail} />

                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                                    {translate("travelDetails")}
                                </Text>
                                <View style={{ backgroundColor: "white" }}>
                                    <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>
                                            {translate('tripDates')}
                                        </Text>
                                        {/* trip dates */}
                                        <TouchableOpacity style={{ marginTop: 10, borderBottomWidth: 0.5 }}
                                            onPress={() => this.setState({ showDatePicker: true })}>
                                            <View style={{ flexDirection: 'row' }}>
                                                <Text style={{ height: 30, fontSize: 20, fontWeight: 'bold', width: '90%' }}>
                                                    {moment(this.state.bundle?.StartDate).format('DD.MM.yyy') + " - " + moment(this.state.bundle?.EndDate).format('DD.MM.yyyy')}
                                                </Text>
                                                <Image source={R.images.calendar} style={{ width: 20, height: 20 }} />
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>
                                            {translate('fans')}
                                        </Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", marginTop: 10 }}>
                                            <TouchableOpacity style={{ width: 25, height: 25, alignItems: "center", justifyContent: "center" }} onPress={this.DecrementFan} >
                                                <Icon name='remove-circle-outline' style={styles.icon} />
                                            </TouchableOpacity>
                                            <Text style={{ marginStart: 10, marginEnd: 10, width: 30, textAlign: "center", fontWeight: "bold", fontSize: 17.5 }}>
                                                {this.state.bundle?.NumberOfTravelers}
                                            </Text>
                                            <TouchableOpacity style={{ width: 25, height: 25, alignItems: "center", justifyContent: "center" }} onPress={this.IncrementFan} >
                                                <Icon name='add-circle-outline' style={styles.icon} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <View style={{ padding: 25, borderBottomWidth: 1, borderBottomColor: "#eee" }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>
                                            {translate('budget')}
                                        </Text>
                                        <MultiSlider
                                            values={[1000]}
                                            enabledTwo={true}
                                            enableLabel={true}
                                            min={0}
                                            max={10000}
                                            customLabel={CustomLabel}
                                            markerStyle={{ backgroundColor: 'blue' }}
                                            trackStyle={{ backgroundColor: 'gray' }}
                                            selectedStyle={{ backgroundColor: 'blue' }}
                                        />
                                    </View>
                                    <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase" }}>{translate("flight")}</Text>
                                        <View style={{ flexDirection: "row", alignItems: "center", zIndex: 10, marginTop: 15 }}>
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
                                                    this.setState({ bundle });
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
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("hotel")}</Text>
                                <View style={{ backgroundColor: "white" }}>
                                    <View style={{ padding: 25 }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase", marginBottom: 20 }}>
                                            {translate("hotelType")}
                                        </Text>
                                        {hotelStars.map((option) => {
                                            const checked = this.state.bundle?.HotelStars == option.value;
                                            return (
                                                <CheckBox key={'hotel-' + option.value} title={option.label}
                                                    checked={checked}
                                                    containerStyle={styles.checkbox}
                                                    checkedColor='blue'
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon='circle-o'
                                                    onPress={() => {
                                                        var bundle = this.state.bundle;
                                                        bundle.HotelStars = option.value;
                                                        this.setState({ bundle })
                                                    }}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("stadium")}</Text>
                                <View style={{ backgroundColor: "white" }}>
                                    <View style={{ padding: 25 }}>
                                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", textTransform: "uppercase", marginBottom: 20 }}>
                                            {translate("seatsCategory")}
                                        </Text>
                                        {seatsCategories.map((option) => {
                                            const checked = this.state.bundle?.matchCategoryCode === option.value;
                                            return (
                                                <CheckBox key={'seat-' + option.value} title={option.label}
                                                    checked={checked}
                                                    containerStyle={styles.checkbox}
                                                    checkedColor='blue'
                                                    checkedIcon='dot-circle-o'
                                                    uncheckedIcon='circle-o'
                                                    onPress={() => {
                                                        var bundle = this.state.bundle;
                                                        bundle.matchCategoryCode = option.value;
                                                        this.setState({ bundle })
                                                    }}
                                                />
                                            );
                                        })}
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                                    {translate("yourContactDetails")}
                                </Text>
                                <FanInfo index={0} isRequest={true} countries={this.state.cities} updateContact={this.updateContact} />
                            </View>

                            <View style={{ backgroundColor: "white", marginTop: 30, padding: 25 }}>
                                <TextInput
                                    multiline={true}
                                    numberOfLines={8}
                                    value={this.state.bundle?.message}
                                    onChangeText={(message) => {
                                        var bundle = this.state.bundle;
                                        bundle.message = message;
                                        this.setState({ bundle })
                                    }}
                                    placeholder="Additional request..."
                                    style={{ fontSize: 12, textAlignVertical: 'top' }}
                                />
                            </View>
                            <View style={{ marginTop: 30, width: 150, height: 80, marginBottom: 20, alignSelf: "center" }}>
                                <TouchableOpacity style={{ backgroundColor: R.colors.lightGreen, padding: 15 }}
                                    onPress={this.SendRequest}
                                >
                                    <Text style={{ fontWeight: "bold" }}>
                                        {translate("sendRequest")}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showDatePicker}>
                    <View style={styles.modalView}>
                        <DatepickerRange
                            startDate={this.state.bundle?.StartDate}
                            untilDate={this.state.bundle?.EndDate}
                            placeHolderStart='Start Date'
                            placeHolderUntil='Until Date'
                            selectedBackgroundColor={R.colors.blue}
                            buttonColor={R.colors.blue}
                            onClose={() => this.setState({ showDatePicker: false })}
                            onConfirm={(fromDate, toDate) => {
                                var bundle = this.state.bundle;
                                if (bundle) {
                                    bundle.StartDate = fromDate;
                                    bundle.EndDate = toDate;
                                    this.setState({ bundle, showDatePicker: false })
                                }
                            }}
                        />
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#eeeeee",
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
    icon: {
        color: R.colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    checkbox: {
        backgroundColor: 'white'
    }
});