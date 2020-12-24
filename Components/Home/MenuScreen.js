import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import Attachment from "../../assets/images/attachment.png";
import Location from "../../assets/images/location.png";
import Document from "../../assets/images/document.png";
import Help from "../../assets/images/help.jpg";
import Logout from "../../assets/images/Logout.png";
import FlyFoot from "../../assets/images/flyfoot.png";


const window = Dimensions.get("window");
const uri =
  "https://media-exp1.licdn.com/dms/image/C4E0BAQH7PWLgwhKFcw/company-logo_200_200/0?e=2159024400&v=beta&t=KJDoqyv_HeIk8_XfhCo-IUgjVvw0OebXlKICT5HgR-A";

export default class MenuScreen extends React.Component {
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

  Home = () => {
    window.location = "/";
  };

  render() {
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <View scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
            <TouchableOpacity
              style={{ marginLeft: 0, color: "blue" }}
            >
              <Image style={styles.avatar} source={FlyFoot} />
              <TouchableOpacity>
                <Text style={styles.name}>FLY-FOOT</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
          <Text style={styles.item}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity><Text style={{ marginLeft: 80, fontWeight: "bold", color: "blue", fontSize: 30, marginTop: 50 }}>Manage trip</Text></TouchableOpacity>
              <Image
                source={Attachment}
                style={{ marginLeft: 26, marginTop: -35, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.item}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Trip Information</Text></TouchableOpacity>
              <Image
                source={Location}
                style={{ marginLeft: 26, marginTop: -32, width: 25, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.item}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Trip Documents</Text></TouchableOpacity>
              <Image
                source={Document}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.item}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Help</Text></TouchableOpacity>
              <Image
                source={Help}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={styles.item}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Logout</Text></TouchableOpacity>
              <Image
                source={Logout}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text
            style={{
              paddingTop: 108,
              paddingLeft: 100,
              color: "gray",
              marginBottom: 80,
            }}
          >
            ARABIC
          </Text>
          <Text
            style={{
              color: "blue",
              paddingLeft: 190,
              marginTop: -98,
            }}
          >
            ENGLISH
          </Text>
        </View>

        {/* <ScrollView style={{ width: 950, marginTop: -230, marginLeft: 190 }}>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
            title=""
            message="Are you sure you want to log out?"
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
        </ScrollView> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  menu: {
    backgroundColor: "white",
    paddingLeft: 0,
    paddingTop: 60,
    height: 800
  },
  avatar: {
    width: 35,
    height: 35,
    paddingTop: 10,
    marginTop: 20,
    marginLeft: 26,
  },
  name: {
    marginLeft: 80,
    top: 20,
    marginTop: 0,
    fontSize: 25,
    color: "blue",
    marginTop: -55,
    fontWeight: "bold"
  },
  item: {
    fontSize: 30,
    paddingTop: 17,
    color: "blue",
  },
});
