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
import Flyfoot from "../../assets/images/flyfoot.png";
import { API_URL, API_TOKEN } from "@env";
import * as Facebook from 'expo-facebook';
import PasswordInputText from 'react-native-hide-show-password-input';
import { Ionicons } from '@expo/vector-icons';

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
                // "Content-Type": sourceFile.Content_Type,
                // "Accept": sourceFile.Accept,
                // "ff_version": sourceFile.ff_version,
                // "ff_language": sourceFile.ff_language,
                // "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
                "Content-Type": "application/json",
                "Accept": "application/json",
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

        if (this.state.Name === "" || this.state.SurName === "" || this.state.Email === "" || this.state.Password === "" || this.state.ConfirmPassword === "") {
            ToastAndroid.showWithGravity(
                'please fill out mendatory fields !',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }

        fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                // "Content-Type": sourceFile.Content_Type,
                // "Accept": sourceFile.Accept,
                // "ff_version": sourceFile.ff_version,
                // "ff_language": sourceFile.ff_language,
                // "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                if (response.ErrorId) {
                    ToastAndroid.showWithGravity(
                        'Something went wrong, please try again later !',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                    window.location.reload();
                } else {
                    if (this.state.Password !== this.state.ConfirmPassword) {
                        alert("password don't match ");
                        // window.location.reload();
                    }
                    else {
                        console.log("my test ", response);
                        let token_id = response.Token;
                        console.log("token is :", token_id);
                        this.setState({ Token: token_id });
                        this.setState({ isDone: true });
                        AsyncStorage.setItem("token", this.state.Token);
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
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center', }}>
                        <Image
                            source={Flyfoot}
                            style={{ marginLeft: -30, width: 60, height: 60 }}
                        />
                        <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 25, fontWeight: "bold" }}>
                            FLY-FOOT
                </Text>
                    </View>
                    <TouchableOpacity style={{ marginRight: 35, marginLeft: 35 }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, backgroundColor: '#37568F' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FAFDFD', height: 60, lineHeight: 60, paddingLeft: 20, textTransform: 'uppercase' }}>
                                signup  with  facebook
                                </Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Ionicons
                                    name='logo-facebook'
                                    size={20}
                                    color='white'
                                    style={{ marginRight: 20 }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                        <Text style={{ width: '38%', marginLeft: 35, color: "gray" }}>
                            Name
              </Text>
                        <Text style={{ marginLeft: 20, color: "gray" }}>
                            Surname
              </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TextInput
                            style={{ width: '38%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35 }}
                            onChangeText={(Name) => this.setState({ Name })}
                            placeholder="Hann"
                            required
                            value={this.state.Name}
                            type="text"
                        />
                        <TextInput
                            style={{ width: '38%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 20 }}
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
                        <Text style={{ width: '38%', marginLeft: 35, color: "gray" }}>
                            Password
              </Text>
                        <Text style={{ marginLeft: 20, color: "gray" }}>
                            Reapeat password
              </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <TextInput
                            style={{ width: '38%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 35 }}
                            onChangeText={(Password) => this.setState({ Password })}
                            placeholder="Hann"
                            required
                            value={this.state.Password}
                            secureTextEntry={true}
                        />
                        <TextInput
                            style={{ width: '38%', height: 40, borderColor: 'gray', borderBottomWidth: 1, marginLeft: 20 }}
                            onChangeText={(ConfirmPassword) => this.setState({ ConfirmPassword })}
                            placeholder="Hann"
                            required
                            value={this.state.ConfirmPassword}
                            secureTextEntry={true}
                        />
                    </View>

                    <Text style={{ paddingTop: 30, marginLeft: 35, width: 300, color: "gray" }}>
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
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text style={styles.loginText}>
                                register
                  </Text>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <Ionicons
                                    name='chevron-forward-outline'
                                    size={20}
                                    color='white'
                                    style={{ marginRight: 20 }}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    {this.state.isDone ? <ActivityIndicator size="small" color="blue" style={{ marginTop: 0 }} />
                        : console.log("done")}

                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, }}>
                        <Text style={{
                            color: "gray",
                            marginLeft: 35,
                            fontSize: 16,
                        }}>
                            By Signing up, i agree with
                        </Text>
                        <TouchableOpacity onPress={() => { Linking.openURL('https://fly-foot.com/en/about/TC'); }}>
                            <Text style={{ marginTop: 2, marginLeft: 2, textDecorationLine: 'underline', }}>FFT Terms.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, }}>
                        <Text
                            style={{
                                color: "gray",
                                marginLeft: 35,
                                fontSize: 16,
                            }}>
                            Already have an account?
                        </Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{ marginTop: 2, marginLeft: 2, color: '#374BBE' }}> Login here </Text>
                        </TouchableOpacity>
                    </View>
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
        width: "10%",
        height: 1,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'black'
    }
});
