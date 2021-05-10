import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackground } from "components/Common/HeaderBackground";
import Accordion from 'react-native-collapsible/Accordion';
import { LinearGradient } from 'expo-linear-gradient';
import { translate } from "helpers/utils";
import R from "res/R";

export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            allTeams: [],
            activeSections: [],
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    /* get the data from the async storage*/
    getData = async () => {
        var allTeams = JSON.parse(await AsyncStorage.getItem('@allTeams'));
        this.setState({ allTeams, isLoading: false });
    }

    renderTeam(team) {
        return (
            <TouchableOpacity key={'team' + team.idTeams} style={styles.team}
                onPress={() => this.props.navigation.navigate('AllGames', { idTeam: team.idTeams })}>
                <LinearGradient
                    colors={[team.TeamColor1, team.TeamColor2]}
                    style={[R.styles.linearGradient, { height: 40, width: 40 }]}
                    start={[0, 0]}
                    end={[1, 0]}
                    locations={[0.5, 0.5]}
                />
                <Text style={{ marginStart: 10, fontSize: 18, fontWeight: 'bold' }}>
                    {team.TeamName}
                </Text>
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
            <View style={styles.accordionHeader}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                    {section.Name}
                </Text>
            </View>
        );
    };

    renderContent = section => {
        return (
            <View style={styles.accordionContent}>
                {section.Teams.map(this.renderTeam.bind(this))}
            </View>
        );
    };

    updateSections = activeSections => {
        this.setState({ activeSections });
    };

    render() {
        return (
            <View>
                <ScrollView style={[R.styles.container, { backgroundColor: '#fff' }]}>
                    {/* banner */}
                    <HeaderBackground title={translate('teams')} image={R.images.teams_bg} />

                    <View style={styles.headerContainer}>
                        <Text style={styles.heading}>
                            {translate('startBooking')}
                        </Text>
                        <View style={{ width: 300 }}>
                            <Text style={{ fontSize: 15, textAlign: 'center' }}>
                                Choose between a single, multi-destination or group trip and gift your friends a fun stadium experience.
                        </Text>
                        </View>
                    </View>
                    {this.state.isLoading ?
                        <ActivityIndicator size="large" color="blue" style={{ marginTop: 22, marginLeft: 0 }} />
                        :
                        <Accordion
                            sections={this.state.allTeams}
                            activeSections={this.state.activeSections}
                            renderSectionTitle={this.renderSectionTitle}
                            renderHeader={this.renderHeader}
                            renderContent={this.renderContent}
                            onChange={this.updateSections}
                        />
                    }
                </ScrollView >
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        textAlign: "center",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 60
    },
    heading: {
        fontWeight: "bold",
        fontSize: 23,
        marginBottom: 20
    },
    accordionHeader:
    {
        padding: 20,
        backgroundColor: R.colors.lightGrey,
        borderBottomWidth: 2,
        borderBottomColor: '#fff'
    },
    accordionContent: {
        backgroundColor: R.colors.lightGrey,
        paddingStart: 20,
        paddingEnd: 20
    },
    team: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: 'center'
    }
});