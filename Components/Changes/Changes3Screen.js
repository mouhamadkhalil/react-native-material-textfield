import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import DropDownPicker from "react-native-dropdown-picker";


export default class Changes3Screen extends React.Component {

  state = {
    country: "uk",
  };

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
              marginLeft: -10
            }}
          >
            trip changes
          </Text>
        </View>
        <View style={{ width: "50%", height: 800, backgroundColor: "#E6F5F3" }}>
          <Text
            style={{
              marginLeft: 30,
              marginTop: 30,
              marginRight: 33,
              color: "#292621",
              width: 290
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
              width: 300,
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
            <View style={{ width: 200, marginTop: 20, marginLeft: 15 }}>
              <DropDownPicker
                items={[
                  { label: "reason one", value: "reason 1", hidden: true },
                  { label: "reason two ", value: "uk" },
                  { label: "reason three", value: "reason 2" },
                ]}
                defaultValue={this.state.country}
                containerStyle={{ height: 40 }}
                style={{ backgroundColor: "#fafafa" }}
                itemStyle={{
                  justifyContent: "flex-start",
                }}
                dropDownStyle={{ color: "gray" }}
                onChangeItem={(item) =>
                  this.setState({
                    country: item.value,
                  })
                }
              />
            </View>
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
              width: 150,

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

              <TouchableOpacity
                style={{
                  marginLeft: 30,
                  backgroundColor: "blue",
                  marginTop: -49,
                  height: 50,
                  width: 150,
                  marginLeft: 180

                }}
              ><Text style={{ color: "white", marginTop: 15, marginLeft: 50 }}>SUBMIT</Text></TouchableOpacity>
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
    marginTop: 60,
    width: 800,
    backgroundColor: "white"
  },
  button: {
    backgroundColor: "blue",
    marginLeft: 190,
    width: 150,
    marginLeft: 180,
    height: 50,
    marginTop: -49,
  },
  text: {
    color: "white",
    paddingLeft: 50,
    paddingTop: 15,
  },
});
