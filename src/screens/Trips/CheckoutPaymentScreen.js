import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, Modal } from "react-native";
import { CheckBox } from 'react-native-elements';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { translate } from "helpers/utils";
import R from "res/R";
import CardTextFieldScreen from "components/Common/CardTextFieldScreen";

export default class CheckoutPaymentScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: props?.route?.params?.bundle,
            payment: 100,
            showPayment: false
        };
    }

    componentDidMount = () => {
        this.setState({ isLoading: false });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    proceed = () => {
        this.setState({ showPayment: true })
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('checkout')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                {/* payment details */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('paymentAmount')}
                </Text>
                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15, marginTop: 30 }}>
                                <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                                    <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                                        {translate('fullPayment')}
                                    </Text>
                                    <CheckBox
                                        title={this.state.bundle.FinalPrice + "$"}
                                        checked={this.state.payment == 100}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        textStyle={{ color: this.state.payment == 100 ? R.colors.blue : 'black' }}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        onPress={() => this.setState({ payment: 100 })} />
                                </View>
                                <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                                    <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                                        {translate('pay50%')}
                                    </Text>
                                    <CheckBox
                                        title={(this.state.bundle.FinalPrice / 2) + "$"}
                                        checked={this.state.payment == 50}
                                        containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                                        checkedColor={R.colors.blue}
                                        textStyle={{ color: this.state.payment == 50 ? R.colors.blue : 'black' }}
                                        checkedIcon='dot-circle-o'
                                        uncheckedIcon='circle-o'
                                        onPress={() => this.setState({ payment: 50 })} />
                                </View>
                                <View style={{ backgroundColor: 'white', marginTop: 3, padding: 20 }}>
                                    <Text style={{ color: 'grey', textTransform: 'uppercase', fontSize: 16 }}>
                                        {translate('promoCode')}
                                    </Text>

                                </View>
                                {/* buttons */}
                                <View style={{ height: 60, flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                    <TouchableHighlight style={R.styles.blackButton}
                                        onPress={this.goBack}>
                                        <Text style={{ fontWeight: "bold", color: "#fff", textTransform: 'uppercase' }}>
                                            {translate('back')}
                                        </Text>
                                    </TouchableHighlight>
                                    <TouchableHighlight style={R.styles.greenButton}
                                        onPress={this.proceed}>
                                        <Text style={{ fontWeight: "bold", textTransform: 'uppercase' }}>
                                            {translate('proceed')}
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </>
                    }
                    <Modal visible={this.state.showPayment} transparent={true}
                        onRequestClose={() => this.setState({ showPayment: false })}>
                        <CardTextFieldScreen></CardTextFieldScreen>
                    </Modal>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#eeeeee",
    }
});
