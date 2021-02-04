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
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import headerBg from "../../assets/images/leagues-mobile-header-background.jpg";
import { WebView } from 'react-native-webview';


const sourceFile = require('../../helpers/services.js');

export default class Quiz extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
    }

    render() {
        return <WebView source={{ uri: 'https://beta.fly-foot.com/en/gamification/home' }} />;
    }
}

