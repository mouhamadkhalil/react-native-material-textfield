import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    Image,
    View,
    TouchableOpacity,
    Picker,
    Linking,
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
                });
                this.setState({
                    FavouriteTeam2: response[1].TeamName
                });
                this.setState({
                    FavouriteTeam3: response[2].TeamName
                });
                this.setState({
                    FavouriteTeam4: response[3].TeamName
                });
                console.log("FavouriteTeam", this.state.FavouriteTeam4);
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
                        alert("password don't match ");
                        window.location.reload();
                    }
                    else {
                        console.log(response);
                        let token_id = response.Token;
                        console.log("token is :", token_id);
                        this.setState({ Token: token_id });
                        this.setState({ isDone: true });
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
                    <TouchableOpacity style={{ width: 350 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', backgroundColor: '#37568F', color: '#FAFDFD', height: 60, lineHeight: 60, paddingLeft: 20, textTransform: 'uppercase' }}>
                            sign  up  with  facebook
                        </Text>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center', }}>
                        <View style={styles.lineStyle} />
                        <Text style={{ fontSize: 18, textTransform: 'uppercase', marginLeft: 10, marginRight: 10 }}>
                            sign  up  with  email
                        </Text>
                        <View style={styles.lineStyle} />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                    <Text style={{ width: 160, marginLeft: 35, color: "gray" }}>
                        Name
          </Text>
                    <Text style={{ marginLeft: 20, color: "gray" }}>
                        Surname
          </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                        style={{ width: 160, height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35 }}
                        onChangeText={(Name) => this.setState({ Name })}
                        placeholder="Hann"
                        required
                        value={this.state.Name}
                        type="text"
                    />
                    <TextInput
                        style={{ width: 160, height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 20 }}
                        onChangeText={(SurName) => this.setState({ SurName })}
                        placeholder="Hann"
                        required
                        value={this.state.SurName}
                        type="text"
                    />
                </View>
                <Text style={{ marginTop: 30, marginLeft: 35, color: "gray" }}>
                    Email
          </Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35, marginRight: 35 }}
                    onChangeText={(Email) => this.setState({ Email })}
                    required
                    value={this.state.Email}
                    placeholder="hannibal@gmail.com"
                />
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                    <Text style={{ width: 160, marginLeft: 35, color: "gray" }}>
                        Password
          </Text>
                    <Text style={{ marginLeft: 20, color: "gray" }}>
                        Reapeat password
          </Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TextInput
                        style={{ width: 160, height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35 }}
                        onChangeText={(Password) => this.setState({ Password })}
                        placeholder="Hann"
                        required
                        value={this.state.Password}
                        secureTextEntry={true}
                    />
                    <TextInput
                        style={{ width: 160, height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 20 }}
                        onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                        placeholder="Hann"
                        required
                        value={this.state.ConfirmPassword}
                        secureTextEntry={true}
                    />
                </View>

                <Text style={{ paddingTop: 50, marginLeft: 35, width: 300, color: "gray" }}>
                    Favourite Team
        </Text>
                <Picker
                    selectedValue={this.state.FavouriteTeam1}
                    style={{ height: 50, marginLeft: 28, marginRight: 15, borderBottomWidth: 1, borderColor: 'gray' }}
                    onValueChange={(itemValue, itemIndex) => this.setState({ FavouriteTeam1: itemValue })}>
                    <Picker.Item label={this.state.FavouriteTeam1} value={this.state.FavouriteTeam1} />
                    <Picker.Item label={this.state.FavouriteTeam2} value={this.state.FavouriteTeam2} />
                    <Picker.Item label={this.state.FavouriteTeam3} value={this.state.FavouriteTeam3} />
                    <Picker.Item label={this.state.FavouriteTeam4} value={this.state.FavouriteTeam4} />
                </Picker>

                <TouchableOpacity style={styles.loginBtn} onPress={this.SubmitLoginBtn}>
                    <Text style={styles.loginText}>
                        <Text style={{ marginLeft: 235 }}>register</Text>
                    </Text>
                </TouchableOpacity>

                {this.state.isDone ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 0 }} />
                    : console.log("done")}

                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, }}>
                    <Text style={{
                        color: "gray",
                        marginLeft: 35,
                        fontSize: 16,
                    }}
                    >
                        By Signing up, i agree with <TouchableOpacity onPress={() => {
                            Linking.openURL('https://fly-foot.com/en/about/TC');
                        }}><Text style={{ marginTop: 40 }}>FFT Terms.</Text></TouchableOpacity>

                    </Text>
                    <TouchableOpacity >
                        <Text style={{ marginLeft: 5, textDecorationLine: 'underline', color: "gray" }}>
                            FFT Terms.
          </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, }}>
                    <Text
                        style={{
                            color: "gray",
                            marginLeft: 35,
                            fontSize: 16,
                        }}
                    >
                        Already have an account?
        </Text>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{ marginLeft: 4, color: '#374BBE' }}> Login here </Text></TouchableOpacity>
                </View>
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
        marginTop: 10,
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
