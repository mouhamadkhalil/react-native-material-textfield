import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    View,
    Image,
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
import AwesomeAlert from "react-native-awesome-alerts";
import * as Facebook from 'expo-facebook';
import PasswordInputText from 'react-native-hide-show-password-input';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            showAlert: false,
        };
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

    SubmitLoginBtn = (event) => {
        console.log("username : " + this.state.username);
        console.log("password : " + this.state.password);

        const url = `${API_URL}/mobile/profile/login`;

        if (this.state.username != ' ' && this.state.password != ' ') {
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
                        ToastAndroid.showWithGravity(
                            'Error: The user name or password is incorrect',
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
                        this.props.navigation.navigate('Home Pre');
                        ToastAndroid.showWithGravity(
                            'you are successfully logged in !',
                            ToastAndroid.SHORT,
                            ToastAndroid.CENTER
                        );
                    }
                });
        }
        else {
            ToastAndroid.showWithGravity(
                'Please Enter Credentials',
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

    async FBLogin() {
        try {
            await Facebook.initializeAsync({
                appId: '431386654654341',
            });
            const {
                type,
                token,
                expirationDate,
                permissions,
                declinedPermissions,
            } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
            } else {
                // type === 'cancel'
            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }

    render() {

        const { navigation } = this.props;
        const { showAlert } = this.state;
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center', }}>
                    <Image
                        source={Flyfoot}
                        style={{ marginLeft: -30, width: 60, height: 60 }}
                    />
                    <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 25, fontWeight: "bold" }}>
                        FLY-FOOT
                    </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', marginTop: 30, alignItems: 'center' }}>
                    <TouchableOpacity onPress={this.FBLogin.bind(this)} style={{ width: 350 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: '#37568F', color: '#FAFDFD', height: 60, lineHeight: 60, paddingLeft: 20, textTransform: 'uppercase' }}>
                            login   with   facebook
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center', }}>
                        <View style={styles.lineStyle} />
                        <Text style={{ fontSize: 18, textTransform: 'uppercase', marginLeft: 15, marginRight: 15 }}>
                            login   with   email
                        </Text>
                        <View style={styles.lineStyle} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Text style={{ paddingTop: 30, marginLeft: 35 }}>
                        Email
                    </Text>
                    <TextInput
                        style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35, marginRight: 35 }}
                        onChangeText={(username) => this.setState({ username })}
                        placeholder="hannibal@gma"
                        required
                        value={this.state.email}
                        type="email"
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <Text style={{ marginTop: 30, marginLeft: 35 }}>
                        Password
                    </Text>
                    <PasswordInputText
                        style={{ marginLeft: 35, marginRight: 35, marginTop: -25 }}
                        label=''
                        lineWidth={2}
                        getRef={input => this.input = input}
                        value={this.state.password}
                        required
                        secureTextEntry={true}
                        onChangeText={(password) => this.setState({ password })}
                    />
                    <View
                        style={{
                            fontWeight: "90",
                            color: "gray",
                            fontSize: 16,
                            paddingRight: 110,
                            paddingTop: 20,
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => {
                                this.showAlert();
                            }}
                        >
                            <Text style={{ marginLeft: 35, color: "gray", fontSize: 16, textDecorationLine: "underline" }}>Forgot password?</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={(this.SubmitLoginBtn)}>
                        <Text style={styles.loginText}>
                            login
                        </Text>
                        {this.state.isDone ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 22, marginLeft: -10 }} />
                            : console.log("done")}
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop:20 }}>
                        <Text
                            style={{
                                color: "gray",
                                marginLeft: 35,
                                fontSize: 18,
                            }}
                        >
                            Don't have an account?
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Sign up')}>
                            <Text style={{marginLeft:5, fontSize:18, textDecorationLine: 'underline'}}>Sign up here </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <ScrollView style={{ width: 1000, marginTop: 0 }}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="FORGOT YOUR PASSWORD?"
                        message="Enter your email address to request a password reset"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        showCancelButton={true}
                        showConfirmButton={true}
                        cancelText="CANCEL"
                        confirmText="SUBMIT"
                        confirmButtonColor="blue"
                        cancelButtonColor="black"
                        onCancelPressed={() => {
                            this.hideAlert();
                        }}
                        onConfirmPressed={() => {
                            this.hideAlert();
                        }}
                    />
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F7F7",
        marginTop: 0,
        marginBottom: 0,
    },
    loginBtn: {
        backgroundColor: "#374BBE",
        height: 60,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
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
        paddingLeft: 20,
        fontSize: 18,
        fontWeight: 'bold',
        lineHeight: 60,
        color: "white",
        letterSpacing: 2,
        textTransform: 'uppercase'
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
    lineStyle: {
        width: 70,
        height: 1,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'black'
    }
});
