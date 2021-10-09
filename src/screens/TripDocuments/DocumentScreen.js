import React from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Modal
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import PDFReader from 'rn-pdf-reader-js'
import ModalHeader from "components/Common/ModalHeader";
import DocumentItem from "components/TripDocuments/DocumentItem";
import { getWithToken, servicesUrl } from "helpers/services.js";
import R from "res/R";

export default class DocumentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      token: "",
      uri: '',
      isLoading: true,
      showPDF: false,
    };

    this.callback = downloadProgress => {
      const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
      let percent = Number(progress).toFixed(2) * 100;
      this.setState({
        downloadProgress: percent,
      });
    };

  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    var upComingInvoices = await this.getData();
    if (upComingInvoices && upComingInvoices.length > 0)
      getWithToken(servicesUrl.getToken).then((response) => {
        this.setState({ documents: upComingInvoices[0].Documents, token: response.Value, isLoading: false });
      })
    else
      this.setState({ isLoading: false });
  }

  // get the data from the async storage
  getData = async () => {
    return JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
  }

  openPDF = (uri) => {
    this.setState({ uri, showPDF: true });
  }

  closePDF = () => {
    this.setState({ showPDF: false });
  }

  keyExtractor = (item, index) => {
    return "download-" + item.idDocument;
  }

  renderItem = ({ item }) => {
    return <DocumentItem item={item} token={this.state.token} openPDF={this.openPDF} />
  }

  render() {
    return (
      <View style={styles.container}>
        {/* documents */}
        {this.state.isLoading ? <ActivityIndicator size="large" color="blue" />
          :
          <FlatList
            data={this.state.documents}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        }

        {/* pdf viewer modal */}
        <Modal visible={this.state.showPDF} transparent={true}
          onRequestClose={() => this.closePDF()}>
          <View style={styles.modalView}>
            <View style={R.styles.flexColumn}>
              {/* logo + close */}
              <ModalHeader close={() => this.closePDF()} />
            </View>
            <View style={{ width: '100%', height: '90%', backgroundColor: '#fff' }}>
              <PDFReader source={{ uri: this.state.uri, }} />
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  modalView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
  },
});
