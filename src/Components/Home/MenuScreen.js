import React from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import Attachment from "../../assets/Images_Design/attachment1.png";
import Location from "../../assets/Images_Design/location1.png";
import Document from "../../assets/Images_Design/document1.png";
import Help from "../../assets/Images_Design/information1.png";
import Logout from "../../assets/Images_Design/logout1.png";
import FlyFoot from "../../assets/Images_Design/flyfoot2.png";
import User from "../../assets/Images_Design/profile1.png";
import Close from "../../assets/Images_Design/close1.png";
import Twitter from "../../assets/Images_Design/twitter2.png";
import Facebook from "../../assets/Images_Design/facebook.png";
import Instagram from "../../assets/Images_Design/insta1.png";
import Chat from "../FanChat/chat";



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

  Logout = () => {
    this.setState({
      showAlert: false,
    });

    AsyncStorage.clear();
    this.props.navigation.navigate('Login');
  };


  Profile = () => {
    this.props.navigation.navigate('Chat Active 1');
  };

  ManageTrip = () => {
    this.props.navigation.navigate('Manage Trip');
  };

  TripInfo = () => {
    this.props.navigation.navigate('Trip');
  };

  TripDocs = () => {
    this.props.navigation.navigate('Documents');
  };

  Help = () => {
    this.props.navigation.navigate('FAQ 1');
  };

  render() {
    const { showAlert } = this.state;

    return (
      <View style={styles.container}>
        <View scrollsToTop={false} style={styles.menu}>
          <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={FlyFoot} />
            <Text style={styles.name}>FLY-FOOT</Text>
            <TouchableOpacity style={{ width: 70, marginLeft: 280, height: 50, marginTop: -20 }}>
              <Image source={Close} style={{ marginLeft: 25, marginTop: 15 }} />
            </TouchableOpacity>
          </View>
          <Text>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity onPress={this.Profile} style={{ width: 500 }}><Text style={{ marginLeft: 80, fontWeight: "bold", color: "blue", fontSize: 30, marginTop: 50 }}>Profile</Text></TouchableOpacity>
              <Image
                source={User}
                style={{ marginLeft: 26, marginTop: -35, width: 25, height: 32 }}
              />
            </TouchableOpacity>
          </Text>


          <View>
            <Text style={{ marginTop: -26 }}>
              <TouchableOpacity
                style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
              >
                <TouchableOpacity style={{ height: 100 }} onPress={this.ManageTrip}><Text style={{ marginLeft: 80, fontWeight: "bold", color: "blue", fontSize: 30, marginTop: 50 }}>Manage trip</Text></TouchableOpacity>
                <Image
                  source={Attachment}
                  style={{ marginLeft: 26, marginTop: -35, width: 25, height: 32 }}
                />
              </TouchableOpacity>
            </Text>
          </View>


          <Text style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity onPress={this.TripInfo} ><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Trip Information</Text></TouchableOpacity>
              <Image
                source={Location}
                style={{ marginLeft: 26, marginTop: -32, width: 25, height: 32 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity onPress={this.TripDocs}><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Trip Documents</Text></TouchableOpacity>
              <Image
                source={Document}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity onPress={this.Help}><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Help</Text></TouchableOpacity>
              <Image
                source={Help}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />
            </TouchableOpacity>
          </Text>
          <Text style={{ marginTop: 20 }}>
            <TouchableOpacity
              style={{ marginLeft: 200, color: "blue", textDecoration: "none" }}
            >
              <TouchableOpacity onPress={() => {
                this.showAlert();
              }} ><Text style={{ marginLeft: 75, fontWeight: "bold", color: "blue", fontSize: 30 }}>Logout</Text></TouchableOpacity>
              <Image
                source={Logout}
                style={{ marginLeft: 26, marginTop: -32, width: 30, height: 30 }}
              />

              <View style={{ backgroundColor: "pink", marginLeft: 30, width: 12, height: 32, marginTop: 150 }}>
                <TouchableOpacity >
                  <Image source={Facebook} style={{ width: 12, height: 32 }} />
                </TouchableOpacity>
              </View>

              <Image source={Twitter} style={{ marginLeft: 65, width: 37, height: 29, marginTop: -30 }} />
              <Image source={Instagram} style={{ marginLeft: 120, width: 35, height: 33, marginTop: -31 }} />
              <TouchableOpacity>
                <Text style={{ color: "blue", fontWeight: "bold", fontSize: 19, marginLeft: 230, marginTop: -20 }}>fly-foot.com</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={{ width: 1540, marginTop: -230, marginLeft: 190 }}>
          <AwesomeAlert
            show={showAlert}
            showProgress={false}
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

            //remove token by calling the function removeItem.
            onConfirmPressed={() => {
              this.Logout();
            }}
          />
        </View>
        <Chat />
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
    height: 45,
    paddingTop: 10,
    marginTop: 25,
    marginLeft: 26,
  },
  name: {
    marginLeft: 80,
    top: 20,
    marginTop: 0,
    fontSize: 25,
    color: "blue",
    marginTop: -60,
    fontWeight: "bold"
  },
  item: {
    fontSize: 30,
    paddingTop: 17,
    color: "blue",
  },
});
