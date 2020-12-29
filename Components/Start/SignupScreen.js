import React from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import Signup from "./SignupScreen";
import LoginWithFB from "../../assets/images/LoginWithFB.png";
import SignInGoogle from "../../assets/images/SignInGoogle.png";
import Flyfoot from "../../assets/images/flyfoot.png";
import { API_URL, API_TOKEN } from "@env"

export default class SignUpScreen extends React.Component {
  state = {
    client_id: "",
    grant_type: "Bearer Token",
    rememberMe: "",
    scope: "",
    Token: "",
    Name: "",
    SurName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    FavouriteTeam: ""
  };

  Home = () => {
    window.location = "/";
  };

  SubmitLoginBtn = (event) => {
    console.log("Name : " + this.state.Name);
    console.log("SurName : " + this.state.SurName);
    console.log("Email : " + this.state.Email);
    console.log("Password : " + this.state.Password);
    console.log("ConfirmPassword : " + this.state.ConfirmPassword);
    console.log("FavouriteTeam : " + this.state.FavouriteTeam);


    const url = `${API_URL}/mobile/profile/Create`;

    const data = {
      Name: this.state.Name,
      SurName: this.state.SurName,
      Email: this.state.Email,
      Password: this.state.Password,
      ConfirmPassword: this.state.ConfirmPassword,
      FavouriteTeam: this.state.FavouriteTeam,
    };

    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {
        if (response.ErrorId) {
          alert("Something went wrong, please try again later !");
          window.location.reload();
        } else {
          console.log(response)
          let token_id = response.Token;
          console.log("token is :", token_id)
          this.setState({ Token: token_id });
          localStorage.setItem("token", this.state.Token);
          alert("you have successfully registered !")
          alert(localStorage.getItem("token", ""))
          window.location = "/HomePre";
        }
      });
  };

  SubmitLoginBtn = this.SubmitLoginBtn.bind(this);

  Facebook = () => {
    alert("Login with Facebook !");
  };

  Facebook = this.Facebook.bind(this);

  Google = () => {
    alert("Login with Google !")
  };

  Google = this.Google.bind(this);

  render() {
    return (
      <ScrollView style={styles.container}>

        <TouchableOpacity onPress={this.Home}>
          <Text style={{ fontSize: 25, marginLeft: 150, marginTop: 30, fontWeight: "bold" }}>
            FLY-FOOT
          </Text>
        </TouchableOpacity>

        <Image
          source={Flyfoot}
          style={{ marginLeft: 100, marginTop: -34, width: 40, height: 40 }}
        />

        <TouchableOpacity style={{ width: 300, marginLeft: 30, marginTop: 50 }}>
          <Button
            title="LOGIN WITH FACEBOOK"
            color="blue"
            style={{ width: 500, padding: 300, height: 300 }}
            onPress={this.Facebook}
          />
        </TouchableOpacity>

        <TouchableOpacity style={{ width: 300, marginLeft: 30, marginTop: 20 }}>
          <Button
            title="LOGIN WITH GOOGLE"
            color="red"
            onPress={this.Google}
          />
        </TouchableOpacity>
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

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 140, marginTop: 20, marginLeft: 35 }}
          onChangeText={(Password) => this.setState({ Password })}
          placeholder="   Hann"
          required
          value={this.state.Password}
          secureTextEntry={true}
        />

        <Text style={{ marginTop: -79, marginLeft: 190, color: "gray" }}>
          Repeat Password
        </Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 140, marginTop: 20, marginLeft: 190 }}
          onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
          placeholder="   Hann"
          required
          value={this.state.ConfirmPassword}
          secureTextEntry={true}
        />

        <Text style={{ paddingTop: 30, marginLeft: 35, width: 300, color: "gray" }}>
          Favourite Team
        </Text>

        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 295, marginTop: 20, marginLeft: 35 }}
          onChangeText={(FavouriteTeam) => this.setState({ FavouriteTeam })}
          required
          placeholder="   Choose one"
          value={this.state.FavouriteTeam}
        />

        <Text
          style={{
            color: "gray",
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 20,
          }}
        >
        </Text>

        <TouchableOpacity style={styles.loginBtn} onPress={this.SubmitLoginBtn}>
          <Text style={styles.loginText}>
            <Text style={{ marginLeft: 235 }}>LOGIN </Text>
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            color: "gray",
            marginLeft: 35,
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 20,
            width: 500
          }}
        >
          By Signing up, i agree with <TouchableOpacity><Text style={{ marginTop: 40 }}>FFT Terms.</Text></TouchableOpacity>

        </Text>

        <Text
          style={{
            color: "gray",
            marginLeft: 35,
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 20,
          }}
        >
          Already have an account?
        </Text>
        <TouchableOpacity><Text style={{ marginLeft: 215, marginTop: -20, marginBottom: 30 }}>  Login here </Text></TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    marginTop: 50,
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
