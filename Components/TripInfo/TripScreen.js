import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import User from "../../assets/images/user.png";
import Airplane from "../../assets/images/airplane.jpg";
import Hotel from "../../assets/images/hotel.jpg";
import Download from "../../assets/images/download.jpg";
import Ticket from "../../assets/images/ticket.png";
import Car from "../../assets/images/car.jpg";
import Hotel2 from "../../assets/images/Hotel2.jpg";
import Sea from "../../assets/images/Sea.jpg";

export default class TripScreen extends React.Component {

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
              marginTop: -30,
            }}
          >
            trip information
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 850, backgroundColor: "#E6F5F3" }}>
          <ScrollView
            style={{
              fontWeight: 900,
              color: "#D42FBE",
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "pink", fontWeight: "bold", fontSize: 19 }}>TRAVEL</Text>
          </ScrollView>

          <ScrollView style={{}}>
            <Image
              source={Airplane}
              style={{ width: 50, height: 30, marginLeft: 30, paddingTop: 30, marginTop: 20 }}
            />
            <Text
              style={{
                marginLeft: 150,
                marginTop: -32,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text style={styles.item}>
                <TouchableOpacity
                  style={{
                    fontSize: 15,
                    marginLeft: 0,
                    color: "blue",
                    fontWeight: "bold",
                  }}
                >
                  <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>FLIGHT</Text>
                  <Text style={{ fontSize: 14, marginLeft: -30, color: "gray" }}>#123456</Text>

                  <Text
                    style={{
                      color: "gray",
                      fontWeight: "bold",
                      marginLeft: 170,
                      fontSize: 18,
                      marginTop: -32
                    }}
                  >
                    &gt;
                  </Text>
                </TouchableOpacity>
              </Text>
            </Text>
            <Text
              style={{
                marginLeft: 150,
                color: "blue",
                paddingTop: 2,
                color: "gray",
              }}
            ></Text>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Car}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            />
            <TouchableOpacity
              style={{
                fontSize: 15,
                marginLeft: 150,
                marginTop: -20,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  marginLeft: 170,
                  fontSize: 18,

                }}
              >
                &gt;
              </Text>
              <TouchableOpacity style={{ marginTop: -40 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}> AIRPORT PICKUP</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>8th October 15:00h </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Hotel}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            />
            <TouchableOpacity
              style={{
                fontSize: 15,
                marginLeft: 150,
                marginTop: -20,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  fontWeight: "bold",
                  marginLeft: 170,
                  fontSize: 18,
                }}
              >
                &gt;
               </Text>
              <TouchableOpacity style={{ marginTop: -40 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>HOTEL RESERVATION</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30 }}>Hotel Gran de Barcelona </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Ticket}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            />
            <TouchableOpacity
              style={{
                fontSize: 15,
                marginLeft: 150,
                marginTop: -30,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  marginLeft: 170,
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                &gt;
              </Text>
              <TouchableOpacity style={{ marginTop: -30 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}> GAME TICKETS</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", fontSize: 13, paddingTop: 0, marginLeft: -25 }}>
                9 Oct Camp Nou Stadium
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView
            style={{
              fontWeight: 900,
              color: "#D42FBE",
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "pink", fontSize: 19, fontWeight: "bold" }}>PERKS</Text>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Hotel2}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            />
            <TouchableOpacity
              style={{
                fontSize: 15,
                marginLeft: 150,
                marginTop: -30,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  marginLeft: 170,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              >
                &gt;
              </Text>
              <TouchableOpacity style={{ marginTop: -30 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>SAGRADA FAMILIA</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", fontSize: 13, paddingTop: 0, marginLeft: -30 }}>
                10 October, 14:30h
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Sea}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            />
            <TouchableOpacity
              style={{
                fontSize: 15,
                marginLeft: 150,
                marginTop: -30,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              <Text
                style={{
                  color: "gray",
                  marginLeft: 170,
                  fontSize: 18,
                  fontWeight: "bold"
                }}
              >
                &gt;
              </Text>
              <TouchableOpacity style={{ marginTop: -30 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>SAGRADA FAMILIA</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", fontSize: 13, paddingTop: 0, marginLeft: -30 }}>
                10 October, 14:30h
              </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView
            style={{
              fontWeight: 900,
              color: "#D42FBE",
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            <Text style={{ color: "pink", fontSize: 19, fontWeight: "bold" }}>RESERVATIONS</Text>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView style={{}}>
            <Image
              source={Airplane}
              style={{ width: 50, height: 30, marginLeft: 30, marginTop: 30 }}
            ></Image>
            <Text
              style={{
                marginLeft: 130,
                marginTop: -32,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              RAO RESTAURANT
            </Text>
            <Text
              style={{
                marginLeft: 130,
                color: "blue",
                paddingTop: 2,
                color: "gray",
              }}
            >
              10 October, 14:30h
            </Text>
            <Text
              style={{
                marginLeft: 320,
                color: "#6B0B5E",
                marginTop: -25,
                color: "gray",
                fontSize: 18,
                fontWeight: "bold",
              }}
            >
              &gt;
            </Text>
          </ScrollView>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 900,
    marginLeft: 0,
    marginTop: 50,
    width: 800,
  },
});
