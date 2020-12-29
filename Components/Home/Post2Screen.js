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

export default class Post2Screen extends React.Component {

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
            marginTop: 20,
            color: "#4c0099",
            fontSize: 80,
            marginLeft: 170
          }}
        >
          Hello :)
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 16, width: 400, marginLeft: 145 }}>
          Check out some awesome upcoming trips!
        </Text>
        <ScrollView
          style={{
            marginTop: 20,
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
            marginTop: 20,
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
    marginBottom: 0,
    backgroundColor: "#F5F7EC",
  },
});
