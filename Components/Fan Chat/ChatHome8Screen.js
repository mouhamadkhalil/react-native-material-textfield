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

export default class ChatHome8Screen extends React.Component {

  Back = () => {
    window.location = "/Group2b";
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Image
            source={User}
            style={{ marginLeft: 75, marginTop: -28, width: 25, height: 25 }}
          />
          <Text
            style={{
              marginLeft: 120,
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginTop: -25,
            }}
          >
            Jason Statham
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC" }}>
          <ScrollView>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginLeft: 120,
                marginTop: 200,
              }}
            >
              WOW, MUCH EMPTY
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 60,
                paddingTop: 15,
                fontSize: 17,
              }}
            >
              Getting writing and become part of
            </Text>
            <Text
              style={{
                color: "gray",
                paddingTop: 5,
                marginLeft: 100,
                fontSize: 18,
              }}
            >
              the fly-foot community...
            </Text>
            <Text
              style={{
                color: "gray",
                paddingTop: 5,
                marginLeft: 45,
                fontSize: 19,
              }}
            >
              You might make some new friends!
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                width: 300,
                marginLeft: 40,
                height: 50,
                marginTop: 150,
              }}
              placeholder="  Type your message here  ..."
            ></TextInput>
          </ScrollView>
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
