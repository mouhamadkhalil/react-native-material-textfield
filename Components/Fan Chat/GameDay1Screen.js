import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Cloudy from "../../assets/images/cloudy.png";

export default class GameDay1Screen extends React.Component {

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
            color: "#4c0099",
            fontWeight: "bold",
            marginTop: 40,
            fontSize: 22,
            marginLeft:80
          }}
        >
          MONDAY 12 SEPT
        </Text>
        <Text
          style={{
            marginTop: 20,
            color: "#4c0099",
            fontSize: 70,
            
          }}
        >
          GAME DAY
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 23,marginLeft:90 }}>Are you excited?</Text>

        <ScrollView
          style={{
            backgroundColor: "#e0e0e0",
            marginTop: 50,
            width: 430,
            height: 80,
          }}
        >
          <Image
            source={Cloudy}
            style={{ width: 20, marginLeft: 30, paddingTop: 30 }}
          />
          <Text
            style={{
              color: "#cc00cc",
              marginLeft: 70,
              marginTop: 0,
              width: 190,
            }}
          >
            Chance of rain, don't forget your umbrella!
          </Text>
          <Text
            style={{
              fontSize: 38,
              color: "#4c0099",
              marginLeft: 365,
              marginTop: -39,
            }}
          >
            23 &deg;
          </Text>
        </ScrollView>

        <ScrollView
          style={{
            marginTop: 10,
            backgroundColor: "white",
            width: 430,
            height: 180,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture1 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          style={{
            marginTop: 10,
            backgroundColor: "white",
            width: 210,
            height: 180,
            marginLeft: -220,
          }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture1 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          style={{ marginTop: -180, width: 210, height: 210, marginLeft: 220 }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture2 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView
          style={{ marginTop: -25, marginLeft: 20, width: 450, height: 180 }}
        >
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture3 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={{ marginTop: 5, marginLeft: 20, width: 450, height: 180 }}>
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture3 }} />
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={{ marginTop: 5, marginLeft: 20, width: 450, height: 180 }}>
          <TouchableOpacity>
            <Image source={{ uri: this.state.Picture4 }} />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1320,
    marginLeft: 10,
    width: 500,
    marginTop: 50,
    marginBottom: 100,
    backgroundColor: "#F5F7EC",
  },
});
