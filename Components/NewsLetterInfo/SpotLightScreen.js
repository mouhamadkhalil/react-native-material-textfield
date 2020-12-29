import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
ActivityIndicator
import { API_URL, API_TOKEN } from "@env"

export default class SpotLightScreen extends React.Component {
  state = {
    Picture: "",
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
        console.log("test", response.GenericGames[0].MatchBundleHotels[0].Image)
        this.setState({ Picture: response.GenericGames[0].MatchBundleHotels[0].Image });
      });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ width: "100%", backgroundColor: "white", height: 900 }}>
          <TouchableOpacity>

            {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
              style={{ height: 250, width: 380, marginLeft: 0, marginTop: -50 }} /> : <ActivityIndicator size="large" color="blue"
                style={{ marginTop: 0, marginLeft: 0 }}
              />}

          </TouchableOpacity>
          <ScrollView style={{ width: 500, height: 800, backgroundColor: "#4E30C9", marginLeft: -30 }}>
            <Text
              style={{
                color: "white",
                fontSize: 25,
                marginLeft: 100,
                marginTop: 50,
                width: 270,
              }}
            >
              THERE IS ONLY ONE
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
                marginLeft: 85,
                height: 55,
              }}
            >
              PREMIERE LEAGUE
            </Text>
            <Text
              style={{
                color: "white",
                marginLeft: 100,
                fontSize: 19,
                marginTop: 60,
                marginLeft: 130
              }}
            >
              BOOK YOUR TRIPS
            </Text>
            <Text style={{ color: "white", fontSize: 16, marginLeft: 150 }}>
              STARTING FROM
            </Text>
            <Text style={{ color: "yellow", fontSize: 35, marginLeft: 150 }}>
              1,200 $
            </Text>
            <Text
              style={{
                color: "white",
                fontSize: 20,
                marginLeft: 120,
                marginTop: 100,
                marginBottom: 40,
              }}
            >
              THE PRICE INCLUDE
            </Text>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginTop: 15, marginLeft: 70, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginLeft: 70, marginTop: 20, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginLeft: 180, marginTop: -160, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginLeft: 180, marginTop: -70, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginLeft: 290, marginTop: -160, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
            <TouchableOpacity>
              {this.state.isDone ? <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                style={{ marginLeft: 290, marginTop: -70, width: 70, height: 70 }} /> : <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 0, marginLeft: 0 }}
                />}
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    marginLeft: 0,
    width: 400,
    marginTop: 30,
    marginBottom: 0,
    backgroundColor: "white",
  },
});
