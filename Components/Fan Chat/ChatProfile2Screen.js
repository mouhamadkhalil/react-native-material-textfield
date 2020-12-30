import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Zomato from "../../assets/images/zomato.png";

export default class ChatProfile2Screen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView
          style={{
            backgroundColor: "#E4D8D2",
            width: "45%",
            height: 50,
            marginLeft: -40,
          }}
        >
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 73, marginTop: -5, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "black",
              fontSize: 19,
              fontWeight: "bold",
              marginLeft: 125,
              marginTop: -30,
            }}
          >
            select images
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "#CBC4C0", marginLeft: 345, marginTop: -20 }}>
              Done
            </Text>
          </TouchableOpacity>
        </ScrollView>
        <ScrollView style={{ width: 350, height: 600, backgroundColor: "#E6F5F3", marginTop: 10, marginLeft: 20 }}>
          <Image source={Zomato} style={{ marginLeft: 20, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 20, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 20, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 20, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 20, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 120, marginTop: -500, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 120, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 120, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 120, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 120, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 220, marginTop: -500, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 220, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 220, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 220, width: 100, height: 100 }} />
          <Image source={Zomato} style={{ marginLeft: 220, width: 100, height: 100 }} />
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
    width: 900,
  },
});
