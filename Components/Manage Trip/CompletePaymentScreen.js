import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
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
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60, width: 375 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 40, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
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
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 750, backgroundColor: "#E6F5F3" }}>
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
            style={{ width: 290, marginTop: 20, marginLeft: 40, fontSize: 18 }}
          >
            Once you have completed this payment you will gain full access to
            the app, and your travel documents.
          </Text>

          <ScrollView
            style={{
              backgroundColor: "white",
              height: 430,
              width: 290,
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
                width: 145,
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
                marginLeft: 145,
                height: 50,
                width: 145,
              }}
            >
              <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
                SUBMIT
              </Text>
            </TouchableOpacity>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    marginLeft: 0,
    marginTop: 0,
    width: 700,
  },
});
