import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Lightbox from 'react-native-lightbox-v2';

const sourceFile = require('../../helpers/services.js');

export default class HotelScreen extends React.Component {
  Back = () => {
    this.props.navigation.navigate('Trip');
  }

  state = {
    Check_In: "",
    Check_Out: "",
    Location: "",
    Picture: "",
    Room_Number: "",
    Room_Type: "",
    isDone: false
  };

  componentDidMount() {
    const url = `${API_URL}/mobile/game/GetHomePageData`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": sourceFile.Content_Type,
        "Accept": sourceFile.Accept,
        "ff_version": sourceFile.ff_version,
        "ff_language": sourceFile.ff_language,
        "source": sourceFile.source,
        // "authorization" : sourceFile.authorization,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {
        this.setState({ isDone: true })
        console.log("picture ", response.GamesList.Items[0].SelectedHotel.SelectedCategory
          .RoomType[0].NumRooms);
        this.setState({ Picture: response.GenericGames[0].MatchBundleHotels[0].Images[1] });
        this.setState({
          Room_Number:
            response.GamesList.Items[0].SelectedHotel.SelectedCategory
              .RoomType[0].NumRooms,
        });
        this.setState({
          Room_Type:
            response.GamesList.Items[0].SelectedHotel.SelectedCategory
              .RoomType[0].TypeName,
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
            my hotel
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 820, backgroundColor: "#E6F5F3" }}>
          <ScrollView style={{ height: 200, backgroundColor: "white" }}>
            <TouchableOpacity>
              {this.state.isDone ?
                <Lightbox >
                  <Image source={this.state.Picture ? { uri: this.state.Picture } : null}
                    style={{ width: 360, height: 200, marginLeft: 0 }} />
                </Lightbox>
                :
                <ActivityIndicator size="small" color="blue"
                  style={{ marginTop: 80, marginLeft: 0 }}
                />}
            </TouchableOpacity>
          </ScrollView>

          <ScrollView
            style={{
              marginLeft: 35,
              marginTop: 30,
              height: 180,
              width: 300,
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
              CONTACT
            </Text>
            <Text style={{ paddingTop: 10, marginLeft: 40, width: 250 }}>
              Carrer de la Duquessa d'Orleans, 56, 08034 Barcelona{" "}
            </Text>
            <Text style={{ marginLeft: 40, paddingTop: 10 }}>
              +34 932 05 09 61{" "}
            </Text>
            <Text style={{ marginLeft: 40, paddingTop: 10 }}>
              info@hotelmirabella.com{" "}
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              marginLeft: 40,
              marginTop: 30,
              height: 350,
              marginRight: 40,
              width: 300,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 40,
                width: 300,
                marginLeft: 30,
              }}
            >
              BOOKING DETAILS
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 30,
                paddingTop: 20,
                fontSize: 12,
              }}
            >
              CHECK-IN (AFTER 4PM)
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 180,
                marginTop: -15,
                fontSize: 12,
              }}
            >
              CHECK-OUT (BY 11AM)
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 30,
                paddingTop: 20,
                fontSize: 18,
              }}
            >
              7 October{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                marginLeft: 180,
                marginTop: -21,
                fontSize: 18,
              }}
            >
              13 October{" "}
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10 }}>Sunday</Text>
            <Text style={{ marginLeft: 180, marginTop: -16 }}>Saturday</Text>
            <Text style={{ color: "#6B5B5B", marginLeft: 45, marginTop: 20 }}>
              {this.state.Room_Number} {this.state.Room_Type.toLowerCase()} room{" "}
            </Text>
            <Text style={{ color: "#6B5B5B", marginLeft: 180, marginTop: -18 }}>
              1 adult{" "}
            </Text>
            <Text style={{ color: "#6B5B5B", marginLeft: 45, paddingTop: 20 }}>
              {this.state.Room_Number} twin room{" "}
            </Text>
            <Text style={{ color: "#6B5B5B", marginLeft: 180, marginTop: -18 }}>
              2 adults{" "}
            </Text>
            <Text style={{ color: "#6B5B5B", marginLeft: 45, paddingTop: 40 }}>
              Breakfast Included{" "}
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
