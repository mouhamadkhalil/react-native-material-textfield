import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default class InviteToJoin3Screen extends React.Component {

  Back = () => {
    window.location = "/InviteToJoin2";
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 25, marginTop: 5, fontWeight: "bold" }}>&#8592;</Text>
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
            travellers
          </Text>
        </View>
        <View style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC" }}>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            TRAVELLER 1
          </Text>
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            Hannibal Lecter
          </Text>
          <TouchableOpacity style={{ marginLeft: 220, marginTop: -15 }}>
            <Text
              style={{
                color: "gray",
                fontSize: 13,
              }}
            >
              RESEND INVITATION
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            TRAVELLER 2
          </Text>
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            William Wallace
          </Text>
          <TouchableOpacity style={{ marginLeft: 220, marginTop: -15 }}>
            <Text style={{ fontSize: 13 }}>
              INVITE TO APP
            </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 290 }}>
            <Text
              style={{
                marginLeft: 25,
                width: 310,
                paddingTop: 20,
                backgroundColor: "black",
                height: 60,
              }}
            >
            </Text>
            <Text
              style={{
                marginTop: -40,
                color: "white",
                marginLeft: 40,
              }}
            >
              Invitation sent to Hannibal Lecter
            </Text>
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
    marginLeft: -200,
    marginTop: -80,
    width: 800,
  },
});
