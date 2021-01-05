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

export default class ChatActive2Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Chat Active 1');
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
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC" }}>
          <ScrollView >
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
                  marginLeft: 220,
                  marginTop: -26,
                }}
              >
                ACTIVE (4)
              </Text>
            </TouchableOpacity>
            <ScrollView
              style={{
                backgroundColor: "blue",
                width: 120,
                marginLeft: 200,
                height: 4,
                marginTop: 10,
              }}
            ></ScrollView>
            <Text style={{ color: "gray", marginLeft: 30, marginTop: 20 }}>
              Show Active Status
            </Text>
            <TouchableOpacity>
              <Image
                source={Bar}
                style={{ marginLeft: 240, marginTop: -18, width: 50, height: 19 }}
              />
            </TouchableOpacity>
            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 50, width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 90, marginTop: -23 }}>
              George Clooney
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 30,
              }}
            ></ScrollView>
            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 90, marginTop: -23 }}>Vinnie Jones</Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 30,
              }}
            ></ScrollView>
            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 90, marginTop: -23 }}>
              Jason Stathem
            </Text>
            <ScrollView
              style={{
                backgroundColor: "#BF9F9F",
                width: "80%",
                marginLeft: 35,
                height: 1,
                marginTop: 30,
              }}
            ></ScrollView>
            <Image
              source={User}
              style={{ marginLeft: 30, marginTop: 30, width: 25, height: 25 }}
            />
            <Text style={{ marginLeft: 90, marginTop: -23 }}>Julia Stone</Text>
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
