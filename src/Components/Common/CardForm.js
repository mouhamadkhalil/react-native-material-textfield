import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CardButton from "./CardButton";

export default class CardForm extends PureComponent {
  state = {
    loading: false,
    token: null
  }

  handleCardDetails = async () => {
    try {
      this.setState({ loading: true });
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
      this.setState({ loading: false, token });
    } catch (error) { this.setState({ loading: false }); }
  }

  makePayment = async() => {
    const params = {
      type: 'card',
      amount: this.state.bundle.PaymentAmount,
      currency: 'USD',
    };
    
    const source = await stripe.createSourceWithParamsAsync(params);
  }

  render() {
    return (
      <View style={styles.container}>
        <CardButton
          text="Card Details"
          loading={this.state.loading}
          onPress={this.handleCardDetails}
        />
        <View style={styles.token}>
          {token &&
            <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 5 }}>
              <Text style={styles.tokenLabel}>Token: {this.state.token?.tokenId}</Text>
              <CardButton
                text="Make Payment"
                //onPress={this.handlePayment}
              />
            </View>
          }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tokenLabel: {
    textAlign: 'center',
    color: '#111',
    marginBottom: 5,
    padding: 5
  }
});