import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import User from "../../assets/images/user.png";
import Nour from "../../assets/images/Nour.png";
import Fadi from "../../assets/images/Fadi.jpg";
import Attachment from "../../assets/images/attachment.png";

export default class ChatScreen extends React.Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <ScrollView style={styles.header}>
          <Text
            style={{
              color: "white",
              paddingLeft: 134,
              paddingTop: 0,
              fontSize: 22,
              marginLeft: 50,
              marginTop: 10
            }}
          >
            chat
          </Text>
        </ScrollView>
        <TouchableOpacity onPress={this.Back}>
          <Text style={{ fontSize: 35, color: "yellow", marginLeft: 10, marginTop: -60, fontWeight: "bold" }}>&#8592;</Text>
        </TouchableOpacity>
        <ScrollView style={styles.div}>
          <Text style={{ paddingTop: 30, marginLeft: 20, fontWeight: "bold" }}>
            FLY-FOOT
          </Text>
          <Text style={{ marginTop: 10, marginLeft: 20, fontSize: 10 }}>
            Hi There!
          </Text>
          <Text style={{ marginTop: 10, marginLeft: 20, fontSize: 10 }}>
            We here to help - don't hesitate if you{" "}
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontSize: 10,
              marginTop: -1,
            }}
          >
            have any questions! The team typically{" "}
          </Text>
          <Text
            style={{
              marginTop: 10,
              marginLeft: 20,
              fontSize: 10,
              marginTop: -1,
            }}
          >
            replies in under 2 min.{" "}
          </Text>
          <Image
            source={User}
            style={{ paddingLeft: 20, paddingTop: 15, width: 30, height: 30, marginLeft: 20, marginTop: 20 }}
          />
          <Image
            source={Nour}
            style={{ paddingLeft: 20, paddingTop: 15, width: 30, height: 30, marginLeft: 80, marginTop: -30 }}
          />
          <Image
            source={Fadi}
            style={{ paddingLeft: 20, paddingTop: 15, width: 30, height: 30, marginLeft: 140, marginTop: -30 }}
          />
          <Text style={{ paddingLeft: 20 }}> Rayan</Text>
          <Text style={{ paddingLeft: 80, marginTop: -17 }}> Nour</Text>
          <Text style={{ paddingLeft: 140, marginTop: -17 }}> Firas</Text>
        </ScrollView>
        <ScrollView style={styles.chatBox}>
          <Text
            style={{
              color: "white",
              paddingLeft: 134,
              paddingTop: 10,
              fontSize: 19,
            }}
          ></Text>
        </ScrollView>
        <ScrollView style={styles.chatMsg}>
          <TextInput
            style={styles.txtInput}
            placeholder="Send a message... "
          ></TextInput>
          <TouchableOpacity>
            <Image
              source={Attachment}
              style={{ paddingLeft: 0, paddingTop: 0, width: 30, height: 30, marginLeft: -30 }}
            />
          </TouchableOpacity>
        </ScrollView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 30,
    width: 510,
    marginLeft: 0
  },
  header: {
    backgroundColor: "blue",
    width: 410,
    height: 60,
    marginLeft: -30
  },
  div: {
    backgroundColor: "#B8FC31",
    width: 410,
    height: 230,
  },
  chatBox: {
    backgroundColor: "#F7EEE8",
    width: 410,
    height: 350,
  },
  chatMsg: {
    backgroundColor: "white",
    width: 410,
    height: 20,
  },
  txtInput: {
    paddingRight: 0,
    paddingBottom: 10,
    paddingTop: 0,
    borderColor: "red",
    borderWidth: 0,
    marginBottom: 20,
    marginLeft: 20,
    height: 30
  },
});
