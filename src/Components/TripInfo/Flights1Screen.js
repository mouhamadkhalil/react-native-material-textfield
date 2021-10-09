import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";


export default class Flights1Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Trip');
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back} style={{ width: 110, marginLeft: 0, height: 65, marginTop: 0 }}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 40, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: -40,
            marginLeft: -430,
            marginBottom: 30
          }}
        >
          my flights
          </Text>
        <ScrollView style={{ width: "50%", height: 950, backgroundColor: "#E6F5F3" }}>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 180,
              width: 290,
              TextAlign: "center",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontSize: 17,
                fontWeight: "bold",
                marginLeft: 20,
                marginTop: 25,
              }}
            >
              BOOKING DETAILS
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 13,
                marginLeft: 40,
                marginTop: 20,
              }}
            >
              REFERENCE
            </Text>
            <Text
              style={{
                color: "black",
                fontWeight: "bold",
                fontSize: 19,
                marginLeft: 190,
                marginTop: -22,
              }}
            >
              JEZ1209
            </Text>
            <ScrollView
              style={{ height: 2, backgroundColor: "#F9E8E8", marginTop: 20 }}
            ></ScrollView>

            <Text style={{ color: "blue", marginTop: 20, marginLeft: 40 }}>
              Economy class
            </Text>

            <Text style={{ color: "blue", marginLeft: 190, marginTop: -18 }}>
              20kg Luggage{" "}
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 130,
              width: 290,
              TextAlign: "center",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontSize: 17,
                fontWeight: "bold",
                marginLeft: 40,
                marginTop: 25,
              }}
            >
              PASSENGERS
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 13,
                marginLeft: 40,
                marginTop: 20,
              }}
            >
              PASSENGER 1
            </Text>
            <Text
              style={{
                color: "gray",
                fontSize: 13,
                marginLeft: 175,
                marginTop: -17,
              }}
            >
              PASSENGER 2
            </Text>
            <Text style={{ marginLeft: 40, paddingTop: 10 }}>
              Jamie Oliver{" "}
            </Text>
            <Text style={{ marginLeft: 175, marginTop: -19 }}>
              Gordon Ramsey
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 310,
              width: 290
            }}
          >
            <Text
              style={{
                color: "blue",
                fontSize: 17,
                fontSize: 17,
                fontWeight: "bold",
                marginLeft: 40,
                marginTop: 25,
              }}
            >
              FLIGHT
            </Text>
            <Text
              style={{
                color: "gray",
                paddingTop: 10,
                fontSize: 13,
                marginLeft: 40,
              }}
            >
              OUTBOUND
            </Text>
            <Text style={{ paddingTop: 10, fontSize: 14, marginLeft: 40 }}>
              Sun, 7 oct 2018
            </Text>
            <Text
              style={{
                marginLeft: 40,
                fontSize: 14,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 40 }}>BEY</Text>
            <Text
              style={{
                marginLeft: 200,
                fontSize: 14,
                fontWeight: "bold",
                marginTop: -44,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 200 }}>BCN</Text>
            <ScrollView
              style={{ height: 2, backgroundColor: "#F9E8E8", marginTop: 20 }}
            ></ScrollView>
            <Text
              style={{
                color: "gray",
                paddingTop: 10,
                fontSize: 13,
                marginLeft: 40,
              }}
            >
              RETURN
            </Text>
            <Text style={{ paddingTop: 10, fontSize: 14, marginLeft: 40 }}>
              Sun, 7 oct 2018
            </Text>
            <Text
              style={{
                marginLeft: 40,
                fontSize: 14,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 40 }}>BEY</Text>
            <Text
              style={{
                marginLeft: 200,
                fontSize: 14,
                fontWeight: "bold",
                marginTop: -44,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 200 }}>BCN</Text>
          </ScrollView>
          <Text
            style={{
              color: "red",
              fontSize: 11,
              paddingTop: 30,
              marginLeft: 70,
            }}
          >
            IMPORTANT INFORMATION ABOUT YOUR FLIGHT{" "}
          </Text>
          <Text
            style={{ width: 260, fontSize: 13, paddingTop: 30, marginLeft: 45 }}
          >

            We recommend that you complete check in at least 2 hours before the
            departure of your flight.
          </Text>
          <Text
            style={{
              width: 260,
              fontSize: 13,
              paddingTop: 30,
              marginLeft: 45,
              paddingTop: 6,
            }}
          >
            Each passenger is responsible for having the documentation required
            for flying according to their particular situation.
          </Text>
        </ScrollView>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: 1000,
    marginLeft: 0,
    marginTop: 0,
    width: 800,
  },
});
