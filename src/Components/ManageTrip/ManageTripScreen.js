import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import R from "res/R";

export default class ManageTripScreen extends React.Component {

    Back = () => {
        this.props.navigation.navigate('Menu');
    }

    Payment = () => {
        this.props.navigation.navigate('completePayment');
    };

    UploadPassport = () => {
        this.props.navigation.navigate('uploadPassport1');
    };

    Changes = () => {
        this.props.navigation.navigate('Changes1');
    };

    Join = () => {
        this.props.navigation.navigate('InviteToJoin1');
    };

    render() {

        return (
            <ScrollView style={styles.container}>
                <ScrollView style={{ padding: 30 }}>

                    <Text style={styles.sectionTitle}>GENERAL</Text>

                    <TouchableOpacity onPress={this.Payment} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>Complete payment</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.UploadPassport} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>Upload passport</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>EDIT</Text>

                    <TouchableOpacity onPress={this.Changes} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>Changes and cancellations</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.Join} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>Travellers (invite to join)</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>

                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#F7F7F7"
    },
    backButton: {
        position: "absolute",
        start: 30
    },
    sectionTitle: {
        color: "#96A0DA",
        fontWeight: "bold",
        fontSize: 14,
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 25,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: "#fff"
    },
    sectionLink: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        borderBottomWidth: 2,
        borderBottomColor: "#fff"
    },
    sectionLinkTitle: {
        color: "#374BBF",
        fontWeight: "bold",
        fontSize: 18
    },
    sectionLinkImage: {
        width: 15,
        height: 15,
        marginStart: "auto",
        resizeMode:'contain'
    }
});
