import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import {RoomItem} from "components/CustomizeTrip/RoomItem";
import { translate } from "helpers/utils.js";
import R from "res/R";

export class Rooms extends React.PureComponent {
    // index, roomInfoList , isCustomized, setIsCustomized, bundle, browseHotels, showFilter

    constructor(props) {
        super(props);
        this.state = {
            roomsHeight: 200,
        }
    }

    incrementRoom = () => {
        var bundle = this.props.bundle;
        if (bundle.NumberOfTravelers > bundle.NumberOfRooms) {
            var fanNumbers = bundle.NumberOfTravelers;
            var roomNumbers = bundle.NumberOfRooms + 1;
            var roomsHeight = 200 + (roomNumbers * 100);
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            var restRoomNumber = roomNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var fanRoom = Math.ceil(restFanNumbers / restRoomNumber);
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                switch (fanRoom) {
                    case 2:
                        item.AdultNum.RoomType = 'Double';
                        item.AdultNum.Text = '2';
                        break
                    case 3:
                        item.AdultNum.RoomType = 'Triple';
                        item.AdultNum.Text = '3';
                        break
                }
                restFanNumbers -= fanRoom;
                restRoomNumber--;
                roomInfoList.push(item)
            }
            bundle.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.props.setIsCustomized(true);
            this.setState({ roomsHeight });
        }
    };

    decrementRoom = () => {
        var bundle = this.state.bundle;
        if (Math.ceil(bundle.NumberOfTravelers / 3) < bundle.NumberOfRooms) {
            var fanNumbers = bundle.NumberOfTravelers;
            var roomNumbers = bundle.NumberOfRooms - 1;
            var roomsHeight = this.state.roomsHeight > 200 ? this.state.roomsHeight - (100) : 200;
            var roomInfoList = [];
            var restFanNumbers = fanNumbers;
            var restRoomNumber = roomNumbers;
            for (let i = 0; i < roomNumbers; i++) {
                var fanRoom = Math.ceil(restFanNumbers / restRoomNumber);
                var item = {
                    AdultNum:
                    {
                        Count: 1,
                        RQBedChild: false,
                        RoomType: 'Single',
                        Text: '1'
                    },
                    ChildAges: { ChildAge: [null, null] }
                }
                switch (fanRoom) {
                    case 2:
                        item.AdultNum.RoomType = 'Double';
                        item.AdultNum.Text = '2';
                        break
                    case 3:
                        item.AdultNum.RoomType = 'Triple';
                        item.AdultNum.Text = '3';
                        break
                }
                restFanNumbers -= fanRoom;
                restRoomNumber--;
                roomInfoList.push(item)
            }
            bundle.NumberOfRooms = roomNumbers;
            bundle.RoomInfoList = roomInfoList;
            this.props.setIsCustomized(true);
            this.setState({ roomsHeight });
        }
    };

    renderItem = ({ item, index }) => {
        return <RoomItem item={item} index={index} />
    }

    render() {
        return (
            <>
                {/* rooms */}
                <View key={"rooms-" + this.props.index} style={{ backgroundColor: 'white', marginTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "white", height: 'auto', marginTop: 5, padding: 20 }}>
                        <View style={{ height: 80 }}>
                            <Text style={{ color: R.colors.grey, fontWeight: "bold", textTransform: 'uppercase' }}>
                                {translate('rooms')}
                            </Text>

                            {/* increment/decrement */}
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <TouchableOpacity style={{ width: 25 }} onPress={this.decrementRoom}>
                                    <Icon name='remove-circle-outline' style={styles.textStyle} />
                                </TouchableOpacity>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10 }}>
                                    {this.props.bundle?.NumberOfRooms}
                                </Text>
                                <TouchableOpacity style={{ width: 25 }} onPress={this.incrementRoom}>
                                    <Icon name='add-circle-outline' style={styles.textStyle} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* rooms details */}
                        <View style={{ width: '100%' }}>
                            <FlatList
                                data={this.props.bundle?.RoomInfoList ? this.props.bundle?.RoomInfoList : this.props.roomInfoList}
                                extraData={this.props}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => 'room-' + index}
                                listKey={(item, index) => 'room-list-' + index}
                            />
                        </View>
                    </View>

                    {/* browse */}
                    {this.props.isCustomized ?
                        <View style={{ width: '60%', marginTop: 40, padding: 20 }}>
                            <TouchableOpacity style={{ backgroundColor: R.colors.lightGreen, height: 60, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.props.browseHotels}>
                                <Text style={{ fontSize: 20, textTransform: 'uppercase' }}>
                                    {translate('browse')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        : null}

                    {/* filter */}
                    {this.props.setShowFilter == null ? <></> :
                        <TouchableOpacity style={{ marginTop: 10, height: 60, backgroundColor: '#ccc' }} onPress={() => this.props.setShowFilter(true)}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 16, color: '#222', textTransform: 'uppercase' }}>
                                    {translate('filter')}
                                </Text>
                                <Icon name='chevron-down-outline' style={{ fontSize: 16, color: '#222', marginStart: 5 }} />
                            </View>
                        </TouchableOpacity>
                    }
                </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    textStyle: {
        color: R.colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
