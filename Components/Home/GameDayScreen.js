import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { API_URL, API_TOKEN } from "@env"

export default class GameDayScreen extends React.Component {

  state = {
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: ""
  };

  componentDidMount() {
    const url = `${API_URL}/mobile/game/GetHomePageData`;

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
            marginLeft: 215
          }}
        >
          MONDAY 12 SEPT
        </Text>
        <Text
          style={{
            marginTop: 5,
            color: "#4c0099",
            fontSize: 60,
            marginLeft: 150
          }}
        >
          GAME DAY
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 19, marginLeft: 230 }}>
          Are you excited?
        </Text>
        <ScrollView
          style={{
            backgroundColor: "#e0e0e0",
            marginTop: 10,
            width: 310,
            height: 80,
            marginLeft: 140
          }}
        >
          <Text
            style={{
              color: "#cc00cc",
              marginLeft: 50,
              marginTop: 20,
              width: 190,
            }}
          >
            Chance of rain, don't forget your umbrella!
          </Text>
          <Text
            style={{
              fontSize: 35,
              color: "#4c0099",
              marginLeft: 250,
              marginTop: -42,
            }}
          >
            23&deg;
          </Text>
        </ScrollView>
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
        <ScrollView
          style={{
            marginTop: 10,
            backgroundColor: "white",
            width: 150,
            height: 160,
            marginLeft: 140,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture4 }} style={{ marginLeft: 0, height: 160 }} />
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
            <Image source={{ uri: this.state.Picture2 }} style={{ width: 150, height: 160, marginLeft: 0 }} />
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
            <Image source={{ uri: this.state.Picture3 }} style={{ marginLeft: 0, height: 160 }} />
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
