import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, Modal } from "react-native";
import { CheckBox } from 'react-native-elements';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import CardButton from "components/Common/CardButton";
import { post, servicesUrl } from "helpers/services";
import { translate } from "helpers/utils";
import R from "res/R";

export default class CheckoutPaymentScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            bundle: props?.route?.params?.bundle,
            payment: 100,
            showPayment: false,
            token: null
        };
    }

    componentDidMount = () => {
        this.init()
    }

    init = async () => {
        await Stripe.setOptionsAsync({
            androidPayMode: 'test',
            publishableKey: 'pk_test_51ITH7lBjTdcHLCeR9AODAVHFSqXspLKffxcjCofsANht6u83zETdAwsYZpWckf2yFolDqy3GyCg343R2MUmednGn00knzo3UIk',
        });
        this.setState({ isLoading: false });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    proceed = () => {
        this.handleCardDetails();
    };

    handleCardDetails = async () => {
        try {
            this.setState({ isLoading: true });
            const cardOptions = {
                requiredBillingAddressFields: 'full',
                prefilledInformation: {
                    billingAddress: {
                        name: 'Test Name',
                        line1: 'Test Line 1',
                        line2: '4',
                        city: 'Test City',
                        state: 'Test State',
                        country: 'Test Country',
                        postalCode: '31217'
                    }
                }
            };
            // GETS YOUR TOKEN FROM STRIPE FOR PAYMENT PROCESS
            const token = await Stripe.paymentRequestWithCardFormAsync(cardOptions);
            this.setState({ isLoading: false, showPayment: true, token });
        } catch (error) { this.setState({ isLoading: false }); }
    }

    makePayment = () => {
        post(servicesUrl.intent, this.state.bundle)
            .then((response) => { console.log('payment: ', response) })
    }

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
                    {/*{this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                        :
        <>*/}
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
                    {/* </>
                    }*/}
                    <Modal visible={this.state.showPayment} transparent={true}
                        onRequestClose={() => this.setState({ showPayment: false })}>

                        <View style={styles.container}>
                            <CardButton
                                text="Card Details"
                                loading={this.state.loading}
                                onPress={this.handleCardDetails}
                            />
                            <View style={styles.token}>
                                {this.state.token &&
                                    <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
                                        <Text style={styles.tokenLabel}>Token: {this.state.token?.tokenId}</Text>
                                        <CardButton
                                            text="Make Payment"
                                            onPress={this.makePayment}
                                        />
                                    </View>
                                }
                            </View>
                        </View>
                    </Modal>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: "#eeeeee",
    },
    tokenLabel: {
        textAlign: 'center',
        color: '#111',
        marginBottom: 5,
        padding: 5
    }

});
