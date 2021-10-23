import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ScrollView,
    FlatList,
    Image,
    SafeAreaView,
    Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { translate } from "helpers/utils";
import R from "res/R";

export default class Map extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
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

    }

    render() {
        return (
            <>
                <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
                <View style={[styles.division]}>
                    <Text style={styles.title}>
                        {translate('contact')}
                    </Text>
                    <View style={styles.contactInfo}>
                        <Image style={styles.img} source={R.images.location_sm} />
                        <Text style={styles.info}>
                            Carrer de la Duquessa d’Orleans, 56, 08034 Barcelona
                        </Text>
                    </View>
                    <View style={styles.contactInfo}>
                        <Text>M</Text>
                        <Text style={styles.info}>+34 932 05 09 61</Text>
                    </View>
                    <View style={styles.contactInfo}>
                    <Text>B</Text>
                        <Text style={styles.info}>info@hotelmirabella.com</Text>
                    </View>
                </View>
            </>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: "#eee",
    },
    map: {
        width: Dimensions.get('window').width,
        height:240,
    },
    division: {
        backgroundColor: '#fff',
    },
    title: {
        color: R.colors.blue,
        textTransform: 'uppercase',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 18
    },
    contactInfo: {
        flexDirection: 'row',
        padding: 15
    },
    info: {
        paddingStart: 10,
        paddingEnd: 10,
    },
});