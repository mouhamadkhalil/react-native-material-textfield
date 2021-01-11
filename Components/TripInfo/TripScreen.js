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
import Arrow from "../../assets/Images_Design/arrow_right1.png";

export default class TripScreen extends React.Component {

  Flight = () => {
    this.props.navigation.navigate('Flights 1');
  }

  Pickup = () => {
    this.props.navigation.navigate('Pick up');
  }

  Hotel = () => {
    this.props.navigation.navigate('Hotel');
  }

  Game = () => {
    this.props.navigation.navigate('Game');
  }

  Sagrada = () => {
    this.props.navigation.navigate('Perk');
  }

  Restaurant = () => {
    this.props.navigation.navigate('Pick up');
  }

  Back = () => {
    this.props.navigation.navigate('Menu');
  }



  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 25, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
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

          <ScrollView>
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
                  onPress={this.Flight}
                >

                  <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>FLIGHT</Text>
                  <Text style={{ fontSize: 14, marginLeft: -30, color: "gray" }}>#123456</Text>

                  <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10, marginTop: -20 }} />
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
          <ScrollView>
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
              onPress={this.Pickup}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />
              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}> AIRPORT PICKUP</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>8th October 15:00h </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView>
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
              onPress={this.Hotel}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />
              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}> HOTEL RESERVATION</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>Hotel Gran de Barcelona</Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView>
            <Image
              source={Ticket}
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
              onPress={this.Game}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />
              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>GAME TICKETS</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>9 Oct Camp Nou Stadium</Text>
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
          <ScrollView>
            <Image
              source={Hotel2}
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
              onPress={this.Sagrada}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />
              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>SAGRADA FAMILIA</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>10 October, 14:30h </Text>
            </TouchableOpacity>
          </ScrollView>
          <ScrollView
            style={{ height: 2, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <ScrollView>
            <Image
              source={Sea}
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
              onPress={this.Sagrada}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />
              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>SAGRADA FAMILIA</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>10 October, 14:30h </Text>
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
          <ScrollView>
            <Image
              source={Airplane}
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
              onPress={this.Restaurant}
            >
              <Image source={Arrow} style={{ marginLeft: 170, width: 10, height: 10 }} />

              <TouchableOpacity style={{ marginTop: -23 }}>
                <Text style={{ fontWeight: "bold", color: "blue", marginLeft: -30 }}>RAO RESTUARANT</Text>
              </TouchableOpacity>
              <Text style={{ color: "gray", marginLeft: -30, }}>10 October, 14:30h </Text>
            </TouchableOpacity>
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
    marginTop: 0,
    width: 800,
  },
});
