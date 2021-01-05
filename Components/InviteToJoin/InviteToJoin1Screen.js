import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";

export default class InviteToJoin1Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Manage Trip');
  }

  InviteTraveller = () => {
    this.props.navigation.navigate('Join 2');

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
          <TouchableOpacity onPress={this.Back} style={{ width: 100, marginTop: 10 }}>
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
              marginTop: 10,
            }}
          >
            Hannibal Lecter
          </Text>
          <Text>
            <TouchableOpacity
              onPress={() => {
                this.showAlert();
              }}
            >
              <View>
                <Text
                  style={{
                    marginLeft: 250,
                    marginTop: -18,
                    fontSize: 14
                  }}
                >
                  INVITE TO APP
                </Text>
              </View>
            </TouchableOpacity>
          </Text>

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
              marginTop: 10,
            }}
          >
            William Wallace
          </Text>
          <TouchableOpacity style={{ marginLeft: 250, marginTop: -18, fontSize: 14 }} onPress={this.InviteTraveller}>
            <Text style={{ fontSize: 13 }}>
              INVITE TO APP
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ height: 320, width: 300, marginTop: -495, marginLeft: 50 }}
        >
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title=""
            message="INVITE HANNIBAL TO JOIN APP"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            showCancelButton={true}
            showConfirmButton={true}
            cancelText=" cancel"
            confirmText="Yes"
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 800,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -200,
    marginTop: -160,
    width: 800,
  },
});
