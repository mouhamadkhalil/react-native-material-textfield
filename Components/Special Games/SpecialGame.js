import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    SafeAreaView,
    Dimensions,
    FlatList
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import LocationIcon from "../../assets/Images_Design/location-icon.png";
import CalendarIcon from "../../assets/Images_Design/calendar.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import BtnBg from "../../assets/Images_Design/btn-bg.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import Carousel from 'react-native-snap-carousel';
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';

const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class specialGames extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            Picture1: "",
            Picture2: "",
            Picture3: "",
            Picture4: "",
            isDone: false,
            searchText: "",
            activeIndex: 0,
            competitions: [],
            specialGames: [],
            popularGames: [],
            hotGames: [],
            popularTeams: []
        };

        this.getData();
    }

    getData = () => {
        const url = `${API_URL}/mobile/game/GetHomePageData`;
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

                // Special Games Data
                var specialGames = response.SpecialGames.map(function (item) {
                    var game = item.MatchBundleDetail[0].Game;
                    return {
                        idMatch: game.idMatch,
                        City: game.City,
                        Stade: game.Stade,
                        GameDate: game.GameDate,
                        LeagueName: game.LeagueName,
                        GameCode: game.GameCode,
                        HomeTeam: game.HomeTeam,
                        AwayTeam: game.AwayTeam,
                        StadeCity: game.StadeCity
                    };
                });
                this.setState({ specialGames: specialGames });

                // Popular Games Data
                var popularGames = response.GamesList.Items.map(function (item) {
                    var game = item.MatchBundleDetail[0].Game;
                    return {
                        idMatch: game.idMatch,
                        City: game.City,
                        Stade: game.Stade,
                        GameDate: game.GameDate,
                        LeagueName: game.LeagueName,
                        GameCode: game.GameCode,
                        HomeTeam: game.HomeTeam,
                        AwayTeam: game.AwayTeam,
                        StadeCity: game.StadeCity,
                        Team1Color1: game.Team1Color1,
                        Team1Color2: game.Team1Color2,
                        Team2Color1: game.Team2Color1,
                        Team2Color2: game.Team2Color2
                    };
                });
                this.setState({ popularGames: popularGames });

                // Hot Games Data
                var hotGames = response.Deals.map(function (item) {
                    var game = item.MatchBundleDetail[0].Game;
                    return {
                        idMatch: game.idMatch,
                        City: game.City,
                        Stade: game.Stade,
                        GameDate: game.GameDate,
                        LeagueName: game.LeagueName,
                        GameCode: game.GameCode,
                        HomeTeam: game.HomeTeam,
                        AwayTeam: game.AwayTeam,
                        StadeCity: game.StadeCity
                    };
                });
                this.setState({ hotGames: hotGames });

                // Popular Teams Data
                var popularTeams = response.MainTeams.map(function (team) {
                    return {
                        idTeams: team.idTeams,
                        TeamName: team.TeamName,
                        ShortName: team.ShortName,
                        TeamColor1: team.TeamColor1,
                        TeamColor2: team.TeamColor2,
                        Image: team.v3ImageReference
                    };
                });
                this.setState({ popularTeams: popularTeams });

            });
    }

    /******************* Special Game Item ************************/
    specialGameItem({ item, index, state }) {
        const image = { uri: item.SliderImage };
        return (
            <TouchableOpacity style={{ marginTop: 60, height: 320, marginRight: 30 }} >
                <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ borderRadius: 20, paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
                        <View style={{ justifyContent: "space-between", height: 250 }}>
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>{item.LeagueName}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", flex: 0, width: 95, marginRight: 5 }}>
                                        <Image source={LocationIcon} style={{ height: 14, width: 12, marginRight: 7, flex: 0 }} />
                                        <Text style={{ color: "white", fontSize: 12, flex: 1 }}>{item.City}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: 95 }}>
                                        <Image source={CalendarIcon} style={{ height: 14, width: 14, marginRight: 7, flex: 0 }} />
                                        <Text style={{ color: "white", fontSize: 11, width: 70, flex: 1 }}>5 DAYS TRIP</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{}}>
                                    <Text style={styles.specialGameMeta}>12</Text>
                                    <Text style={styles.specialGameMeta}>sep</Text>
                                </View>
                                <View style={{ borderLeftWidth: 1, borderLeftColor: "#ffffff77", width: 0, height: 60, marginLeft: 15, marginRight: 15 }}></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.specialGameMeta}>{item.HomeTeam} </Text>
                                    <Text style={styles.specialGameMeta}>{item.AwayTeam}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>Early Bird Form</Text>
                                <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>* price based on 2 fans flyings together</Text>
                            </View>
                            <TouchableOpacity style={{
                                width: 110, height: 46, marginBottom: -23, justifySelf: "center",
                                alignSelf: "center"
                            }}
                            >
                                <ImageBackground source={BtnBg} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10 }}>
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('book now')}>
                                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                                        <Text style={{ fontSize: 9 }}>BOOK NOW</Text>
                                    </TouchableOpacity>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </TouchableOpacity >
        );
    }

    /******************* Popular Game Item ************************/
    popularGameItem = ({ item }) =>
        <TouchableOpacity>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F7F7F7", height: 80, marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, padding: 10 }}>
                <Text style={{ fontSize: 11, fontWeight: "bold", width: 40, flex: 0 }}>{Moment(new Date(item.GameDate)).format('DD MMM')}</Text>
                <Text style={{ fontSize: 14, fontWeight: "bold", width: 60 }}>{item.HomeTeam}</Text>
                <View>
                    <LinearGradient
                        colors={[item.Team1Color1, item.Team1Color2]}
                        style={styles.linearGradient}
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.5, 0.5]}
                    ></LinearGradient>
                </View>
                <View>
                    <LinearGradient
                        colors={[item.Team2Color1, item.Team2Color2]}
                        style={styles.linearGradient}
                        start={[0, 0]}
                        end={[1, 0]}
                        locations={[0.5, 0.5]}
                    >
                    </LinearGradient>
                </View>
                <Text style={{ fontSize: 14, fontWeight: "bold", width: 60 }}>{item.AwayTeam}</Text>
                <Text style={{ fontSize: 12, width: 65 }}>{item.City} from 1360$</Text>
                <Image source={Arrow} />
            </View>
        </TouchableOpacity>


    /******************* Hot Game Item ************************/
    hotGameItem({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 280, height: 225, marginLeft: -20 }}>
                <View style={{ backgroundColor: "#DA2828", borderRadius: 20, padding: 15, height: 200 }}>
                    <View>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>{item.LeagueName}</Text>
                        <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>{item.StadeCity} -- 5 DAYS</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff77", width: 200, height: 0, marginTop: 5, marginBottom: 5 }}></View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={{}}>
                            <Text style={styles.specialGameMeta}>12</Text>
                            <Text style={styles.specialGameMeta}>jan</Text>
                        </View>
                        <View style={{ borderLeftWidth: 1, borderLeftColor: "#ffffff77", height: 70, width: 0, marginLeft: 15, marginRight: 15 }}></View>
                        <View>
                            <Text style={styles.specialGameMeta}>{item.HomeTeam}</Text>
                            <Text style={styles.specialGameMeta}>{item.AwayTeam}</Text>
                            <Text style={{ color: "white", fontSize: 8, marginTop: 5 }}>* price based on 2 fans flyings together</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity style={{ width: 110, height: 46, marginTop: -23, justifySelf: "center", alignSelf: "center" }}>
                    <ImageBackground source={BtnBg} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10 }}>
                        <Text style={{ fontWeight: "bold", fontSize: 14 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Text style={{ fontSize: 9 }}>BOOK NOW</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    /******************* Popular Team Item ************************/
    popularTeamsItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ shadowColor: "red", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 5.84, elevation: 5 }}>
                <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={{ uri: item.Image, width: '100%', height: 180, }} style={{ borderRadius: 20, }} />
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.TeamName}</Text>
                </View>
            </TouchableOpacity>
        );
    };

    /******************* Competition Item ************************/
    competitionItem({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 20, width: 250, height: 250, marginLeft: 10, marginBottom: 100 }}>
                <TouchableOpacity style={{ marginLeft: -50, width: 250, height: 250 }}>
                    <Image source={Card1} style={{ marginLeft: 200, marginTop: 0 }} />
                </TouchableOpacity>
                <Image source={Btn2} style={{ marginLeft: 185, marginTop: -22 }} />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{flex:1, flexDirection:'row'}}>
                    <TouchableOpacity style={{ width: 100, height: 50, marginLeft: 20, marginTop: 50 }}
                        onPress={() => this.props.navigation.navigate('teams')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10 }}> Teams</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 100, height: 50, marginLeft: -10, marginTop: 60 }}
                        onPress={() => this.props.navigation.navigate('leagues')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Leagues</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 100, height: 50, marginLeft: -10, marginTop: 60 }}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Deals</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ width: 100, height: 50, marginLeft: -10, marginTop: 60 }}
                        onPress={() => this.props.navigation.navigate('request')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Request</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ marginTop: 100, marginLeft: -364, width: 100, height: 50 }}
                        onPress={() => this.props.navigation.navigate('giftcard')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Gift card</Text>
                    </TouchableOpacity>
                </View>

                {/* Special Games  */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>special games</Text>
                    </View>
                    <View style={{ marginTop: -30, marginLeft: -15 }}>
                        <Carousel
                            style={{ marginLeft: 0 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.specialGames}
                            sliderWidth={485}
                            itemWidth={350}
                            renderItem={this.specialGameItem.bind(this)}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>

                {/* Popular Games */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}> popular games </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center' }}>
                        <FlatList
                            data={this.state.popularGames}
                            renderItem={item => this.popularGameItem(item)}
                            keyExtractor={item => item.idMatch}
                        />
                        <TouchableOpacity style={{ backgroundColor: "#4AD219", width: 150, height: 50, alignSelf: "center", marginBottom: 30, marginTop: -15, borderRadius: 20 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginLeft: 33, marginTop: 15 }}>LOAD MORE &nbsp;+</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Hot Games */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>hot games</Text>
                    </View>
                    <View style={{ marginLeft: -15, marginTop: -30 }}>
                        <Carousel
                            style={{ marginLeft: -15 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.hotGames}
                            sliderWidth={485}
                            itemWidth={280}
                            renderItem={this.hotGameItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>

                {/* Popular Teams */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>popular teams</Text>
                    </View>
                    <View style={{ marginLeft: -15, marginTop: 30 }}>
                        <Carousel
                            style={{ marginLeft: -15 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.popularTeams}
                            sliderWidth={485}
                            itemWidth={180}
                            renderItem={this.popularTeamsItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>

                {/* Competitions */}
                <View style={{ marginTop: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>competitions</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Carousel
                            style={{ marginLeft: 50 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.competitions}
                            sliderWidth={170}
                            itemWidth={290}
                            // autoplay={true}
                            renderItem={this.competitionItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFF",
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
    },
    pageTitleText: {
        color: "black",
        fontSize: 20,
        marginLeft: 10,
        textTransform: 'uppercase'
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    },
    image: {
        borderRadius: 20,
        backgroundColor: '#ee0000',
        resizeMode: "cover",
        justifyContent: "center"
    },
});