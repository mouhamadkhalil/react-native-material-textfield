import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Tooltip } from 'react-native-elements';
import RatingStars from "components/Trips/RatingStars";
import { post, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export class HotelItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: false,
            isGettingPolicy: false,
            rating: parseInt(this.props.item.Rating),
            policy: this.props.item.SelectedPolicy
        }
    }

    componentDidMount() {
        try {
            this.init();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bundle != this.props.bundle) {
            this.init();
        }
    }

    init = () => {
        var isSelected = this.props.bundle.SelectedHotel.HotelId == this.props.item.HotelId;
        this.setState({ isSelected });
        if (isSelected)
            this.getCancelPolicy();
    }

    getCancelPolicy = () => {
        try {
            if (this.props.item.HasPolicy)
                return;
            else {
                this.setState({ isGettingPolicy: true }, function () {
                    var bundle = this.props.bundle;
                    var item = this.props.item;
                    var cancelPolicyRequest = {
                        bundleCode: bundle.BundleCode,
                        cancelPolicyID: "-1",
                        checkIn: moment(bundle.StartDate).format('YYYY-MM-DD'),
                        checkout: moment(bundle.EndDate).format('YYYY-MM-DD'),
                        flagAvail: false,
                        hotel: item,
                        hotelId: item.HotelId,
                        hotelSource: item.HotelSource,
                        hotelUniqueKey: bundle.uniqueKey,
                        // question
                        idMatchBundle: bundle.MatchBundleDetail[0].idMatchBundle,
                        internalCode: null,
                        roomInfo: bundle.RoomInfoList
                    }
                    post(servicesUrl.viewCancelPolicy, cancelPolicyRequest)
                        .then((response) => {
                            item.Policies = response;
                            this.setPolicy(item);
                            bundle.SelectedHotel = item;
                            this.setState({ isGettingPolicy: false })
                        });
                });
            }
        } catch { }
    }

    setPolicy = (hotel) => {
        try {
            hotel.SelectedPolicy = null;
            if (hotel.HotelSource == "R" && hotel.Policies && hotel.Policies.Policy) {
                hotel.SelectedPolicy = hotel.Policies.Policy[0];
                hotel.HasPolicy = true;
                return;
            }

            const categ = hotel.SelectedCategory.Code;
            const bfType = hotel.SelectedCategory.BFType;
            hotel.HasPolicy = true;
            if (hotel && hotel.Policies && hotel.Policies.Policy) {
                let list = hotel.Policies.Policy.find(a => a.RoomCatgCode && a.RoomCatgCode.Text == categ && a.RoomCatgCode.BFType == bfType);
                if (list) {
                    hotel.SelectedPolicy = list;
                    return;
                }
                list = hotel.Policies.Policy.find(a => a.RoomCatgCode && a.RoomCatgCode.Text == categ && a.RoomCatgCode.BFType == null);
                if (list) {
                    hotel.SelectedPolicy = list;
                    return;
                }

                list = hotel.Policies.Policy.find(a => a.RoomCatgCode == null || a.RoomCatgCode.Text == null);
                if (list) {
                    hotel.SelectedPolicy = list;
                    return;
                }
            }
            hotel.SelectedPolicy = {
                Refundable: false,
                ExCancelDays: 9999999
            };
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    render() {
        var item = this.props.item;
        return (
            <View style={[R.styles.flexColumn, { backgroundColor: this.state.isSelected ? R.colors.blue : 'white', height: 200, marginTop: 10 }]} >
                <View style={R.styles.flexRow}>
                    {/* images */}
                    <View style={{ width: '30%', height: '100%' }}>
                        <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.props.openPictures(item.Images)}>
                            <View>
                                <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                    <Icon name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                                </View>
                                <Image source={{ uri: item.Image }} style={{ width: "100%", height: '100%' }} />
                            </View>
                        </TouchableOpacity>
                    </View>

                    {/* details */}
                    <View style={{ width: '70%', flex: 1, flexDirection: 'column', padding: 10 }}>
                        {/* hotel name */}
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: this.state.isSelected ? 'white' : 'black' }}>
                            {item.HotelName}
                        </Text>

                        {/* rating + cost */}
                        <View style={{flex:1,flexDirection:'row', justifyContent:'space-between'}}>
                            <View style={R.styles.flexRow}>
                            <RatingStars rating={this.state.rating} tag={item.HotelId} />
                            </View>
                            <Text style={{ fontWeight: 'bold', color: this.state.isSelected ? R.colors.lightGreen : 'black' }}>
                                + {item.SelectedCategory.ExtraCostPerFan} $
                        </Text>
                        </View>

                        {/* category */}
                        {item.SelectedCategory?.Name ? (
                            <View style={R.styles.flexRow}>
                                <Image source={this.state.isSelected ? R.images.bedWhite : R.images.bedGrey} style={{ width: 25 }} />
                                <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '80%', color: this.state.isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                    {item.SelectedCategory.Name}
                                </Text>
                            </View>
                        ) : null}

                        {/* breakfast */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Image source={this.state.isSelected ? R.images.coffeeCupWhite : R.images.coffeeCupGrey} style={{ width: 25 }} />
                            <Text style={{ color: this.state.isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                {item.SelectedCategory.NoBreakFast ? translate('noBreakfast') : translate('includeBreakfast')}
                            </Text>
                        </View>

                        {/* policy */}
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            {this.state.isGettingPolicy ? (<ActivityIndicator size='small' color='white' />) : null}
                            {item.HasPolicy ?
                                <>
                                    {item.SelectedPolicy.Refundable ?
                                        (<>
                                            <Image source={this.state.isSelected ? R.images.refundWhite : R.images.refundGrey} style={{ width: 25 }} />
                                            <Text style={{ color: this.state.isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10, paddingTop:5 }}>
                                                {translate('refundable')}
                                            </Text>
                                            <Tooltip popover={<Text>{item.SelectedPolicy.RefundableText}</Text>} withOverlay={false} width={350} backgroundColor='white'>
                                                <Image source={this.state.isSelected ? R.images.infoWhite : R.images.infoGrey} style={{ width: 20, marginStart:5, marginTop:5 }} />
                                            </Tooltip>
                                        </>
                                        )
                                        :
                                        (
                                            <>
                                                <Image source={this.state.isSelected ? R.images.norefundWhite : R.images.norefundGrey} style={{ width: 25 }} />
                                                <Text style={{ color: this.state.isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                                    {translate('nonRefundable')}
                                                </Text>
                                            </>
                                        )
                                    }
                                </>
                                : null}
                        </View>
                    </View>
                </View>

                {/* selection */}
                <View style={{ borderTopWidth: 0.2 }}>
                    <CheckBox title={translate('selectHotel')}
                        checked={this.state.isSelected}
                        containerStyle={{ backgroundColor: this.state.isSelected ? R.colors.blue : 'white', borderWidth: 0 }}
                        checkedColor='white'
                        textStyle={{ color: this.state.isSelected ? 'white' : 'black', textTransform: 'uppercase' }}
                        center
                        checkedIcon='dot-circle-o'
                        uncheckedIcon='circle-o'
                        onPress={() => this.props.selectHotel(this.props.item)} />
                </View >
            </View >
        );
    }
}

const styles = StyleSheet.create({

});