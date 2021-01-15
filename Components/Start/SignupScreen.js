import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  Button,
  Linking,
  TouchableOpacity,
  Picker,
  AsyncStorage,
  ActivityIndicator,
  ToastAndroid
} from "react-native";
import Signup from "./SignupScreen";
import LoginWithFB from "../../assets/images/LoginWithFB.png";
import SignInGoogle from "../../assets/images/SignInGoogle.png";
import Flyfoot from "../../assets/images/flyfoot.png";
import { API_URL, API_TOKEN } from "@env";
import PasswordInputText from 'react-native-hide-show-password-input';

const sourceFile = require('../../services.js');

export default class SignUpScreen extends React.Component {
  constructor(navigation) {
    super(navigation);
    console.log(navigation);
  }

  state = {
    client_id: "",
    rememberMe: "",
    scope: "",
    Token: "",
    Name: "",
    SurName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    FavouriteTeam1: "",
    FavouriteTeam2: "",
    FavouriteTeam3: "",
    FavouriteTeam4: "",
    isDone: false
  };

  componentDidMount() {
    const url = `${API_URL}/mobile/team/all`;

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": sourceFile.Content_Type,
        "Accept": sourceFile.Accept,
        "ff_version": sourceFile.ff_version,
        "ff_language": sourceFile.ff_language,
        "source": sourceFile.source,
        // "authorization" : sourceFile.authorization,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {
        this.setState({
          FavouriteTeam1: response[0].TeamName
        })
        this.setState({
          FavouriteTeam2: response[1].TeamName
        })
        this.setState({
          FavouriteTeam3: response[2].TeamName
        })
        this.setState({
          FavouriteTeam4: response[3].TeamName
        })
        console.log("FavouriteTeam", this.state.FavouriteTeam4)
      });
  }

  SubmitLoginBtn = (event) => {
    console.log("Name : " + this.state.Name);
    console.log("SurName : " + this.state.SurName);
    console.log("Email : " + this.state.Email);
    console.log("Password : " + this.state.Password);
    console.log("ConfirmPassword : " + this.state.ConfirmPassword);
    console.log("FavouriteTeam : " + this.state.FavouriteTeam1);

    const url = `${API_URL}/mobile/profile/Create`;

    const data = {
      Name: this.state.Name,
      SurName: this.state.SurName,
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword,
      FavouriteTeam: this.state.FavouriteTeam1,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": sourceFile.Content_Type,
        "Accept": sourceFile.Accept,
        "ff_version": sourceFile.ff_version,
        "ff_language": sourceFile.ff_language,
        "source": sourceFile.source,
        // "authorization" : sourceFile.authorization,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {
        if (response.ErrorId) {
          alert("Something went wrong, please try again later !");
          window.location.reload();
        } else {
          if (this.state.Password !== this.state.ConfirmPassword) {
            alert("password don't match ")
            window.location.reload();
          }
          else {
            console.log(response)
            let token_id = response.Token;
            console.log("token is :", token_id)
            this.setState({ Token: token_id });
            this.setState({ isDone: true })
            AsyncStorage.setItem("token", this.state.Token);
            // alert("you have successfully registered !");
            ToastAndroid.showWithGravity(
              'you have successfully registered !',
              ToastAndroid.LONG,
              ToastAndroid.CENTER
            );
            this.props.navigation.navigate('Day1 Home');
          }
        }
      });
  };

  SubmitLoginBtn = this.SubmitLoginBtn.bind(this);

  // Facebook = () => {
  //   alert("Login with Facebook !");
  // };

  // Facebook = this.Facebook.bind(this);

  // Google = () => {
  //   alert("Login with Google !")
  // };

  // Google = this.Google.bind(this);

  render() {
    return (
      <ScrollView style={styles.container}>

        <Text style={{ fontSize: 25, marginLeft: 150, marginTop: 30, fontWeight: "bold" }}>
          FLY-FOOT
          </Text>
        <Image
          source={Flyfoot}
          style={{ marginLeft: 100, marginTop: -34, width: 40, height: 40 }}
        />
        {/* <TouchableOpacity style={{ width: 300, marginLeft: 30, marginTop: 50 }}>
          <Button
            title="LOGIN WITH FACEBOOK"
            color="blue"
            style={{ width: 500, padding: 300, height: 300 }}
            onPress={this.Facebook}
          />
        </TouchableOpacity> */}

        {/* <TouchableOpacity style={{ width: 300, marginLeft: 30, marginTop: 20 }}>
          <Button
            title="LOGIN WITH GOOGLE"
            color="red"
            onPress={this.Google}
          />
        </TouchableOpacity> */}
        <Text style={{ fontSize: 20, paddingTop: 10, marginLeft: 90 }}>
          SIGN UP WITH EMAIL
        </Text>
        <Text style={{ paddingTop: 30, marginLeft: 35, color: "gray" }}>
          Name
        </Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 140, marginTop: 20, marginLeft: 35 }}
          onChangeText={(Name) => this.setState({ Name })}
          placeholder="   Hann"
          required
          value={this.state.Name}
          type="text"
        />

        <Text style={{ marginTop: -79, marginLeft: 190, color: "gray" }}>
          Surname
        </Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 140, marginTop: 20, marginLeft: 190 }}
          onChangeText={(SurName) => this.setState({ SurName })}
          placeholder="   Hann"
          required
          value={this.state.SurName}
          type="text"
        />

        <Text style={{ paddingTop: 30, marginLeft: 35, width: 300, color: "gray" }}>
          Email
        </Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 295, marginTop: 20, marginLeft: 35 }}
          onChangeText={(Email) => this.setState({ Email })}
          required
          value={this.state.Email}
          placeholder="  hannibal@gmail.com"
        />

        <Text style={{ paddingTop: 30, marginLeft: 35, color: "gray" }}>
          Password
        </Text>

        <PasswordInputText
          style={{ width: 140, marginTop: 20, marginLeft: 35 }}
          value={this.state.password}
          required
          placeholder="   Hann"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({ password })}
        />

        <Text style={{ marginTop: -110, marginLeft: 190, color: "gray" }}>
          Repeat Password
        </Text>

        <PasswordInputText
          style={{ width: 140, marginTop: 20, marginLeft: 190 }}
          value={this.state.ConfirmPassword}
          required
          placeholder="   Hann"
          secureTextEntry={true}
          onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
        />

        <Text style={{ paddingTop: 50, marginLeft: 35, width: 300, color: "gray" }}>
          Favourite Team
        </Text>

        <Picker
          selectedValue={this.state.FavouriteTeam1}
          style={{ height: 50, width: 320, marginLeft: 30, borderColor: 'gray' }}
          onValueChange={(itemValue, itemIndex) => this.setState({ FavouriteTeam1: itemValue })}>
          <Picker.Item label={this.state.FavouriteTeam1} value={this.state.FavouriteTeam1} />
          <Picker.Item label={this.state.FavouriteTeam2} value={this.state.FavouriteTeam2} />
          <Picker.Item label={this.state.FavouriteTeam3} value={this.state.FavouriteTeam3} />
          <Picker.Item label={this.state.FavouriteTeam4} value={this.state.FavouriteTeam4} />
        </Picker>

        <TouchableOpacity style={styles.loginBtn} onPress={this.SubmitLoginBtn}>
          <Text style={styles.loginText}>
            <Text style={{ marginLeft: 235 }}>LOGIN </Text>
          </Text>
        </TouchableOpacity>

        {this.state.isDone ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 0 }} />
          : console.log("done")}

        <Text
          style={{
            color: "gray",
            marginLeft: 40,
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 0,
            width: 500
          }}
        >
          By Signing up, i agree with <TouchableOpacity onPress={() => {
            Linking.openURL('https://fly-foot.com/en/about/TC');
          }}><Text style={{ marginTop: 40 }}>FFT Terms.</Text></TouchableOpacity>

        </Text>
        <Text
          style={{
            color: "gray",
            marginLeft: 40,
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 20,
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
          <Text style={{ marginLeft: 215, marginTop: -20, marginBottom: 20, width: 100, height: 50, marginTop: -20 }}> &nbsp; Login here </Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 0,
    marginBottom: 0,
  },
  loginBtn: {
    width: 295,
    backgroundColor: "#334CFF",
    borderRadius: 0,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginLeft: 35,
    color: "white",
  },
  loginTextF: {
    color: "white",
    paddingTop: 6,
  },
  loginTextG: {
    color: "white",
    paddingTop: 6,
  },
  loginText: {
    color: "white",
    paddingTop: 6,
  },
  txtInputEmail: {
    paddingRight: 180,
    paddingBottom: -40,
    paddingTop: 25,
    borderColor: "gray",
    borderWidth: 0,
  },
  txtInputPassword: {
    paddingTop: -7,
    paddingRight: 180,
    paddingBottom: -0,
    borderColor: "gray",
    borderWidth: 0,
  },
  ForgotPassword: {
    color: "red",
    width: 24,
  },
  text: {
    marginLeft: -120,
  },
});
