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

export default class ChatHome10Screen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Image
            source={User}
            style={{ marginLeft: 70, marginTop: -30, width: 25, height: 25 }}
          />
          <Text
            style={{
              marginLeft: 110,
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
            <Text style={{ color: "gray", marginLeft: 160, marginTop: 30 }}>
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
            <Text
              style={{
                backgroundColor: "#C8ADFD",
                color: "black",
                width: 200,
                height: 65,
                paddingTop: 10,
                paddingLeft: 20,
                marginLeft: 30,
                marginTop: 20,
              }}
            >
              Hey, I'm just about to leave for the game. Are you coming?
            </Text>
            <Text style={{ color: "gray", marginLeft: 315, marginTop: -75 }}>
              16:01
            </Text>

            <TextInput
              style={{
                backgroundColor: "white",
                width: 310,
                marginLeft: 30,
                height: 50,
                marginTop: 340,
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
