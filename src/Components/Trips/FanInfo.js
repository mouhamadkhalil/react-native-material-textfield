import React from "react";
import { StyleSheet, TextInput, Text, View } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { translate } from "helpers/utils";

export class FanInfo extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            Title: '',
            FirstName: '',
            LastName: '',
            DOB: '2009-03-04',
            CountryName: 'Lebanon',
            idCountry: 1107,
            PhonePrefix: '+961',
            Phone: '',
            Email: this.props.index == 0 ? 'nassir@gmail.com' : '',
            Sequence: this.props?.index + 1,
            IsChild: false,
            IsFlightOnly: false,
            IsMainContact: this.props?.index == 0,
        };
    }

    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>
                    {this.props.index == 0 ? translate("mainFan") : translate("fan") + " #" + (this.props.index + 1)}
                </Text>
                <View style={{ backgroundColor: "white" }}>
                    
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>
                        {translate("title")}*
                        </Text>
                    <View style={{ padding: 25 }}>
                        <View style={{ marginBottom: 30 }}>
                            <DropDownPicker
                                items={[
                                    { label: "Mr.", value: "Mr." },
                                    { label: "Ms.", value: "Ms." },
                                ]}
                                defaultValue={this.state.country}
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
                                {translate("email") }{ this.state.IsMainContact? '*' : '' }
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
                                {translate("phoneNumber") } {this.state.IsMainContact? '*' : '' }
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