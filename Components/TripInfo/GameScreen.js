import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { API_URL, API_TOKEN } from "@env"

export default class GameScreen extends React.Component {
  Back = () => {
    window.location = "/tripInfo";
  }

  state = {
    Game_Start: "",
    Arrival: "",
    Location: "",
    Picture: "",
    Team1: "",
    Team2: "",
    Seat_Id: "",
    GamePicture: "",
    isDone: false
  };

  componentDidMount() {
    const url = `${API_URL}/mobile/game/GetHomePageData`;

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
        console.log("pic", response.GamesList.Items[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3)
        this.setState({ Game_Start: response.GamesList.Items[0].StartDate });
        this.setState({ Arrival: response.GamesList.Items[0].EndDate });
        this.setState({ GamePicture: response.GamesList.Items[0].MatchBundleDetail[0].GameSeat.StadiumMap_IMG_v3 });
        this.setState({
          Location: response.GamesList.Items[0].MatchBundleDetail[0].Game.City,
        });
        this.setState({
          Team1: response.GamesList.Items[0].MatchBundleDetail[0].Game.HomeTeam,
        });
        this.setState({
          Team2: response.GamesList.Items[0].MatchBundleDetail[0].Game.AwayTeam,
        });
        this.setState({
          Picture:
            response.GamesList.Items[0].MatchBundleDetail[0].GameSeats[0]
              .StadiumMap_SVG_v3,
        });
        this.setState({
          Seat_Id:
            response.GamesList.Items[0].MatchBundleDetail[0].GameSeats[0]
              .id_Team_Seating,
        });
        this.setState({ isDone: true });

      });
  }

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
              textAlign: "center",
              marginTop: -30,
            }}
          >
            the game
          </Text>
        </ScrollView>
        <ScrollView
          style={{ width: 380, height: 1700, backgroundColor: "#E6F5F3" }}
        >
          <ScrollView
            style={{
              marginLeft: 40,
              marginTop: 30,
              height: 300,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                color: "blue",
                marginTop: 40,
                marginLeft: 30,
              }}
            >
              TTICKET DETAILS
            </Text>
            <Text
              style={{
                color: "gray",
                paddingTop: 20,
                marginLeft: 30,
                fontSize: 12,
              }}
            >
              TEAMS
            </Text>
            <Text
              style={{
                marginLeft: 140,
                fontSize: 16,
                marginTop: -16,
                fontWeight: "bold"
              }}
            >
              {this.state.Team1} vs {this.state.Team2}
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
              GAME START
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10, fontSize: 11 }}>
              {this.state.Game_Start.split("2020-12-23T")}h
            </Text>

            <Text
              style={{
                color: "gray",
                marginTop: -40,
                marginLeft: 170,
                fontSize: 12,
              }}
            >
              ARRIVAL
            </Text>
            <Text style={{ marginLeft: 170, paddingTop: 10, fontSize: 11 }}>
              {this.state.Arrival.split("2020-12-23T")}h
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
              LOCATION
            </Text>
            <Text style={{ marginLeft: 30, paddingTop: 10 }}>
              <Text>{this.state.Location}</Text>
            </Text>
          </ScrollView>
          <TouchableOpacity>
            <Image
              style={{ marginLeft: 0, marginTop: 0, width: 200 }}
              source={this.state.Picture1 ? { uri: this.state.Picture } : null}
            />
          </TouchableOpacity>
          <ScrollView
            style={{
              marginLeft: 40,
              paddingLeft: -7,
              marginTop: 0,
              height: 250,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginLeft: 40,
                marginTop: 30,
                color: "blue",
              }}
            >
              HOW TO GET THERE
            </Text>
            <Text style={{ marginLeft: 70, marginTop: 10 }}>Camp Nou </Text>
            <Text style={{ marginLeft: 70, marginTop: 10 }}>
              C.d'Aristides Maillol,
            </Text>
            <Text style={{ marginLeft: 70, marginTop: 10 }}>
              12 08028 Barcelona
            </Text>
            <Text style={{ marginLeft: 70, marginTop: 15 }}>
              Les Corts (L3 Green)
            </Text>
            <Text style={{ marginLeft: 70, marginTop: 10 }}>
              Badal (L3 - Green)
            </Text>
            <Text style={{ marginLeft: 70, marginTop: 10 }}>
              Arizala - Les Corts (52, 54, D20 or H10)
            </Text>
          </ScrollView>
          <ScrollView
            style={{
              marginLeft: 40,
              paddingLeft: -7,
              marginTop: 30,
              height: 400,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginLeft: 40,
                marginTop: 30,
                color: "blue",
              }}
            >
              YOUR SEATING
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "gray",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              CATEGORY
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 40 }}>
              {this.state.Seat_Id}
            </Text>
            {this.state.isDone ? <Image source={this.state.GamePicture ? { uri: this.state.GamePicture } : null}
              style={{ marginLeft: 60, marginTop: 20, width: 180, height: 180 }} /> : <ActivityIndicator size="small" color="red"
                style={{ marginTop: 80, marginLeft: -20 }}
              />}
          </ScrollView>

          <ScrollView
            style={{
              marginLeft: 40,
              paddingLeft: -7,
              marginTop: 30,
              height: 600,
              marginRight: 40,
              backgroundColor: "white",
            }}
          >
            <Text
              style={{
                marginLeft: 40,
                marginTop: 30,
                color: "blue",
              }}
            >
              YOUR TICKETS
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "gray",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              E-TICKET
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 40, paddingTop: 5 }}>
              1 ticket
            </Text>
            <ScrollView
              style={{ height: 1, backgroundColor: "#E9C2C2", marginTop: 20 }}
            ></ScrollView>
            <TouchableOpacity>
              <Text
                style={{
                  marginLeft: 200,
                  marginTop: -42,
                  color: "#8D6C6C",
                }}
              >
                DOWNLOAD
              </Text>
            </TouchableOpacity>
            <Text
              style={{
                paddingTop: 20,
                color: "gray",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              PAPER TICKET
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 40, paddingTop: 5 }}>
              5 tickets
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "red",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              TICKET COLLECTION
            </Text>
            <Text
              style={{
                paddingTop: 20,
                marginLeft: 40,
                paddingTop: 5,
                width: 245,
              }}
            >
              Pick up your ticket at your hotel from 5pm on game day (8th Oct)
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "red",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              TICKET RETUTN
            </Text>
            <Text
              style={{
                paddingTop: 20,
                marginLeft: 40,
                paddingTop: 5,
                width: 245,
              }}
            >
              No need to return ticket, you can keep it as a souvenir!
            </Text>

            <ScrollView
              style={{ height: 1, backgroundColor: "#E9C2C2", marginTop: 20 }}
            ></ScrollView>

            <Text
              style={{
                paddingTop: 20,
                color: "gray",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              CRAD TICKET
            </Text>
            <Text style={{ paddingTop: 20, marginLeft: 40, paddingTop: 5 }}>
              5 tickets
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "red",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              TICKET COLLECTION
            </Text>
            <Text
              style={{
                paddingTop: 20,
                marginLeft: 40,
                paddingTop: 5,
                width: 245,
              }}
            >
              Pick up your ticket at your hotel from 5pm on game day (8th Oct)
            </Text>
            <Text
              style={{
                paddingTop: 20,
                color: "red",
                fontSize: 12,
                width: 260,
                marginLeft: 40,
              }}
            >
              TICKET RETUTN
            </Text>
            <Text
              style={{
                paddingTop: 20,
                marginLeft: 40,
                paddingTop: 5,
                width: 245,
              }}
            >
              Please return the ticket the following by 5pm at the latest.
            </Text>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 2100,
    marginLeft: -10,
    marginTop: 30,
    width: 800,
  },
});
