import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class Changes1Screen extends React.Component {

  state = {
    country: "uk",
  };

  render() {
    return (
      <View style={styles.container}>
        <View >
          <Text style={{fontSize:17}}>
            If there are any changes or cancellations that you would like to
            make please fill out the following form and we will get back to you
            in the next 24 hours.
          </Text>
          <View
            style={{
              backgroundColor: "white",
              marginTop: 30,
              
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

            <View style={{ width: 200, margin: 10 }}>
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
            <View style={{ margin: 10 }} >
              <Text style={{ color: "gray", fontSize: 14, marginTop: 10, }}>
                Reason
              </Text>
              <TextInput placeholder="Please briefly explain why..." style={{ borderBottomWidth: 1, borderBottomColor: 'black', marginBottom:30 }} />
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: "#322F29",
              marginTop: 0,
              height: 50,
              width: 180,
            }}
          >
            <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
              CANCEL
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: R.colors.blue, marginTop: -50, marginLeft: 180, height: 50, width: 180, }}>
            <Text style={{ color: "white", paddingLeft: 55, paddingTop: 15 }}>
              SUBMIT
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
//test
const styles = StyleSheet.create({
  container: {
    margin: 30,
    alignItems: "center",
    justifyContent: "center",

  },
});
