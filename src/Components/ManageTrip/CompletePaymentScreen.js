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
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class CompletePaymentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      upComingInvoices: [],
      isLoading: true,
    };
  }

  componentDidMount() {
    try {
      this.getData();
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  // get the data from the async storage
  getData = async () => {
    var upComingInvoices = JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
    this.setState({ upComingInvoices, isLoading: false });
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
            <Text style={{ color: R.colors.blue , fontSize: 25, marginTop: 10 }}>
              $ {this.state.upComingInvoices[0]?.PendingPayment}
            </Text>
          }
          <Text style={{ marginTop: 20, fontSize: 18 }}>
            Once you have completed this payment you will gain full access to
            the app, and your travel documents.
          </Text>
          <TouchableOpacity></TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
});
