import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Link, Router } from "react-router-dom";
import User from "../../assets/images/user.png";
import Airplane from "../../assets/images/airplane.jpg";
import Hotel from "../../assets/images/hotel.jpg";
import Download from "../../assets/images/download.jpg";

export default class App extends React.Component {

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
            <text style={{ fontSize: 25, color: "yellow", marginLeft: 30, marginTop: 10, fontWeight: "bold" }}>&#8592;</text>
        </TouchableOpacity>
          <text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: -25,
            }}
          >
            documents
          </text>
        </View>
        <View style={{ width: "50%", height: 400, backgroundColor: "white" }}>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
          <TouchableOpacity onPress={this.Flight1}>
            <text style={{ color: "blue", fontWeight: "bold" }}>FLIGHT</text>
            <img
              style={{ marginLeft: -60 }}
              src={Airplane}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>
           
            <view
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -37,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Reference no:JZ9213
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity onPress={this.PickUp}>
            <text style={{ color: "blue", fontWeight: "bold" }}>
              AIRPORT PICKUP
            </text>
            <img
              style={{ marginLeft: -60 }}
              src={Airplane}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>
            <view
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -35,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity onPress={this.Hotel}>
            <text style={{ color: "blue", fontWeight: "bold" }}>
              HOTEL RESERVATION
            </text>
            <img
              style={{ marginLeft: -60 }}
              src={Hotel}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>           
            <view
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking ref:1239081
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity>
            <text style={{ color: "blue", fontWeight: "bold" }}>
              GAME TICKETS
            </text>
            <img
              style={{ marginLeft: -60 }}
              src={Hotel}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>           
            <view
              style={{
                backgroundColor: "#5FE903",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity>
            <text style={{ color: "blue", fontWeight: "bold" }}>
              GAME TICKETS
            </text>
            <img
              style={{ marginLeft: -60 }}
              src={Hotel}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>         
            <view
              style={{
                backgroundColor: "#402CC0",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking no:1239081
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 130, marginTop: 30 }}>
            <TouchableOpacity>
            <text style={{ color: "blue", fontWeight: "bold" }}>
              DINNER AT RAO
            </text>
            <img
              style={{ marginLeft: -60 }}
              src={Hotel}
              height="25"
              width="30"
            ></img>
            </TouchableOpacity>          
            <view
              style={{
                backgroundColor: "#186F29",
                width: 7,
                marginLeft: -100,
                height: 50,
                marginTop: -32,
                paddingTop: -100,
              }}
            ></view>
            <text style={{ color: "gray", marginTop: -25 }}>
              {" "}
              Booking ref:1239081
            </text>
            <TouchableOpacity>
              <img
                style={{ marginLeft: 220, marginTop: -35 }}
                src={Download}
                height="25"
                width="30"
              ></img>
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
    marginLeft: 300,
    marginTop: -50,
    width: 800,
    marginBottom: 100,
  },
});
