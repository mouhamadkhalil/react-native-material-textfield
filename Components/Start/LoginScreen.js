import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    Image,
    Button,
    AsyncStorage,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid 
} from "react-native";
import Signup from "./SignupScreen";
import LoginWithFB from "../../assets/images/LoginWithFB.png";
import SignInGoogle from "../../assets/images/SignInGoogle.png";
import Flyfoot from "../../assets/images/flyfoot.png";
import { API_URL, API_TOKEN } from "@env";
import SignupScreen from "./SignupScreen";

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        client_id: "",
        grant_type: "Bearer Token",
        username: "",
        password: "",
        rememberMe: "",
        scope: "",
        Token: "",
        isDone: false,
        // isLoggedIn: false,
        // loginChecked: false,
    };

    // componentDidMount(){
    //     this.getItem(this.state.Token);
    // }

    SubmitLoginBtn = (event) => {
        console.log("username : " + this.state.username);
        console.log("password : " + this.state.password);

        const url = `${API_URL}/mobile/profile/login`;

        if(this.state.username != '' && this.state.password != ''){
        
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
                    // alert("Error: The user name or password is incorrect"); 
                    ToastAndroid.showWithGravity(
                        'Error: The user name or password is incorrect' ,
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                      );                 
                    window.location.reload();
                } else {
                    console.log(response);
                    let token_id = response.Token;
                    this.setState({ Token: token_id });
                    AsyncStorage.setItem("token", this.state.Token);
                    // this.setState({ isLoggedIn: true });
                    // this.setState({ loginChecked: true });
                    this.setState({ isDone: true });
                    this.props.navigation.navigate('Day1 Home');
                }
            });
        }
        else{
            ToastAndroid.showWithGravity(
                'Please Enter Credentials' ,
                ToastAndroid.LONG,
                ToastAndroid.CENTER
              );
        }
    };

    //function to extract storage token. Any name can be given ot it. 

    // async getItem(token){
    //     console.log("the state is : ",this.state.isLoggedIn)
    //     try{
    //         const value = await AsyncStorage.getItem(token);
    //         console.log("my token is : ",value);
    //         if(value !== null){
    //             this.setState({
    //                 isLoggedIn: true,
    //                 loginChecked: true
    //             })
    //         }
    //         else{
    //             this.setState({
    //                 isLoggedIn: false,
    //                 loginChecked: true
    //             })
    //         }
    //     }
    //     catch(error){
    //         console.log(error)
    //     }
    //     console.log(this.state.isLoggedIn)
    // }



    //function to remove storage token 

    // async removeItem(item){
    //     try{
    //         const value = await AsyncStorage.removeItem(item);
    //         if(value == null){
    //             this.setState({
    //                 isLoggedIn: false
    //             })
    //         }
    //     }
    //     catch(error){
    //         //handle errors here
    //     }
    // }

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
        const { navigation } = this.props;
        return (
            <ScrollView style={styles.container}>
                <TouchableOpacity>
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
                    LOGIN WITH EMAIL
                </Text>
                <Text style={{ paddingTop: 30, marginLeft: 35 }}>
                    Email
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 295, marginTop: 20, marginLeft: 35 }}
                    onChangeText={(username) => this.setState({ username })}
                    placeholder="   hannibal@gma"
                    required
                    value={this.state.email}
                    type="email"
                    keyboardType="email-address"
                />
                <Text style={{ paddingTop: 30, marginLeft: 35, width: 300 }}>
                    Password
                </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 295, marginTop: 20, marginLeft: 35 }}
                    onChangeText={(password) => this.setState({ password })}
                    required
                    value={this.state.password}
                    secureTextEntry={true}
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
                <TouchableOpacity style={styles.loginBtn} onPress={(this.SubmitLoginBtn)}>
                    <Text style={styles.loginText}>
                        <Text style={{ marginLeft: 235 }}>LOGIN </Text>
                    </Text>

                    {this.state.isDone ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 22,marginLeft:-10 }} />
                        : console.log("done") }

                </TouchableOpacity>
                <Text
                    style={{
                        color: "gray",
                        marginLeft: 35,
                        fontSize: 16,
                        paddingRight: 110,
                        paddingTop: 20,
                    }}
                >
                    Don't have an account?
                </Text>
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('Sign up')}>
                    <Text style={{ marginLeft: 206, marginTop: -20, marginBottom: 0,width:100,height:70,marginTop:-20 }} >Sign up here </Text></TouchableOpacity>
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
