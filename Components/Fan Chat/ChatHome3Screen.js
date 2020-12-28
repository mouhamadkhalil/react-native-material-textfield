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

export default class ChatHome3Screen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <Image
            source={User}
            style={{ marginLeft: 30, marginTop: 15, width: 25, height: 25 }}
          />
          <Text
            style={{
              marginLeft: 70,
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginTop: -25,
            }}
          >
            Henry Rollins
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC" }}>
          <ScrollView>
            <TouchableOpacity>
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: 19,
                  marginLeft: 85,
                  marginTop: 30,
                }}
              >
                CHATS
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>

              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: 19,
                  marginLeft: 250,
                  marginTop: -25,
                }}
              >
                ACTIVE
              </Text>
            </TouchableOpacity>
            <ScrollView
              style={{
                backgroundColor: "blue",
                width: 120,
                marginLeft: 55,
                height: 4,
                marginTop: 10,
              }}
            ></ScrollView>
            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 35, width: 30, height: 30 }}
            />
            <Text
              style={{ fontWeight: "bold", marginLeft: 80, marginTop: -25 }}
            >
              FLY-FOOT GROUP (13)
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 80,
                paddingTop: 5,
                fontSize: 14,
              }}
            >
              Last message written here...
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 280,
                marginTop: -42,
                fontSize: 14,
              }}
            >
              10:33am
            </Text>
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
