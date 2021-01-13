import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default class Changes1Screen extends React.Component {

  Back = () => {
    this.props.navigation.navigate('Manage Trip');
  }

  state = {
    country: "uk",
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back} style={{ width: 100 }}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 27, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: -32,
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
            }}
          >
            If there are any changes or cancellations that you would like to
            make please fill out the following form and we will get back to you
            in the next 24 hours.
          </Text>
          <View
            style={{
              backgroundColor: "white",
              marginLeft: 30,
              width: 300,
              marginTop: 30,
              height: 200,
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
            <TextInput
              placeholder="Please briefly explain why..."
              style={{
                marginLeft: 15,
                marginTop: 20,
                width: 280,
                height: 800,
                marginBottom: 20,
              }}
            ></TextInput>
            <View style={{ marginTop: -30, marginBottom: 20, marginLeft: 15 }}>
              <Text> ____________________________________</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              marginLeft: 30,
              backgroundColor: "#322F29",
              marginTop: 0,
              height: 50,
              width: 150,
            }}
          >
            <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              marginTop: -50,
              marginLeft: 180,
              height: 50,
              width: 150,
            }}
          >
            <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 900,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -180,
    marginTop: -20,
    width: 720,
    backgroundColor: "white"
  },
});
