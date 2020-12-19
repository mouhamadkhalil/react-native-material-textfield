import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default class AnyDayScreen extends React.Component {

  state = {
    Picture: ""
  };

  componentDidMount() {
    const url = "https://apitest.fly-foot.com/api/mobile/game/GetHomePageData";

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

        console.log("test", response.GenericGames[0].MatchBundleHotels[0])
        this.setState({ Picture: response.GenericGames[0].MatchBundleHotels[0].Image });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            alignContent: "center",
            color: "#4c0099",
            fontWeight: "bold",
            marginTop: 20,
            fontSize: 22,
          }}
        >
          MONDAY 12 SEPT
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "#4c0099",
            fontSize: 90,
          }}
        >
          DAY 3
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 23 }}>
          3 planned activities
        </Text>
        <View
          style={{
            backgroundColor: "white",
            marginTop: 30,
            width: 430,
            height: 80,
          }}
        >

          <Text
            style={{
              color: "#cc00cc",
              marginLeft: 100,
              marginTop: 20,
              width: 190,
            }}
          >
            Chance of rain, don't forget your umbrella!
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: "#4c0099",
              marginLeft: 310,
              marginTop: -50,
            }}
          >
            23 &deg;
          </Text>
        </View>
        <View
          style={{
            marginTop: 30,
            backgroundColor: "white",
            width: 430,
            height: 180,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ width: 500, height: 210, marginTop: -30 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 30,
            backgroundColor: "white",
            width: 210,
            height: 180,
            marginLeft: -220,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ width: 210, height: 210 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: -180, width: 215, height: 210, marginLeft: 230 }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ width: 210, height: 210 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginTop: 0,
            backgroundColor: "white",
            width: 210,
            height: 180,
            marginLeft: -220,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ width: 500, height: 210, marginTop: 20 }} />
          </TouchableOpacity>
        </View>
        <View
          style={{ marginTop: 50, width: 215, height: 210, marginLeft: -150 }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ width: 500, height: 210, marginTop: 20 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    alignItems: "center",
    marginLeft: -70,
    width: 500,
    marginTop: 0,
    marginBottom: 80,
    backgroundColor: "#F5F7EC",
  },
});
