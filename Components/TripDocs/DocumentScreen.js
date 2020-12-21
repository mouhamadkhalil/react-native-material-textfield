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

export default class DocumentScreen extends React.Component {

  Back = () => {
    window.location = "/";
  }

  Flight1 = () => {
    window.location = "/Flights1";
  }

  PickUp = () => {
    window.location = "/AirportPickup";
  }

  Hotel = () => {
    window.location = "/Hotel";
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "100%", height: 50, marginTop: -150 }}>
          <TouchableOpacity >
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 155, marginTop: -5, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -35,
              marginLeft: 50
            }}
          >
            documents
          </Text>
        </View>
        <View style={{ width: "50%", height: 400, backgroundColor: "white" }}>
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
                height: 50,
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
              height: 50,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
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
                height: 50,
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
              height: 50,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
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
                height: 50,
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
              height: 50,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
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
                height: 50,
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
              height: 50,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
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
                height: 50,
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
              height: 50,
              marginTop: -40,
              paddingTop: -100,
            }}>
          </View>
          <View style={{ marginLeft: 105, marginTop: 25 }}>
            <TouchableOpacity onPress={this.Flight1}>
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
                height: 50,
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
    height: 700,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -100,
    marginTop: -50,
    width: 500,
    marginBottom: 100,
    backgroundColor: "white"
  },
});
