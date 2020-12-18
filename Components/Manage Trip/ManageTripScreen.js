import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import User from "../../assets/images/user.png";
import Airplane from "../../assets/images/airplane.jpg";
import Hotel from "../../assets/images/hotel.jpg";
import Download from "../../assets/images/download.jpg";
import Ticket from "../../assets/images/ticket.png";
import Car from "../../assets/images/car.jpg";
import Hotel2 from "../../assets/images/Hotel2.jpg";
import Sea from "../../assets/images/Sea.jpg";
import Room from "../../assets/images/room.jpg";
import Stadium from "../../assets/images/stadium.jpg";

export default class ManageTripScreen extends React.Component {

  Back = () => {
    window.location = "/menu";
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -30,
              marginLeft: -20
            }}
          >
            manage trip
          </Text>
        </View>
        <View style={{ width: "50%", height: 600, backgroundColor: "#E6F5F3" }}>
          <Text
            style={{
              color: "#DC1579",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 40,
            }}
          >
            GENERAL
          </Text>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>

          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 25,
                marginLeft: 40,
              }}
            >
              Complete payment{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F717AD",
                marginTop: -30,
                marginLeft: 320,
                fontSize: 25
              }}
            >
              &gt;
                </Text>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
              }}
            >
              Upload passport{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F717AD",
                marginTop: -30,
                marginLeft: 320,
                fontSize: 25
              }}
            >
              &gt;
                </Text>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>

          <Text
            style={{
              color: "#DC1579",
              fontWeight: "bold",
              marginTop: 40,
              marginLeft: 40,
            }}
          >
            EDIT
          </Text>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 500,
              }}
            >
              Changes and cancellations{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F717AD",
                marginTop: -30,
                marginLeft: 320,
                fontSize: 25
              }}
            >
              &gt;
                </Text>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 700,
              }}
            >
              Travellers (invite to join){" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                color: "#F717AD",
                marginTop: -30,
                marginLeft: 320,
                fontSize: 25
              }}
            >
              &gt;
                </Text>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></View>
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
    marginLeft: -200,
    marginTop: -20,
    width: 800,
  },
});
