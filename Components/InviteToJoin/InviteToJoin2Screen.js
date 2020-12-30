import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default class InviteToJoin2Screen extends React.Component {

  Back = () => {
    window.location = "/InviteToJoin1";
  }

  InviteTravller = () => {
    window.location = "/InviteToJoin3";
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
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -30,
              marginLeft: -20
            }}
          >
            travellers
          </Text>
        </View>
        <View style={{ width: "50%", height: 600, backgroundColor: "#F9F4EC" }}>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            TRAVELLER 1
          </Text>
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            Hannibal Lecter
          </Text>
          <TouchableOpacity style={{ marginLeft: 300, marginTop: -15 }} onPress={this.InviteTravller}>
            <Text style={{ marginLeft: -50 }}>
              INVITE TO APP
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "gray",
              fontSize: 13,
              marginLeft: 30,
              marginTop: 30,
            }}
          >
            TRAVELLER 2
          </Text>
          <Text
            style={{
              color: "blue",
              fontWeight: "bold",
              fontSize: 16,
              marginLeft: 30,
              marginTop: 20,
            }}
          >
            William Wallace
          </Text>
          <TouchableOpacity style={{ marginLeft: 300, marginTop: -15 }}>
            <Text
              onPress={() => onItemSelected("Contacts")}
              style={styles.item}
            >
              <TouchableOpacity
                onPress={() => {
                  this.showAlert();
                }}
              >
                <View style={styles.button}>
                  <Text style={styles.text}>INVITE TO APP</Text>
                </View>
              </TouchableOpacity>
            </Text>

            <View style={{ width: 900, marginTop: 80, marginLeft: -560 }}>
              <AwesomeAlert
                show={showAlert}
                showProgress={false}
                title="INVITE WILLIAM TO JOIN APP"
                message="Email address"
                hintInput={"HINT INPUT"}
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={true}
                showConfirmButton={true}
                cancelText="CANCEL "
                confirmText="SUBMIT"
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
          </TouchableOpacity>
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
    marginTop: -40,
    width: 800,
  },
  text: {
    marginLeft: -48,
  },
});
