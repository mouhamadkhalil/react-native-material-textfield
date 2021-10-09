import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Modal,
  TouchableOpacity,
  Text
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Traveller from 'components/ManageTrip/Traveller';
import { pickImageAsync, takePictureAsync, pickDocumentAsync } from 'helpers/mediaUtils';
import * as services from "services/manageTrip.js";
import { translate } from "helpers/utils";
import R from "res/R";

export default class UploadPassportScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      requestCode: '',
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
    var upComingInvoices = JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
    var requestCode = '';
    var contacts = [];
    if (upComingInvoices != null) {
      requestCode = upComingInvoices[0].RequestCode;
      contacts = upComingInvoices[0]?.OfferContacts;
    }
    this.setState({ contacts, requestCode, isLoading: false });
  }

  pickDocument = async (index) => {
    try {
      let uri = '';
      switch (index) {
        case 0:
          uri = await takePictureAsync();
          break;
        case 1:
          uri = await pickImageAsync();
          break;
        case 2:
          uri = await pickDocumentAsync();
          break;
      }
      if (uri != '')
        this.uploadPassport(uri);
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  addFile = async (traveller) => {
    this.setState({ idContact: traveller.idContact, showModal: true });
  }

  uploadPassport = async (uri) => {
    try {
      let response = await services.uploadDocument(this.state.requestCode, this.state.idContact, uri);
      console.log(response);
      global.toast.show(translate('msgPassportUploaded'), { type: "success" });
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  keyExtractor = (item, index) => {
    return "traveller-" + index;
  }

  renderTravellers = ({ item, index }) => {
    return (
      <Traveller index={index} traveller={item} screen="passport" action={this.addFile} />
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
                  <TouchableOpacity style={[R.styles.blueButton, styles.button]} onPress={() => this.pickDocument(0)}>
                    <Text style={styles.textButton}>
                      {translate('takePicture')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[R.styles.blueButton, styles.button]} onPress={() => this.pickDocument(1)}>
                    <Text style={styles.textButton}>
                      {translate('uploadImage')}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[R.styles.blueButton, styles.button]} onPress={() => this.pickDocument(2)}>
                    <Text style={styles.textButton}>
                      {translate('uploadDocument')}
                    </Text>
                  </TouchableOpacity>
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
  button: {
    marginTop: 10,
    width: 200,
    height: 60
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
  }
});
