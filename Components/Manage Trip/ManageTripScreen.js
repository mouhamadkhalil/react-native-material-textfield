import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Arrow from "../../assets/Images_Design/arrow_right1.png";

import Chat from "../../assets/Images_Design/chat1.png";
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import AwesomeAlert from "react-native-awesome-alerts";


export default class ManageTripScreen extends React.Component {

  state = {
    showAlert: false,
  };

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

  renderCustomAlertView = () => {
    return (
      <>
        <View style={{ height: 200, width: 200 }}>
          <TouchableOpacity>
            <Text style={{ marginTop: 20, marginLeft: 80 }}>Messanger</Text>
            <Image source={Messanger} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginTop: 20, marginLeft: 80 }}>Whatsapp</Text>
            <Image source={Whatsapp} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ marginTop: 20, marginLeft: 80 }}>Feedback</Text>
            <Image source={Feedback} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
          </TouchableOpacity>
        </View>

      </>
    );
  }

  Back = () => {
    this.props.navigation.navigate('Menu');
  }

  Payment = () => {
    this.props.navigation.navigate('Complete Payment');
  };

  UploadPassport = () => {
    this.props.navigation.navigate('Upload Passport 1');
  };

  Changes = () => {
    this.props.navigation.navigate('Changes 1');
  };

  Join = () => {
    this.props.navigation.navigate('Join 1');
  };


  render() {
    const { showAlert } = this.state;

    return (
      <ScrollView style={styles.container}>
        <ScrollView style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back} style={{ marginTop: 5, width: 100, height: 200, marginBottom: 30 }}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 30, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
        </ScrollView>
        <Text
          style={{
            color: "white",
            fontSize: 19,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: -45,
            marginLeft: -440
          }}
        >
          manage trip
          </Text>
        <ScrollView style={{ width: "50%", height: 600, backgroundColor: "#E6F5F3", marginTop: 30 }}>
          <Text
            style={{
              color: "#DC1579",
              fontWeight: "bold",
              marginTop: 30,
              marginLeft: 40,
            }}
          >
            GENERAL
          </Text>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>

          <TouchableOpacity onPress={this.Payment}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 25,
                marginLeft: 40,
                fontSize: 18
              }}
            >
              Complete payment
            </Text>
            <Image source={Arrow} style={{ marginLeft: 320, marginTop: -15, width: 15, height: 15 }} />
          </TouchableOpacity>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity onPress={this.UploadPassport}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                fontSize: 18
              }}
            >
              Upload passport
            </Text>
            <Image source={Arrow} style={{ marginLeft: 320, marginTop: -15, width: 15, height: 15 }} />

          </TouchableOpacity>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>

          <Text
            style={{
              color: "#DC1579",
              fontWeight: "bold",
              marginTop: 40,
              marginLeft: 40,
            }}
          >
            EDIT
          </Text>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity onPress={this.Changes}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 500,
                fontSize: 18
              }}
            >
              Changes and cancellations
            </Text>
            <Image source={Arrow} style={{ marginLeft: 320, marginTop: -15, width: 15, height: 15 }} />

          </TouchableOpacity>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
          <TouchableOpacity onPress={this.Join}>
            <Text
              style={{
                color: "blue",
                fontWeight: "bold",
                marginTop: 30,
                marginLeft: 40,
                width: 700,
                fontSize: 18
              }}
            >
              Travellers (invite to join)
            </Text>
            <Image source={Arrow} style={{ marginLeft: 320, marginTop: -15, width: 15, height: 15 }} />

          </TouchableOpacity>
          <ScrollView
            style={{ height: 1, backgroundColor: "white", marginTop: 20 }}
          ></ScrollView>
        </ScrollView>
        <TouchableOpacity style={{ marginLeft: 270, marginTop: -110 }} onPress={() => {
          this.showAlert();
        }}>
          <Image source={Chat} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        <View>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title="CHAT WITH US ?"
            closeOnTouchOutside={true}
            closeOnHardwareBackPress={false}
            customView={this.renderCustomAlertView()}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 700,
    marginLeft: 0,
    marginTop: 0,
    width: 800,
  },
});
