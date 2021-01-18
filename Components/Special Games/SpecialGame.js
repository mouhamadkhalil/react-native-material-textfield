import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button,
    Dimensions
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/bell.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
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

export default class Day2Screen extends React.Component {

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
            carouselItems:[{
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
            hotGames:[{
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
    }

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
    }

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
    }

    renderPopularGames = () => {
        const buttons = [];
        for (let game of this.state.popularGames) {
            buttons.push(
                <TouchableOpacity>
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "#F7F7F7", width: 350, height: 70, marginLeft: 130, marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, }}>
                        <Text style={{ marginLeft: 10, marginTop: 27, fontSize: 12, fontWeight: "bold", width:22 }}>{Moment(new Date(game.GameDate)).format('DD MMM')}</Text>
                        <Text style={{ marginLeft: 10, fontSize: 15, fontWeight: "bold", marginTop: 25, width:60 }}>{game.HomeTeam}</Text>
                        <View style={{marginTop:25, marginLeft:10}}>
                            <LinearGradient
                                colors={[game.Team1Color1, game.Team1Color2]}
                                style={styles.linearGradient}
                                start={[0,0]}
                                end={[1,0]}
                                locations={[0.5,0.5]}
                            ></LinearGradient>
                        </View>
                        <View style={{marginTop:25, marginLeft:30}}>
                            <LinearGradient
                                colors={[game.Team2Color1, game.Team2Color2]}
                                style={styles.linearGradient}
                                start={[0,0]}
                                end={[1,0]}
                                locations={[0.5,0.5]}
                            >
                            </LinearGradient>
                        </View>
                        <Text style={{ fontSize: 15, fontWeight: "bold", marginTop: 25, marginLeft:10, width:60 }}>{game.AwayTeam}</Text>
                        <Text style={{ fontSize: 12, marginTop: 10, marginLeft:8, width:65 }}>{game.City} from 1360$</Text>
                        <Image source={Arrow} style={{ marginTop: 30, marginLeft:15 }} />
                    </View>
                </TouchableOpacity>
            )
        }
        return buttons;
    }


    // Special Game
    specialGameItem({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 170, height: 250, marginLeft: 150 }}>
                <ScrollView style={{ backgroundColor: "#483ED4", borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginTop: 20, marginLeft: 20, fontSize: 16 }}>{item.LeagueName}</Text>
                    <Text style={{ marginLeft: 20, color: "white", marginTop: 10, fontSize: 10 }}>{item.City}</Text>
                    <Text style={{ marginLeft: 100, color: "white", marginTop: -14, fontSize: 10 }}>5 DAYS TRIP </Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 20 }}>12 </Text>
                    <Text style={{ color: "white", marginLeft: 70, marginTop: -19 }}>{item.HomeTeam}</Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 5 }}>sep </Text>
                    <Text style={{ color: "white", marginLeft: 70, marginTop: -19 }}>{item.AwayTeam}</Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 10, fontWeight: "bold" }}>Early Bird Form</Text>
                    <Text style={{ color: "white", fontSize: 7, marginLeft: 20, marginTop: 4 }}>* price based on 2 fans flyings together</Text>
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 33, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 87, marginTop: -10 }} />
                        <Text style={{ marginTop: -3, marginLeft: 11, fontSize: 9, color: "gray" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    // Hot Game
    hotGameItem({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 250, height: 250, marginLeft: 150 }}>
                <ScrollView style={{ backgroundColor: "#DA2828", borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginTop: 20, marginLeft: 20, fontSize: 25 }}>{item.LeagueName}</Text>
                    <Text style={{ marginLeft: 20, color: "white", marginTop: 10, fontSize: 10 }}>{item.StadeCity} -- 5 DAYS</Text>
                    <Text style={{ marginLeft: 77, color: "white", marginTop: 20, fontSize: 20 }}>{item.HomeTeam}</Text>
                    <Text style={{ marginLeft: 77, color: "white", marginTop: 0, fontSize: 20 }}>{item.AwayTeam}</Text>
                    <Text style={{ marginLeft: 25, color: "white", marginTop: -45, fontSize: 17 }}>12</Text>
                    <Text style={{ marginLeft: 25, color: "white", marginTop: 0, fontSize: 17 }}>jan</Text>
                    <Text style={{ color: "white", marginLeft: 75, fontSize: 8, marginTop: 10 }}>* price based on 2 fans flyings together</Text>
                </ScrollView>
                <TouchableOpacity style={{ width: 120, height: 50, marginLeft: 65, marginTop: -25 }} >
                    <ScrollView style={{ backgroundColor: "#62F622", width: 120, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 95, marginTop: -10 }} />
                        <Text style={{ marginTop: -3, marginLeft: 11, fontSize: 9, color: "gray" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    // Carousal 3
    _renderItem3 = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginTop: 40, width: 250, height: 250, marginLeft: 10, marginBottom: 0 }}>

                <TouchableOpacity style={{ marginLeft: -50, width: 250, height: 250 }}>
                    <Image source={Liverppol} style={{ marginLeft: 200, marginTop: 0 }} />
                    <Image source={Real} style={{ marginLeft: 370, marginTop: -188 }} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    // Carousal 4
    _renderItem4({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 20, width: 250, height: 250, marginLeft: 10, marginBottom: 100 }}>
                <TouchableOpacity style={{ marginLeft: -50, width: 250, height: 250 }}>
                    <Image source={Card1} style={{ marginLeft: 200, marginTop: 0 }} />
                </TouchableOpacity>
                <Image source={Btn2} style={{ marginLeft: 185, marginTop: -22 }} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <SafeAreaView style={{ backgroundColor: '#F7F7F7', height: 60 }}>
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                        <View style={{ width: 190 }}>
                            <TouchableOpacity>
                                <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                                <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                                <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                            </TouchableOpacity>
                        </View>
                        <Text
                            style={{
                                color: "#374BBF",
                                fontWeight: "bold",
                                fontSize: 19,
                                marginLeft: 40,
                                paddingTop: 5,
                                height: 40
                            }}> {Moment(new Date()).format('dddd DD MMM')}
                        </Text>
                        <TouchableOpacity onPress={this.searchGame} style={{ marginLeft: 10, marginRight: 10, width: 40 }}>
                            <Image source={Search} style={{ height: 40, width: 40 }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40 }}>
                            <Image source={Notifictaion} style={{ height: 40, width: 40 }} />
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
                <ScrollView style={{ backgroundColor: "black", height: 8, width: 30, marginLeft: 140, marginTop: 35 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 180
                    }}
                >
                    SPECIAL GAMES
                </Text>
                <ScrollView>

                    {/* carousel  */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: -40, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 150 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.specialGames}
                                sliderWidth={260}
                                itemWidth={220}
                                // autoplay={true}
                                renderItem={this.specialGameItem}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 8, width: 30, marginLeft: 140, marginTop: 35 }}>
                </ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 180
                    }}>
                    POPULAR GAMES
                </Text>

                {this.renderPopularGames()}

                <TouchableOpacity style={{ backgroundColor: "#4AD219", width: 150, height: 50, marginLeft: 220, marginBottom: 30, marginTop: -15, borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginLeft: 33, marginTop: 15 }}>LOAD MORE &nbsp;+</Text>
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "black", height: 8, width: 30, marginLeft: 140, marginTop: 10 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 180
                    }}
                >
                    HOT GAMES
                </Text>
                <ScrollView>
                    {/* Hot Games */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: -20, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.hotGames}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this.hotGameItem}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 8, width: 30, marginLeft: 140, marginTop: 35 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 180
                    }}
                >
                    POPULAR TEAMS
                </Text>
                <ScrollView>

                    {/* Carousal 3  */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem3}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 8, width: 30, marginLeft: 140, marginTop: 35 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 180
                    }}
                >
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
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem4}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 0,
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
});
