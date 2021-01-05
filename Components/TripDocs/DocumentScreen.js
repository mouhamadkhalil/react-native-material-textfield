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
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 50, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -45,
              marginLeft: 50
            }}
          >
            documents
          </Text>
        </View>
        <View style={{ width: "50%", height: 450, backgroundColor: "white" }}>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
              <Text style={{ color: "blue", fontWeight: "bold", marginTop: 10 }}>FLIGHT</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Airplane}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#48D52C",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Reference no:JZ9213
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#5FE903",
              width: 7,
              marginLeft: -100,
              height: 60,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Pickup}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>AIRPORT PICKUP</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Airplane}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Reference no:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#5FE903",
              width: 7,
              marginLeft: -100,
              height: 60,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Hotel}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>HOTEL RESERVATION</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Hotel}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Booking ref:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#5FE903",
              width: 7,
              marginLeft: -100,
              height: 60,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Game}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>GAME TICKETS</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Hotel}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Booking no:123908123
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#5FE903",
              width: 7,
              marginLeft: -100,
              height: 60,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Game}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>GAME TICKETS</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Hotel}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#0000FF",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Booking no:123908123
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
                source={Download}
              ></Image>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: "#0000FF",
              width: 7,
              marginLeft: -100,
              height: 60,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Restaurant}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>DINNER AT RAO</Text>
              <Image
                style={{ marginLeft: -70, height: 30, width: 30, marginTop: -10 }}
                source={Hotel}
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#006633",
                width: 7,
                marginLeft: -100,
                height: 60,
                marginTop: -40,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -30, width: 400, marginLeft: -5 }}>
              {" "}
              Booking ref:123908123
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 180, marginTop: -40, height: 40, width: 40 }}
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
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -100,
    marginTop: -100,
    width: 500,
    marginBottom: 0,
    backgroundColor: "white"
  },
});
