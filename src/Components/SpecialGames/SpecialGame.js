import React from "react";
import {
    StyleSheet,
    Text,
    ScrollView,
    View,
    ImageBackground,
    TouchableOpacity,
    Dimensions,
    FlatList,
    ActivityIndicator
} from "react-native";
import { get } from "../../helpers/services.js";
import Carousel from 'react-native-snap-carousel';
import moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Image from 'react-native-remote-svg';
import { translate } from "../../helpers/utils.js";
import Chat from "../FanChat/chat";
import R from "res/R";

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemWeight = Math.round(itemWidth * 3 / 4);

export default class specialGames extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            pageNumber: 1,
            pageSize: 7,
            pageCount: 1,
            activeIndex: 0,
            specialGames: [],
            popularGames: [],
            hotGames: [],
            popularTeams: [],
            competitions: [],
        };
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
        get('/mobile/game/GetHomePageDataMobile')
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
                        Team2Color2: game.Team2Color2,
                        FinalPrice: item.FinalPrice
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
                        StadeCity: game.StadeCity,
                        PriceCaption: item.PriceCaption,
                        BackGroundImage: item.BackGroundImage,
                        SharingRoomNote: item.SharingRoomNote,
                        TripDays: _this.getTripDays(item.StartDate, item.EndDate),
                        PricePerFan: item.PricePerFan
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

                // Competitions Data
                var competitions = response.MainLeagues.map(function (league) {
                    return {
                        LeagueId: league.LeagueId,
                        LeagueCode: league.LeagueCode,
                        LeagueName: league.LeagueName,
                        ImageReference: league.ImageReference
                    };
                });
                this.setState({ competitions: competitions, loading: false, pageCount: response.GamesList.PageCount });
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
                        style={{ backgroundColor: "#4AD219", width: 150, height: 50, alignSelf: "center", alignItems: 'center', justifyContent: 'center', marginTop: -20, borderRadius: 20, zIndex: 100 }}>
                        <Text style={{ color: "white", fontWeight: "bold", textTransform: 'uppercase' }} >{translate('loadMore')}</Text>
                        {this.state.loading ? (
                            <ActivityIndicator color="#fff" />
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
        );
    };

    loadMore = () => {
        this.setState({ loading: true, pageNumber: this.state.pageNumber + 1 }, () => {
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
                        this.setState({ popularGames: joined, loading: false });
                    });
            }
            catch { }
        });
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
                                <View style={{ borderLeftWidth: 1, borderLeftColor: "#ffffff77", width: 0, height: 60, marginLeft: 15, marginRight: 15 }}></View>
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.specialGameMeta}>{item.HomeTeam} </Text>
                                    <Text style={styles.specialGameMeta}>{item.AwayTeam}</Text>
                                </View>
                            </View>
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 14 }}>{item.PriceCaption}</Text>
                                <Text style={{ color: "white", fontSize: 10, marginTop: 5 }}>{item.SharingRoomNote}</Text>
                            </View>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('book now', { idMatch: item.idMatch })} style={{ width: 110, height: 46, marginBottom: -23, justifySelf: "center", alignSelf: "center" }}>
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
        <TouchableOpacity onPress={() => this.props.navigation.navigate('tripoverview')}>
            <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-between", backgroundColor: "#F7F7F7", height: 80, marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, padding: 10 }}>
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
        </TouchableOpacity>;


    /******************* Hot Game Item ************************/
    hotGameItem({ item, index, state }) {
        return (
            <View style={{ marginTop: 60, width: 280, height: 225, marginLeft: -20 }}>
                <View style={{ backgroundColor: "#DA2828", borderRadius: 20, padding: 15, height: 200 }}>
                    <View>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>{item.LeagueName}</Text>
                        <Text style={{ color: "white", marginTop: 5, fontSize: 12 }}>{item.StadeCity} -- {item.TripDays} DAYS</Text>
                    </View>
                    <View style={{ borderBottomWidth: 1, borderBottomColor: "#ffffff77", width: 200, height: 0, marginTop: 5, marginBottom: 5 }}></View>
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
                <TouchableOpacity style={{ width: 110, height: 46, marginTop: -23, justifySelf: "center", alignSelf: "center" }} onPress={() => this.props.navigation.navigate('tripoverview')}>
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
            <View style={{ backgroundColor: '#FFFFFF', width: 180, height: 200, borderRadius: 20, justifyContent: 'center', shadowColor: "#000", shadowOffset: { width: 0, height: 8, }, shadowOpacity: 0.44, shadowRadius: 10, elevation: 15 }}>
                <TouchableOpacity >
                    <View style={{ alignItems: 'center' }}>
                        <Image source={image} style={{ width: 100, height: 100 }} />
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{item.TeamName}</Text>
                    </View>
                </TouchableOpacity>
            </View>
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

                    <TouchableOpacity style={{ height: 50, padding: 10, backgroundColor: R.colors.greenLight, marginTop: 5, marginLeft: 10 }}
                        onPress={() => this.props.navigation.navigate('all games')}>
                        <Text style={styles.topNavBtnText}>SINGLE TRIP</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.topNavBtn}
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

                    <TouchableOpacity style={{ marginTop: 140, width: 100, height: 50 }}
                        onPress={() => this.props.navigation.navigate('quiz')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Quiz</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={{ marginTop: 140, width: 200, marginLeft: -40, height: 50 }}
                        onPress={() => this.props.navigation.navigate('leader board')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold" }}>Leader Board</Text>
                    </TouchableOpacity>
                </View>

                {/* Special Games  */}
                <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>{translate('specialGames')}</Text>
                    </View>
                    <View style={{ marginTop: -30, marginStart: '-10%' }}>
                        <Carousel
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
                <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>{translate('popularGames')}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'column', width: '100%', alignSelf: 'center' }}>
                        <FlatList
                            keyExtractor={(item, index) => index}
                            data={this.state.popularGames}
                            renderItem={item => this.popularGameItem(item)}
                            ListFooterComponent={this.renderPopularGamesFooter.bind(this)}
                        />
                    </View>
                </View>

                {/* Hot Games */}
                <View style={{ width: '90%', marginTop: 20, alignSelf: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>{translate('hotGames')}</Text>
                    </View>
                    <View style={{ marginLeft: -15, marginTop: -30 }}>
                        <Carousel
                            style={{ marginLeft: -15 }}
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.hotGames}
                            sliderWidth={485}
                            itemWidth={280}
                            renderItem={this.hotGameItem.bind(this)}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>

                {/* Popular Teams */}
                <View style={{ width: '100%', marginTop: 20, backgroundColor: '#EEEEEE' }}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <View style={styles.pageTitleBar}></View>
                            <Text style={styles.pageTitleText}>{translate('popularTeams')}</Text>
                        </View>
                        <View style={{ marginTop: 20, marginBottom: -50 }}>
                            <Carousel
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.popularTeams}
                                sliderWidth={485}
                                itemWidth={200}
                                itemHeight={300}
                                renderItem={this.popularTeamsItem}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </View>
                </View>

                {/* competitions  */}
                <View style={{ width: '90%', marginTop: 70, alignSelf: 'center' }}>
                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>{translate('competitions')}</Text>
                    </View>
                    <View style={{ marginTop: -30, flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-start' }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={this.state.competitions}
                            sliderWidth={170}
                            itemWidth={290}
                            renderItem={this.competitionItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })}
                        />
                    </View>
                </View>

                <View style={{ width: '70%', alignSelf: 'flex-start', marginTop: 20, marginStart: '5%', height: 70, marginBottom: 30 }}>
                    <TouchableOpacity style={{ backgroundColor: "#52F232", marginBottom: 10, height: 70, alignItems: 'center', justifyContent: 'center' }}
                        onPress={() => this.props.navigation.navigate('giftcard')}>
                        <Text style={{ fontSize: 17, fontWeight: "bold", textTransform: 'uppercase' }}> gift card</Text>
                    </TouchableOpacity>
                </View >

                <Chat />
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
    topNavBtn: {
        height: 50,
        padding: 10,
        marginTop: 5,
        marginLeft: 15
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
    }
});