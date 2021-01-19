import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import User from "../../assets/images/user.png";
import Airplane from "../../assets/images/airplane.jpg";
import Hotel from "../../assets/images/hotel.jpg";
import Download from "../../assets/images/download.jpg";
import SignupScreen from "../Start/SignupScreen";
import HotelScreen from "../TripInfo/HotelScreen";

export default class DocumentScreen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Menu');
  }

  Flight1 = () => {
    this.props.navigation.navigate('Flights 2');
  }

  Pickup = () => {
    this.props.navigation.navigate('Pick up');
  }

  Hotel = () => {
    this.props.navigation.navigate('Hotel');
  }

  Game = () => {
    this.props.navigation.navigate('Game');
  }

  Sagrada = () => {
    this.props.navigation.navigate('Perk');
  }

  Restaurant = () => {
    this.props.navigation.navigate('Pick up');
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "100%", height: 60, marginTop: -100 }}>
          <TouchableOpacity style={{ width: 110, marginLeft: 100, height: 60, marginTop: 0 }} onPress={this.Back} >
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: -80, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -45,
              marginLeft: -260
            }}
          >
            documents
          </Text>
        </View>
        <View style={{ width: "100%", height: 1000, backgroundColor: "#F6EAEA" }}>
          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Flight1} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>FLIGHT</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Airplane}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Pickup} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>AIRPORT PICKUP</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Airplane}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Hotel} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>HOTEL RESERVATION</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Hotel}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Game} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>GAME TICKETS</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Hotel}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Game} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>GAME TICKETS</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Hotel}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>

          <View style={{ marginLeft: 125, marginTop: 25 }}>
            <View style={{ backgroundColor: "white", marginLeft: -100, width: 320, height: 60 }}>
              <TouchableOpacity onPress={this.Hotel} style={{ height: 60, width: 250 }}>
                <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10, marginLeft: 100 }}>DINNER AT RAO</Text>
                <Image
                  style={{ marginLeft: 30, height: 30, width: 30, marginTop: -14 }}
                  source={Hotel}
                ></Image>
              </TouchableOpacity>
              <View
                style={{
                  backgroundColor: "#48D52C",
                  width: 7,
                  marginLeft: 0,
                  height: 60,
                  marginTop: -60,
                  paddingTop: -100,
                }}
              ></View>
              <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: 97 }}>
                {" "}
              Reference no:JZ9213
            </Text>
            </View>
            <TouchableOpacity style={{ height: 30, width: 30, marginLeft: 190, marginTop: -30 }} Download="true">
              <Image
                style={{ marginLeft: -10, marginTop: -20, height: 40, width: 40 }}
                source={Download}
              ></Image>
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
    marginLeft: 0,
    marginTop: 100,
    width: 500,
    marginBottom: 0,
    backgroundColor: "white"
  },
});
