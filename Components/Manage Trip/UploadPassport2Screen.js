import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import Zomato from "../../assets/images/zomato.png";

export default class UploadPassport2Screen extends React.Component {
  Back = () => {
    window.location = "/UploadPassport1";
  }
  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: "#E4D8D2",
            width: "45%",
            height: 60,
            marginLeft: -40,
          }}
        >
          <TouchableOpacity onPress={this.Back}>
            <Text style={{ fontSize: 35, color: "yellow", marginLeft: 40, marginTop: 5, fontWeight: "bold" }}>&#8592;</Text>
          </TouchableOpacity>

          <Text
            style={{
              color: "black",
              fontSize: 19,
              fontWeight: "bold",
              marginLeft: 90,
              marginTop: -32,
            }}
          >
            select images
          </Text>
          <TouchableOpacity>
            <Text style={{ color: "black", marginLeft: 300, marginTop: -22 }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: 150, height: 600, backgroundColor: "#E6F5F3" }}>
          <Image source={Zomato} style={{ marginLeft: -125, width: 115, height: 115 }} />
          <Image source={Zomato} style={{ marginLeft: -125, width: 115, height: 115 }} />
          <Image source={Zomato} style={{ marginLeft: -125, width: 115, height: 115 }} />
          <Image source={Zomato} style={{ marginLeft: -125, width: 115, height: 115 }} />
          <Image source={Zomato} style={{ marginLeft: -125, width: 115, height: 115 }} />
          <Image
            source={Zomato}
            style={{ marginLeft: -4, marginTop: -575, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: -4, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: -4, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: -4, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: -4, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: 117, marginTop: -575, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: 117, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: 117, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: 117, marginTop: 0, width: 115, height: 115 }}
          />
          <Image
            source={Zomato}
            style={{ marginLeft: 117, marginTop: 0, width: 115, height: 115 }}
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
    marginTop: -80,
    width: 800,
  },
});
