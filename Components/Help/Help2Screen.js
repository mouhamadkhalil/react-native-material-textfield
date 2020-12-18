import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { Link, Router } from "react-router-dom";
import User from "../../assets/images/user.png";

export default class Help2Screen extends React.Component {

  Back = () => {
    window.location = "/help1";
  }

  state = {
    idLookup: "",
    LName0: "",
    LName1: "",
    LName2: "",
    LName3: "",
    LName4: "",
    LName5: "",
    LName6: "",
    LName7: "",
    LDescription0: "",
    LDescription1: "",
    LDescription2: "",
    LDescription3: "",
    LDescription4: "",
    LDescription5: "",
    LDescription6: "",
    LDescription7: "",
  };


  componentDidMount() {
    const url = " https://apitest.fly-foot.com/api/mobile/about/faq";


    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error: ", error))
      .then((response) => {

        this.setState({ LName0: response[0].LName });
        this.setState({ LName1: response[1].LName });
        this.setState({ LName2: response[2].LName });
        this.setState({ LName3: response[3].LName });
        this.setState({ LName4: response[4].LName });
        this.setState({ LName5: response[5].LName });
        this.setState({ LName6: response[6].LName });
        this.setState({ LName7: response[7].LName });
        this.setState({ LDescription0: response[0].LDescription });
        this.setState({ LDescription1: response[1].LDescription });
        this.setState({ LDescription2: response[2].LDescription });
        this.setState({ LDescription3: response[3].LDescription });
        this.setState({ LDescription4: response[4].LDescription });
        this.setState({ LDescription5: response[5].LDescription });
        this.setState({ LDescription6: response[6].LDescription });
        this.setState({ LDescription7: response[7].LDescription });
      });
  }


  Answer0 = () => {
    var text = "";
    text += this.state.LDescription0;
    document.getElementById("demo").innerHTML = text;
  }

  Answer1 = () => {
    var text = "";
    text += this.state.LDescription1;
    document.getElementById("demo1").innerHTML = text;
  }

  Answer2 = () => {
    var text = "";
    text += this.state.LDescription2;
    document.getElementById("demo2").innerHTML = text;
  }

  Answer3 = () => {
    var text = "";
    text += this.state.LDescription3;
    document.getElementById("demo3").innerHTML = text;
  }

  Answer4 = () => {
    var text = "";
    text += this.state.LDescription4;
    document.getElementById("demo4").innerHTML = text;
  }

  Answer5 = () => {
    var text = "";
    text += this.state.LDescription5;
    document.getElementById("demo5").innerHTML = text;
  }

  Answer6 = () => {
    var text = "";
    text += this.state.LDescription6;
    document.getElementById("demo6").innerHTML = text;
  }

  Answer7 = () => {
    var text = "";
    text += this.state.LDescription7;
    document.getElementById("demo7").innerHTML = text;
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "blue", width: "50%", height: 50 }}>
          <TouchableOpacity onPress={this.Back}>
            <text style={{ fontSize: 25, color: "yellow", marginLeft: 20, marginTop: 10, fontWeight: "bold" }}>&#8592;</text>
          </TouchableOpacity>
          <text
            style={{
              color: "white",
              fontSize: 19,
              fontWeight: "bold",
              fontFamily: "Arial",
              textAlign: "center",
              marginTop: -25,
            }}
          >
            FAQ'S
          </text>
        </View>
        <View style={{ width: "50%", height: 1800, backgroundColor: "#F7EEE8" }}>
          <text
            style={{
              color: "#E912E9",
              fontWeight: "bold",
              fontSize: 14,
              fontFamily: "Arial",
              paddingTop: 20,
              marginLeft: 20,
            }}
          >
            POPULAR FAQS
          </text>
          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer0}>
              {this.state.LName0}
              <p id="demo" style={{ color: "black" }}></p>
            </TouchableOpacity>
          </text>

          <text
            style={{
              fontSize: 16,
              paddingTop: 5,
              color: "blue",
              marginLeft: 50,
            }}
          ></text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer1}>
              {this.state.LName1}
              <p id="demo1" style={{ color: "black" }}></p>
            </TouchableOpacity>
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              width: 320,
              marginLeft: 50,
            }}
          >
            <TouchableOpacity onPress={this.Answer2}>
              {this.state.LName2}
              <p id="demo2" style={{ color: "black" }}></p>
            </TouchableOpacity>
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer3}>
              {this.state.LName3}
              <p id="demo3" style={{ color: "black" }}></p>
            </TouchableOpacity>
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer4}>
              {this.state.LName4}
              <p id="demo4" style={{ color: "black" }}></p>
            </TouchableOpacity>
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer5}>
              {this.state.LName5}
              <p id="demo5" style={{ color: "black" }}></p>
            </TouchableOpacity>{" "}
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>
          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer6}>
              {this.state.LName6}
              <p id="demo6" style={{ color: "black" }}></p>
            </TouchableOpacity>{" "}
          </text>

          <text
            style={{
              color: "pink",
              fontWeight: "bold",
              fontFamily: "Arial",
              paddingLeft: 20,
              marginTop: 40,
            }}
          >
            &gt;
          </text>

          <text
            style={{
              fontSize: 16,
              marginTop: -18,
              color: "blue",
              marginLeft: 50,
              width: 320,
            }}
          >
            <TouchableOpacity onPress={this.Answer7}>
              {this.state.LName7}
              <p id="demo7" style={{ color: "black" }}></p>
            </TouchableOpacity>{" "}
          </text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 1500,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 300,
    marginTop: 200,
    width: 800,
    marginBottom: 200,
  },
});
