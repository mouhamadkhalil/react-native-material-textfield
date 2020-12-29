import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env"

export default class Day2Screen extends React.Component {

  state = {
    Picture1: "",
    Picture2: "",
    Picture3: "",
    Picture4: "",
    isDone: false
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
        this.setState({ isDone: true })
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
            color: "#4c0099",
            fontWeight: "bold",
            fontSize: 19,
            marginLeft: 400,
            marginTop: -27,
          }}
        >
          23 &#8451;
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "#4c0099",
            fontSize: 70,
            marginLeft: 140
          }}
        >
          Flight day
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 23, marginLeft: 195 }}>
          3 planned activities
        </Text>
        <ScrollView
          style={{
            backgroundColor: "#80ff00",
            width: 310,
            height: 85,
            marginLeft: 140,
            marginTop: 40,
          }}
        >
          <Text
            style={{
              marginLeft: 22,
              marginTop: 20,
              fontWeight: "bold",
              fontSize: 17
            }}
          >
            THANKS FOR LETTING US KNOW!
          </Text>
          <Text style={{ marginLeft: 20, paddingTop: 8, fontSize: 12, fontWeight: "bold" }}>
            Great! You've checked in to your flight.
          </Text>
        </ScrollView>
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
            Chance of rain in Barcelona, don't forget your umbrella!
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
            {this.state.isDone ? <Image source={this.state.Picture3 ? { uri: this.state.Picture3 } : null}
              style={{ width: 150, height: 180, marginLeft: 0 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture2 ? { uri: this.state.Picture2 } : null}
              style={{ width: 150, height: 180, marginLeft: 0 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
              style={{ marginLeft: 0, height: 160 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture4 ? { uri: this.state.Picture4 } : null}
              style={{ marginLeft: 0, height: 160 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture2 ? { uri: this.state.Picture2 } : null}
              style={{ width: 150, height: 160, marginLeft: 0 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture3 ? { uri: this.state.Picture3 } : null}
              style={{ marginLeft: 0, height: 160 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
            {this.state.isDone ? <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
              style={{ marginLeft: 0, height: 160 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: 0 }}
              />}
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
    marginTop: 50,
    marginBottom: 10,
    backgroundColor: "#F5F7EC",
  },
});
