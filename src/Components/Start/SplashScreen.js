import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import Splash from "../../assets/images/splash.png";
import LoginScreen from "../Start/LoginScreen";
import { API_URL, API_TOKEN } from "@env"

export default class SplashScreen extends React.Component {

  componentDidMount() {
    this.timeoutHandle = setTimeout(() => {
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={Splash} style={{ height: 650, width: 360 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
