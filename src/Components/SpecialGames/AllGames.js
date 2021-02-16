import React, { useState } from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, Image, Button, ScrollView, View, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import Moment from 'moment';
import { LinearGradient } from 'expo-linear-gradient';
import { get, servicesUrl } from "../../helpers/services.js";
import { translate } from "../../helpers/utils.js";
import DatepickerRange from 'react-native-range-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Chat from "../FanChat/chat";
import moment from 'moment';
import R from "res/R";

export default class AllGames extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            idMatch: props?.route?.params?.idMatch,
            idTeam: props?.route?.params?.idTeam,
            idCity: props?.route?.params?.idCity,
            idLeague: props?.route?.params?.idLeague,
            teams: [],
            cities: [],
            competitions: [],
            allGames: [],
            isLoading: false,
            isLoadingMore: false,
            pageCount: 1,
            pageNumber: 1,
            pageSize: 10,
            orderBy: "date",
            fromDate: null,
            toDate: null,
            modalVisible: false,
            ddlTeams: null,
            ddlCities: null,
            ddlLeagues: null,
            showDatePicker: false,
        };
    }

    componentDidMount() {
        try {
            this.getAllGames();
            this.getFilterData();
        } catch { }
    }

    getAllGames = () => {
        const pageNumber = this.state.pageNumber > 0 ? this.state.pageNumber : 1;
        const pageSize = this.state.pageSize > 0 ? this.state.pageSize : 10;
        const orderBy = this.state.orderBy !== '' ? this.state.orderBy : 'date';
        const fromDate = this.state.fromDate ? '&date1=' + this.state.fromDate.format('yyyy-MM-DD') : '';
        const toDate = this.state.toDate ? '&date2=' + this.state.toDate.format('yyyy-MM-DD') : '';
        const idTeam = this.state.idTeam ? '&idTeam=' + this.state.idTeam : '';
        const idCity = this.state.idCity ? '&idCity=' + this.state.idCity : '';
        const idLeague = this.state.idLeague ? '&idLeague=' + this.state.idLeague : '';
        const path = `/mobile/game/getall?pageNumber=${pageNumber}&pageSize=${pageSize}&order=${orderBy}${fromDate}${toDate}${idTeam}${idCity}${idLeague}`;
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
                    Price: item.FinalPricePerFan
                };
            });
            var joined = this.state.allGames.concat(data);
            this.setState({ allGames: joined, pageCount: response.PageCount, isLoading: false, isLoadingMore: false });
        });
    };

    getFilterData = () => {
        get(servicesUrl.getAllTeams).then((response) => {
            var teams = response.map(function (team) {
                return {
                    value: team.idTeams,
                    label: team.TeamName,
                };
            });
            this.setState({ teams: teams });
        });

        get(servicesUrl.getAllCities).then((response) => {
            var cities = response.map(function (city) {
                return {
                    value: city.ID,
                    label: city.Value,
                };
            });
            this.setState({ cities: cities });
        });

        get(servicesUrl.getAllLeagues).then((response) => {
            var competitions = response.map(function (comp) {
                return {
                    value: comp.ID,
                    label: comp.Value,
                };
            });
            this.setState({ competitions: competitions });
        });
    }

    loadMore = () => {
        this.setState({ isLoadingMore: true, pageNumber: this.state.pageNumber + 1 }, () => {
            this.getAllGames();
        });
    };

    applyFilter = () => {
        this.setState({ isLoading: true, pageNumber: 1, allGames: [], modalVisible: false }, () => {
            this.getAllGames();
        });
    }

    changeModalVisibility = (props) => {
        this.state.setState('modalVisible', props);
    };

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.pageCount > this.state.pageNumber ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMore}
                        style={{ backgroundColor: "#4AD219", width: 150, height: 50, alignSelf: "center", alignItems: 'center', justifyContent: 'center', marginTop: 20, borderRadius: 20, zIndex: 100 }}>
                        <Text style={{ color: "white", fontWeight: "bold", textTransform: 'uppercase' }} >{translate('loadMore')}</Text>
                        {this.state.isLoadingMore ? (
                            <ActivityIndicator color="#fff" />
                        ) : null}
                    </TouchableOpacity>
                ) : null}
            </View>
        );
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
                            <Image source={R.images.flag_grey} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ borderTopColor: 'grey', borderTopWidth: 1, paddingTop: 10, marginTop: 10 }}>
                        <TouchableOpacity style={{ width: 20, height: 20 }}>
                            <Image source={R.images.share} style={{ width: 20, height: 20 }} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', height: 50, marginTop: 10, borderTopColor: "grey", borderTopWidth: 1 }}>
                <View style={{ alignSelf: 'flex-start', width: '60%' }}>
                    {item.Price > 0 && item.Price != null ?
                        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ paddingStart: 10, fontSize: 20, fontWeight: "bold" }}>{item.Price}$</Text>
                            <Text>/{translate('fan')}</Text>
                        </View>
                        : null
                    }
                </View>
                <TouchableOpacity
                    style={{
                        flexDirection: 'row', alignSelf: 'flex-end',
                        alignItems: 'center', justifyContent: 'center', width: '40%', height: '100%', backgroundColor: '#76ff02'
                    }}
                    onPress={() => this.props.navigation.navigate('request')}>
                    <Text style={{ fontSize: 14, textTransform: 'uppercase' }}>{item.Price > 0 && item.Price != null ? 'book now' : 'request'}</Text>
                    <Image source={R.images.arrowRight} style={{ marginLeft: 10 }} />
                </TouchableOpacity>
            </View>
        </View>;

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {/* banner begin*/}
                    <View>
                        <Image source={R.images.all_games_bg} style={{ width: '100%' }} />
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
                            <Image source={R.images.arrow_down} style={{ width: 12, height: 12, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }}>
                            <Image source={R.images.calendar_grey} style={{ width: 20, height: 20 }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                            <Image source={R.images.list_grey} style={{ width: 20, height: 20 }}></Image>
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
                                { label: translate("date"), value: "date" },
                                { label: "PRICE", value: "price" },
                            ]}
                            defaultValue={this.state.orderBy}
                            containerStyle={{ height: 30 }}
                            selectedLabelStyle={{ color: '#374bbf', textDecorationLine: 'underline' }}
                            style={{ backgroundColor: "#EEEEEE", borderWidth: 0, width: 100 }}
                            itemStyle={{ justifyContent: "flex-start", textTransform: 'uppercase' }}
                            arrowStyle={{ color: 'red' }}
                            dropDownStyle={{ width: 100 }}
                            onChangeItem={(item) => {
                                this.setState({ orderBy: item.value }, function () {
                                    this.getAllGames();
                                });
                            }
                            }
                            placeholder={translate('sortBy') + ' '}
                            placeholderStyle={{ textTransform: 'uppercase' }}
                        />
                    </View>
                    {/* filter picker end */}

                    {/* render games begin*/}
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120, marginLeft: 10 }} />
                        :
                        <View style={{ width: '90%', alignSelf: 'center', zIndex: 1 }}>
                            <FlatList
                                data={this.state.allGames}
                                renderItem={item => this.gameItem(item)}
                                keyExtractor={item => item.idMatch.toString()}
                                ListFooterComponent={this.renderFooter.bind(this)}
                            />
                        </View>
                    }
                    {/* render games end*/}

                    {/* Filter modal begin*/}
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}>
                        <View style={styles.modalView}>
                            <View style={{ flex: 1, flexDirection: 'row', width: '100%', height: '10%', backgroundColor: '#eee', borderBottomColor: '#eee', borderBottomWidth: 1 }}>
                                <View style={{ width: '80%', height: '100%', padding: 10 }}>
                                    <Image source={R.images.flyfoot_grey}></Image>
                                </View>
                                <View style={{ width: '20%', height: '100%', backgroundColor: '#000', alignContent: 'center', justifyContent: 'center' }}>
                                    <TouchableHighlight
                                        onPress={() => {
                                            this.setState({ modalVisible: false });
                                        }}>
                                        <Icon name='close-outline' style={styles.textStyle} />
                                    </TouchableHighlight>
                                </View>
                            </View>
                            <View style={{ width: '100%', height: '90%', backgroundColor: '#fff' }}>
                                <View style={{ height: 200 }}>
                                    {/* Teams drop down list */}
                                    <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                                        <DropDownPicker
                                            items={this.state.teams}
                                            defaultValue={this.state.idTeam}
                                            controller={instance => this.state.ddlTeams = instance}
                                            containerStyle={{ width: '90%', height: 50 }}
                                            style={{
                                                borderWidth: 0, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0,
                                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                                            }}
                                            itemStyle={{ justifyContent: "flex-start", }}
                                            showArrow={false}
                                            dropDownStyle={{ width: '110%' }}
                                            labelStyle={{ fontSize: 14, textAlign: 'left', }}
                                            selectedLabelStyle={{ color: '#3333ff', fontWeight: 'bold', }}
                                            activeLabelStyle={{ color: '#3333ff' }}
                                            onOpen={() => {
                                                this.state.ddlCities.close();
                                                this.state.ddlLeagues.close();
                                            }}
                                            onChangeItem={(item) => { this.setState({ idTeam: item.value }) }}
                                            placeholder={translate('team') + '...'}
                                            placeholderStyle={{ color: 'black', textTransform: 'uppercase' }}
                                            searchable={true}
                                            searchablePlaceholder={translate('searchTeam')}
                                            searchablePlaceholderTextColor="gray"
                                            searchableError={() => <Text>{translate('msgNotFound')}</Text>}
                                        />
                                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center' }}
                                            onPress={() => {
                                                this.setState({ idTeam: 0 })
                                                this.state.ddlTeams.reset();
                                                this.state.ddlTeams.close();
                                                this.state.ddlCities.close();
                                                this.state.ddlLeagues.close();
                                            }}>
                                            <Icon name='close-outline' style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Cities drop down list */}
                                    <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                                        <DropDownPicker
                                            items={this.state.cities}
                                            defaultValue={this.state.idCity}
                                            controller={instance => this.state.ddlCities = instance}
                                            containerStyle={{ width: '90%', height: 50 }}
                                            style={{
                                                borderWidth: 0, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0,
                                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                                            }}
                                            itemStyle={{ justifyContent: "flex-start", }}
                                            showArrow={false}
                                            dropDownStyle={{ width: '110%' }}
                                            labelStyle={{ fontSize: 14, textAlign: 'left', }}
                                            selectedLabelStyle={{ color: '#3333ff', fontWeight: 'bold', }}
                                            activeLabelStyle={{ color: '#3333ff' }}
                                            onOpen={() => {
                                                this.state.ddlTeams.close();
                                                this.state.ddlLeagues.close();
                                            }}
                                            onChangeItem={(item) => { this.setState({ idCity: item.value }) }}
                                            placeholder={translate('city') + '...'}
                                            placeholderStyle={{ color: 'black', textTransform: 'uppercase' }}
                                            searchable={true}
                                            searchablePlaceholder={translate('searchCity')}
                                            searchablePlaceholderTextColor="gray"
                                            searchableError={() => <Text>{translate('msgNotFound')}</Text>}
                                        />
                                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center' }}
                                            onPress={() => {
                                                this.setState({ idCity: 0 })
                                                this.state.ddlCities.reset();
                                                this.state.ddlTeams.close();
                                                this.state.ddlCities.close();
                                                this.state.ddlLeagues.close();
                                            }}>
                                            <Icon name='close-outline' style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Competitions drop down list */}
                                    <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                                        <DropDownPicker
                                            items={this.state.competitions}
                                            defaultValue={this.state.idLeague}
                                            controller={instance => this.state.ddlLeagues = instance}
                                            containerStyle={{ width: '90%', height: 50 }}
                                            style={{
                                                borderWidth: 0, width: '100%', borderTopLeftRadius: 0, borderTopRightRadius: 0,
                                                borderBottomLeftRadius: 0, borderBottomRightRadius: 0
                                            }}
                                            itemStyle={{ justifyContent: "flex-start", }}
                                            showArrow={false}
                                            dropDownStyle={{ width: '110%' }}
                                            labelStyle={{ fontSize: 14, textAlign: 'left', }}
                                            selectedLabelStyle={{ color: '#3333ff', fontWeight: 'bold', }}
                                            activeLabelStyle={{ color: '#3333ff' }}
                                            onOpen={() => {
                                                this.state.ddlTeams.close();
                                                this.state.ddlCities.close();
                                            }}
                                            onChangeItem={(item) => { this.setState({ idLeague: item.value }) }}
                                            placeholder={translate('competitions') + '...'}
                                            placeholderStyle={{ color: 'black', textTransform: 'uppercase' }}
                                            searchable={true}
                                            searchablePlaceholder={translate('searchCompetition')}
                                            searchablePlaceholderTextColor="gray"
                                            searchableError={() => <Text>{translate('msgNotFound')}</Text>}
                                        />
                                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center' }}
                                            onPress={() => {
                                                this.setState({ idLeague: 0 })
                                                this.state.ddlLeagues.reset();
                                                this.state.ddlTeams.close();
                                                this.state.ddlCities.close();
                                                this.state.ddlLeagues.close();
                                            }}>
                                            <Icon name='close-outline' style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>

                                    {/* Date pickers */}
                                    <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
                                        <TouchableOpacity
                                            onPress={() => { this.setState({ showDatePicker: true }) }}
                                            style={{ width: '90%' }}>
                                            <View style={{ flexDirection: 'row', padding: 18 }}>
                                                <Text
                                                    style={{ fontSize: 14, textTransform: 'uppercase' }}>
                                                    {translate('date')}
                                                </Text>
                                                <Text style={{ paddingStart: 15 }}>
                                                    {this.state.fromDate?.format('DD/MM/yyyy')} - {this.state.toDate?.format('DD/MM/yyyy')}</Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center' }}>
                                            <Icon name='close-outline' style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={this.applyFilter} style={{ width: '50%', marginTop: 20, padding: 20, backgroundColor: R.colors.greenLight, alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 15, textTransform: 'uppercase', alignSelf: 'center' }}>
                                        {translate('applyFilters')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            {this.state.showDatePicker ?
                                <View style={{
                                    flex: 1,
                                    width: '100%',
                                    height: '100%', position: 'absolute'
                                }}>
                                    <DatepickerRange
                                        startDate={moment().format("DDMMyyyy")}
                                        untilDate={moment().add(1, 'year').format("DDMMyyyy")}
                                        placeHolderStart='Start Date'
                                        placeHolderUntil='Until Date'
                                        selectedBackgroundColor={R.colors.blue}
                                        buttonColor={R.colors.blue}
                                        onClose={() => this.setState({ showDatePicker: false })}
                                        onConfirm={(fromDate, toDate) => this.setState({ fromDate, toDate, showDatePicker: false })}
                                    />
                                </View>
                                : null}
                        </View>
                    </Modal>
                    {/* Filter modal end*/}

                    <Chat />
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
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    },
    closeButton: {
        backgroundColor: '#000',
        alignSelf: 'flex-end',
        color: '#fff'
    },
    textStyle: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
});
