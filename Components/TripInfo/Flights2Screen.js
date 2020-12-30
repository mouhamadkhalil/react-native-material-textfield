import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

export default class Flights2Screen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 35, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              paddingTop: 13,
              marginTop: -40,
            }}
          >
            my flights
          </Text>
        </ScrollView>
        <ScrollView
          style={{ width: "50%", height: 1300, backgroundColor: "#E6F5F3" }}
        >
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 185,
              width: "80%",
              textAlign: "center",
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
                marginLeft: 195,
                marginTop: -22,
              }}
            >
              JEZ1209
            </Text>
            <ScrollView
              style={{ height: 2, backgroundColor: "#F9E8E8", marginTop: 20 }}
            ></ScrollView>

            <Text style={{ color: "blue", marginTop: 25, marginLeft: 40 }}>
              Economy class
            </Text>

            <Text style={{ color: "blue", marginLeft: 200, marginTop: -22 }}>
              20kg Luggage
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 130,
              width: "80%",
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
                marginLeft: 185,
                marginTop: -14,
              }}
            >
              PASSENGER 2
            </Text>
            <Text style={{ marginLeft: 40, paddingTop: 10 }}>
              Jamie Oliver
            </Text>
            <Text style={{ marginLeft: 185, marginTop: -20 }}>
              Gordon Ramsey
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              marginTop: 30,
              height: 180,
              width: "80%",
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
            <Text style={{ paddingTop: 10, fontSize: 19, marginLeft: 40 }}>
              Sun, 7 oct 2018
            </Text>
            <Text
              style={{
                marginLeft: 110,
                fontSize: 22,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 113 }}>BEY</Text>
            <Text
              style={{
                marginLeft: 250,
                fontSize: 22,
                fontWeight: "bold",
                marginTop: -48,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 252 }}>BCN</Text>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "#DCD4D4",
              marginLeft: 42,
              height: 360,
              width: "80%",
            }}
          >
            <ScrollView style={{ height: 120 }}>
              <Text style={{ marginLeft: 40, marginTop: 50 }}>3h</Text>
              <Text style={{ marginLeft: 40, marginTop: 20, color: "red" }}>
                2h 50
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -57 }}>
                10:45 &nbsp;&nbsp; BEY Beirut
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -45 }}>
                11:45 &nbsp;&nbsp; IST Istanbul
              </Text>
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: 110,
                  marginTop: 47,
                  fontSize: 14,
                }}
              >
                Connect in Airport
              </Text>
            </ScrollView>
            <ScrollView style={{ height: 120 }}>
              <Text style={{ marginLeft: 40, marginTop: 50 }}>3h</Text>
              <Text style={{ marginLeft: 40, marginTop: 20, color: "red" }}>
                2h 50
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -57 }}>
                10:45 &nbsp;&nbsp; BEY Beirut
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -45 }}>
                11:45 &nbsp;&nbsp; IST Istanbul
              </Text>
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: 110,
                  marginTop: 47,
                  fontSize: 14,
                }}
              >
                Connect in Airport
              </Text>
            </ScrollView>
            <ScrollView style={{ height: 120 }}>
              <Text style={{ marginLeft: 40, marginTop: 50 }}>3h</Text>
              <Text style={{ marginLeft: 40, marginTop: 20, color: "red" }}>
                2h 50
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -57 }}>
                10:45 &nbsp;&nbsp; BEY Beirut
              </Text>
              <Text style={{ marginLeft: 110, marginTop: -45 }}>
                11:45 &nbsp;&nbsp; IST Istanbul
              </Text>
              <Text
                style={{
                  color: "red",
                  fontWeight: "bold",
                  marginLeft: 110,
                  marginTop: 47,
                  fontSize: 14,
                }}
              >
                Connect in Airport
              </Text>
            </ScrollView>
          </ScrollView>
          <ScrollView
            style={{
              backgroundColor: "white",
              marginLeft: 42,
              height: 180,
              width: "80%",
            }}
          >
            <Text
              style={{
                color: "gray",
                fontSize: 17,
                fontSize: 17,
                marginLeft: 40,
                marginTop: 25,
              }}
            >
              RETURN
            </Text>
            <Text style={{ paddingTop: 10, fontSize: 19, marginLeft: 40 }}>
              Sun, 7 oct 2018
            </Text>
            <Text
              style={{
                marginLeft: 110,
                fontSize: 22,
                fontWeight: "bold",
                paddingTop: 10,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 114 }}>BEY</Text>
            <Text
              style={{
                marginLeft: 250,
                fontSize: 22,
                fontWeight: "bold",
                marginTop: -48,
              }}
            >
              10:45
            </Text>
            <Text style={{ marginLeft: 254 }}>BCN</Text>
          </ScrollView>
          <Text
            style={{
              color: "red",
              fontSize: 11,
              paddingTop: 30,
              marginLeft: 70,
            }}
          >
            IMPORTANT INFORMATION ABOUT YOUR FLIGHT
          </Text>
          <Text
            style={{ width: 340, fontSize: 13, paddingTop: 30, marginLeft: 45 }}
          >

            We recommend that you complete check in at least 2 hours before the
            departure of your flight.
          </Text>
          <Text
            style={{
              width: 340,
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
    marginLeft: -20,
    marginTop: 30,
    width: 800,
    marginBottom: 20,
  },
});
