import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    ActivityIndicator,
} from "react-native";
import moment from 'moment';
import R from "res/R";


export default class NotificationsDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notification: props?.route?.params?.notification,
            isLoading: true
        };
    }

    componentDidMount() {
        this.init();
    }

    init = () => {
        this.props.navigation.setOptions({
            headerStyle: {
                backgroundColor: R.colors.blue,
            },
        })
        var notification = this.state.notification;
        if (notification)
            notification.ReadOn = new Date().toDateString();
        this.setState({ notification, isLoading: false })
    }

    render() {
        var notification = this.state.notification;
        var date = moment(notification.SentOn).format("DD/MM/YYYY hh:mm a");
        if (moment(notification.SentOn).isSame(new Date(), "day"))
            date = moment(notification.SentOn).format("hh:mm a");
        return (
            this.state.isLoading ? <ActivityIndicator color="blue" /> :
                <View style={styles.notification}>
                    <Text style={{ alignSelf: 'center' }}>
                        {date}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={R.images.notification} style={styles.icon} />
                        <View style={styles.details}>
                            <Text style={styles.subject}>
                                {notification.Subject}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <Text style={styles.body}>
                            {notification.Body}
                        </Text>
                    </View>
                </View>
        )
    };
}

const styles = StyleSheet.create({
    notification: {
        flex: 1,
        flexDirection: 'column',
        margin: 15,
    },
    icon: {
        width: 50,
        height: 50,
        resizeMode: 'contain',
        margin: 5
    },
    details: {
        justifyContent: 'center',
        padding: 5,
    },
    subject: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    bodyContainer: {
        backgroundColor: 'white',
        borderRadius: 20
    },
    body: {
        fontSize: 16,
        padding: 15,
        color: 'grey',
    }
})
