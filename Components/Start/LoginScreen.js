import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Signup from "./SignupScreen";
import LoginWithFB from "../../assets/images/LoginWithFB.png";
import SignInGoogle from "../../assets/images/SignInGoogle.png";
import Flyfoot from "../../assets/images/flyfoot.png";

export default class LoginScreen extends React.Component {
  state = {
    client_id: "",
    grant_type: "Bearer Token",
    username: "",
    password: "",
    rememberMe: "",
    scope: "",
    Token: "",
  };

  async handleChangeEmail(event) {
    this.setState({ username: event.target.value });
  }

  async handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  Home = () => {
    window.location = "/";
  };

  SubmitLoginBtn = (event) => {
    console.log("username : " + this.state.username);
    console.log("password : " + this.state.password);

    const url = "https://apitest.fly-foot.com/api/mobile/profile/login";

    const data = {
      username: this.state.username,
      password: this.state.password,
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
          alert("Error: The user name or password is incorrect");
          window.location.reload();
        } else {
          console.log(response)
          let token_id = response.Token;
          console.log("token is :", token_id)
          this.setState({ Token: token_id });
          localStorage.setItem("token", this.state.Token);
          alert(localStorage.getItem("token", ""))
          window.location = "/HomePre";
        }
      });
  };

  SubmitLoginBtn = this.SubmitLoginBtn.bind(this);

  render() {
    return (
      <ScrollView style={styles.container}>

        <TouchableOpacity onPress={this.Home}>
          <Text style={{ fontSize: 25, marginLeft: 150, marginTop: 30 }}>
            FLY-FOOT
          </Text>
        </TouchableOpacity>

        <Image
          source={Flyfoot}
          style={{ marginLeft: 120, marginTop: -30, width: 30, height: 30 }}
        ></Image>

        <TouchableOpacity>
          <Image source={LoginWithFB}
            style={{
              marginTop: 20,
              marginLeft: -10,
              marginBottom: 20,
            }}
          ></Image>
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={SignInGoogle}
            style={{
              marginTop: -10,
              marginLeft: -10,
              marginBottom: 20,
            }}
          ></Image>
        </TouchableOpacity>
        <Text style={{ fontSize: 20, paddingTop: 10 }}>
          LOGIN WITH EMAIL
        </Text>
        <Text style={{ paddingTop: 30, marginLeft: -320 }}>
          Email
        </Text>

        {/* 
        <MDBInput
          style={{ marginTop: 10, width: 332, marginLeft: -10 }}
          iconClass="white-text"
          name="email"
          type="email"
          onChange={this.handleChangeEmail.bind(this)}
          value={this.state.email}
          hint="hannibal@gma"
          required
        />
 */}

        <Text style={{ paddingTop: 30, marginLeft: -295 }}>
          Password
        </Text>

        {/* 
        <MDBInput
          style={{ marginTop: 10, width: 332, marginLeft: -10 }}
          iconClass="white-text"
          name="password"
          type="password"
          onChange={this.handleChangePassword.bind(this)}
          value={this.state.password}
          required
        /> */}

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
            <Text style={{ marginLeft: 235 }}> &gt;</Text>
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            color: "gray",
            marginLeft: 20,
            fontSize: 16,
            paddingRight: 110,
            paddingTop: 20,
          }}
        >
          Don't have an account?
        </Text>
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
    width: "25%",
    backgroundColor: "#334CFF",
    borderRadius: 0,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    paddingLeft: 20,
    paddingTop: 10,
    marginLeft: -10,
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
