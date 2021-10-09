import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Traveller from 'components/ManageTrip/Traveller';
import * as services from "services/manageTrip.js";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class InviteToJoinScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contact = {
        ContactName: '',
        Email: '',
        Phone: ''
      },
      showModal: false,
      isLoading: true
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
    var contacts = [];
    if (upComingInvoices != null) {
      contacts = upComingInvoices[0]?.OfferContacts;
    }
    this.setState({ contacts, isLoading: false });
  }

  inviteTraveller = (traveller) => {
    var contactName = traveller.FirstName + " " + traveller.LastName;
    var contact = {
      ContactName: contactName,
      Email: '',
      Phone: ''
    }
    this.setState({ contact, showModal: true });
  }

  sendInvitation = () => {
    try {
      var contact = this.state.contact;
      var response = services.inviteToApp(contact);
      global.toast.show(translate('msgInvitationSent') + contact.ContactName, { type: "danger" })
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  keyExtractor = (item, index) => {
    return "traveller-" + index;
  }

  renderTravellers = ({ item, index }) => {
    return (
      <Traveller index={index} traveller={item} screen="invite" action={this.inviteTraveller} />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.isLoading ?
          <ActivityIndicator color={R.colors.blue} size="large" />
          :
          <>
            <FlatList
              data={this.state.contacts}
              renderItem={this.renderTravellers}
              keyExtractor={this.keyExtractor}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.showModal}
              onRequestClose={() => { this.setState({ showModal: false }) }}>
              <View style={styles.modalView}>
                <View style={styles.modalContainer}>
                  <View style={{ margin: 10 }} >
                    <Text>
                      {translate("reason")}
                    </Text>
                    <TextInput placeholder={translate("email")} style={styles.input}
                      value={this.state.contact.email}
                      onChangeText={(text) => {
                        var contact = this.state.contact;
                        contact.email = text;
                        this.setState({ contact })
                      }} />
                    <TextInput placeholder={translate("phone")} style={styles.input}
                      value={this.state.contact.phone}
                      onChangeText={(text) => {
                        var contact = this.state.contact;
                        contact.phone = text;
                        this.setState({ contact })
                      }} />
                  </View>
                  <View style={{ height: 60, flexDirection: "row", marginTop: 50 }}>
                    <TouchableOpacity style={R.styles.blueButton} onPress={() => this.setState({ showModal: false })}>
                      <Text style={styles.textButton}>
                        {translate('cancel')}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={R.styles.blueButton} onPress={() => this.sendInvitation()}>
                      <Text style={styles.textButton}>
                        {translate('submit')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
          </>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 30
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
    marginBottom: 30
  },
  textButton: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    alignSelf: 'center',
    textTransform: "uppercase"
  },
  modalView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)'
  },
  modalContainer: {
    width: '85%',
    height: '50%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    color: R.colors.blue,
    fontSize: 20,
    textAlign: 'center',
  }
});
