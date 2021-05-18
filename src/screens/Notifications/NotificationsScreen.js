import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    ActivityIndicator,
    TouchableOpacity,
    FlatList,
    DeviceEventEmitter
} from "react-native";
import { getWithToken, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export default class NotificationsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notifications: props?.route?.params?.notifications,
            isLoading: true,
            isLoadingMore: false
        };
    }
    pageEmit;

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.props.navigation.setOptions({
            headerStyle: {
                backgroundColor: R.colors.blue,
            },
        })
        // add listner notification.
        this.pageEmit = DeviceEventEmitter.addListener('notifications', this.onReceive);
    }

    componentWillUnmount() {
        this.pageEmit && this.pageEmit.remove();
    }

    onReceive = (notifications, newNotification) => {
        var notifications = this.state.notifications;
        notifications.Items.Unshift(newNotification);
        this.setState(notifications);
    }

    loadMore = () => {
        if (!this.state.isLoadingMore) {
            this.setState({ isLoadingMore: true }, () => {
                var pageNumber = this.state.notifications.PageNumber + 1;
                var pageSize = this.state.notifications.PageSize;
                const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}`;
                getWithToken(servicesUrl.GetNotificationList + params).then((response) => {
                    var notifications = this.state.notifications;
                    var joined;
                    if (notifications && notifications.Items) {
                        joined = [...notifications.Items];
                    }
                    notifications = response;
                    joined = joined.concat(response.Items);
                    notifications.Items = joined;

                    this.setState({ notifications, isLoading: false, isLoadingMore: false });
                });
            });
        }
    }

    openNotification = (item) => {
        this.props.navigation.navigate('notificationsDetails', { notification: item });
    }

    keyExtractor = (item) => { return 'notification-' + item.idNotification }

    renderItem = ({ item }) => {
        var date = moment(item.SentOn).format("DD/MM/YYYY hh:mm a");
        if (moment(item.SentOn).isSame(new Date(), "day"))
            date = moment(item.SentOn).format("hh:mm a");

        return <TouchableOpacity style={styles.notification} onPress={() => { this.openNotification(item) }}>
            <Image source={item.ReadOn == null ? R.images.notificationUnread : R.images.notification} style={styles.icon} />
            <View style={R.styles.flexColumn}>
                <View style={styles.details}>
                    <Text style={{ fontWeight: 'bold' }}>
                        {item.Subject}
                    </Text>
                    <Text>{date}</Text>
                </View>
                <Text numberOfLines={1} ellipsizeMode='tail' style={styles.body}>
                    {item.Body}
                </Text>
            </View>
        </TouchableOpacity>
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.notifications != undefined && !this.state.notifications.IsLastPage ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMore}
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
            <FlatList
                data={this.state.notifications?.Items}
                renderItem={this.renderItem}
                keyExtractor={this.keyExtractor}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0.1}
                //ListFooterComponent={this.renderFooter}
            />
        )
    };
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    notification: {
        flex: 1,
        flexDirection: 'row',
        height: 60,
        marginTop: 5,
        borderBottomWidth: 0.5,
        marginStart: 15,
        marginEnd: 15
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 5
    },
    details: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
    },
    body: {
        marginStart: 5,
        color: 'grey',
        width: '80%'
    }
})
