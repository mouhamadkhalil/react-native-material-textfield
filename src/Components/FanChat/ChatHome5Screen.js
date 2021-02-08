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

export default class ChatHome5Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Chat Home 4 Screen');
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
            George Clooney
          </Text>
        </ScrollView>
        <ScrollView style={{ width: "50%", height: 800, backgroundColor: "#F9F4EC" }}>
          <ScrollView>
            <Text style={{ color: "gray", marginLeft: 160, marginTop: 30 }}>
              YESTERDAY
            </Text>
            <Text style={{ color: "gray", marginLeft: 290, marginTop: 30 }}>
              10:33am
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
                marginTop: -15,
              }}
            >
              Space, the final frontier, These are the voyages of the Startship
              Enterprise.
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
                marginTop: 20,
              }}
            >
              Space, the final frontier.
            </Text>
            <Text style={{ color: "gray", marginLeft: 30, marginTop: -40 }}>
              10:33am
            </Text>

            <Text style={{ color: "gray", marginLeft: 170, marginTop: 100 }}>
              TODAY
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
                marginTop: 20,
              }}
            >
              Hey, what's up?
            </Text>
            <Text style={{ color: "gray", marginLeft: 30, marginTop: -45 }}>
              15:33
            </Text>
            <Text style={{ color: "gray", marginLeft: 310, marginTop: 50 }}>
              16:01
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
                marginTop: -15,
              }}
            >
              Hey, I'm just about to leave for the game. Are you coming?
            </Text>
            <TextInput
              style={{
                backgroundColor: "white",
                width: 320,
                marginLeft: 30,
                height: 50,
                marginTop: 80,
              }}
              placeholder="   Type your message here  ..."
            ></TextInput>
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
