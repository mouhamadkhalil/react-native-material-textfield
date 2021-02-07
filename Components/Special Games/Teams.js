import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import LocationIcon from "../../assets/Images_Design/location-icon.png";
import CalendarIcon from "../../assets/Images_Design/calendar.png";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import Liverppol from "../../assets/Images_Design/liverpool.png";
import Real from "../../assets/Images_Design/real.png";
import Carousel from 'react-native-snap-carousel';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Brazil from "../../assets/games/brazil.png";
import headerBg from "../../assets/images/teams-list-mobile-background.jpg";
import Chat from "../../helpers/chat";
import { Separator, Thumbnail } from 'native-base';
import { AccordionList, Collapse, CollapseHeader, CollapseBody } from "accordion-collapse-react-native";

const sourceFile = require('../../helpers/services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class Teams extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            isDone: false,
            searchText: "",
            list: [{
                id: "",
                title: "",
                body: ""
            }]
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
                        title: item.Name,
                        body: item.Teams
                    };
                });
                this.setState({ list: data })
                this.setState({ isDone: true })
            });
    }


    _head(item) {
        return (
            <Separator bordered style={{ paddingLeft: 30 }}>
                <Text>{item.title}</Text>
            </Separator>
        );
    }

    _body(item) {
        return (
            <View style={{ padding: 10 }}>
                {item.body.map((key) =>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Text style={{ paddingLeft: 70 }}>{key.TeamName}</Text>
                    </TouchableOpacity>
                )}
                {item.body.map((key) =>
                    <View style={{paddingTop:-50}}>
                        <LinearGradient
                            colors={[key.TeamColor1, key.TeamColor2]}
                            style={styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        >
                        </LinearGradient>
                    </View>
                )
                }
            </View >
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ backgroundColor: "#eee", marginTop: 0 }}>
                    <ImageBackground source={headerBg} style={styles.headerBg}>
                        <Text style={styles.pageTitleText}>Teams</Text>
                    </ImageBackground>
                </View>
                <View style={{ textAlign: "center", alignItems: "center", marginTop: 60, marginBottom: 60 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 23, marginBottom: 20 }}>Start booking a trip</Text>
                    <Text style={{ fontSize: 15 }}>Choose between a single, multi-destination</Text>
                    <Text style={{ fontSize: 15 }}> or group trip and gift your friends a fun</Text>
                    <Text style={{ fontSize: 15 }}> stadium experience.</Text>
                </View>
                {this.state.isDone ?
                    <AccordionList
                        list={this.state.list}
                        header={this._head}
                        body={this._body.bind(this)}
                        keyExtractor={item => `${item.id}`}
                    />
                    :
                    <ActivityIndicator size="large" color="blue" style={{ marginTop: 22, marginLeft: 0 }} />
                }
                <Chat />
            </ScrollView >
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