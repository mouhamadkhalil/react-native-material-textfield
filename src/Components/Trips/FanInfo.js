import React from "react";
import { StyleSheet, TextInput, Text, View, TouchableOpacity, Image } from "react-native";
import DatePicker from '@react-native-community/datetimepicker';
import DropDownPicker from "react-native-dropdown-picker";
import { Picker } from '@react-native-picker/picker';
import { translate } from "helpers/utils";
import moment from "moment";
import R from "res/R";

export class FanInfo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            Title: '',
            FirstName: this.props.index == 0 ? global.user?.FirstName : '',
            LastName: this.props.index == 0 ? global.user?.LastName : '',
            DOB: global.user?.DOB,
            CountryName: global.user?.CountryName,
            idCountry: global.user?.idCountry,
            PhonePrefix: '+961',
            Phone: this.props.index == 0 ? global.user?.PhoneNumber : '',
            Email: this.props.index == 0 ? global.user?.Email : '',
            Sequence: this.props.index + 1,
            IsChild: false,
            IsMainContact: this.props.index == 0,
            IsFlightOnly: false,
            showDatePicker: false,
            defaultDate: moment().subtract(12, 'years').format('DD-MM-YYYY')
        };
    }

    componentDidMount = () => {
        if (this.props.countries) {
            var country = this.props.countries.find(c => c.value == this.state.idCountry);
            if (country)
                this.setState({ PhonePrefix: country.phonePrefix });
        }
    }

    render() {
        return (
            <View style={{ marginTop: 30 }}>
                {this.props.isRequest ? null :
                    <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                        {this.props.index == 0 ? translate("mainFan") : translate("fan") + " #" + (this.props.index + 1)}
                    </Text>
                }
                <View style={{ backgroundColor: "white" }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>
                        {translate("title")}*
                        </Text>
                    <View style={{ padding: 25 }}>
                        <View style={{ marginBottom: 30 }}>
                            <DropDownPicker
                                items={[
                                    { label: translate("mr."), value: "Mr." },
                                    { label: translate("ms."), value: "Ms." },
                                ]}
                                containerStyle={{ height: 50 }}
                                style={{ backgroundColor: "#fafafa" }}
                                itemStyle={{ justifyContent: "flex-start", }}
                                selectedLabelStyle={{ color: 'black' }}
                                dropDownStyle={{ color: "gray", width: 150, marginLeft: 30 }}
                                onChangeItem={(item) =>
                                    this.setState({
                                        Title: item.value,
                                    }, function () { this.props.updateContact(this.props.index, this.state); })
                                }
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20 }}>
                                {translate("name")}*
                                </Text>
                            <TextInput
                                multiline={false}
                                value={this.state.FirstName}
                                placeholder='Name as per passport'
                                onChangeText={(FirstName) => this.setState({ FirstName }, function () { this.props.updateContact(this.props.index, this.state); })}
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>
                                {translate("surname")}*
                            </Text>
                            <TextInput
                                multiline={false}
                                value={this.state.LastName}
                                placeholder='Surname as per passport'
                                onChangeText={(LastName) => this.setState({ LastName }, function () { this.props.updateContact(this.props.index, this.state); })}
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>
                                {translate("dateOfBirth")}*
                            </Text>
                            <TouchableOpacity style={{ borderBottomWidth: 0.5 }} onPress={() => this.setState({ showDatePicker: true })}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ height: 30, fontSize: 20, fontWeight: 'bold', width: '90%' }}>
                                        {moment(this.state.DOB).format('DD.MM.YYYY')}
                                    </Text>
                                    <Image source={R.images.calendar} style={{ width: 20, height: 20 }} />
                                </View>
                            </TouchableOpacity>
                            {this.state.showDatePicker && (
                                <DatePicker
                                    value={new Date(this.state.DOB)}
                                    mode="date"
                                    display="default"
                                    maximumDate={new Date(this.state.defaultDate)}
                                    onChange={(event, date) => {
                                        this.setState({ DOB: moment(date).format('YYYY-MM-DD'), showDatePicker: false }, function () {
                                            this.props.updateContact(this.props.index, this.state);
                                        })
                                    }
                                    }
                                />
                            )}
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>
                                {translate("country")}*
                            </Text>
                            <Picker
                                selectedValue={this.state.idCountry}
                                onValueChange={(itemValue, itemIndex) => {
                                    if (this.props.countries) {
                                        var country = this.props.countries[itemIndex];
                                        this.setState({ idCountry: country.value, CountryName: country.label, PhonePrefix: country.phonePrefix }, function () {
                                            this.props.updateContact(this.props.index, this.state);
                                        })
                                    }
                                }
                                }
                                style={{ width: '100%', height: 40 }}
                            >
                                {this.props.countries?.map(function (country) { return <Picker.Item key={country.label} label={country.label} value={country.value} /> })}
                            </Picker>
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>
                                {translate("email")}{this.state.IsMainContact ? '*' : ''}
                            </Text>
                            <TextInput
                                autoCapitalize="none"
                                type="email"
                                value={this.state.Email}
                                onChangeText={(Email) => this.setState({ Email }, function () { this.props.updateContact(this.props.index, this.state); })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>
                                {translate("phoneNumber")} {this.state.IsMainContact ? '*' : ''}
                            </Text>
                            <TextInput
                                value={this.state.Phone}
                                keyboardType="number-pad"
                                onChangeText={(Phone) => this.setState({ Phone }, function () { this.props.updateContact(this.props.index, this.state); })}
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});