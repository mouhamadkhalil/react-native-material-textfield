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

export default class ChatActive1Screen extends React.Component {
  Back = () => {
    window.location = "/ChatHome1";
  }
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          {/* <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 25, color: "yellow", marginLeft: 30, marginTop: 10, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity> */}
          <Image
            source={User}
            style={{ marginLeft: 30, marginTop: 15,width:25,height:25 }}
          />
          <Text
            style={{
              marginLeft: 80,
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              marginTop: -25,
            }}
          >
            Henry Rollins
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC",marginLeft:-35 }}>
          <ScrollView>
            <TouchableOpacity>
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontSize: 19,
                  marginLeft: 120,
                  marginTop: 25,
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
                  marginLeft: 255,
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
                marginLeft: 230,
                height: 4,
                marginTop: 10,
              }}
            ></ScrollView>
            <Image
              source={User}
              style={{ marginLeft: 185, marginTop: 80 ,width:50,height:50}}
            />
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginLeft: 140,
                marginTop: 10,
              }}
            >
              SEE WHO IS ACTIVE
            </Text>
            <Text
              style={{
                color: "gray",
                marginLeft: 65,
                paddingTop: 15,
                fontSize: 17,
              }}
            >
              Let people know that you are connected.
            </Text>
            <Text style={{ color: "gray", paddingTop: 5, marginLeft: 94 }}>
              You can only send and recieve private
            </Text>
            <Text style={{ color: "gray", paddingTop: 5, marginLeft: 112 }}>
              messages when you are online.
            </Text>
            <TouchableOpacity>
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  marginLeft: 180,
                  marginTop: 20,
                }}
              >
                TURN ON
              </Text>
            </TouchableOpacity>
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
