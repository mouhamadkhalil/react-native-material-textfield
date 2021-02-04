import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import ImgAllGames from "../../assets/images/all-games.jpg";
import ImgArrowDown from "../../assets/Images_Design/arrow_down.png";
import ImgFlag from "../../assets/Images_Design/flag1.png";
import ImgShare from "../../assets/Images_Design/share.png";
import ImgArrowRight from "../../assets/Images_Design/arrow_right2.png";
import ImgCalendar from "../../assets/Images_Design/calendar-grey.png";
import ImgList from "../../assets/Images_Design/list-grey-icon.png";
import DropDownPicker from "react-native-dropdown-picker";
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import Messanger from "../../assets/images/messanger.png";
import Feedback from "../../assets/images/feedback.png";
import Whatsapp from "../../assets/images/whatsapp.png";
import Chat from "../../assets/Images_Design/chat1.png";
import AwesomeAlert from "react-native-awesome-alerts";



const sourceFile = require('../../services.js');


//test
export default class AllGames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            Picture1: "",
            Picture2: "",
            Picture3: "",
            Picture4: "",
            isDone: false,
            searchText: "",
            idMatch: "",
            City: "",
            Stade: "",
            GameDate1: "",
            GameDate2: "",
            LeaguesName: "",
            GameCode: "",
            HomeTeam: "",
            AwayTeam: "",
            StadeCity: "",
            GameCity1: "",
            GameCity2: "",
            GamePrice1: "",
            GamePrice2: "",
            pageNumber: 1,
            LeaguesName: "",
            DaysLeft: "",
            pageSize: 15,
            idTeam: 2122,
            orderBy: "date",
            allGames: [],
            isDone: false,
            showAlert: false,

        };
        this.getAllGames();
    }

    showAlert = () => {
        this.setState({
            showAlert: true,
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false,
        });
    };


    renderCustomAlertView = () => {
        return (
            <>
                <View style={{ height: 200, width: 200 }}>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Messanger</Text>
                        <Image source={Messanger} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Whatsapp</Text>
                        <Image source={Whatsapp} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={{ marginTop: 20, marginLeft: 80 }}>Feedback</Text>
                        <Image source={Feedback} style={{ width: 40, height: 40, marginLeft: 30, marginTop: -20 }} />
                    </TouchableOpacity>
                </View>

            </>
        );
    };


    getAllGames = () => {
        const url = `${API_URL}/mobile/game/getall?pageNumber=1&pageSize=10&order=date`;
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
                this.setState({ allGames: data });
                this.setState({ isDone: true })
            });
    };

    FilterGame = () => {
        const urlFilter = `${API_URL}/mobile/game/getall?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}&idTeam=${this.state.idTeam}&order=${this.state.orderBy}`;
        fetch(urlFilter, {
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
                console.log("leaguess ===> ", response.Items[0].MatchBundleDetail[0].GameSeat.Sequence);
                this.setState({ GameDate1: response.Items[0].MatchBundleDetail[0].Game.GameDate });
                this.setState({ GameDate2: response.Items[1].MatchBundleDetail[0].Game.GameDate });
                this.setState({ GameCity1: response.Items[0].MatchBundleDetail[0].Game.City });
                this.setState({ GameCity2: response.Items[1].MatchBundleDetail[0].Game.City });
                this.setState({ LeaguesName: response.Items[0].MatchBundleDetail[0].Game.League });
                this.setState({ DaysLeft: response.Items[0].MatchBundleDetail[0].GameSeat.Sequence });
                this.setState({ GamePrice1: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCostPerFan });
                this.setState({ GamePrice2: response.Items[0].MatchBundleDetail[0].GameSeats[0].ExtraCost });
            });
    };

    renderAllGames = () => {
        const buttons = [];
        for (let game of this.state.allGames) {
            buttons.push(
                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#FFFFFF", marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                    <View style={{ flex: 1, flexDirection: "row", height: 120 }}>
                        <View style={{ width: '15%', alignItems: 'center', borderRightColor: "grey", borderRightWidth: 1, paddingTop: 10 }}>
                            <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: 'uppercase' }}>{Moment(new Date(game.GameDate)).format('DD')}</Text>
                            <Text style={{ fontSize: 12, fontWeight: "bold", textTransform: 'uppercase' }}>{Moment(new Date(game.GameDate)).format('MMM')}</Text>
                        </View>

                        <View style={{ flex: 1, flexDirection: "column", width: '80%', paddingLeft: 10, paddingTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <LinearGradient
                                    colors={[game.Team1Color1, game.Team1Color2]}
                                    style={styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingLeft: 5 }}>{game.HomeTeam}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: "row" }}>
                                <LinearGradient
                                    colors={[game.Team2Color1, game.Team2Color2]}
                                    style={styles.linearGradient}
                                    start={[0, 0]}
                                    end={[1, 0]}
                                    locations={[0.5, 0.5]}
                                />
                                <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingLeft: 5 }}>{game.AwayTeam}</Text>
                            </View>
                            <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 10 }}>{game.LeagueName}</Text>
                            <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 5 }}>{game.City}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', width: '10%', paddingTop: 10, alignItems: 'center' }}>
                            <View >
                                <TouchableOpacity style={{ width: 20, height: 20 }}>
                                    <Image source={ImgFlag} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ borderTopColor: 'grey', borderTopWidth: 1, paddingTop: 10, marginTop: 10 }}>
                                <TouchableOpacity style={{ width: 20, height: 20 }}>
                                    <Image source={ImgShare} style={{ width: 20, height: 20 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{
                        flexDirection: 'row', justifyContent: 'flex-end', height: 50,
                        marginTop: 10, borderTopColor: "grey", borderTopWidth: 1
                    }}>
                        <TouchableOpacity
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center', justifyContent: 'center', width: '40%', height: '100%', backgroundColor: '#76ff02'
                            }}
                            onPress={() => this.props.navigation.navigate('request')}
                        >
                            <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>request</Text>
                            <Image source={ImgArrowRight} style={{ marginLeft: 10 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return buttons;
    };

    render() {
        const { showAlert } = this.state;

        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {/* banner begin*/}
                    <View>
                        <Image source={ImgAllGames} style={{ width: '100%' }} />
                        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold' }} >All Games</Text>
                        </View>
                    </View>
                    {/* banner end*/}

                    {/* filter begin*/}
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "white", width: '90%', height: 70, marginTop: -35, alignSelf: 'center', shadowColor: "grey", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.5, shadowRadius: 5.84, elevation: 5 }}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }} onPress={this.FilterGame}>
                            <Text style={{ fontSize: 20, color: '#6E6E6E', textTransform: 'uppercase' }}>filter</Text>
                            <Image source={ImgArrowDown} style={{ width: 12, height: 12, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }}>
                            <Image source={ImgCalendar} style={{ width: 20, height: 20 }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={ImgList} style={{ width: 20, height: 20 }}></Image>
                        </TouchableOpacity>
                    </View>
                    {/* filter end*/}

                    {/* filter picker begin */}
                    <View style={{
                        flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', width: '90%', height: 20, marginTop: 10, ...(Platform.OS !== 'android' && {
                            zIndex: 10
                        })
                    }}>
                        <Text style={{ fontSize: 14, color: '#374bbf', alignSelf: 'center', textTransform: 'uppercase', marginTop: 10, marginRight: -15, zIndex: 2 }}>sort by </Text>
                        <DropDownPicker
                            items={[
                                { label: "DATE", value: "date" },
                                { label: "PRICE", value: "price" },
                            ]}
                            defaultValue={this.state.orderBy}
                            containerStyle={{ height: 30 }}
                            selectedLabelStyle={{
                                color: '#374bbf', textDecorationLine: 'underline'
                            }}
                            style={{ backgroundColor: "#EEEEEE", borderWidth: 0, width: 100 }}
                            itemStyle={{
                                justifyContent: "flex-start",
                            }}
                            arrowStyle={{ color: 'red' }}
                            dropDownStyle={{ width: 100 }}
                            onChangeItem={(item) =>
                                this.setState({
                                    orderBy: item.value,
                                })
                            }
                            placeholder="SORT BY "
                        />
                    </View>
                    {/* filter picker end */}

                    {/* render games begin*/}
                    {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 10 }} />
                        :
                        <View style={{ width: '90%', alignSelf: 'center', zIndex: 1 }}>
                            {this.renderAllGames()}
                        </View>
                    }
                    {/* render games end*/}
                </View>

                <TouchableOpacity onPress={() => {
                    this.showAlert();
                }}>
                    <Image source={Chat} style={{ width: 100, height: 100, marginLeft: 260, marginTop: 10 }} />
                </TouchableOpacity>
                <View style={{ backgroundColor: "red" }}>
                    <AwesomeAlert
                        show={showAlert}
                        showProgress={false}
                        title="CHAT WITH US ?"
                        closeOnTouchOutside={true}
                        closeOnHardwareBackPress={false}
                        customView={this.renderCustomAlertView()}                       
                    />
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 0,
        marginBottom: 30,
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
});
