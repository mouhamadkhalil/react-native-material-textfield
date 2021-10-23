import React from "react";
import { StyleSheet, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { translate } from "helpers/utils";
import R from "res/R";

export default class ManageTripScreen extends React.Component {

    Back = () => {
        this.props.navigation.navigate('Menu');
    }

    Payment = () => {
        this.props.navigation.navigate('completePayment');
    };

    UploadPassport = () => {
        this.props.navigation.navigate('uploadPassport');
    };

    Changes = () => {
        this.props.navigation.navigate('tripChanges');
    };

    Invite = () => {
        this.props.navigation.navigate('inviteToJoin');
    };

    render() {

        return (
            <ScrollView style={styles.container}>
                <ScrollView style={{ padding: 30 }}>

                    <Text style={styles.sectionTitle}>{translate('general')}</Text>

                    <TouchableOpacity onPress={this.Payment} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>{translate('completePayment')}</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.UploadPassport} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>{translate('uploadPassport')}</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>

                    <Text style={styles.sectionTitle}>{translate('edit')}</Text>

                    <TouchableOpacity onPress={this.Changes} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>{translate('changesCancellations')}</Text>
                        <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.Invite} style={styles.sectionLink}>
                        <Text style={styles.sectionLinkTitle}>{translate('inviteTravellers')}</Text>
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
        borderBottomColor: "#fff",
        textTransform: "uppercase"
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
        resizeMode: 'contain'
    }
});
