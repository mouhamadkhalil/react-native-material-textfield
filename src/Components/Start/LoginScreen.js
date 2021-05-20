import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    ScrollView,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    ToastAndroid,
    KeyboardAvoidingView,
    Platform
} from "react-native";
import * as SecureStore from 'expo-secure-store';
import { CheckBox } from 'react-native-elements';
import AwesomeAlert from "react-native-awesome-alerts";
import * as Facebook from 'expo-facebook';
import PasswordInputText from 'react-native-hide-show-password-input';
import { Ionicons } from '@expo/vector-icons';
import { get, postLogin, servicesUrl } from "helpers/services.js";
import { getUserCredentials, setUserCredentials, translate } from "helpers/utils.js";
import { SignalrService } from 'helpers/Signalr/SignalRService';
import R from 'res/R';

export default class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state =
        {
            showAlert: false,
            username: "",
            password: "",
            Token: "",
            forgotPassword: "",
            remember: false,
            isLoading: true,
            isLogin: false
        };
        this.signalR;
    }

    componentDidMount = async () => {
        const [email, password] = await getUserCredentials();
        if (email !== '' && password !== '') {
            const data = {
                username: email,
                password: password,
            };
            this.login(data);
        }
        else {
            this.setState({ isLoading: false })
        }
    }

    login = (data) => {
        var _this = this;
        if (!this.state.isLogin) {
            this.setState({ isLogin: true }, () => {
                postLogin(servicesUrl.login, data)
                    .then(response => {
                        if (response.ErrorId) {
                            this.setState({ isLoading: false, isLogin: false });
                            global.toast.show(translate('msgIncorrectCredentials'), { type: "danger" })
                        } else {
                            this.setState({ isLoading: false, isLogin: false });
                            global['user'] = response;
                            SecureStore.setItemAsync('token', response.Token);
                            if (this.state.remember)
                                setUserCredentials(this.state.username, this.state.password);
                            // connect to the signal R service
                            _this.signalR = new SignalrService();
                            _this.signalR.UpdateSignalrUserInfo()
                                .then(_this.signalR.connect());
                            global['signalR'] = _this.signalR;
                            _this.props.navigation.navigate('book a trip');
                        }
                    });
            })
        }
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

    SubmitPassword = () => {
        this.setState({
            showAlert: false,
        });

        const _this = this;
        get(`/mobile/profile/forgetpassword?email=${this.state.forgotPassword}`)
            .then(response => {
                if (response.ErrorId) {
                    alert(response.Message);
                }
                else {
                    ToastAndroid.showWithGravity(
                        'Your password request has been sent',
                        ToastAndroid.LONG,
                        ToastAndroid.CENTER
                    );
                }
            });
    };


    loginClick = () => {
        if (this.state.username === "" || this.state.password === "") {
            global.toast.show(translate('msgEnterCredentials'), { type: "danger" })
        }
        else {
            const data = {
                username: this.state.username,
                password: this.state.password,
            };
            this.login(data);
        }
    };

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

    renderCustomAlertView = () => {
        return (
            <>
                <TextInput style={{ marginTop: 20, marginLeft: -60 }} placeholder="Enter your email address "
                    autoCapitalize="none" keyboardType="email-address" value={this.state.forgotPassword}
                    onChangeText={(forgotPassword) => this.setState({ forgotPassword })}
                />
                <View style={{ backgroundColor: "gray", width: 230, height: 1 }}></View>
            </>
        );
    };

    render() {
        const { showAlert } = this.state;
        return (
            this.state.isLoading ?
                <ActivityIndicator size='large' color={R.colors.green} marginTop={20} />
                :
                <ScrollView style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center', }}>
                            <Image
                                source={R.images.flyfoot_grey}
                                style={{ height: 60, resizeMode: 'contain' }}
                            />
                        </View>
                        <TouchableOpacity onPress={this.FBLogin.bind(this)} style={{ marginRight: 35, marginLeft: 35 }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, backgroundColor: '#37568F' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#FAFDFD', height: 60, lineHeight: 60, paddingLeft: 20, textTransform: 'uppercase' }}>
                                    login  with  facebook
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
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20, justifyContent: 'center' }}>
                            <View style={styles.lineStyle} />
                            <Text style={{ fontSize: 18, textTransform: 'uppercase', marginLeft: 15, marginRight: 15 }}>
                                login   with   email
                            </Text>
                            <View style={styles.lineStyle} />
                        </View>
                        <Text style={{ paddingTop: 30, marginLeft: 35 }}>
                            Email
                    </Text>
                        <TextInput
                            style={{ height: 40, borderColor: 'gray', borderBottomWidth: 2, marginLeft: 35, marginRight: 35 }}
                            onChangeText={(username) => this.setState({ username })}
                            placeholder="hannibal@gma"
                            required
                            value={this.state.email}
                            type="email"
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
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.showAlert();
                                }}>
                                <Text style={{ marginLeft: 35, color: "gray", fontSize: 16, textDecorationLine: "underline" }}>Forgot password?</Text>
                            </TouchableOpacity>

                            {/* remember me */}
                            <View style={{ marginLeft: 25, marginTop: 20 }}>
                                <CheckBox title='remember me' checked={this.state.remember} onPress={() => this.setState({ remember: !this.state.remember })} />
                            </View>

                        </View>
                        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
                        <TouchableOpacity style={styles.loginBtn} onPress={() => this.loginClick()}>
                            <Text style={styles.loginText}>
                                {translate('login')}
                            </Text>
                            {this.state.isLogin ?
                                <ActivityIndicator size='small' color='white' />
                                :
                                <Ionicons name='chevron-forward-outline' size={20} color='white' />
                            }
                        </TouchableOpacity>
                        </KeyboardAvoidingView>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 20 }}>
                            <Text
                                style={{
                                    color: "gray",
                                    marginLeft: 35,
                                    fontSize: 18,
                                }}
                            >
                                Don't have an account?
                        </Text>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Signup')}>
                                <Text style={{ marginLeft: 5, fontSize: 18, textDecorationLine: 'underline' }}>Sign up here </Text>
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
                            customView={this.renderCustomAlertView()}
                            showConfirmButton={true}
                            cancelText="CANCEL"
                            confirmText="SUBMIT"
                            confirmButtonColor="blue"
                            cancelButtonColor="black"
                            onCancelPressed={() => {
                                this.hideAlert();
                            }}
                            onConfirmPressed={() => {
                                this.SubmitPassword();
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
        backgroundColor: "white",
        marginTop: 0,
        marginBottom: 0,
    },
    loginBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: "#374BBE",
        height: 60,
        marginTop: 20,
        marginBottom: 10,
        marginLeft: 35,
        marginRight: 35,
        padding: 20,
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
        fontSize: 18,
        fontWeight: 'bold',
        color: "white",
        letterSpacing: 2,
        textTransform: 'uppercase'
    },
    lineStyle: {
        width: "13%",
        height: 1,
        marginTop: 12,
        borderWidth: 1,
        borderColor: 'black'
    }
});
