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
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';
import { get } from "../../helpers/services.js";

const sourceFile = require('../../helpers/services.js');

export default class PerkScreen extends React.Component {
  Back = () => {
    this.props.navigation.navigate('Trip');
  }

  state = {
    Picture: "",
    Picture1: "",
    Ticket_Number: "",
    Time: "",
    Location: "",
    isDone: false
  };

  componentDidMount() {
    try {
      this.getData();
    } catch { }
  }

  getData = () => {
    const _this = this;
    const path = `/mobile/game/GetHomePageData`;
    get(path).then((response) => {
      this.setState({ isDone: true });
      this.setState({
        Picture: response.GamesList.Items[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3,
      });
      this.setState({
        Picture1: response.GenericGames[0].MatchBundleHotels[0].Images[1],
      });
      this.setState({
        Ticket_Number: response.GamesList.Items[1].SelectedHotel.HotelId,
      });
      this.setState({
        Location: response.GamesList.Items[1].SelectedHotel.HotelName,
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back} style={{ width: 110, marginLeft: 0, height: 65, marginTop: 0 }}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 20, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -50,
              marginLeft: -40,
              marginBottom: 30
            }}
          >
            perks
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 850, backgroundColor: "#E6F5F3" }}>
          <ScrollView style={{ height: 200, backgroundColor: "white" }}>
            <TouchableOpacity>
              {this.state.isDone ?
                <Lightbox >
                  <Image source={this.state.Picture1 ? { uri: this.state.Picture1 } : null}
                    style={{ width: 360, height: 200, marginLeft: 0 }} />
                </Lightbox>
                :
                <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 80, marginLeft: 0 }}
                />}
            </TouchableOpacity>
          </ScrollView>

          <ScrollView
            style={{
              marginLeft: 30,
              marginTop: 30,
              height: 200,
              width: 300,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 40,
                marginLeft: 30,
                fontSize: 18
              }}
            >
              TICKET DETAILS
            </Text>
            <Text
              style={{
                paddingTop: 10,
                fontSize: 14,
                color: "gray",
                paddingTop: 15,
                marginLeft: 30,
                width: 250,
              }}
            >
              TICKET NUMBER
            </Text>
            <Text
              style={{
                marginLeft: 200,
                marginTop: -15,
                fontWeight: "bold",
                fontSize: 10,
              }}
            >
              {this.state.Ticket_Number}
            </Text>
            <Text
              style={{
                marginLeft: 30,
                paddingTop: 10,
                color: "gray",
                paddingTop: 30,
              }}
            >
              TIME
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10, paddingTop: 10 }}>
              15:30h
            </Text>
            <Text
              style={{
                marginLeft: 210,
                marginTop: -74,
                color: "gray",
                paddingTop: 30,
              }}
            >
              LOCATION
            </Text>
            <Text
              style={{
                marginLeft: 210,
                paddingTop: 10,
                paddingTop: 10,
                width: 200,
                fontSize: 10,
                fontWeight: "bold",
              }}
            >
              {this.state.Location}
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              marginLeft: 30,
              marginTop: 20,
              height: 120,
              width: 300,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <TouchableOpacity>
              {this.state.isDone ?
                <Lightbox >
                  <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                    style={{ width: 170, height: 120, marginLeft: 70, marginTop: 0 }} />
                </Lightbox>
                :
                <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 80, marginLeft: 0 }}
                />}
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{
              marginLeft: 30,
              marginTop: 20,
              height: 230,
              width: 300,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{ marginLeft: 40, marginTop: 30, color: "blue", fontWeight: "bold", fontSize: 18 }}
            >
              HOW TO GET THERE
            </Text>
            <Text
              style={{
                marginLeft: 60,
                marginTop: 30,
                width: 200,
                marginTop: 19,
              }}
            >
              Carrer de Mallocra, 401, 08013 Barcelona
            </Text>
            <Text
              style={{
                marginLeft: 60,
                marginTop: 30,
                fontSize: 14,
                marginTop: 15,
                width: 200,
              }}
            >
              Sagrada Familia (L2 - Purple, L4 - Blue)
            </Text>
            <Text
              style={{
                marginLeft: 60,
                marginTop: 30,
                paddingBottom: 20,
                marginTop: 15,
                width: 200,
              }}
            >
              Mallocra - Marina ( 19, D50, N1, N7)
            </Text>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1000,
    marginLeft: 0,
    marginTop: 30,
    width: 800,
  },
});
