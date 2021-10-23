import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
import Traveller from 'components/ManageTrip/Traveller';
import * as services from "services/manageTrip.js";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class InviteToJoinScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      contact: {
        ContactName: '',
        Email: '',
        Phone: ''
      },
      idContact: 0,
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
    var upComingInvoices = await services.getItem('upComingInvoices');
    var contacts = [];
    if (upComingInvoices != null) {
      contacts = upComingInvoices[0]?.OfferContacts;
    }
    this.setState({ contacts, isLoading: false });
  }

  inviteTraveller = (traveller) => {
    var contactName = traveller.FirstName + " " + traveller.LastName;
    var phone = traveller.Phone != null ? traveller.PhonePrefix + traveller.Phone : '';
    var email = traveller.Email != null ? traveller.Email : '';
    var contact = {
      ContactName: contactName,
      Email: email,
      Phone: phone
    }
    this.setState({ contact, idContact: traveller.idContact, showModal: true });
  }

  sendInvitation = async () => {
    try {
      var contact = this.state.contact;
      if (contact.Email != '' || contact.Phone != '') {
        var response = await services.inviteToApp(contact);
        if (response) {
          var contacts = [...this.state.contacts];
          var traveller = contacts.find(i => i.idContact == this.state.idContact);
          if(traveller.Email == null)
            traveller.Email = this.state.contact.Email;
          if(traveller.Phone == null)
            traveller.Phone = this.state.contact.Phone;
          traveller.Invited = true;
          this.setState({ contacts, showModal: false });
          global.toast.show(translate('msgInvitationSent') + contact.ContactName, { type: "success" })
        }
      }
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
                  <Text style={styles.modalText}>
                    {translate("inviteUserToJoin").replace("{0}", this.state.contact.ContactName)}
                  </Text>
                  <TextInput placeholder={translate("email")} style={styles.input}
                    value={this.state.contact.Email}
                    onChangeText={(text) => {
                      var contact = this.state.contact;
                      contact.Email = text;
                      this.setState({ contact })
                    }} />
                  <TextInput placeholder={translate("phone")} style={styles.input}
                    value={this.state.contact.Phone}
                    onChangeText={(text) => {
                      var contact = this.state.contact;
                      contact.Phone = text;
                      this.setState({ contact })
                    }} />
                  <View style={{ height: 60, flexDirection: "row", marginTop: 20 }}>
                    <TouchableOpacity style={R.styles.blackButton} onPress={() => this.setState({ showModal: false })}>
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
    marginBottom: 30,
    marginTop: 10,
    width: '80%'
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
    height: '40%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    color: R.colors.blue,
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20
  }
});
