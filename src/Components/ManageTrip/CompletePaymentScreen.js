import React from "react";
import {
  StyleSheet,
  Text,
  ScrollView,
  ActivityIndicator,
  View,
  TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PaymentsStripe as Stripe } from 'expo-payments-stripe';
import { post, servicesUrl } from "helpers/services";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class CompletePaymentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upComingInvoices: [],
      payment: 100,
      token: null,
      isLoading: true,
      isLoadingPayment: false,
      isSuccess: false
    };
  }

  componentDidMount() {
    try {
      this.init();
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  init = async () => {
    await Stripe.setOptionsAsync({
      androidPayMode: 'test',
      publishableKey: 'pk_test_51ITH7lBjTdcHLCeR9AODAVHFSqXspLKffxcjCofsANht6u83zETdAwsYZpWckf2yFolDqy3GyCg343R2MUmednGn00knzo3UIk',
    });

    //get the data from the async storage
    var upComingInvoices = JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
    this.setState({ upComingInvoices, isLoading: false });
  }

  handleCardDetails = () => {
    try {
      if (!this.state.isLoadingPayment) {
        this.setState({ isLoadingPayment: true }, async () => {
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
          let token = await Stripe.paymentRequestWithCardFormAsync(cardOptions);
          let response = await this.makePayment();
          console.log('payment: ', response)
          this.setState({ token, isLoadingPayment: false, isSuccess: true });
        })
      }
    } catch (error) { this.setState({ isLoading: false }); }
  }

  makePayment = async () => {
    return await post(servicesUrl.intent, this.state.upComingInvoices[0])
      .then((response) => {
        return response;
      })
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={{ margin: 30 }} >
          <Text style={{ color: "red", fontSize: 16, }}>
            OUTSTANDING PAYMENT
          </Text>
          {this.state.isLoading ?
            <ActivityIndicator color={R.colors.blue} />
            :
            <>
              <Text style={{ color: R.colors.blue, fontSize: 25, marginTop: 10 }}>
                $ {this.state.upComingInvoices[0]?.PendingPayment}
              </Text>

              <Text style={{ marginTop: 20, fontSize: 18 }}>
                Once you have completed this payment you will gain full access to
                the app, and your travel documents.
              </Text>
              {!this.state.isSuccess ?
                <TouchableOpacity style={styles.blueButton} onPress={this.handleCardDetails}>
                  {this.state.isLoadingPayment ?
                    <ActivityIndicator color='white' />
                    :
                    <Text style={{ fontWeight: "bold", textTransform: 'uppercase', color: 'white' }}>
                      {translate('proceed')}
                    </Text>
                  }
                </TouchableOpacity>
                :
                <View style={styles.complete} >
                  <Text style={{ color: 'white', textTransform: 'uppercase' }}>
                    {translate('complete')}
                  </Text>
                </View>
              }
            </>
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  blueButton: {
    height: 60,
    backgroundColor: R.colors.blue,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  },
  complete: {
    height: 60,
    backgroundColor: R.colors.lightGreen,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
