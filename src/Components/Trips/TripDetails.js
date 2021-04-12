import React from "react";
import { StyleSheet, Text, Image, View, TouchableOpacity, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import ImageViewer from 'react-native-image-zoom-viewer';
import RatingStars from "components/Common/RatingStars";
import { getHotelImages } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import moment from 'moment';
import R from "res/R";

export class TripDetails extends React.PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            details: props.details,
            game: props.game,
            hotel: props.hotel,
            matchBundleHotels: props.matchBundleHotels,
            hotelImages: [],
            showPictures: false
        };
    }

    componentDidMount = () => {
        var matchBundleHotels = [...this.props.matchBundleHotels];
        var hotelImages = [];

        if (this.props.hotel) {
            matchBundleHotels.push({ "SelectedHotel": this.props.hotel });
        }

        hotelImages = getHotelImages(matchBundleHotels[0]?.SelectedHotel?.Images);
        this.setState({ matchBundleHotels, hotelImages });
    }

    openImages = (images) => {
        var hotelImages = getHotelImages(images);
        this.setState({ hotelImages, showPictures: true })
    }

    render() {
        return (
            <View style={{ backgroundColor: 'white' }}>
                {/* trip dates */}
                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                        {translate('tripDates')}
                    </Text>
                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                        {moment(this.state.details?.StartDate).format('DD.MM.YY')} - {moment(this.state.details?.EndDate).format('DD.MM.YY')}
                    </Text>
                </View>

                {/* fans */}
                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                        {translate('fans')}
                    </Text>
                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold" }}>
                        {this.state.details?.NumberOfTravelers}
                    </Text>
                </View>

                {this.state.matchBundleHotels.map((bundleHotel) => {
                    var hotel = bundleHotel.SelectedHotel;
                    return(
                    /* hotel */ 
                    <View key={"hotel-"+hotel.HotelId} style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                        <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                            {translate('hotel')} {bundleHotel?.City ?  " in " + bundleHotel?.City : null}
                        </Text>
                        <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold", maxWidth: 200 }}>
                            {hotel?.HotelName} 
                        </Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <RatingStars rating={parseInt(hotel?.Rating)} />
                        </View>
                        <View style={[R.styles.flexRow, { marginTop: 30 }]}>
                            <Image source={R.images.bedGrey} />
                            <Text style={{ color: "gray", fontSize: 16, marginStart: 10 }}>
                                {hotel?.SelectedCategory?.RoomType[0]?.TypeName + " x " + hotel?.SelectedCategory?.RoomType[0]?.NumRooms}
                            </Text>
                        </View>

                        {/* hotel images */}
                        <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.openImages(hotel?.Images)}>
                            <View>
                                <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon key='eye' name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                                </View>
                                <Image source={{ uri: hotel?.Image }} style={{ width: "100%", height: 250 }} />
                            </View>
                        </TouchableOpacity>
                    </View>
                )})}
                <Modal visible={this.state.showPictures} transparent={true}
                    onRequestClose={() => this.setState({ showPictures: false })}>
                    <ImageViewer imageUrls={this.state.hotelImages} />
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});