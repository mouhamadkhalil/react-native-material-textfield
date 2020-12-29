import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class ManageTripScreen extends React.Component {

  Back = () => {
    window.location = "/menu";
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
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
            manage trip
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#E6F5F3" }}>
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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>

          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 25,
                marginLeft: 40,
                fontSize: 18
              }}
            >
              Complete payment
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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                fontSize: 18
              }}
            >
              Upload passport
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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>

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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 500,
                fontSize: 18
              }}
            >
              Changes and cancellations
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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 700,
                fontSize: 18
              }}
            >
              Travellers (invite to join)
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
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 700,
    marginLeft: 0,
    marginTop: 30,
    width: 800,
  },
});
