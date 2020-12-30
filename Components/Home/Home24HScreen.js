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
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Arrow1 from "../../assets/Images_Design/arrow_right1.png";
import Arrow2 from "../../assets/Images_Design/arrow_right2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import DownArrow from "../../assets/Images_Design/down_arrow_1.png";
import Chat from "../../assets/Images_Design/chat1.png";

export default class Home24HScreen extends React.Component {

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
        this.setState({ isDone: true });
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
        <Image source={Search} style={{ width: 40, height: 40, marginLeft: 380, marginTop: -30 }} />
        <Image source={Notifictaion} style={{ width: 20, height: 20, marginLeft: 430, marginTop: -30 }} />
        <TouchableOpacity>
          <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -25 }} />
          <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
          <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 30,
            color: "#4c0099",
            fontSize: 70,
            marginLeft: 160
          }}
        >
          23:22:23
        </Text>
        <Text style={{ color: "#4c0099", fontSize: 19, marginLeft: 230 }}>
          Pack your bag!
        </Text>
        <Image source={DownArrow} style={{ width: 20, height: 20, marginLeft: 285, marginTop: 10 }} />
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
        <TouchableOpacity>
          <Image source={Chat} style={{ width: 100, height: 100, marginLeft: 380 }} />
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1100,
    marginLeft: -110,
    width: 500,
    marginTop: 30,
    marginBottom: 0,
    backgroundColor: "#F5F7EC",
  },
});
