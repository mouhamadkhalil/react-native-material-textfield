import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { translate } from "helpers/utils";

export class MatchHeader extends React.PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            bundle: props.bundle,
        };
    }
    render() {
        return (
            <View style={{ marginTop: 30 }}>
                <Text style={{ fontSize: 19.25, color: "gray", fontWeight: "bold", marginBottom: 15 }}>{translate("yourContactDetails")}</Text>
                <View style={{ backgroundColor: "white" }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>{translate("title")}*</Text>
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
                                itemStyle={{
                                    justifyContent: "flex-start",
                                }}
                                dropDownStyle={{ color: "gray", width: 150, marginLeft: 30 }}
                                onChangeItem={(item) =>
                                    this.setState({
                                        Title: item.value,
                                    })
                                }
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold", marginTop: 20 }}>{translate("name")}*</Text>
                            <TextInput
                                multiline={false}
                                value={this.state.FirstName}
                                onChangeText={(FirstName) => this.setState({ FirstName })}
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("surname")}*</Text>
                            <TextInput
                                multiline={false}
                                value={this.state.LastName}
                                onChangeText={(LastName) => this.setState({ LastName })}
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("email")}*</Text>
                            <TextInput
                                autoCapitalize="none"
                                type="email"
                                value={this.state.Email}
                                onChangeText={(Email) => this.setState({ Email })}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                style={{ borderBottomWidth: 1, borderColor: "#ccc" }}
                            />
                        </View>
                        <View style={{ marginBottom: 30 }}>
                            <Text style={{ color: "gray", fontWeight: "bold" }}>{translate("phoneNumber")}*</Text>
                            <TextInput
                                value={this.state.Phone}
                                keyboardType="number-pad"
                                onChangeText={(Phone) => this.setState({ Phone })}
                                style={{ borderBottomWidth: 1, bordercolor: "#ccc" }}
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