import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    TouchableOpacity
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import R from "res/R";

export default class chat extends React.Component {

    state = {
        showAlert: false,
    };

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

    renderCustomAlertView = () => {
        return (
            <>
                <View style={{ height: 200, width: 200 }}>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginStart: 80 }}>Messanger</Text>
                        <Image source={R.images.messenger} style={{ width: 40, height: 40, marginStart: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginStart: 80 }}>Whatsapp</Text>
                        <Image source={R.images.whatsapp} style={{ width: 40, height: 40, marginStart: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Feedback</Text>
                        <Image source={R.images.feedback} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                </View>

            </>
        );
    };

    render() {
        const { showAlert } = this.state;
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={() => this.showAlert()}>
                    <Image source={R.images.chat} style={{ width: 100, height: 100, marginLeft: 380 }} />
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "red" }}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="CHAT WITH US ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}
                    />
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        right: 0,
        bottom: 30
    },
});
