import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";

export default class CompletePaymentScreen extends React.Component {
  Back = () => {
    window.location = "/ManageTrip";
  }

  state = {
    Price: "",
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
        this.setState({ Price: response.GamesList.Items[0].Price });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 40, marginTop: 5, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -30,

            }}
          >
            payment
          </Text>
        </View>
        <View style={{ width: "50%", height: 3000, backgroundColor: "#E6F5F3" }}>
          <Text
            style={{
              color: "red",
              width: 170,
              fontSize: 12,
              marginTop: 30,
              marginLeft: 40,
            }}
          >
            OUTSTANDING PAYMENT
          </Text>
          <Text
            style={{
              color: "blue",
              marginLeft: 40,
              fontSize: 25,
              marginTop: 30,
            }}
          >
            $ {this.state.Price}
          </Text>
          <Text
            style={{ width: 320, marginTop: 20, marginLeft: 40, fontSize: 18 }}
          >
            Once you have completed this payment you will gain full access to
            the app, and your travel documents.
          </Text>

          <View
            style={{
              backgroundColor: "white",
              height: 900,
              width: 325,
              marginLeft: 40,
              marginTop: 40,
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginLeft: 30,
                marginTop: 30,
              }}
            >
              CARD DETAILS
            </Text>
            <Text style={{ color: "gray", marginLeft: 30, marginTop: 30 }}>
              Card Holder Name
            </Text>
            <TextInput
              placeholder="Type here..."
              style={{ width: 250, marginLeft: 30, marginTop: 20 }}
            ></TextInput>

            <Text style={{ color: "gray", marginLeft: 30, marginTop: 30 }}>
              Card Number
            </Text>
            <TextInput
              placeholder="Type here..."
              style={{ width: 250, marginLeft: 30, marginTop: 20 }}
            ></TextInput>
            <Text style={{ color: "gray", marginLeft: 30, marginTop: 30 }}>
              Expiry date
            </Text>
            <TextInput
              placeholder="DD/MM..."
              style={{ width: 125, marginLeft: 30, marginTop: 20 }}
            ></TextInput>
            <Text style={{ color: "gray", marginLeft: 200, marginTop: -55 }}>
              CVS
            </Text>
            <TextInput
              placeholder="000"
              style={{ width: 125, marginLeft: 200, marginTop: 20 }}
            ></TextInput>
            <TouchableOpacity
              style={{
                backgroundColor: "#322F29",
                marginTop: 30,
                height: 50,
                width: 162.5,
              }}
            >
              <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
                CANCEL
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                backgroundColor: "blue",
                marginTop: -50,
                marginLeft: 162.5,
                height: 50,
                width: 162.5,
              }}
            >
              <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
                SUBMIT
              </Text>
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
    marginLeft: -220,
    marginTop: 1120,
    width: 800,
  },
});
