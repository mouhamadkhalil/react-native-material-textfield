import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity
} from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import R from "res/R";
import { translate } from "../../helpers/utils";

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
                        <Text style={{ marginTop: 20, marginStart: 80 }}>{translate('messenger')}</Text>
                        <Image source={R.images.messenger} style={{ width: 40, height: 40, marginStart: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginStart: 80 }}>{translate('whatsapp')}</Text>
                        <Image source={R.images.whatsapp} style={{ width: 40, height: 40, marginStart: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginStart: 80 }}>{translate('feedback')}</Text>
                        <Image source={R.images.feedback} style={{ width: 40, height: 40, marginStart: 30, marginTop: -20 }} />
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
                    <Image source={R.images.chat} style={{ width: '100%', height: '100%'}} />
                </TouchableOpacity>
                <View >
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title={translate('chatWithUs')}
                        titleStyle={{textTransform:'uppercase'}}
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        alignSelf:'flex-end',
        width: 100,
        height: 100,
        bottom: 30
    },
});
