import React from "react";
import {
    View,
    ActivityIndicator,
    FlatList
} from "react-native";
import HotelItem from "components/CustomizeTrip/HotelItem";
import Rooms from "components/CustomizeTrip/Rooms";

export class Hotels extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isSelected: this.props.bundle.SelectedHotel.HotelId == this.props.item.HotelId,
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

    init = () => {
        if (this.state.isSelected)
            this.getCancelPolicy();
    }

    browseHotels = () => {
        try {
            if (!this.state.isBrowsing) {
                this.setState({ isBrowsing: true }, function () {
                    var bundle = this.state.bundle;
                    post(servicesUrl.searchHotel, bundle)
                        .then((response) => {
                            this.setState({ bundle: response, hotelList: response.HotelList.Items, isBrowsing: false, isCustomized: false })
                        });
                })
            }
        } catch { }
    }

    loadMoreHotels = () => {
        try {
            if (!this.state.isLoadingMore) {
                var bundle = this.state.bundle;
                var params = `?pageNumber=${bundle.HotelList.PageNumber + 1}&pageSize=${bundle.HotelList.PageSize}&getCancellationPolicy=false`;
                this.setState({ isLoadingMore: true });
                post(servicesUrl.getPagedHotels + params, bundle)
                    .then((response) => {
                        var joined = this.state.hotelList.concat(response.Items);
                        bundle.HotelList.PageNumber = response.PageNumber;
                        bundle.HotelList.PageCount = response.PageCount;
                        this.setState({ bundle: bundle, hotelList: joined, isLoadingMore: false })
                    });
            }
        } catch { }
    }

    keyExtractor = ({ item }) => { return 'hotel-' + item.HotelId }

    renderHotels = ({ item }) => {
        return <HotelItem item={item} isSelected={false} />
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.bundle?.HotelList != undefined && this.state.bundle?.HotelList.IsLastPage ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMoreHotels}
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
                                bundle={this.props.bundle} browseHotels={this.props.browseHotels} setShowFilter={this.props.setShowFilter} />
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
                        <Rooms index={0} roomInfoList={null} isCustomized={this.props.isCustomized[0]} setIsCustomized={this.props.setIsCustomized}
                            bundle={this.props.bundle} browseHotels={this.props.browseHotels} setShowFilter={this.props.setShowFilter} />

                        {this.props.isCustomized[0] ?
                            <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black', opacity: 0.5, zIndex: 2 }} >
                                {this.state.isBrowsing ?
                                    <ActivityIndicator size='large' color={R.colors.lightGreen} />
                                    : null}
                            </View>
                            : null}
                        <FlatList
                            data={this.props.hotelList.Items}
                            renderItem={this.renderHotels}
                            keyExtractor={this.keyExtractor}
                            ListFooterComponent={this.renderFooter}
                        />
                    </View>
                }

            </View>
        )
    }
}