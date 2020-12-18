import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default class Changes3Screen extends React.Component {


  Back = () => {
    window.location = "/changes2";
  }

  constructor(props) {
    super(props);
    this.state = { showAlert: false };
  }

  showAlert = () => {
    this.setState({
      showAlert: true,
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false,
    });
  };

  render() {
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 50 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 25, color: "yellow", marginLeft: 40, marginTop: 10, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -25,
            }}
          >
            trip changes
          </Text>
        </View>
        <View style={{ width: "50%", height: 550, backgroundColor: "#E6F5F3" }}>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 30,
              marginRight: 33,
              color: "#292621",
            }}
          >
            If there are any changes or cancellations that you would like to
            make please fill out the following form and we will get back to you
            in the next 24 hours.{" "}
          </Text>
          <View
            style={{
              backgroundColor: "white",
              marginLeft: 30,
              width: 320,
              marginTop: 30,
              height: 220,
            }}
          >
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                fontSize: 15,
                marginTop: 20,
                marginLeft: 15,
              }}
            >
              CHANGES AND CANCELLATIONS
            </Text>
            <TextInput
              placeholder="Choose one "
              style={{ marginLeft: 15, marginTop: 20, width: 150 }}
            ></TextInput>
            <Text
              style={{
                color: "gray",
                fontSize: 14,
                marginTop: 20,
                marginLeft: 15,
              }}
            >
              Reason
            </Text>
            <Text
              style={{ marginLeft: 15, marginTop: 20, height: 200, width: 250 }}
            >
              When you begin typing the text changes from #f7f7f7 to #292F33 and
              the space changes accordingly.
            </Text>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 30,
              backgroundColor: "#322F29",
              marginTop: 30,
              height: 50,
              width: 160,
            }}
          >
            <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
              CANCEL
            </Text>
          </TouchableOpacity>

          <Text onPress={() => onItemSelected("Contacts")} style={styles.item}>
            <TouchableOpacity
              onPress={() => {
                this.showAlert();
              }}
            >
              <View style={styles.button}>
                <Text style={styles.text}>SUBMIT</Text>
              </View>
            </TouchableOpacity>
          </Text>

          <View style={{ width: 900, marginTop: -470, marginLeft: -290 }}>
            <AwesomeAlert
              show={showAlert}
              showProgress={false}
              title=""
              message="Your change request has been sent"
              closeOnTouchOutside={true}
              closeOnHardwareBackPress={false}
              showCancelButton={true}
              showConfirmButton={true}
              cancelText="SUBMIT NEW "
              confirmText="OK"
              confirmButtonColor="blue"
              cancelButtonColor="black"
              onCancelPressed={() => {
                this.hideAlert();
              }}
              onConfirmPressed={() => {
                this.hideAlert();
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -200,
    marginTop: -100,
    width: 800,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 190,
    width: 160,
    height: 50,
    marginTop: -50,
  },
  text: {
    color: "white",
    paddingLeft: 50,
    paddingTop: 300,
  },
});
