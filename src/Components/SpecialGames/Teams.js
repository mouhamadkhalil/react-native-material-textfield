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

import { API_URL, API_TOKEN } from "@env";
import Chat from "../FanChat/chat";
import R from "res/R";

const sourceFile = require('../../helpers/services.js');

export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            isLoading: false,
            list: [],
            activeSections: [],
        };
    }

    componentDidMount = () => {
        const url = `${API_URL}/mobile/team/countriesWithTeams`;
        fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
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

    _body(team) {
        return (
            <View style={{ padding: 10 }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                    <Text style={{ paddingLeft: 70 }}>{team.TeamName}</Text>
                        <LinearGradient
                            colors={[team.TeamColor1, team.TeamColor2]}
                            style={styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        >
                        </LinearGradient>
                </TouchableOpacity>
            </View >
        );
    }

    // this function is required
    _renderSectionTitle = section => {
        return (
            null
        );
    };

    _renderHeader = section => {
        return (
            <View style={{ padding:20, paddingStart: 30, backgroundColor:'#F0EFF5', borderBottomWidth: 1, borderBottomColor: 'grey' }}>
                <Text>{section.title}</Text>
            </View>
        );
    };

    _renderContent = section => {
        return (
            <View >
                {section.content.map(this._body.bind(this))}
            </View>
        );
    };

    _updateSections = activeSections => {
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
                            renderSectionTitle={this._renderSectionTitle}
                            renderHeader={this._renderHeader}
                            renderContent={this._renderContent}
                            onChange={this._updateSections}
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
        backgroundColor: "#fafafa",
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    teamImage: {
        marginTop: 50,
        width: 70,
        height: 70,
        marginLeft: 20,
        marginRight: 20
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    teamsWrap: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"
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
        height: 15,
        width: 15,
        marginLeft: 40,
        marginTop: -15
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
        marginTop: 35
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});