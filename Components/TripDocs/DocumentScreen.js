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
    window.location = "/menu";
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
        <View style={{ backgroundColor: "blue", width: "50%", height: 50 }}>
          
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 25, color: "yellow", marginLeft: 30, marginTop: 10, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -25,
            }}
          >
            documents
          </Text>
        </View>
        <View style={{ width: "50%", height: 400, backgroundColor: "white" }}>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity onPress={this.Flight1}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>FLIGHT</Text>
              {/* <Image
                style={{ marginLeft: -60 }}
                source={Airplane}
                height="25"
                width="30"
              ></Image> */}
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -37,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Reference no:JZ9213
            </Text>
            <TouchableOpacity>
              {/* <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
              ></Image> */}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity onPress={this.PickUp}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                AIRPORT PICKUP
            </Text>
              {/* <Image
                style={{ marginLeft: -60 }}
                source={Airplane}
                height="25"
                width="30"
              ></Image> */}
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -35,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </Text>
            <TouchableOpacity>
              {/* <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
              ></Image> */}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity onPress={this.Hotel}>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                HOTEL RESERVATION
            </Text>
              <Image
                style={{ marginLeft: -60 }}
                source={Hotel}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: 20 }}>
              
              Booking ref:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: -50, marginTop: 30 }}>
            <TouchableOpacity>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                GAME TICKETS
            </Text>
              <Image
                style={{ marginLeft: -60 }}
                source={Hotel}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                GAME TICKETS
            </Text>
              <Image
                style={{ marginLeft: -60 }}
                source={Hotel}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#402CC0",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity>
              <Text style={{ color: "blue", fontWeight: "bold" }}>
                DINNER AT RAO
            </Text>
              <Image
                style={{ marginLeft: -60 }}
                source={Hotel}
                height="25"
                width="30"
              ></Image>
            </TouchableOpacity>
            <View
              style={{
                backgroundColor: "#186F29",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></View>
            <Text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking ref:1239081
            </Text>
            <TouchableOpacity>
              <Image
                style={{ marginLeft: 220, marginTop: -35 }}
                source={Download}
                height="25"
                width="30"
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
    backgroundColor:"white"
  },
});
