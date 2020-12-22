import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";

export default class Changes2Screen extends React.Component {

  Back = () => {
    window.location = "/changes1";
  }

  state = {
    country: "uk",
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 60 }}>
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 27, marginTop: 0, fontWeight: "bold" }}>&#8592;</Text>
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
              width: 290
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
              height: 270,
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
                  { label: "Item 1", value: "usa", hidden: true },
                  { label: "Choose one ", value: "uk" },
                  { label: "Item 3", value: "france" },
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
              style={{
                marginLeft: 15,
                marginTop: 20,
                width: 280,
                height: 370,

              }}
            >When you begin typing the text changes from #F7F7F7 to #292F33 and the space changes accordingly.</Text>
            <View style={{ marginTop: -320, marginBottom: 20, marginLeft: 15, color: "gray" }}>
              <Text>____________________________________</Text>
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
              marginLeft: 190,
              height: 50,
              width: 150,
              marginLeft: 180
            }}
          >
            <Text style={{ color: "white", paddingLeft: 55, marginLeft: -10, paddingTop: 15 }}>
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
    height: 1100,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -200,
    marginTop: -250,
    width: 800,
    backgroundColor: "white"
  },
});
