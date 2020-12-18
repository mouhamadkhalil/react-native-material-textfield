import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

export default class UploadPassport3Screen extends React.Component {
  Back = () => {
    window.location = "/UploadPassport2";
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 20, marginTop: 5, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginLeft: -10,
              marginTop: -32,
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
          <TouchableOpacity style={{ marginLeft: 200, marginTop: -20 }}>
            <Text
              style={{
                fontSize: 13,
                color: "gray",
              }}
            >
              REPLACE PASSPORT.JPG
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
          <TouchableOpacity style={{ marginLeft: 290, marginTop: -20 }}>
            <Text style={{ fontSize: 13 }}>
              ADD FILE
            </Text>
          </TouchableOpacity>

          <View style={{ marginTop: 340 }}>
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
            <Text style={{ marginTop: -40, color: "white", marginLeft: 40 }}>
              Passport has been updated
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
