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

const sourceFile = require('../../services.js');
const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class specialGames extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;

        this.state = {
            Picture1: "",
            Picture2: "",
            Picture3: "",
            Picture4: "",
            isDone: false,
            searchText: "",
            activeIndex: 0,
            carouselItems: [{
                idMatch: "",
                City: "",
                Stade: "",
                GameDate: "",
                LeaguesName: "",
                GameCode: "",
                HomeTeam: "",
                AwayTeam: "",
                StadeCity: ""
            }],
            competitions: [{
                idMatch: "",
                City: "",
                Stade: "",
                GameDate: "",
                LeaguesName: "",
                GameCode: "",
                HomeTeam: "",
                AwayTeam: "",
                StadeCity: ""
            }],
            specialGames: [
                {
                    idMatch: "",
                    City: "",
                    Stade: "",
                    GameDate: "",
                    LeaguesName: "",
                    GameCode: "",
                    HomeTeam: "",
                    AwayTeam: "",
                    StadeCity: ""
                }
            ],
            popularGames: [
                {
                    idMatch: "",
                    City: "",
                    Stade: "",
                    GameDate: "",
                    LeaguesName: "",
                    GameCode: "",
                    HomeTeam: "",
                    AwayTeam: "",
                    StadeCity: ""
                }
            ],
            hotGames: [{
                idMatch: "",
                City: "",
                Stade: "",
                GameDate: "",
                LeaguesName: "",
                GameCode: "",
                HomeTeam: "",
                AwayTeam: "",
                StadeCity: ""
            }],
        };

        this.getSpecialGames();
        this.getPopularGames();
        this.getHotGames();
        this.getCompetitions();
    }

    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`;
        fetch(urlSearch, {
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
                        idMatch: item.idMatch,
                        City: item.City,
                        Stade: item.Stade,
                        GameDate: item.GameDate,
                        LeaguesName: item.LeaguesName,
                        GameCode: item.GameCode,
                        HomeTeam: item.HomeTeam,
                        AwayTeam: item.AwayTeam,
                        StadeCity: item.StadeCity
                    };
                });
            });
    };

    getSpecialGames = () => {
        const url = `${API_URL}/mobile/game/getall?pageNumber=1&pageSize=6&order=date`;
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
                var data = response.Items.map(function (item) {
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
                this.setState({ specialGames: data });
            });
    };

    getPopularGames = () => {
        const url = `${API_URL}/mobile/game/getall?pageNumber=1&pageSize=6&source=homepage`;
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
                var data = response.Items.map(function (item) {
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
                this.setState({ popularGames: data });
            });
    };

    getHotGames = () => {
        const url = `${API_URL}/mobile/game/getSuggestedGames`;
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
                        idMatch: item.idMatch,
                        City: item.City,
                        Stade: item.Stade,
                        GameDate: item.GameDate,
                        LeagueName: item.LeagueName,
                        GameCode: item.GameCode,
                        HomeTeam: item.HomeTeam,
                        AwayTeam: item.AwayTeam,
                        StadeCity: item.StadeCity,
                    };
                });
                this.setState({ hotGames: data });
            });
    };

    getCompetitions = () => {
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
                var data = response.map(function (item) {
                    return {
                        idMatch: item.idMatch,
                        City: item.City,
                        Stade: item.Stade,
                        GameDate: item.GameDate,
                        LeagueName: item.LeagueName,
                        GameCode: item.GameCode,
                        HomeTeam: item.HomeTeam,
                        AwayTeam: item.AwayTeam,
                        StadeCity: item.StadeCity,
                    };
                });
                this.setState({ competitions: data });
            });
    };

    renderPopularGames = () => {
        const buttons = [];
        for (let game of this.state.popularGames) {
            buttons.push(
                <TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F7F7F7", height: 80, marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, padding: 10 }}>
                        <Text style={{ fontSize: 11, fontWeight: "bold", width: 40, flex: 0 }}>{Moment(new Date(game.GameDate)).format('DD MMM')}</Text>
                        <Text style={{ fontSize: 14, fontWeight: "bold", width: 60 }}>{game.HomeTeam}</Text>
                        <View style={{}}>
                            <LinearGradient
                                colors={[game.Team1Color1, game.Team1Color2]}
                                style={styles.linearGradient}
                                start={[0, 0]}
                                end={[1, 0]}
                                locations={[0.5, 0.5]}
                            ></LinearGradient>
                        </View>
                        <View style={{}}>
                            <LinearGradient
                                colors={[game.Team2Color1, game.Team2Color2]}
                                style={styles.linearGradient}
                                start={[0, 0]}
                                end={[1, 0]}
                                locations={[0.5, 0.5]}
                            >
                            </LinearGradient>
                        </View>
                        <Text style={{ fontSize: 14, fontWeight: "bold", width: 60 }}>{game.AwayTeam}</Text>
                        <Text style={{ fontSize: 12, width: 65 }}>{game.City} from 1360$</Text>
                        <Image source={Arrow} style={{}} />
                    </View>
                </TouchableOpacity>
            );
        }
        return buttons;
    };

    // Special Game
    specialGameItem({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, height: 320, marginRight: 30 }} >
                <View style={{ backgroundColor: "#483ED4", borderRadius: 20, paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
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

            </TouchableOpacity >
        );
    }

    // Hot Game
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('tripoverview')}>
                            <Text style={{ fontWeight: "bold", fontSize: 14 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                            <Text style={{ fontSize: 9 }}>BOOK NOW</Text>
                        </TouchableOpacity>
                    </ImageBackground>
                </TouchableOpacity>
            </TouchableOpacity>

        );
    }

    // popular teams
    popularTeamsItem = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginTop: 40, width: 270, height: 250, marginLeft: 10, marginBottom: 0, shadowColor: "red", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 5.84, elevation: 5 }}>
                <Image source={Liverppol} style={{ borderRadius: 20, }} />
            </TouchableOpacity>
        );
    };

    // competitions
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
                <SafeAreaView style={{ backgroundColor: '#F7F7F7', height: 140 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>

                        <View style={{ width: 150, marginLeft: 30, height: 40, marginBottom: 30, marginTop: 60 }}>
                            <TouchableOpacity style={{ backgroundColor: "#52F232", marginBottom: 10, height: 70 }}
                                onPress={() => this.props.navigation.navigate('all games')}>
                                <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10, paddingLeft: 25, paddingTop: 15 }}>SINGLE TRIP</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={{ width: 100, height: 50, marginLeft: 0, marginTop: 100 }}
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

                        <TouchableOpacity style={{ width: 100, height: 50, marginLeft: -275, marginTop: 60 }}
                            onPress={() => this.props.navigation.navigate('request')}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Request</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginTop: 110, marginLeft: -15, width: 100, height: 50 }}
                            onPress={() => this.props.navigation.navigate('my trips')}>
                            <Text style={{ fontSize: 17, fontWeight: "bold" }}>My Trips</Text>
                        </TouchableOpacity>


                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={{ display: "none", marginLeft: 120, borderRadius: 20, backgroundColor: "white", width: 190, height: 35 }}
                            placeholder="  &nbsp;&nbsp;Search your game ... "
                            placeholderTextColor="#46D822"
                            autoCapitalize="none"
                            onChangeText={searchText => {
                                this.setState({ searchText });
                            }}
                            onSubmitEditing={this.searchGame}
                            value={this.state.searchText}
                            hid
                        />
                    </View>
                </SafeAreaView>
                <View style={styles.pageTitleBar}></View>
                <Text style={styles.pageTitleText}>
                    SPECIAL GAMES
                </Text>
                {/* carousel  */}
                <View style={{ marginLeft: -15 }}>
                    <Carousel
                        style={{ marginLeft: 0 }}
                        layout={"default"}
                        ref={ref => this.carousel = ref}
                        data={this.state.specialGames}
                        sliderWidth={485}
                        itemWidth={280}
                        // autoplay={true}
                        renderItem={this.specialGameItem.bind(this)}
                        onSnapToItem={index => this.setState({ activeIndex: index })}
                    />
                </View>
                <View style={styles.pageTitleBar}>
                </View>
                <Text style={styles.pageTitleText}>
                    POPULAR GAMES
                </Text>

                <View style={{ flex: 1, flexDirection: 'column', width: '90%', alignSelf: 'center' }}>
                    {this.renderPopularGames()}
                    <TouchableOpacity style={{ backgroundColor: "#4AD219", width: 150, height: 50, alignSelf: "center", marginBottom: 30, marginTop: -15, borderRadius: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold", marginLeft: 33, marginTop: 15 }}>LOAD MORE &nbsp;+</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <View style={styles.pageTitleBar}></View>
                    <Text style={styles.pageTitleText}>
                        HOT GAMES
                    </Text>
                    {/* Hot Games */}
                    <View style={{ marginLeft: -15, marginTop: -30 }}>
                        <Carousel
                            style={{ marginLeft: -15 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.hotGames}
                            sliderWidth={485}
                            itemWidth={280}
                            // autoplay={true}
                            renderItem={this.hotGameItem.bind(this)}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>
                <View style={{ backgroundColor: "#eee", marginTop: 30 }}>
                    <View style={styles.pageTitleBar}></View>
                    <Text style={styles.pageTitleText}>
                        POPULAR TEAMS
                    </Text>
                    {/* Carousal 3  */}
                    <View style={{ backgroundColor: "white", height: 200, width: "100%", marginTop: 150 }}></View>
                    <View style={{ flex: 1, justifyContent: 'center', marginTop: -350 }}>
                        <Carousel
                            style={{ marginLeft: 0 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.carouselItems}
                            sliderWidth={485}
                            itemWidth={180}
                            renderItem={this.popularTeamsItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>
                <View style={styles.pageTitleBar}></View>
                <Text style={styles.pageTitleText}>
                    COMPETETIONS
                </Text>
                <ScrollView>
                    {/* carousel 4 */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
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
                    </SafeAreaView>
                </ScrollView>

                <View style={{ width: 250, marginLeft: 50, height: 70, marginBottom: 30 }}>
                    <TouchableOpacity style={{ backgroundColor: "#52F232", marginBottom: 10, height: 70 }}
                        onPress={() => this.props.navigation.navigate('giftcard')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 10, paddingLeft: 80, paddingTop: 15 }}> GIFT CARD</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: 0,
        width: '100%',
        marginTop: -60,
        marginBottom: 0,
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
        marginTop: 35
    },
    pageTitleText: {
        marginTop: -20,
        color: "black",
        fontSize: 20,
        marginLeft: 70
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});