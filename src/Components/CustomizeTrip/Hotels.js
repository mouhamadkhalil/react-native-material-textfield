import React from "react";
import {
    View,
    ActivityIndicator,
    FlatList
} from "react-native";
import HotelItem from "components/CustomizeTrip/HotelItem";

export class Hotels extends React.PureComponent {

    keyExtractor = ({ item }) => { return 'hotel-' + item.HotelId }

    renderHotels = ({ item }) => {
        return <HotelItem item={item} isSelected={false} />
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.bundle?.HotelList != undefined && (this.state.bundle?.HotelList.PageCount > this.state.bundle?.HotelList.PageNumber) ? (
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
                {this.props.isCustomized ?
                    <View style={{ width: '100%', height: '100%', position: 'absolute', backgroundColor: 'black', opacity: 0.5, zIndex: 2 }} >
                        {this.state.isBrowsing ?
                            <ActivityIndicator size='large' color={R.colors.lightGreen} />
                            : null}
                    </View>
                    : null}
                <FlatList
                    data={this.props.hotelList}
                    renderItem={this.renderHotels}
                    keyExtractor={this.keyExtractor}
                    ListFooterComponent={this.renderFooter}
                />
            </View>
        )
    }
}