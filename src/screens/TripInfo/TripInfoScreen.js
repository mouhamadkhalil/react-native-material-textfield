import React from "react";
import {
  StyleSheet,
  Text,
  ActivityIndicator,
  View,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import * as services from "services/tripInfo";
import { translate } from "helpers/utils";
import R from "res/R";

export default class TripInfoScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundColorTravel: "#48D52C",
      travel: [],
      perks: [],
      reservations: [],
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
    var upComingInvoices = await services.getItem('upComingInvoices');
    if (upComingInvoices != null)
      upComingInvoices = upComingInvoices[0];
    const [travel, perks, reservations] = await services.getTripInfoData();
    this.setState({ upComingInvoices: upComingInvoices, travel, perks, reservations, isLoading: false });
  }

  navigateTo = (type, index = null) => {
    var screen = '';
    var data = {};
    var bundle = this.state.upComingInvoices;
    switch (type) {
      case 1: // flight
        screen = "myFlight";
        //flightSession
        data = { 'data': [bundle.SelectedFlight, bundle.OfferContacts] }
        break;
      case 3: // hotel
        screen = "myHotel";
        data = { 'data': bundle.MatchBundleHotels[index] }
        break;
      case 4: // game
        screen = "myGame";
        data = { 'data': bundle.MatchBundleDetail[index] }
        break;
      case 5: // perk
      case 6: // reservation
        screen = "myPerk";
        break;
    }
    if (type != 2)
      this.props.navigation.navigate(screen, data);
  }

  keyExtractorTravel = (item, index) => {
    return 'travel-' + index;
  }
  keyExtractorPerks = (item, index) => {
    return 'perk-' + index;
  }
  keyExtractorReservations = (item, index) => {
    return 'reservation-' + index;
  }


  // Render All travels 
  renderTravel = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {translate('travel')}
        </Text>
        <View style={{ flex: 1, flexDirection: "row", width: "100%" }} >
          <View style={{ backgroundColor: "#48D52C", width: 4, height: '100%' }} />
          <FlatList
            data={this.state.travel}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractorTravel}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      </View>
    )
  }


  //   Render All perks 
  renderPerks = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {translate('perks')}
        </Text>
        <View style={{ flex: 1, flexDirection: "row", width: "100%" }} >
          <View style={{ backgroundColor: "#031892", width: 4, height: '100%' }} />
          <FlatList
            data={this.state.perks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractorPerks}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      </View>
    )
  }

  //  Render All Reservations
  renderReservations = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.sectionTitle}>
          {translate('reservations')}
        </Text>
        <View style={{ flex: 1, flexDirection: "row", width: "100%" }} >
          <View style={{ backgroundColor: "#DA353D", width: 4, height: '100%' }} />
          <FlatList
            data={this.state.reservations}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractorReservations}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      </View>
    )
  }

  // render item
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={{ width: "100%", backgroundColor: "white", flex: 1, flexDirection: "row", justifyContent: "space-between" }} onPress={() => { this.navigateTo(item.type, item.index) }}>
        <View style={styles.item}>
          <Image style={{ height: '100%', width: 40, margin: 10, resizeMode: "contain" }} source={item.image} />
          <View  >
            <Text style={{ color: R.colors.blue, fontWeight: "bold", textTransform: 'uppercase' }}>
              {item.title}
            </Text>
            <Text style={{ color: "gray" }}>
              {item.details}
            </Text>
          </View>
        </View>
        {item.type != 2 ?
          <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
          :
          null
        }
      </TouchableOpacity>
    )
  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.state.isLoading ?
          <ActivityIndicator color="blue" size='large' />
          :
          <ScrollView>
            {this.state.travel.length > 0 ? this.renderTravel() : null}
            {this.state.perks.length > 0 ? this.renderPerks() : null}
            {this.state.reservations.length > 0 ? this.renderReservations() : null}
          </ScrollView>
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: "#eee",
  },

  sectionTitle: {
    paddingBottom: 10,
    paddingTop: 15,
    textTransform: "uppercase",
    color: R.colors.lightBlue,
    fontWeight: "bold",
    fontSize: 15,
    marginStart: 18
  },

  item: {
    flex: 1,
    width: "100%",
    flexDirection: 'row',
    backgroundColor: "white",
    height: 60,
    justifyContent: "flex-start",
    alignItems: 'center'
  },

  sectionLinkImage: {
    width: 15,
    height: 15,
    marginHorizontal: 10,
    marginVertical: 20,
    resizeMode: 'contain'
  }
});