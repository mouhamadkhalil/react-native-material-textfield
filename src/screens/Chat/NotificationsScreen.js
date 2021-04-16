import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
    TouchableHighlight,
    FlatList,
    Modal
} from "react-native";
import { HubConnectionState } from '@microsoft/signalr';
import { ChannelModel, ChannelUser, MainHubResponseModel, ReceiveChatObj } from 'helpers/Signalr/Signalr-models';
import { SignalrService } from 'helpers/Signalr/SignalRService';
import { get, post, servicesUrl } from "helpers/services.js";

export default class NotificationsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
            this.init();
    }

    init = async() => {
        var signalR = new SignalrService();
        await signalR.UpdateSignalrUserInfo();
        var newUserConnectedSubs = signalR.newUserConnected;
        /*var newUserConnectedSubs = signalR.newUserConnected.subscribe(a => {
            console.log("update connection");
            signalR.UpdateSignalrUserInfo()///.subscribe();
        });*/

        signalR.connect();
    }

    render() {
        return (
            <Text> hello</Text>
        )};
}
