import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import { get } from "../../helpers/services.js";

export default class PickUpScreen extends React.Component {
  Back = () => {
    this.props.navigation.navigate('Trip');
  }

  state = {
    Reservation_Number: "",
    From: "",
    To: "",
    Transfer_Date: "",
    Pickup_Time: "",
    Room_Type: "",
  };

  componentDidMount() {
    try {
      this.getData();
    } catch { }
  }

  getData = () => {
    const _this = this;
    const path = `/mobile/game/GetHomePageData`;
    get(path).then((response) => {
      this.setState({
        Reservation_Number: response.GamesList.Items[0].BundleCode,
      });
      this.setState({
        From: response.GamesList.Items[1].MatchBundleDetail[0].Game.City,
      });
      this.setState({
        To: response.GamesList.Items[2].MatchBundleDetail[0].Game.City,
      });
    });
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back} style={{ width: 110, marginLeft: 0, height: 65, marginTop: 0 }}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 20, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -50,
              marginLeft: -30,
              marginBottom: 30
            }}
          >
            airport pickup
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 900, backgroundColor: "#E6F5F3" }}>
          <ScrollView
            style={{
              marginLeft: 0,
              marginTop: 0,
              height: 370,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 40,
                marginLeft: 30,
              }}
            >
              BOOKING DETAILS
            </Text>
            <Text
              style={{
                color: "gray",
                paddingTop: 20,
                marginLeft: 30,
                fontSize: 12,
              }}
            >
              RESERVATION NUMBER
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 12,
                marginLeft: 190,
                marginTop: -17,
              }}
            >
              {this.state.Reservation_Number}
            </Text>
            <ScrollView
              style={{ height: 1, backgroundColor: "#E9C2C2", marginTop: 20 }}
            ></ScrollView>
            <Text
              style={{
                color: "gray",
                paddingTop: 20,
                marginLeft: 30,
                fontSize: 12,
              }}
            >
              FROM
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10 }}>
              {this.state.From} Airport
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: -45,
                marginLeft: 190,
                fontSize: 12,
              }}
            >
              TO
            </Text>
            <Text style={{ marginLeft: 190, paddingTop: 10 }}>
              {this.state.To} Centre
            </Text>
            <ScrollView
              style={{ height: 1, backgroundColor: "#E9C2C2", marginTop: 20 }}
            ></ScrollView>
            <Text
              style={{
                color: "gray",
                paddingTop: 20,
                marginLeft: 30,
                fontSize: 12,
              }}
            >
              TRANSFER DATE
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10 }}>
              Sunday, 8th Oct
            </Text>
            <Text
              style={{
                color: "gray",
                marginTop: -46,
                marginLeft: 190,
                fontSize: 12,
              }}
            >
              PICKUP TIME
            </Text>
            <Text style={{ marginLeft: 190, paddingTop: 10 }}>15:00h</Text>
            <ScrollView
              style={{ height: 1, backgroundColor: "#E9C2C2", marginTop: 20 }}
            ></ScrollView>
            <Text style={{ marginLeft: 30, paddingTop: 25 }}>Private Taxi</Text>
            <Text style={{ marginLeft: 190, marginTop: -19 }}>2 adults</Text>
          </ScrollView>
          <ScrollView
            style={{
              marginLeft: 0,
              paddingLeft: -7,
              marginTop: 20,
              height: 170,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginLeft: 40,
                marginTop: 30,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              DRIVER
            </Text>
            <Text style={{ marginLeft: 40, marginTop: 30, color: "gray" }}>
              NAME
            </Text>
            <Text style={{ marginLeft: 40, marginTop: 15 }}>Hussain Bolt </Text>
            <Text style={{ marginLeft: 190, marginTop: -52, color: "gray" }}>
              PHONE NO.
            </Text>
            <Text style={{ marginLeft: 190, marginTop: 16 }}>
              + 34 651 23 12 32
            </Text>
          </ScrollView>

          <ScrollView
            style={{
              marginLeft: 0,
              paddingLeft: -7,
              marginTop: 20,
              height: 230,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginLeft: 40,
                marginTop: 30,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              DESTINATION
            </Text>

            <Text style={{ paddingTop: 20, width: 260, marginLeft: 50 }}>
              Hotel Grand Central Barcelona Carrer de la Duquessa d'Orleans, 56,
              08034 Barcelona
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 50 }}>
              +34 932 05 09 61
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 50 }}>
              info@hotelgrandcentral.com
            </Text>
          </ScrollView>
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
