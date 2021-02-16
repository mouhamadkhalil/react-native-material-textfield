import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import Accordion from 'react-native-collapsible/Accordion';
import { LinearGradient } from 'expo-linear-gradient';
import { get, servicesUrl } from "../../helpers/services.js";
import Chat from "../FanChat/chat";
import R from "res/R";

export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            list: [],
            activeSections: [],
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    getData = () => {

        get(servicesUrl.getCountriesWithTeams)
            .then((response) => {
                var data = response.map(function (item) {
                    return {
                        id: item.idCountry,
                        title: item.Name,
                        content: item.Teams
                    };
                });
                this.setState({ list: data, isLoading: true });
            });
    };

    renderTeam(team) {
        return (
            <TouchableOpacity style={{ marginTop: 10, marginBottom: 10, flexDirection: "row" }} onPress={() => this.props.navigation.navigate('AllGames', { idTeam: team.idTeams })}>
                <LinearGradient
                    colors={[team.TeamColor1, team.TeamColor2]}
                    style={styles.linearGradient}
                    start={[0, 0]}
                    end={[1, 0]}
                    locations={[0.5, 0.5]}
                >
                </LinearGradient>
                <Text style={{ marginStart: 10 }}>{team.TeamName}</Text>
            </TouchableOpacity>
        );
    }

    // this function is required
    renderSectionTitle = section => {
        return (
            null
        );
    };

    renderHeader = section => {
        return (

            <View style={{ padding: 20, backgroundColor: '#f7f7f7', borderBottomWidth: 2, borderBottomColor: '#fff' }}>
                <Text>{section.title}</Text>
            </View>
        );
    };

    renderContent = section => {
        return (

            <View style={{ backgroundColor: "#f7f7f7", paddingStart: 20, paddingEnd: 20 }}>
                {section.content.map(this.renderTeam.bind(this))}
            </View>
        );
    };

    updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <View>
                <ScrollView style={styles.container}>
                    <View style={{ backgroundColor: "#eee", marginTop: 0 }}>
                        <ImageBackground source={R.images.teams_bg} style={styles.headerBg}>
                            <Text style={styles.pageTitleText}>Teams</Text>
                        </ImageBackground>
                    </View>
                    <View style={{ textAlign: "center", alignItems: "center", marginTop: 60, marginBottom: 60 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 23, marginBottom: 20 }}>Start booking a trip</Text>
                        <Text style={{ fontSize: 15 }}>Choose between a single, multi-destination</Text>
                        <Text style={{ fontSize: 15 }}> or group trip and gift your friends a fun</Text>
                        <Text style={{ fontSize: 15 }}> stadium experience.</Text>
                    </View>
                    {this.state.isLoading ?
                        <Accordion
                            sections={this.state.list}
                            activeSections={this.state.activeSections}
                            renderSectionTitle={this.renderSectionTitle}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            onChange={this.updateSections}
                        />
                        :
                        <ActivityIndicator size="large" color="blue" style={{ marginTop: 22, marginLeft: 0 }} />
                    }
                    <Chat />
                </ScrollView >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fff",
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 25,
        width: 25,
        marginStart: 0,
        marginTop: 0
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
});