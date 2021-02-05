import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    AsyncStorage,
    Picker,
    ToastAndroid,
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import DropDownPicker from "react-native-dropdown-picker";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import DatePicker from 'react-native-datepicker';
import headerBg from "../../assets/images/leagues-mobile-header-background.jpg";

const sourceFile = require('../../services.js');

export default class MyProfile extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            FavouriteTeam1: "",
            FavouriteTeam2: "",
            FavouriteTeam3: "",
            FavouriteTeam4: "",
            FavouriteTeam5: "",
            FavouriteTeam6: "",
            FavouriteTeam7: "",
            FavouriteTeam8: "",
            FavouriteTeam9: "",
            FavouriteTeam10: "",
            FavouriteTeam11: "",
            FavouriteTeam12: "",
            date: "2021-02-04",
            Name: "",
            Surname: "",
            Country: "",
            Email: "",
            PhoneNumber: "",
            Teams: [{
                ShortName: "",
                ShowOnRegistration: "",
                TeamColor1: "",
                TeamColor2: "",
                TeamName: "",
                TeamShortCutName: "",
                TeamTagNames: "",
                idTeams: "",
                v3ImageReference: ""
            }],
        };
    }

    
  
    getToken = async () => AsyncStorage.getItem('token');

    componentDidMount = async () => {
        var token = await this.getToken();
        const url = `${API_URL}/mobile/team/all`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                console.log(response)
                var data = response.map(function (item) {
                    return {
                        ShortName: item.ShortName,
                        ShowOnRegistration: item.ShowOnRegistration,
                        TeamColor1: item.TeamColor1,
                        TeamColor2: item.TeamColor2,
                        TeamName: item.TeamName,
                        TeamShortCutName: item.TeamShortCutName,
                        TeamTagNames: item.TeamTagNames,
                        idTeams: item.idTeams,
                        v3ImageReference: item.v3ImageReference
                    };
                });
                this.setState({ Teams: data });
                this.setState({
                    FavouriteTeam1: response[0].TeamName
                });
                this.setState({
                    FavouriteTeam2: response[1].TeamName
                });
                this.setState({
                    FavouriteTeam3: response[2].TeamName
                });
                this.setState({
                    FavouriteTeam4: response[3].TeamName
                });
                this.setState({
                    FavouriteTeam5: response[4].TeamName
                });
                this.setState({
                    FavouriteTeam6: response[5].TeamName
                });
                this.setState({
                    FavouriteTeam7: response[6].TeamName
                });
                this.setState({
                    FavouriteTeam8: response[7].TeamName
                });
                this.setState({
                    FavouriteTeam9: response[8].TeamName
                });
                this.setState({
                    FavouriteTeam10: response[9].TeamName
                });
                this.setState({
                    FavouriteTeam11: response[10].TeamName
                });
                this.setState({
                    FavouriteTeam12: response[11].TeamName
                });
            });
    }


    SAVEINFO = async () => {
        var token = await this.getToken();
        const url = `${API_URL}/mobile/profile/Update`;
        const data = {
            Name: this.state.Name,
            SurName: this.state.SurName,
            Country: this.state.Country,
            Email: this.state.Email,
            PhoneNumber: this.state.PhoneNumber,
            FavouriteTeam: this.state.FavouriteTeam1,

        };

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": 'Bearer ' + token
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                ToastAndroid.showWithGravity(
                    'your profile has been updated !',
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            });
    }

    render() {
        const { selectedStartDate } = this.state;
        const startDate = selectedStartDate ? selectedStartDate.toString() : '';
        return (
            <ScrollView style={styles.container}>
                <ImageBackground source={headerBg} style={styles.headerBg}>
                    <Text style={styles.pageTitleText}>
                        My Account
                    </Text>
                </ImageBackground>

                <View style={{ backgroundColor: "white", width: "100%", height: 750 }}>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>NAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        value={this.state.Name}
                        onChangeText={(Name) => this.setState({ Name })}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 300, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>SURNAME*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        value={this.state.Surname}
                        onChangeText={(Surname) => this.setState({ Surname })}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 300, height: 1, marginLeft: 30, marginTop: -38 }}></View>

                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>TEAM*</Text>
                    <Picker
                        selectedValue={this.state.FavouriteTeam1}
                        style={{ marginTop: 40, height: 20, marginLeft: 28, marginRight: 15, borderBottomWidth: 1, borderColor: 'gray' }}
                        onValueChange={(itemValue, itemIndex) => this.setState({ FavouriteTeam1: itemValue })}>
                        <Picker.Item label={this.state.FavouriteTeam1} value={this.state.FavouriteTeam1} />
                        <Picker.Item label={this.state.FavouriteTeam2} value={this.state.FavouriteTeam2} />
                        <Picker.Item label={this.state.FavouriteTeam3} value={this.state.FavouriteTeam3} />
                        <Picker.Item label={this.state.FavouriteTeam4} value={this.state.FavouriteTeam4} />
                        <Picker.Item label={this.state.FavouriteTeam5} value={this.state.FavouriteTeam5} />
                        <Picker.Item label={this.state.FavouriteTeam6} value={this.state.FavouriteTeam6} />
                        <Picker.Item label={this.state.FavouriteTeam7} value={this.state.FavouriteTeam7} />
                        <Picker.Item label={this.state.FavouriteTeam8} value={this.state.FavouriteTeam8} />
                        <Picker.Item label={this.state.FavouriteTeam9} value={this.state.FavouriteTeam9} />
                        <Picker.Item label={this.state.FavouriteTeam10} value={this.state.FavouriteTeam10} />
                        <Picker.Item label={this.state.FavouriteTeam11} value={this.state.FavouriteTeam11} />
                        <Picker.Item label={this.state.FavouriteTeam12} value={this.state.FavouriteTeam12} />
                    </Picker>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>DATE OF BIRTH*</Text>
                    <DatePicker
                        style={{ width: 300, marginLeft: 30, marginTop: 20 }}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="1970-05-01"
                        maxDate="2050-05-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                        }}
                        onDateChange={(date) => { this.setState({ date: date }); }}
                    />
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>COUNTRY*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        value={this.state.Country}
                        onChangeText={(Country) => this.setState({ Country })}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 300, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>EMAIL*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                        type="email"
                        value={this.state.Email}
                        onChangeText={(Email) => this.setState({ Email })}
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <View style={{ backgroundColor: "black", width: 300, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <Text style={{ color: "gray", fontWeight: "bold", marginLeft: 30, marginTop: 20 }}>PHONE NUMBER*</Text>
                    <TextInput
                        multiline={true}
                        numberOfLines={8}
                        value={this.state.PhoneNumber}
                        type="phone"
                        keyboardType="phone-pad"
                        onChangeText={(PhoneNumber) => this.setState({ PhoneNumber })}
                        style={{ fontSize: 12, marginTop: -25, paddingLeft: 30 }}
                    />
                    <View style={{ backgroundColor: "black", width: 300, height: 1, marginLeft: 30, marginTop: -38 }}></View>
                    <View style={{ width: 120, marginLeft: 212, marginTop: 40 }}>
                        <Button
                            onPress={this.SAVEINFO}
                            title="SAVE"
                            color="#8CD222"
                        />
                    </View>
                </View>
               
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fafafa",
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    teamImage: {
        marginTop: 50,
        width: 70,
        height: 70,
        marginLeft: 20,
        marginRight: 20
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    teamsWrap: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
        marginTop: 35
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});