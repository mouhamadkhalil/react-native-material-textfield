import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    Modal
} from "react-native";
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
            hotelImages: [],
            showPictures: false
        };
    }

    componentDidMount = () => {
        var hotelImages = getHotelImages(this.props.hotel?.Images);
        this.setState({ hotelImages });
    }

    render() {
        return (
            <>
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

                {/* hotel */}
                <View style={{ padding: 25, borderBottomWidth: 2, borderColor: "#eee" }}>
                    <Text style={{ fontSize: 12, color: "gray", fontWeight: "bold", marginBottom: 15, textTransform: 'uppercase' }}>
                        {translate('hotel')}
                    </Text>
                    <Text style={{ fontSize: 17.5, color: R.colors.blue, fontWeight: "bold", maxWidth: 200 }}>
                        {this.state.hotel?.HotelName}
                    </Text>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <RatingStars rating={parseInt(this.state.hotel?.Rating)} />
                    </View>
                    <View style={[R.styles.flexRow, { marginTop: 30 }]}>
                        <Image source={R.images.bedGrey} />
                        <Text style={{ color: "gray", fontSize: 16, marginStart: 10 }}>
                            {this.state.hotel?.HotelRoomType + " x " + this.state.hotel?.NumberOfRooms}
                        </Text>
                    </View>

                    {/* hotel images */}
                    <TouchableOpacity style={{ marginTop: 20 }} onPress={() => this.setState({ showPictures: true })}>
                        <View>
                            <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon key='eye' name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                            </View>
                            <Image source={{ uri: this.state.hotel?.Image }} style={{ width: "100%", height: 250 }} />
                        </View>
                    </TouchableOpacity>
                </View>
                <Modal visible={this.state.showPictures} transparent={true}
                    onRequestClose={() => this.setState({ showPictures: false })}>
                    <ImageViewer imageUrls={this.state.hotelImages} />
                </Modal>
            </>
        );
    }
}

const styles = StyleSheet.create({

});