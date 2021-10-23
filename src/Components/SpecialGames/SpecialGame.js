import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    Image,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ActivityIndicator,
    Pressable,
    DeviceEventEmitter
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import Svg from 'components/Common/Svg';
import TeamFlag from 'components/Common/TeamFlag';
import { get, getWithToken, servicesUrl } from "helpers/services.js";
import { getTripDays } from "helpers/tripHelper.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
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
            isLoading: true,
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

    getData = () => {
        getWithToken(servicesUrl.getHomePageData)
            .then(response => {
                if (response) {
                    // Special Games Data
                    var specialGames = [];
                    if (response.SpecialGames) {
                        specialGames = response.SpecialGames.map(function (item) {
                            var game = item.MatchBundleDetail[0].Game;
                            return {
                                idMatch: game.idMatch,
                                BundleCode: item.BundleCode,
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
                                TripDays: getTripDays(item.StartDate, item.EndDate),
                                PricePerFan: item.PricePerFan
                            };
                        });
                    }

                    // Popular Games Data
                    var popularGames = [];
                    if (response.GamesList) {
                        popularGames = response.GamesList.Items.map(function (item) {
                            var game = item.MatchBundleDetail[0].Game;
                            return {
                                idMatch: game.idMatch,
                                BundleCode: item.BundleCode,
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
                    }

                    // Hot Games Data
                    var hotGames = [];
                    if (response.Deals) {
                        hotGames = response.Deals.map(function (item) {
                            var game = item.MatchBundleDetail[0].Game;
                            return {
                                idMatch: game.idMatch,
                                BundleCode: item.BundleCode,
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
                                TripDays: getTripDays(item.StartDate, item.EndDate),
                                PricePerFan: item.PricePerFan
                            };
                        });
                    }

                    // Popular Teams Data
                    var popularTeams = [];
                    if (response.MainTeams) {
                        popularTeams = response.MainTeams.map(function (team) {
                            return {
                                idTeams: team.idTeams,
                                TeamName: team.TeamName,
                                ShortName: team.ShortName,
                                TeamColor1: team.TeamColor1,
                                TeamColor2: team.TeamColor2,
                                Image: team.v3ImageReference
                            };
                        });
                    }

                    // Competitions Data
                    var competitions = [];
                    if (response.MainLeagues) {
                        competitions = response.MainLeagues.map(function (league) {
                            return {
                                LeagueId: league.LeagueId,
                                LeagueCode: league.LeagueCode,
                                LeagueName: league.LeagueName,
                                ImageReference: league.ImageReference
                            };
                        });
                    }

                    // send notifications via event to headers
                    let notifications = { ...response.Notifications };
                    notifications.NotReadNotifications = response.NotReadNotifications
                    DeviceEventEmitter.emit('notifications', notifications);
                    global['notifications'] = notifications;

                    const allTeams = ["@allTeams", response.CountriesWithTeams ? JSON.stringify(response.CountriesWithTeams) : ''];
                    const allLeagues = ["@allLeagues", response.AllLeagues ? JSON.stringify(response.AllLeagues) : ''];
                    const whatToDo = ["@whatToDo", response.WhatToDo ? JSON.stringify(response.WhatToDo) : ''];
                    const whereToEat = ["@whereToEat", response.WhereToEat ? JSON.stringify(response.WhereToEat) : ''];
                    const menuLinks = ["@menuLinks", response.MenuLinks ? JSON.stringify(response.MenuLinks) : ''];
                    const upComingInvoices = ["@upComingInvoices", response.UpComingInvoices ? JSON.stringify(response.UpComingInvoices) : ''];
                    const cancellationDropdown = ["@cancellationDropdown", response.CancellationDropdown ? JSON.stringify(response.CancellationDropdown) : ''];
                    const customerStatuses = ["@customerStatuses", response.CustomerStatuses ? JSON.stringify(response.CustomerStatuses) : ''];
                    AsyncStorage.multiSet([allTeams, allLeagues, whatToDo, whereToEat, menuLinks, upComingInvoices, cancellationDropdown, customerStatuses]);

                    var pageCount = response.GamesList ? response.GamesList.PageCount : 1;
                    var pageSize = response.GamesList ? response.GamesList.PageSize : 1;
                    this.setState({ specialGames, popularGames, hotGames, popularTeams, competitions, pageCount: pageCount, pageSize: pageSize, isLoading: false });
                }
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
                    const params = `?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}&source=homepage`;
                    get(servicesUrl.getAllGames + params)
                        .then(response => {
                            // Popular Games Data
                            var data = response.Items.map(function (item) {
                                var game = item.MatchBundleDetail[0].Game;
                                return {
                                    idMatch: game.idMatch,
                                    BundleCode: item.BundleCode,
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
                            <TouchableOpacity key={'special' + index} onPress={() => this.props.navigation.navigate('tripOverview', { bundleCode: item.BundleCode })} style={{ width: 110, height: 46, marginBottom: -23, justifySelf: "center", alignSelf: "center" }}>
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
    popularGameItem = ({ item, index }) =>
        <Pressable key={'popular' + index} onPress={() => this.props.navigation.navigate('tripOverview', { bundleCode: item.BundleCode })}>
            <View style={styles.popularGameItem}>
                <View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TeamFlag color1={item.Team1Color1} color2={item.Team1Color2} />
                        <Text style={{ fontSize: 20, marginStart: 15, fontFamily: 'BarlowCondensed-Bold', }}>
                            {item.AwayTeam}
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TeamFlag color1={item.Team2Color1} color2={item.Team2Color2} />
                        <Text style={{ fontSize: 20, marginStart: 15, fontFamily: 'BarlowCondensed-Bold' }}>
                            {item.HomeTeam}
                        </Text>
                    </View>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={{ fontSize: 18, fontWeight: "bold", flex: 0 }}>{moment(new Date(item.GameDate)).format('DD')}</Text>
                        <Text style={{ fontSize: 12, fontWeight: "bold", flex: 0, marginStart: 5 }}>{moment(new Date(item.GameDate)).format('MMM')}</Text>
                    </View>
                    <View style={{ alignItems: "flex-end" }}>
                        <Text style={{ fontSize: 12 }}>{item.City}</Text>
                        <Text>From <Text style={{ fontWeight: "bold" }}>{item.FinalPrice}$</Text></Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
                        <Text>View</Text><Image source={R.images.arrow_right_sm} style={{ marginLeft: 10 }} />
                    </View>
                </View>
            </View>
        </Pressable>


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
                <TouchableOpacity key={'hot' + index} style={{ width: 110, height: 46, marginTop: -23, justifySelf: "center", alignSelf: "center" }} onPress={item.PricePerFan > 0 ? () => this.props.navigation.navigate('tripOverview', { bundleCode: item.BundleCode }) : () => this.props.navigation.navigate('request', { bundleCode: item.BundleCode })}>
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
            <Pressable key={'team' + index} style={{ width: 130, height: 180, margin: 20, backgroundColor: "#fff", borderRadius: 20, justifyContent: "center", shadowColor: { width: 0, height: 8, }, shadowOpacity: .44, shadowRadius: 10, elevation: 15, justifyContent: "center", alignItems: "center" }}
                onPress={() => { this.props.navigation.navigate('allGames', { idTeam: item.idTeams }) }}>
                <Svg source={image} style={{ width: 80, height: 80 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: "80%", textAlign: "center", marginTop: 7 }}>{item.TeamName}</Text>
            </Pressable>
        );
    };

    /******************* Competition Item ************************/
    competitionItem({ item, index, state }) {
        const image = { uri: item.ImageReference };
        return (
            <TouchableOpacity style={{ width: 250, marginTop: 60, height: 200 }} onPress={() => { this.props.navigation.navigate('allGames', { idLeague: item.LeagueId }) }}>
                <ImageBackground source={image} style={[styles.image, { width: 250, height: 200 }]} imageStyle={{ borderRadius: 20 }}>
                    <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ height: '30%', margin: '2%', borderRightWidth: 4, borderRightColor: '#76FF02', borderRadius: 50 }}></View>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#76FF02' }}>{item.LeagueName}</Text>
                        <View style={{ height: '30%', margin: '2%', borderRightWidth: 4, borderRightColor: '#76FF02', borderRadius: 50 }}></View>
                    </View>
                </ImageBackground>
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <ScrollView style={styles.container}>
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
                                    keyExtractor={(item, index) => 'popular' + item.idMatch}
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
                                    renderItem={this.popularTeamsItem.bind(this)}
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
                                    renderItem={this.competitionItem.bind(this)}
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
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
    },
    pageTitleText: {
        fontFamily: 'Hellix-Regular',
        color: "black",
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        textTransform: 'uppercase'
    },
    specialGameMeta: {
        color: "white",
        fontSize: 20,
        fontFamily: 'BarlowCondensed-Bold'
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
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 20,
        marginBottom: 10,
    }
});