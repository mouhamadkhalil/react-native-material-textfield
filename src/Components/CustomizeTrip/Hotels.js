import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    FlatList
} from "react-native";
import { HotelItem } from "components/CustomizeTrip/HotelItem";
import { Rooms } from "components/CustomizeTrip/Rooms";
import { post, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import R from "res/R";

export class Hotels extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            bundle: {},
            hotelList: {},
            isBrowsing: false,
            isLoadingMore: false
        }
    }

    componentDidMount() {
        try {
            this.init();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    init = () => {
        var bundle = { ...this.props.bundle };
        this.setState({ bundle })
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.bundle != this.props.bundle) {
            this.init();
        }
    }

    browseHotels = () => {
        try {
            if (!this.state.isBrowsing) {
                this.setState({ isBrowsing: true }, function () {
                    var bundle = this.props.bundle;
                    post(servicesUrl.searchHotel, bundle)
                        .then((response) => {
                            this.setState({ bundle: response, hotelList: response.HotelList.Items, isBrowsing: false })
                            this.props.setIsCustomized(false);
                        });
                })
            }
        } catch { }
    }

    loadMoreHotels = () => {
        try {
            if (!this.state.isLoadingMore) {
                var bundle = this.props.bundle;
                var params = `?pageNumber=${bundle.HotelList.PageNumber + 1}&pageSize=${bundle.HotelList.PageSize}&getCancellationPolicy=false`;
                this.setState({ isLoadingMore: true }, () => {
                    post(servicesUrl.getPagedHotels + params, bundle)
                        .then((response) => {
                            var joined = [...bundle.HotelList.Items.concat(response.Items)];
                            bundle.HotelList.PageNumber = response.PageNumber;
                            bundle.HotelList.PageCount = response.PageCount;
                            bundle.HotelList.Items = joined;
                            this.setState({ bundle: { ...bundle }, isLoadingMore: false })
                        });
                });
            }
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    keyExtractor = (item) => { return 'hotel-' + item.HotelId }

    renderHotels = ({ item }) => {
        return <HotelItem item={item} bundle={this.props.bundle} openPictures={this.props.openPictures} selectHotel={this.props.selectHotel} />
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.props.bundle?.HotelList != undefined && this.props.bundle?.HotelList.IsLastPage ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.init}
                        style={[R.styles.loadMoreButton, { marginTop: 10 }]}>
                        {this.state.isLoadingMore ?
                            <ActivityIndicator color="white" />
                            :
                            <Text style={R.styles.loadMoreText} >
                                {translate('loadMore')}
                            </Text>
                        }
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    render() {
        var bundleHotels = null;
        if (this.props.bundle?.MatchBundleHotels && this.props.bundle?.MatchBundleHotels?.length > 0) {
            var bundleHotels = [...this.props.bundle.MatchBundleHotels];
            bundleHotels.map((bundleHotel) => {
                var hotelList = [...bundleHotel.LocalHotels];
                if (bundleHotel.HotelList != null)
                    bundleHotel.HotelList.Items.map((hotel) => {
                        hotelList.push({ ...hotel })
                    })
                bundleHotel.HotelList = hotelList;
            })
        }
        return (
            <View style={{ marginTop: 20 }}>
                {bundleHotels != null ?
                    /* 2 hotels */
                    bundleHotels.map((bundleHotel, index) => {
                        return (<View key={"bundle-hotel-" + index} style={{ flex: 1, flexDirection: 'column', marginTop: 50 }}>
                            <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                                {translate('hotel')}{bundleHotel.City ? " in " + bundleHotel?.City : null}
                            </Text>
                            <Rooms index={index} roomInfoList={bundleHotel.RoomInfoList} isCustomized={this.props.isCustomized} setIsCustomized={this.props.setIsCustomized}
                                bundle={this.props.bundle} browseHotels={this.props.browseHotels} setShowFilter={null} />
                            <FlatList
                                data={bundleHotel.hotelList}
                                renderItem={this.renderHotels}
                                keyExtractor={this.keyExtractor}
                                ListFooterComponent={this.renderFooter}
                            />
                        </View>)
                    })
                    :
                    <View style={{ flex: 1, flexDirection: 'column', marginTop: 50 }}>
                        <Text style={{ color: R.colors.grey, fontWeight: "bold", fontSize: 20 }}>
                            {translate('hotel')}
                        </Text>
                        <Rooms index={0} roomInfoList={null} isCustomized={this.props.isCustomized} setIsCustomized={this.props.setIsCustomized}
                            bundle={this.props.bundle} browseHotels={this.props.browseHotels} setShowFilter={this.props.setShowFilter} />

                        <View>
                            {this.props.isCustomized ?
                                <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black', opacity: 0.5, zIndex: 2 }} >
                                    {this.state.isBrowsing ?
                                        <ActivityIndicator size='large' color={R.colors.lightGreen} />
                                        : null}
                                </View>
                                : null}
                            <FlatList
                                data={this.state.bundle?.HotelList?.Items}
                                extraData={this.state.bundle}
                                renderItem={this.renderHotels}
                                keyExtractor={this.keyExtractor}
                                ListFooterComponent={this.renderFooter}
                            />
                        </View>
                    </View>
                }

            </View>
        )
    }
}