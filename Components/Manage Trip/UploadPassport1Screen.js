import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default class UploadPassport1Screen extends React.Component {

  Back = () => {
    window.location = "/ManageTrip";
  }

  AddFile = () => {
    window.location = "/UploadPassport2";
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
              marginTop: -32,
              marginLeft: -20
            }}
          >
            upload passport
          </Text>
        </View>
        <View style={{ width: "50%", height: 600, backgroundColor: "#E6F5F3" }}>
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
          <TouchableOpacity style={{ marginLeft: 300, marginTop: -15 }} onPress={this.AddFile}>
            <Text style={{ fontSize: 13, marginLeft: -20, marginTop: -10 }}>
              ADD FILE
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
          <TouchableOpacity style={{ marginLeft: 300, marginTop: -15 }} onPress={this.AddFile}>
            <Text style={{ fontSize: 13, marginLeft: -20, marginTop: -10 }}>
              ADD FILE
            </Text>
          </TouchableOpacity>
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
    marginTop: -70,
    width: 800,
  },
});
