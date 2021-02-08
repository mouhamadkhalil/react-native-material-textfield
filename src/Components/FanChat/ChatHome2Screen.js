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
import Bar from "../../assets/images/bar.png";

export default class ChatHome2Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Chat Home 1');
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
            Henry Rollins
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 700, backgroundColor: "#F9F4EC" }}>
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
                  marginTop: -22,
                }}
              >
                ACTIVE
              </Text>
            </TouchableOpacity>
            <ScrollView
              style={{
                backgroundColor: "blue",
                width: 130,
                marginLeft: 50,
                height: 4,
                marginTop: 10,
              }}
            ></ScrollView>

            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 60, width: 25, height: 25 }}
            />
            <Text
              style={{
                marginLeft: 90,
                marginTop: -28,
                color: "blue",
                fontWeight: "bold",
              }}
            >
              FLY-FOOT GROUP (13)
            </Text>
            <Text style={{ color: "gray", marginLeft: 90, paddingTop: 5 }}>
              Last message written here ...
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 290,
                fontSize: 14,
                marginTop: -45,
              }}
            >
              10:33am
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 60,
              }}
            ></ScrollView>

            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text
              style={{
                marginLeft: 90,
                marginTop: -30,
                color: "blue",
              }}
            >
              Georges clooney
            </Text>
            <Text style={{ color: "gray", marginLeft: 90, paddingTop: 5 }}>
              Last message written here ...
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 290,
                fontSize: 14,
                marginTop: -45,
              }}
            >
              10:33am
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 55,
              }}
            ></ScrollView>

            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text
              style={{
                marginLeft: 90,
                marginTop: -30,
                color: "blue",
              }}
            >
              Julia Stone
            </Text>
            <Text style={{ color: "gray", marginLeft: 90, paddingTop: 5 }}>
              Last message written here ...
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 290,
                fontSize: 14,
                marginTop: -45,
              }}
            >
              10:33am
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 55,
              }}
            ></ScrollView>

            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text
              style={{
                marginLeft: 90,
                marginTop: -30,
                color: "blue",
              }}
            >
              Jason Statham
            </Text>
            <Text style={{ color: "gray", marginLeft: 90, paddingTop: 5 }}>
              Last message written here ...
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 290,
                fontSize: 14,
                marginTop: -45,
              }}
            >
              10:33am
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 55,
              }}
            ></ScrollView>
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
    marginTop: 0,
    width: 800,
  },
});
