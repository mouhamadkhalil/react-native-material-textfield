import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Header from "../Navigation/Header"
import Login from "../Start/LoginScreen";
import Signup from "../Start/SignupScreen";
import SpecialGames from "../Special Games/SpecialGame";
import AnyDayScreen from "../Schedule/AnyDayScreen";
import InfoScreen from "../More/Info";
import Help1Screen from "../Help/Help1Screen";
import Help2Screen from "../Help/Help2Screen";
import { View, Image, TouchableOpacity, TextInput } from "react-native";
import Line2 from "../../assets/Images_Design/line2.png";
import Moment from 'moment';
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";

const HeaderOptions = ({ navigation }) => {
    return (
        {
            headerTintColor: '#374BBF',
            headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
            title: Moment(new Date()).format('dddd DD MMM'),
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.toggleDrawer()}><DrawerButton /></TouchableOpacity>
            ),
            headerRight: () => (
                <View style={{ flex: 1, flexDirection: 'row',justifyContent: 'center', alignItems: 'center', marginRight:5 }}>
                <TextInput
                    style={{ display: "none", marginLeft: 120, borderRadius: 20, backgroundColor: "white", width: 190, height: 35 }}
                    placeholder="  &nbsp;&nbsp;Search your game ... "
                    placeholderTextColor="#46D822"
                    autoCapitalize="none"
                    onChangeText={searchText => {
                        this.setState({ searchText });
                    }}
                    //onSubmitEditing={this.searchGame}
                    //value={this.state.searchText}
                    hid
                />
                    <TouchableOpacity  style={{ marginLeft: 10, marginRight: 10, width: 40 }}>
                        <Image source={Search} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40 }}>
                        <Image source={Notifictaion} style={{ height: 40, width: 40 }} />
                    </TouchableOpacity>
                </View>
            )
        }
    );
}
const DrawerButton = () => {
    return (
        <View>
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: 0 }} />
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: -5 }} />
            <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 30, marginTop: -5 }} />
        </View>
    );
}

export default HeaderOptions
