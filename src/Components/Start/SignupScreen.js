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
import R from 'res/R';
import { API_URL, API_TOKEN } from "@env";
import * as Facebook from 'expo-facebook';
import PasswordInputText from 'react-native-hide-show-password-input';
import { Ionicons } from '@expo/vector-icons';
import { get, post } from "../../helpers/services.js";
import { CheckBox } from 'react-native-elements';

const sourceFile = require('../../helpers/services.js');

export default class SignUpScreen extends React.Component {
    constructor(navigation) {
        super(navigation);
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
        FavouriteTeam5: "",
        FavouriteTeam6: "",
        FavouriteTeam7: "",
        FavouriteTeam8: "",
        isDone: false,
        checked: false
    };

    componentDidMount() {
        try {
            this.GetAllTeams();
        } catch { }
    }

    GetAllTeams = () => {
        const _this = this;
        get(`/mobile/team/all`)
            .then(response => {
                this.setState({ FavouriteTeam1: response[0].TeamName });
                this.setState({ FavouriteTeam2: response[1].TeamName });
                this.setState({ FavouriteTeam3: response[2].TeamName });
                this.setState({ FavouriteTeam4: response[3].TeamName });
                this.setState({ FavouriteTeam5: response[4].TeamName });
                this.setState({ FavouriteTeam6: response[5].TeamName });
                this.setState({ FavouriteTeam7: response[6].TeamName });
                this.setState({ FavouriteTeam8: response[7].TeamName });
            });
    }

    SubmitRegisterBtn = (event) => {
        const _this = this;
        const data = {
            Name: this.state.Name,
            SurName: this.state.SurName,
            Email: this.state.Email,
            Password: this.state.Password,
            ConfirmPassword: this.state.ConfirmPassword,
            FavouriteTeam: this.state.FavouriteTeam1,
        };
        console.log(this.state.FavouriteTeam1)
        if (this.state.Name === "" || this.state.SurName === "" || this.state.Email === "" || this.state.Password === "" || this.state.ConfirmPassword === "") {
            ToastAndroid.showWithGravity(
                'please fill out mendatory fields !',
                ToastAndroid.LONG,
                ToastAndroid.CENTER
            );
        }
        else {
            if (this.state.Password !== this.state.ConfirmPassword) {
                ToastAndroid.showWithGravity(
                    `password don't match, please try again later !`,
                    ToastAndroid.LONG,
                    ToastAndroid.CENTER
                );
            }
            else {
                post(`/mobile/profile/Create`, data)
                    .then(response => {
                        console.log("hello its my response", response)
                        if (response.ErrorId) {
                            ToastAndroid.showWithGravity(
                                'Something went wrong, please try again later !',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );
                            window.location.reload();
                        }
                        else {
                            let token_id = response.Token;
                            this.setState({ Token: token_id });
                            console.log(token_id)

                            this.setState({ isDone: true });
                            AsyncStorage.setItem("token", this.state.Token);
                            ToastAndroid.showWithGravity(
                                'you have successfully registered !',
                                ToastAndroid.LONG,
                                ToastAndroid.CENTER
                            );
                            this.props.navigation.navigate('book a trip');
                        }
                    })
            }
        }
    }

    SubmitRegisterBtn = this.SubmitRegisterBtn.bind(this);

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
                            source={R.images.flyfoot}
                            style={{ marginLeft: -30, width: 60, height: 60 }}
                        />
                        <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 25, fontWeight: "bold" }}>
                            FLY-FOOT
                </Text>
                    </View>
                    <TouchableOpacity onPress={this.FBLogin.bind(this)} style={{ marginRight: 35, marginLeft: 35 }}>
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
                        autoCapitalize="none"
                        keyboardType="email-address"
                    />
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <PasswordInputText
                            style={{ width: '38%', marginLeft: 30 }}
                            onChangeText={(Password) => this.setState({ Password })}
                            placeholder="Hann"
                            required
                            value={this.state.Password}
                            secureTextEntry={true}
                        />
                        <PasswordInputText
                            style={{ width: '38%', marginLeft: 30 }}
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
                        <Picker.Item label={this.state.FavouriteTeam5} value={this.state.FavouriteTeam5} />
                        <Picker.Item label={this.state.FavouriteTeam6} value={this.state.FavouriteTeam6} />
                        <Picker.Item label={this.state.FavouriteTeam7} value={this.state.FavouriteTeam7} />
                        <Picker.Item label={this.state.FavouriteTeam8} value={this.state.FavouriteTeam8} />
                    </Picker>
                    <TouchableOpacity style={styles.loginBtn} onPress={this.SubmitRegisterBtn}>
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
                        : null}
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                        <CheckBox
                            title='By Signing up, i agree with'
                            checked={this.state.checked}
                            onPress={() => this.setState({
                                checked: !this.state.checked
                            })}
                        />
                        <Text style={{
                            color: "gray",
                            marginLeft: 35,
                            fontSize: 16,
                        }}>

                        </Text>
                        <TouchableOpacity onPress={() => { Linking.openURL('https://fly-foot.com/en/about/TC'); }}>
                            <Text style={{ fontSize: 12, marginTop: 19, marginLeft: -40, textDecorationLine: 'underline', }}>FFT Terms.</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
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
        backgroundColor: "white",
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
