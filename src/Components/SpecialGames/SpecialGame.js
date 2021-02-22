import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    TouchableHighlight,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Pressable
} from "react-native";
import { get, servicesUrl } from "../../helpers/services.js";
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Image from 'react-native-remote-svg';
import { translate } from "../../helpers/utils.js";
import Chat from "../FanChat/chat";
import R from "res/R";

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemHeight = Math.round(itemWidth * 3 / 4);


const Screen = Dimensions.get('window');

export default class specialGames extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pageNumber: 1,
            pageSize: 7,
            pageCount: 1,
            activeIndex: 0,
            specialGames: [],
            popularGames: [],
            hotGames: [],
            popularTeams: [],
            competitions: [],
            isButtonPressed: false,
            isLoading: false,
            isLoadingMore: false,
        };

        this.specialGamesCarousel = {}
        this.hotGamesCarousel = {};
        this.popularTeamsCarousel = {};
        this.competitonsCarousel = {};
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    getTripDays(date1, date2) {
        if (!date1 || !date1)
            return 0;
        let firstDate = moment(date1);
        let secondDate = moment(date2);
        return secondDate.diff(firstDate, 'days') + 1;
    }

    getData = () => {
        const _this = this;
        get(servicesUrl.getHomePageData)
            .then(response => {
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
                        StadeCity: game.StadeCity,
                        PriceCaption: item.PriceCaption,
                        BackGroundImage: item.BackGroundImage,
                        SharingRoomNote: item.SharingRoomNote,
                        TripDays: _this.getTripDays(item.StartDate, item.EndDate),
                        PricePerFan: item.PricePerFan
                    };
                });

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
                        Team2Color2: game.Team2Color2,
                        FinalPrice: item.FinalPrice
                    };
                });

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
                        StadeCity: game.StadeCity,
                        PriceCaption: item.PriceCaption,
                        BackGroundImage: item.BackGroundImage,
                        SharingRoomNote: item.SharingRoomNote,
                        TripDays: _this.getTripDays(item.StartDate, item.EndDate),
                        PricePerFan: item.PricePerFan
                    };
                });

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

                // Competitions Data
                var competitions = response.MainLeagues.map(function (league) {
                    return {
                        LeagueId: league.LeagueId,
                        LeagueCode: league.LeagueCode,
                        LeagueName: league.LeagueName,
                        ImageReference: league.ImageReference
                    };
                });
                this.setState({ specialGames, popularGames, hotGames, popularTeams, competitions, pageCount: response.GamesList.PageCount, pageSize: response.GamesList.PageSize, isLoading: false });
            });
    };

    renderPopularGamesFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.pageCount > this.state.pageNumber ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMore}
                        style={R.styles.loadMoreButton}>
                        {this.state.isLoadingMore ?
                            <ActivityIndicator color="white" />
                            :
                            <Text style={R.styles.loadMoreText} >
                                {translate('loadMore')}
                            </Text>
                        }
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    loadMore = () => {
        if (!this.state.isLoadingMore) {
            this.setState({ isLoadingMore: true, pageNumber: this.state.pageNumber + 1 }, () => {
                try {
                    const _this = this;
                    get(`/mobile/game/getall?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}`)
                        .then(response => {
                            // Popular Games Data
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
                                    Team2Color2: game.Team2Color2,
                                    FinalPrice: item.FinalPrice
                                };
                            });
                            var joined = this.state.popularGames.concat(data);
                            this.setState({ popularGames: joined, isLoadingMore: false });
                        });
                }
                catch { }
            });
        }
    };

    /******************* Special Game Item ************************/
    specialGameItem({ item, index, state }) {
        const image = { uri: item.BackGroundImage };
        return (
            <View style={{ marginTop: 60, height: 320, marginRight: 30 }} >
                <ImageBackground source={image} style={styles.image} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ borderRadius: 20, paddingTop: 40, paddingLeft: 20, paddingRight: 20 }}>
                        <View style={{ justifyContent: "space-between", height: 250 }}>
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 25, marginBottom: 10 }}>{item.LeagueName}</Text>
                                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: "row", flex: 0, width: 95, marginRight: 5 }}>
                                        <Image source={R.images.location} style={{ height: 14, width: 12, marginRight: 7, flex: 0 }} />
                                        <Text style={{ color: "white", fontSize: 12, flex: 1 }}>{item.City}</Text>
                                    </View>
                                    <View style={{ flexDirection: "row", width: 95 }}>
                                        <Image source={R.images.calendar} style={{ height: 14, width: 14, marginRight: 7, flex: 0 }} />
                                        <Text style={{ color: "white", fontSize: 11, width: 70, flex: 1 }}>{item.TripDays} DAYS TRIP</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={{ height: 60, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                <View style={{}}>
                                    <Text style={styles.specialGameMeta}>{moment(new Date(item.GameDate)).format('DD')}</Text>
                                    <Text style={styles.specialGameMeta}>{moment(new Date(item.GameDate)).format('MMM')}</Text>
                                </View>
                                <View style={{ borderLeftWidth: 1, borderLeftColor: "#ffffff77", width: 0, height: 60, marginStart: 15, marginEnd: 15 }}></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.specialGameMeta}>{item.HomeTeam} </Text>
                                    <Text style={styles.specialGameMeta}>{item.AwayTeam}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>{item.PriceCaption}</Text>
                                <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>{item.SharingRoomNote}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('tripoverview', { gameCode: item.GameCode })} style={{ width: 110, height: 46, marginBottom: -23, justifySelf: "center", alignSelf: "center" }}>
                                <ImageBackground source={R.images.button_green} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10 }}>
                                    <View >
                                        {item.PricePerFan > 0 ? (
                                            <>
                                                <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.PricePerFan}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                                                <Text style={{ fontSize: 9, textTransform: 'uppercase' }}>book now</Text>
                                            </>) :
                                            <Text style={{ fontWeight: "bold", fontSize: 14, textTransform: 'uppercase' }}>request</Text>
                                        }
                                    </View>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    /******************* Popular Game Item ************************/
    popularGameItem = ({ item }) =>
        <Pressable onPress={() => this.props.navigation.navigate('tripoverview', { gameCode: item.GameCode })}>
            <View style={styles.popularGameItem}>
                <Text style={{ fontSize: 11, fontWeight: "bold", width: 40, flex: 0 }}>{moment(new Date(item.GameDate)).format('DD MMM')}</Text>
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
                <Text style={{ fontSize: 12, width: 65 }}>{item.City} from {item.FinalPrice}$</Text>
                <Image source={R.images.arrow_right_sm} />
            </View>
        </Pressable>;


    /******************* Hot Game Item ************************/
    hotGameItem({ item, index, state }) {
        const image = { uri: item.BackGroundImage };
        return (
            <View style={{ marginTop: 60, width: 280, height: 225, marginLeft: -20 }}>
                <ImageBackground source={image} style={[styles.image, { width: "100%", height: "90%" }]} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ padding: 20 }}>
                        <View>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>{item.LeagueName}</Text>
                            <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>{item.StadeCity} -- {item.TripDays} DAYS</Text>
                        </View>
                        <View style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff77", width: "100%", height: 0, marginTop: 5, marginBottom: 5 }}></View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{}}>
                                <Text style={styles.specialGameMeta}>{moment(new Date(item.GameDate)).format('DD')}</Text>
                                <Text style={styles.specialGameMeta}>{moment(new Date(item.GameDate)).format('MMM')}</Text>
                            </View>
                            <View style={{ borderLeftWidth: 1, borderLeftColor: "#ffffff77", height: 70, width: 0, marginLeft: 15, marginRight: 15 }}></View>
                            <View>
                                <Text style={styles.specialGameMeta}>{item.HomeTeam}</Text>
                                <Text style={styles.specialGameMeta}>{item.AwayTeam}</Text>
                                <Text style={{ color: "white", fontSize: 8, marginTop: 5 }}>{item.SharingRoomNote}</Text>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
                <TouchableOpacity style={{ width: 110, height: 46, marginTop: -23, justifySelf: "center", alignSelf: "center" }} onPress={item.PricePerFan > 0 ? () => this.props.navigation.navigate('tripoverview', { gameCode: item.GameCode }) : () => this.props.navigation.navigate('request', { idMatch: item.idMatch })}>
                    <ImageBackground source={R.images.button_green} style={{ flex: 1, resizeMode: "cover", justifyContent: "center", alignItems: "flex-start", paddingLeft: 10 }}>
                        <View >
                            {item.PricePerFan > 0 ? (
                                <>
                                    <Text style={{ fontWeight: "bold", fontSize: 14 }}>{item.PricePerFan}$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                                    <Text style={{ fontSize: 9, textTransform: 'uppercase' }}>book now</Text>
                                </>) :
                                <Text style={{ fontWeight: "bold", fontSize: 14, textTransform: 'uppercase' }}>request</Text>
                            }
                        </View>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }

    /******************* Popular Team Item ************************/
    popularTeamsItem = ({ item, index }) => {
        const image = { uri: item.Image };
        return (
            <Pressable style={{ width: 130, height: 180, margin: 20, backgroundColor: "#fff", borderRadius: 20, justifyContent: "center", shadowColor: { width: 0, height: 8, }, shadowOpacity: .44, shadowRadius: 10, elevation: 15, justifyContent: "center", alignItems: "center" }}>
                <Image source={image} style={{ width: 80, height: 80 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: "80%", textAlign: "center", marginTop: 7 }}>{item.TeamName}</Text>
            </Pressable>
        );
    };

    /******************* Competition Item ************************/
    competitionItem({ item, index, state }) {
        const image = { uri: item.ImageReference };
        return (
            <View style={{ width: 250, marginTop: 60, height: 200 }}>
                <ImageBackground source={image} style={[styles.image, { width: 250, height: 200 }]} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: '30%', margin: '2%', borderRightWidth: 4, borderRightColor: '#76FF02', borderRadius: 50 }}></View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#76FF02' }}>{item.LeagueName}</Text>
                        <View style={{ height: '30%', margin: '2%', borderRightWidth: 4, borderRightColor: '#76FF02', borderRadius: 50 }}></View>
                    </View>
                </ImageBackground>
            </View>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('teams')}>
                        <Text style={styles.topNavBtnText}> Teams</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('leagues')}>
                        <Text style={styles.topNavBtnText}>Leagues</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavBtn}>
                        <Text style={styles.topNavBtnText}>Deals</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{ position: "absolute", right: 0, height: this.state.isButtonPressed ? 100 : 50, width: 100, padding: 10, backgroundColor: R.colors.lightGreen, marginLeft: 10, zIndex: 1 }}
                        onPress={() => this.setState({ isButtonPressed: !this.state.isButtonPressed })}>
                        <Text style={styles.topNavBtnText}>Book Trip</Text>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('all games')} style={{ height: 50, width: 100, marginLeft: -10, marginRight: -10, padding: 10, backgroundColor: R.colors.green, display: this.state.isButtonPressed ? "flex" : "none", marginTop: 20 }}>
                            <Text style={styles.topNavBtnText}>Single Trip</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('request')}>
                        <Text style={{}}>Request</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('my trips')}>
                        <Text style={styles.topNavBtnText}>My Trips</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('my profile')}>
                        <Text style={styles.topNavBtnText}>My Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('quiz')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Quiz</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.topNavBtn}
                        onPress={() => this.props.navigation.navigate('leader board')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Leader Board</Text>
                    </TouchableOpacity> */}
                </View>
                {this.state.isLoading ?
                    <ActivityIndicator size="large" color="blue" style={{ marginTop: 100 }} />
                    :
                    // Special Games
                    <>
                        {/* Special Games  */}
                        <View style={styles.box}>
                            <View style={styles.pageTitleWrap}>
                                <View style={styles.pageTitleBar}></View>
                                <Text style={styles.pageTitleText}>{translate('specialGames')}</Text>
                            </View>
                            <View style={{ marginTop: -30, marginStart: '-10%' }}>
                                <Carousel
                                    layout={"default"}
                                    ref={(c) => { this.specialGamesCarousel = c; }}
                                    data={this.state.specialGames}
                                    sliderWidth={485}
                                    itemWidth={350}
                                    renderItem={this.specialGameItem.bind(this)}
                                    onSnapToItem={index => this.setState({ activeIndex: index })}
                                />
                            </View>
                        </View>

                        {/* Popular Games */}
                        <View style={styles.box}>
                            <View style={styles.pageTitleWrap}>
                                <View style={styles.pageTitleBar}></View>
                                <Text style={styles.pageTitleText}>{translate('popularGames')}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignSelf: 'center', paddingLeft: 15, paddingRight: 15 }}>
                                <FlatList
                                    keyExtractor={(item, index) => index}
                                    data={this.state.popularGames}
                                    renderItem={item => this.popularGameItem(item)}
                                    ListFooterComponent={this.renderPopularGamesFooter}
                                />
                            </View>
                        </View>

                        {/* Hot Games */}
                        <View style={styles.box}>
                            <View style={styles.pageTitleWrap}>
                                <View style={styles.pageTitleBar}></View>
                                <Text style={styles.pageTitleText}>{translate('hotGames')}</Text>
                            </View>
                            <View style={{ marginLeft: -15, marginTop: -30 }}>
                                <Carousel
                                    style={{ marginLeft: -15 }}
                                    layout={"default"}
                                    ref={(c) => { this.hotGamesCarousel = c; }}
                                    data={this.state.hotGames}
                                    sliderWidth={485}
                                    itemWidth={280}
                                    renderItem={this.hotGameItem.bind(this)}
                                    onSnapToItem={index => this.setState({ activeIndex: index })}
                                />
                            </View>
                        </View>

                        {/* Popular Teams */}
                        <View style={{ ...styles.box, backgroundColor: '#EEEEEE', height: 250 }}>
                            <View style={styles.pageTitleWrap}>
                                <View style={styles.pageTitleBar}></View>
                                <Text style={styles.pageTitleText}>{translate('popularTeams')}</Text>
                            </View>
                            <View style={{ backgroundColor: "#fff", marginTop: 150, height: 200, marginLeft: 0, marginRight: 0 }}></View>
                            <View style={{ marginTop: -320, marginBottom: 0, paddingBottom: 50 }}>
                                <Carousel
                                    layout={"default"}
                                    ref={(c) => { this.popularTeamsCarousel = c; }}
                                    data={this.state.popularTeams}
                                    sliderWidth={Screen.width}
                                    itemWidth={150}
                                    itemHeight={200}
                                    renderItem={this.popularTeamsItem}
                                    firstItem={1}
                                    initialScrollIndex={1}
                                    getItemLayout={(data, index) => (
                                        { length: 150, offset: 150 * index, index }
                                    )}
                                    inactiveSlideOpacity={1}
                                />
                            </View>
                        </View>

                        {/* competitions  */}
                        <View style={styles.box}>
                            <View style={styles.pageTitleWrap}>
                                <View style={styles.pageTitleBar}></View>
                                <Text style={styles.pageTitleText}>{translate('competitions')}</Text>
                            </View>
                            <View style={{ marginTop: -30, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                                <Carousel
                                    layout={"default"}
                                    ref={(c) => { this.competitonsCarousel = c; }}
                                    data={this.state.competitions}
                                    sliderWidth={Screen.width}
                                    itemWidth={290}
                                    renderItem={this.competitionItem}
                                    onSnapToItem={index => this.setState({ activeIndex: index })}
                                />
                            </View>
                        </View>

                        {/* gift card */}
                        <View style={{ width: '90%', alignSelf: 'flex-start', marginTop: 20, marginStart: '5%', height: 70, marginBottom: 30 }}>
                            <TouchableOpacity style={{ backgroundColor: "#52F232", marginBottom: 10, height: 70, alignItems: 'center', justifyContent: 'center' }}
                                onPress={() => this.props.navigation.navigate('giftcard')}>
                                <Text style={{ fontSize: 17, fontWeight: "bold", textTransform: 'uppercase' }}> gift card</Text>
                            </TouchableOpacity>
                        </View >

                        <Chat />
                    </>
                }
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
    box: { width: "100%", marginTop: 30, alignSelf: 'center' },
    pageTitleWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    topNavBtn: {
        height: 50,
        padding: 10,
        marginTop: 0,
        marginStart: 10
    },
    topNavBtnText: {
        fontSize: 15,
        fontWeight: "bold"
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
    },
    pageTitleText: {
        color: "black",
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
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
    popularGameItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F7F7F7",
        height: 80,
        marginTop: 30,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        marginEnd: 15,
        marginStart: 15
    }
});