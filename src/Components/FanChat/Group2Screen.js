import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import User from "../../assets/images/user.png";

export default class Group2bScreen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Group 2b Screen');
  }

  Profile = () => {
    window.location = "/Group2";
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 25, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Profile}>
            <Image
              source={User}
              style={{ marginLeft: 75, marginTop: -28, width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 120,
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginTop: -30,
            }}
          >
            FLY-FOOT
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 700, backgroundColor: "#F9F4EC" }}>
          <Text
            style={{
              color: "gray",
              marginLeft: 140,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            WELCOME TO
          </Text>
          <Text
            style={{
              color: "blue",
              marginLeft: 80,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            FLY-FOOT FANS GROUP CHAT
          </Text>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              marginLeft: 160,
              marginTop: 30,
            }}
          >
            TODAY
          </Text>
          <Text style={{ color: "gray", marginLeft: 30, marginTop: 30 }}>
            15:33
          </Text>
          <Text
            style={{
              backgroundColor: "white",
              color: "black",
              width: 200,
              height: 40,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 150,
              marginTop: -30,
            }}
          >
            Hey, what's up?
          </Text>

          <Text style={{ color: "gray", marginLeft: 30, marginTop: 30 }}>
            15:34
          </Text>
          <Text
            style={{
              backgroundColor: "white",
              color: "black",
              width: 200,
              height: 40,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 150,
              marginTop: -30,
            }}
          >
            Who's going to the game?
          </Text>
          <ScrollView
            style={{
              backgroundColor: "#C8ADFD",
              color: "black",
              width: 200,
              height: 85,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "green" }}>Jason Statham</Text>
            <Text style={{ paddingTop: 10 }}>
              I am! Write me a private message.
            </Text>
          </ScrollView>
          <Text style={{ color: "gray", marginLeft: 290, marginTop: -90 }}>
            10:34am
          </Text>

          <TextInput
            style={{
              backgroundColor: "white",
              width: 320,
              marginLeft: 30,
              height: 50,
              marginTop: 320,
              paddingLeft: 30,
            }}
            placeholder="Type your message here..."
          ></TextInput>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    marginLeft: 0,
    marginTop: 30,
    width: 800,
  },
});
