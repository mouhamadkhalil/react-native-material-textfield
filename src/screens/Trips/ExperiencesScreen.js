import React from "react";
import { StyleSheet, Text, ScrollView, View, TouchableHighlight, ActivityIndicator, Modal, FlatList } from "react-native";
import ImageViewer from 'react-native-image-zoom-viewer';
import { post, servicesUrl } from "helpers/services.js";
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import { translate } from "helpers/utils";
import moment from 'moment';
import R from "res/R";
import Experience from "components/Experiences/Experience";

export default class ExperiencesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bundle: props?.route?.params?.bundle,
            extraServices: props?.route?.params?.extraServices,
            isLoading: true,
            showPictures: false
        };
    }

    componentDidMount() {
        try {
            this.getExtraServices();
        } catch { }
    }

    getExtraServices = () => {
        var bodyRequest = {
            StartDate: moment(this.state.bundle.StartDate).format('YYYY-MM-DD'),
            EndDate: moment(this.state.bundle.EndDate).format('YYYY-MM-DD'),
            idCity: this.state.bundle.idCity,
            idMatch: this.state.bundle.idDefaultMatch,
            idMatchBundle: this.state.bundle.idMatchBundle
        }
        post(servicesUrl.getExtraServices, bodyRequest)
            .then((response) => {
                this.setState({ extraServices: response, isLoading: false })
            });
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        this.props.navigation.navigate('summary', { bundle: this.state.bundle });
    };

    renderItem = ({ item }) => {
        return <Experience item={item} />
    }

    keyExtractor = (item, index) => 'exp-'+index;

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('experiences')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                {/* experiences details */}
                <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                    {translate('addYourExperience')}
                </Text>
                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            <View style={{ marginStart: 15, marginEnd: 15 }}>
                                {/* render experiences */}
                                <FlatList
                                    data={this.state.extraServices}
                                    renderItem={this.renderItem}
                                    keyExtractor={this.keyExtractor}
                                />
                            </View>
                            {/* buttons */}
                            <View style={{ marginStart: 15, marginEnd: 15, alignSelf: 'center', flexDirection: "row", marginTop: 30, marginBottom: 30 }}>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: 'black', alignItems: "center", justifyContent: "center" }}
                                    onPress={this.goBack}>
                                    <Text style={{ fontWeight: "bold", color: "#fff", textTransform: 'uppercase' }}>
                                        {translate('back')}
                                    </Text>
                                </TouchableHighlight>
                                <TouchableHighlight style={{ width: "50%", height: 60, backgroundColor: R.colors.lightGreen, alignItems: "center", justifyContent: "center" }}
                                    onPress={this.continue}>
                                    <Text style={{ fontWeight: "bold", textTransform: 'uppercase' }}>
                                        {translate('continue')}
                                    </Text>
                                </TouchableHighlight>
                            </View>
                        </>
                    }
                </View>
                <Modal visible={this.state.showPictures} transparent={true}
                    onRequestClose={() => this.setState({ showPictures: false })}>
                    <ImageViewer imageUrls={this.state.hotel?.Images} />
                </Modal>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: R.colors.lightGrey,
    },
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    perksRow: { flexDirection: "row", justifyContent: "space-between" },
    perkImage: { width: 42, height: 44, resizeMode: 'contain' },
    perk: { width: "50%", alignItems: "center", height: 100 },
    perkLabel: { fontSize: 13, marginTop: 15 }
});
