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
    window.location = "/Group2";
  }

  Profile = () => {
    window.location = "/Group2b";
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.Profile}>
            <Image
              source={User}
              style={{ marginLeft: 70, marginTop: -27, width: 25, height: 25 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              marginLeft: 110,
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginTop: -27,
            }}
          >
            FLY-FOOT
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 750, backgroundColor: "#F9F4EC" }}>
          <Text
            style={{
              color: "gray",
              marginLeft: 140,
              fontWeight: "bold",
              marginTop: 30,
            }}
          >
            YESTERDAY
          </Text>
          <ScrollView
            style={{
              backgroundColor: "#C8ADFD",
              color: "black",
              width: 230,
              height: 110,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "green" }}>Georges Clooney</Text>
            <Text style={{ paddingTop: 10 }}>Space, the final frontier,</Text>
            <Text>These are the voyages of the</Text>
            <Text>starship Enterprise.</Text>
          </ScrollView>
          <Text style={{ color: "gray", marginLeft: 295, marginTop: -112 }}>
            10:33am
          </Text>
          <ScrollView
            style={{
              backgroundColor: "#C8ADFD",
              color: "black",
              width: 230,
              height: 110,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 30,
              marginTop: 115,
            }}
          >
            <Text style={{ color: "green" }}>Georges Clooney</Text>
            <Text style={{ paddingTop: 10 }}>Space, the final frontier,</Text>
            <Text>These are the voyages of the</Text>
            <Text>starship Enterprise.</Text>
          </ScrollView>
          <Text style={{ color: "gray", marginLeft: 295, marginTop: -112 }}>
            10:34am
          </Text>
          <Text
            style={{
              color: "gray",
              fontWeight: "bold",
              marginLeft: 160,
              marginTop: 130,
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
            Is anyone going out?
          </Text>
          <ScrollView
            style={{
              backgroundColor: "#C8ADFD",
              color: "black",
              width: 200,
              height: 95,
              paddingTop: 10,
              paddingLeft: 20,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            <Text style={{ color: "green" }}>Jason Statham</Text>
            <Text style={{ paddingTop: 10 }}> Not today mate, my flight</Text>
            <Text style={{ paddingTop: 0 }}> is early tomorrow.</Text>
          </ScrollView>
          <Text style={{ color: "gray", marginLeft: 295, marginTop: -75 }}>
            10:34am
          </Text>
          <TextInput
            style={{
              backgroundColor: "white",
              width: 320,
              marginLeft: 30,
              height: 50,
              marginTop: 100,
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
    marginBottom: 50,
  },
});
