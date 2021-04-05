import React from "react";
import { StyleSheet, Text, ScrollView, Image, View, TouchableHighlight, ActivityIndicator, Modal, FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import Experience from "components/Experiences/Experience";
import { formatDetails } from "helpers/tripHelper";
import { translate } from "helpers/utils";
import R from "res/R";

export default class ExperiencesScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            bundle: props?.route?.params?.bundle,
            extraServices: props?.route?.params?.extraServices,
            details: {},
            experience: null,
            isLoading: true,
            isShowMoreInfo: false,
            isShowDatePicker: false
        };
    }

    componentDidMount() {
        try {
            this.initBundle();
        } catch { }
    }

    initBundle = () => {
        var details = formatDetails(this.state.bundle);
        var extraServices = [...this.state.extraServices];
        extraServices.map(function (experience) {
            experience.Qty = details.NumberOfTravelers;
            experience.isAdded = false;
        })
        this.setState({ details, extraServices, isLoading: false });
    }

    showMoreInfo = (item) => {
        this.setState({ isShowMoreInfo: true, experience: item })
    }

    showDatePicker = (item) => {
        this.setState({ isShowDatePicker: true, experience: item })
    }

    goBack = () => {
        this.props.navigation.goBack();
    };

    continue = () => {
        this.props.navigation.navigate('summary', { bundle: this.state.bundle });
    };

    renderItem = ({ item }) => {
        return <Experience details={this.state.details} matchDate={this.state.bundle?.MatchBundleDetail[0]?.Game?.GameDate}
            item={item} showMoreInfo={this.showMoreInfo} 
        />
    }

    keyExtractor = (item, index) => 'exp-' + index;

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('experiences')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} bundle={{ ...this.state.bundle }} />

                <View>
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginStart: 15 }} />
                        :
                        <>
                            {/* experiences details */}
                            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 17, marginTop: 30, marginStart: 15, marginEnd: 15 }}>
                                {translate('addYourExperience')}
                            </Text>
                            <View style={{ marginStart: 15, marginEnd: 15 }}>
                                {/* render experiences */}
                                <FlatList
                                    data={this.state.extraServices}
                                    extraData={this.state}
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
                <Modal visible={this.state.isShowMoreInfo} transparent={true}
                    onRequestClose={() => this.setState({ isShowMoreInfo: false })}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '10%', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                            <View style={{ width: '80%', height: '100%', padding: 10 }}>
                                <Image source={R.images.flyfoot_grey}></Image>
                            </View>
                            <View style={{ width: '20%', height: '100%', backgroundColor: '#000', alignContent: 'center', justifyContent: 'center' }}>
                                <TouchableHighlight onPress={() => { this.setState({ isShowMoreInfo: false }); }}>
                                    <Icon name='close-outline' style={styles.close} />
                                </TouchableHighlight>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: '90%', backgroundColor: '#fff' }}>
                            <Text style={{ color: 'grey', textTransform: 'uppercase' }}>
                                {this.state.experience?.ServiceCategory}
                            </Text>
                            <Text style={{ color: R.colors.blue, fontSize: 18 }}>
                                {this.state.experience?.ServiceName}
                            </Text>
                            <Text style={{ color: 'grey' }}>
                                {this.state.experience?.Description}
                            </Text>
                        </View>
                    </View>
                </Modal>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isShowDatePicker}>
                    <View style={styles.modalView}>
                        
                    </View>
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
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    close: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
