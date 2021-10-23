import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { translate } from "helpers/utils";
import R from "res/R";

const Traveller = ({ index, traveller, screen, action }) => {
    return (
        <View>
            <Text style={styles.title}>
                {translate('traveller') + " " + (index + 1)}
            </Text>
            <View style={styles.container}>
                <Text style={styles.name} >
                    {traveller.FirstName ? traveller.FirstName + " " + traveller.LastName : ''}
                </Text>
                <TouchableOpacity onPress={() => action(traveller)}>
                    <Text style={styles.text}>
                        {screen == "passport" ?
                            (traveller.PassportReference == null ? translate("addFile") : translate("replacePassport"))
                            : (traveller.IsMainContact ? "" :( traveller.Invited ? translate("resendInvitation") : translate("inviteToApp")))}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        color: "gray",
        fontSize: 15,
        marginTop: 20,
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    name: {
        color: R.colors.blue,
        fontWeight: "bold",
        fontSize: 18
    },
    text :{
        textTransform: 'uppercase',
        textDecorationLine:'underline'
    }
})

export default Traveller;