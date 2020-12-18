import React, { Component } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from "react-native-simple-radio-button";
import LoginWithFB from "../../assets/images/LoginWithFB.png";
import SignInGoogle from "../../assets/images/SignInGoogle.png";
import Flyfoot from "../../assets/images/flyfoot.png";
import { MDBInput } from "mdbreact";

export default class SignupScreen extends React.Component {
  state = {
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
    token: "",
    message: "",
  };

  Home = () => {
    window.location = "/";
  };
  async handleChangeName(event) {
    this.setState({ name: event.target.value });
  }

  async handleChangeSurname(event) {
    this.setState({ surname: event.target.value });
  }

  async handleChangeEmail(event) {
    console.log(event.target.value);
    this.setState({ email: event.target.value });
  }

  async handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  async handleChangeConfirmPassword(event) {
    this.setState({ confirmPassword: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    //just for testing, reading from local json file.
    const customData = require("../../data.json");

    const data = {
      name: this.state.name,
      surname: this.state.surname,
      email: this.state.email,
      confirmPassword: this.state.confirmPassword,
      password: this.state.password,
    };
    fetch(customData, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {
        if (response != undefined) {
          this.setState({
            message: "Congrats! you have successfully registered !",
          });
          console.log(this.state.message);
          //localStorage.setItem("token", this.state.token);
          window.location.reload();
        } else {
          this.setState({ message: "Sorry! something went wrong." });
          console.log(this.state.message);
          alert("Sorry! something went wrong.");
          //window.location.reload();
        }
      });
  };

  render() {
    var radio_props = [{ label: "" }];

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this.Home}>
          <label
            style={{ fontSize: 25, fontFamily: "Arial", fontWeight: "bold" }}
          >
            FLY-FOOT
          </label>
        </TouchableOpacity>
        <a href="/">
          <img
            src={Flyfoot}
            style={{ marginLeft: -120, marginTop: -120 }}
            width="60"
          ></img>
        </a>

        <TouchableOpacity>
          <img
            src={LoginWithFB}
            style={{
              marginTop: 20,
              marginLeft: -10,
              marginBottom: 20,
              width: 350,
            }}
          ></img>{" "}
        </TouchableOpacity>
        <TouchableOpacity>
          {" "}
          <img
            src={SignInGoogle}
            style={{
              marginTop: -10,
              marginLeft: -10,
              marginBottom: 20,
              width: 350,
            }}
          ></img>{" "}
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "large", paddingTop: 10 }}>
          SIGN UP WITH EMAIL{" "}
        </Text>

        <Text
          style={{
            color: "gray",
            paddingTop: 30,
            paddingRight: 300,
            fontWeight: 10,
          }}
        >
          Name
        </Text>

        <TextInput
          underlineColorAndroid="transparent"
          style={{ marginRight: 185, marginTop: 10 }}
          placeholder="Hann"
          onChange={this.handleChangeName.bind(this)}
          value={this.state.name}
        />

        <text style={{ paddingRight: 183 }}>___________________</text>

        <Text
          style={{
            color: "gray",
            marginRight: 90,
            marginTop: -63,
            paddingLeft: 140,
            fontWeight: 10,
          }}
        >
          Surname
        </Text>

        <TextInput
          underlineColorAndroid="transparent"
          style={{ marginRight: -150, marginTop: 10 }}
          placeholder="Hann"
          onChange={this.handleChangeSurname.bind(this)}
          value={this.state.surname}
        />

        <text style={{ marginTop: -3, paddingLeft: 170 }}>
          {" "}
          _____________________
        </text>

        <Text style={{ paddingTop: 30, paddingRight: 300, fontWeight: 10 }}>
          Email
        </Text>

        <MDBInput
          style={{ marginTop: 10, width: 335, marginLeft: 5 }}
          name="email"
          type="email"
          onChange={this.handleChangeEmail.bind(this)}
          value={this.state.email}
          hint="hannibal@gma"
          required
        />
        <Text
          style={{
            color: "gray",
            paddingTop: 30,
            paddingRight: 280,
            fontWeight: 10,
          }}
        >
          Password
        </Text>
        <MDBInput
          style={{ marginTop: 10, width: 160, marginLeft: -170 }}
          name="password"
          value={this.state.password}
          type="password"
          onChange={this.handleChangePassword.bind(this)}
          required
        />
        <Text
          style={{
            color: "gray",
            paddingTop: 7,
            marginRight: 70,
            marginTop: -63,
            paddingLeft: 184,
            fontWeight: 10,
          }}
        >
          Repeat password
        </Text>
        <MDBInput
          style={{ marginTop: 16, width: 160, marginLeft: 180 }}
          name="confirmPassword"
          type="password"
          value={this.state.confirmPassword}
          onChange={this.handleChangeConfirmPassword.bind(this)}
          required
        />

        <Text
          style={{
            color: "gray",
            paddingTop: 30,
            paddingRight: 250,
            fontWeight: 10,
          }}
        >
          Favourite Team
        </Text>
        <TouchableOpacity style={styles.loginBtn} onPress={this.handleSubmit}>
          <Text style={styles.loginText}>LOGIN <text style={{ marginLeft: 240 }}>&gt;</text></Text>
        </TouchableOpacity>

        <RadioForm
          style={{ paddingRight: 300 }}
          radio_props={radio_props}
          initial={0}
          labelColor={"#000"}
          onPress={(value) => {
            this.setState({ value: value });
          }}
        />
        <Text
          style={{
            color: "gray",
            marginTop: -30,
            marginRight: 30,
            fontWeight: 10,
          }}
        >
          By signing up,{" "}
          <Text>
            i agree with
            <a href="/">
              {" "}
              <Text style={{ color: "gray" }}>FFT terms.</Text>{" "}
            </a>{" "}
          </Text>{" "}
        </Text>

        <Text
          style={{
            fontWeight: "90",
            color: "gray",
            fontSize: 16,
            paddingRight: 82,
            marginBottom: 50,
            paddingTop: 20,
            marginLeft: 20
          }}
        >
          Already have an account?
          <a href="/login">
            {" "}
            <Text style={{ color: "black" }}>
              {" "}
              Login up here
            </Text>{" "}
          </a>{" "}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 50,
  },

  loginTextF: {
    color: "white",
    fontWeight: "bold",
    paddingTop: 6,
  },
  loginTextG: {
    color: "white",
    fontWeight: "bold",
    paddingTop: 6,
  },
  txtInputName: {
    paddingRight: 325,
    paddingBottom: -40,
    paddingTop: 25,
    borderColor: "gray",
    borderRadius: 0,
    height: 30,
    width: "5%",
  },
  txtInputEmail: {
    paddingRight: 180,
    paddingBottom: -40,
    paddingTop: 25,
    borderColor: "gray",
    borderWidth: 0,
  },
  loginBtn: {
    width: "26%",
    backgroundColor: "#334CFF",
    borderRadius: 0,
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10,
    marginLeft: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
    paddingTop: 6,
  },
});
