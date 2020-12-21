import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class Post2Screen extends React.Component {

  state = {
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: ""
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
        this.setState({ Picture1: response.GenericGames[0].MatchBundleHotels[0].Images[1] });
        this.setState({ Picture2: response.GenericGames[0].MatchBundleHotels[0].Images[2] });
        this.setState({ Picture3: response.GenericGames[0].MatchBundleHotels[0].Images[3] });
        this.setState({ Picture4: response.GenericGames[0].MatchBundleHotels[0].Images[4] });
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text
          style={{
            alignContent: "center",
            color: "#4c0099",
            fontWeight: "bold",
            marginTop: 40,
            fontSize: 19,
            marginLeft: 210
          }}
        >
          MONDAY 12 SEPT
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "#4c0099",
            fontSize: 80,
            marginLeft: 170
          }}
        >
          Hello :)
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 23, marginLeft: 195 }}>
          Check out some awesome upcoming trips!
        </Text>
        <ScrollView
          style={{
            marginTop: 30,
            backgroundColor: "white",
            width: 150,
            height: 160,
            marginLeft: 140,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture3 }} style={{ width: 150, height: 180, marginLeft: 0 }} />
          </TouchableOpacity>
        </ScrollView>

        <ScrollView
          style={{
            marginTop: -160,
            backgroundColor: "white",
            width: 150,
            height: 160,
            marginLeft: 300,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture2 }} style={{ width: 150, height: 180, marginLeft: 0 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          style={{
            marginTop: 10,
            backgroundColor: "white",
            width: 310,
            height: 160,
            marginLeft: 140,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture1 }} style={{ marginLeft: 0, height: 160 }} />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1100,
    marginLeft: -110,
    width: 500,
    marginTop: 0,
    marginBottom: 70,
    backgroundColor: "#F5F7EC",
  },
});
