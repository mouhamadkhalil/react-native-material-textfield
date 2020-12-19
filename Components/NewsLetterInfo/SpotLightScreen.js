import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default class SpotLightScreen extends React.Component {
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
        console.log("test", response.GenericGames[0].MatchBundleHotels[0].Image)
        this.setState({ Picture: response.GenericGames[0].MatchBundleHotels[0].Image });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ width: "100%", backgroundColor: "white", height: 700 }}>
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture }} style={{ height: 250, width: 380, marginLeft: -30, marginTop: -50 }} />
          </TouchableOpacity>
          <View style={{ width: 500, height: 600, backgroundColor: "#4E30C9", marginLeft: -30 }}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginLeft: 65,
                marginTop: 50,
                width: 270,
              }}
            >
              THERE IS ONLY ONE{" "}
            </Text>
            <Text
              style={{
                marginTop: 5,
                color: "#161BAF",
                paddingTop: 7,
                color: "yellow",
                width: 370,
                fontSize: 25,
                paddingLeft: 20,
                marginLeft: 52,
                height: 55,
              }}
            >
              PREMIERE LEAGUE{" "}
            </Text>
            <Text
              style={{
                color: "white",
                marginLeft: 100,
                fontSize: 19,
                marginTop: 60,
                marginLeft: 100
              }}
            >
              BOOK YOUR TRIPS
            </Text>
            <Text style={{ color: "white", fontSize: 16, marginLeft: 115 }}>
              STARTING FROM{" "}
            </Text>
            <Text style={{ color: "yellow", fontSize: 35, marginLeft: 115 }}>
              1,200 ${" "}
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginLeft: 90,
                marginTop: 30,
                marginBottom: 40,
              }}
            >
              THE PRICE INCLUDE
            </Text>
            <TouchableOpacity>
              <Image source={{ uri: this.state.Picture }} style={{ marginTop: 15, marginLeft: 50, width: 70, height: 70 }} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: this.state.Picture }}
                style={{ marginLeft: 50, marginTop: 20, width: 70, height: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: this.state.Picture }}
                style={{ marginLeft: 160, marginTop: -160, width: 70, height: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: this.state.Picture }}
                style={{ marginLeft: 160, marginTop: -70, width: 70, height: 70 }}
              />
            </TouchableOpacity>

            <TouchableOpacity>
              <Image
                source={{ uri: this.state.Picture }}
                style={{ marginLeft: 270, marginTop: -160, width: 70, height: 70 }}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={{ uri: this.state.Picture }}
                style={{ marginLeft: 270, marginTop: -70, width: 70, height: 70 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    alignItems: "center",
    marginLeft: 30,
    width: 300,
    marginTop: 50,
    marginBottom: 20,
    backgroundColor: "white",
  },
});
