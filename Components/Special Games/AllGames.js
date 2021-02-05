import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, Image, ScrollView, View, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import ImgAllGames from "../../assets/images/all-games.jpg";
import ImgArrowDown from "../../assets/Images_Design/arrow_down.png";
import ImgFlag from "../../assets/Images_Design/flag1.png";
import ImgShare from "../../assets/Images_Design/share.png";
import ImgArrowRight from "../../assets/Images_Design/arrow_right2.png";
import ImgCalendar from "../../assets/Images_Design/calendar-grey.png";
import ImgList from "../../assets/Images_Design/list-grey-icon.png";
import ImgLogo from "../../assets/images/fly-foot.png";
import DropDownPicker from "react-native-dropdown-picker";
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { get } from "../../helpers/services.js"
import { translate } from "../../helpers/utils.js";
import Chat from "../../helpers/chat";

const sourceFile = require('../../helpers/services.js');

export default class AllGames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
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
            LeaguesName: "",
            DaysLeft: "",
            idTeam: 2122,
            allGames: [],
            isDone: false,
            pageNumber: 1,
            pageSize: 10,
            orderBy: "date",
            modalVisible: false
        };
        this.getAllGames();
    }

    getAllGames = () => {
        const path = `/mobile/game/getall?pageNumber=${this.state.pageNumber}&pageSize=${this.state.pageSize}&order=${this.state.orderBy}`;
        get(path).then((response) => {
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
                    Price: '0'
                };
            });
            this.setState({ allGames: data });
            this.setState({ isDone: true })
        });
    };

    changeModalVisibility = (props) => {
        this.state.setState('modalVisible', props);
    }

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

    gameItem = ({ item }) =>
        <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#FFFFFF", marginTop: 30, borderRadius: 5, shadowColor: "#000", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
            <View style={{ flex: 1, flexDirection: "row", height: 120 }}>
                <View style={{ width: '15%', alignItems: 'center', borderRightColor: "grey", borderRightWidth: 1, paddingTop: 10 }}>
                    <Text style={{ fontSize: 24, fontWeight: "bold", textTransform: 'uppercase' }}>{Moment(new Date(item.GameDate)).format('DD')}</Text>
                    <Text style={{ fontSize: 12, fontWeight: "bold", textTransform: 'uppercase' }}>{Moment(new Date(item.GameDate)).format('MMM')}</Text>
                </View>

                <View style={{ flex: 1, flexDirection: "column", width: '80%', paddingLeft: 10, paddingTop: 10 }}>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <LinearGradient
                            colors={[item.Team1Color1, item.Team1Color2]}
                            style={styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingLeft: 5 }}>{item.HomeTeam}</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <LinearGradient
                            colors={[item.Team2Color1, item.Team2Color2]}
                            style={styles.linearGradient}
                            start={[0, 0]}
                            end={[1, 0]}
                            locations={[0.5, 0.5]}
                        />
                        <Text style={{ fontSize: 14, fontWeight: "bold", textTransform: 'uppercase', paddingLeft: 5 }}>{item.AwayTeam}</Text>
                    </View>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 10 }}>{item.LeagueName}</Text>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase', marginTop: 5 }}>{item.City}</Text>
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
                    <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>{item.Price !== '0' && item.Price !== null ? item.Price + ' $' : 'request'}</Text>
                    <Image source={ImgArrowRight} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        </View>

    render() {
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
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }}
                            onPress={() => {
                                this.setState({ modalVisible: true });
                            }}>
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
                            onChangeItem={(item) => {
                                this.setState({ orderBy: item.value }, function () {
                                    this.getAllGames();
                                });
                            }
                            }
                            placeholder="SORT BY "
                        />
                    </View>
                    {/* filter picker end */}

                    {/* render games begin*/}
                    {!this.state.isDone ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 10 }} />
                        :
                        <View style={{ width: '90%', alignSelf: 'center', zIndex: 1 }}>
                            <FlatList
                                data={this.state.allGames}
                                renderItem={item => this.gameItem(item)}
                                keyExtractor={item => item.idMatch}
                            />
                        </View>
                    }
                    {/* render games end*/}

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={styles.modalView}>

                            <View style={{ width: '100%', height: '10%', borderBottomWidth: 1, borderBottomColor: '#eee', flex: 1, flexDirection: 'row' }}>
                                <Image source={ImgLogo} style={{ width: '50%', height: '90%', alignItems: 'flex-start' }}></Image>
                                <TouchableHighlight style={styles.closeButton}
                                    onPress={() => {
                                        this.setState({ modalVisible: false });
                                    }}>
                                    <Text style={styles.textStyle}>X</Text>
                                </TouchableHighlight>
                            </View>
                            <View style={{ width: '100%', height: '90%', backgroundColor: '#fff' }}>
                                <View style><Text>{translate('teams')}...</Text></View>
                                <View><Text>City...</Text></View>
                                <View><Text>Competitions...</Text></View>
                                <View><Text>Date...</Text></View>
                            </View>
                        </View>
                    </Modal>
                    <Chat />
                </View>
            </ScrollView >
        );
    }
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginTop: 30,
        marginBottom: 30,
        backgroundColor: "#EEEEEE",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    closeButton: {
        backgroundColor: '#EEE',
        width: 40,
        borderRadius: 180,
        alignSelf: 'center'
    },
    textStyle: {
        color: '#000',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
