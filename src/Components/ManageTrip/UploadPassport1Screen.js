import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class UploadPassport1Screen extends React.Component {

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

  AddFile = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "gray", fontSize: 13, marginTop: 20, }}>
          TRAVELLER 1
          </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
          {this.state.isLoading ?
            <ActivityIndicator color={R.colors.blue} />
            :
            <Text style={{ color: "blue", fontWeight: "bold", fontSize: 16 }}>
              {this.state.upComingInvoices[0]?.OfferContacts[0]?.FirstName + " " + this.state.upComingInvoices[0]?.OfferContacts[1]?.LastName}
            </Text>
          }
          <TouchableOpacity onPress={() => this.AddFile()}>
            <Text style={{ fontSize: 13,  }}>
              ADD FILE
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={{ color: "gray", fontSize: 13,  marginTop: 30 }}>
          TRAVELLER 2
          </Text>
          
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' ,  marginTop: 20,}}>
          {this.state.isLoading ?
            <ActivityIndicator color={R.colors.blue} />
            :
            <Text style={{ color: "blue", fontWeight: "bold", fontSize: 16 }}>
              {this.state.upComingInvoices[0]?.OfferContacts[1]?.FirstName + " " + this.state.upComingInvoices[0]?.OfferContacts[1]?.LastName}
            </Text>
          }
          <TouchableOpacity onPress={this.AddFile}>
            <Text style={{ fontSize: 13, }}>
              ADD FILE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin:30

  },
});
