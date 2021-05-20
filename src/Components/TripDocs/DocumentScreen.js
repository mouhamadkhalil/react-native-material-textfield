import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Ionicons';
import { getWithToken, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class DocumentScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      documents: [],
      token: "",
      isLoading: true,
    };
  }

  componentDidMount() {
    this.init();
  }

  init = async () => {
    var upComingInvoices = await this.getData();
    if (upComingInvoices && upComingInvoices.length > 0)
      getWithToken(servicesUrl.GetToken).then((response) => {
        this.setState({ documents: upComingInvoices[0].Documents, token: response.Value, isLoading: false });
      })
    else
      this.setState({ isLoading: false });
  }

  // get the data from the async storage
  getData = async () => {
    return JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
  }

  download = (idDocument) => {
    /*let fileURL = "https://beta.fly-foot.com/api/mobile/download/" + idDocument + "?session=" + this.state.token;
    RNFetchBlob.config({
      fileCache: true,
      addAndroidDownloads: {
        notification: true,
        title: 'Great ! Download Success ! ',
        // File description (not notification description)
        description: 'A travel document file.',
        // Make the file scannable  by media scanner
        mediaScannable: true,
      }
    })
      .fetch('GET', fileURL)
      .then((resp) => {
        // ...
      })
      .catch((err) => {
        // ...
      })*/
  }

  keyExtractor = (item, index) => {
    return "download-" + item.idDocument;
  }

  renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <View style={{ backgroundColor: "#48D52C", width: 7, height:'100%' }} />
        <Image style={{ height: '100%', width: 30, resizeMode:"contain" }} source={R.images.airplane} />
        <View >
          <Text style={{ color: "blue", fontWeight: "bold" }}>
            FLIGHT
          </Text>
          <Text style={{ color: "gray", }}>
            Reference no:JZ9213
          </Text>
        </View>
        <TouchableOpacity onPress={() => { this.download(item.idDocument) }}>
          <Icon name='arrow-down-circle' style={styles.icon} />
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 30
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: "white",
    justifyContent: 'space-between',
    height: 60,
    marginBottom: 10,
    alignItems:'center'
  },
  icon: {
    fontSize: 40,
    color: R.colors.lightGreen,
    margin:10
  },
});
