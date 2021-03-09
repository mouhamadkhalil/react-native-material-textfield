import React from 'react';
import { StyleSheet, Modal, TouchableHighlight, Text, Image, Platform, ScrollView, View, ActivityIndicator, TouchableOpacity, FlatList } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import DatepickerRange from 'react-native-range-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from "components/Common/HeaderBackground";
import ListItem from 'components/AllGames/ListItem';
import CalendarItem from 'components/AllGames/CalendarItem';
import { get, getWithToken, servicesUrl } from "helpers/services.js";
import { getTripDays } from 'helpers/tripHelper.js';
import { translate } from "helpers/utils.js";
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
            gamesList: [],
            gamesCalendar: [],
            isLoading: true,
            isLoadingMore: false,
            pageCount: 1,
            pageNumber: 1,
            pageSize: 15,
            viewMode: 'list',
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

    getAllGames = (orderBy = '', reload = true) => {
        if (orderBy === '')
            orderBy = this.state.orderBy;
        const pageNumber = reload ? 1 : this.state.pageNumber;
        const pageSize = this.state.pageSize;
        const fromDate = this.state.fromDate ? '&date1=' + this.state.fromDate.format('yyyy-MM-DD') : '';
        const toDate = this.state.toDate ? '&date2=' + this.state.toDate.format('yyyy-MM-DD') : '';
        const idTeam = this.state.idTeam ? '&idTeam=' + this.state.idTeam : '';
        const idCity = this.state.idCity ? '&idCity=' + this.state.idCity : '';
        const idLeague = this.state.idLeague ? '&idLeague=' + this.state.idLeague : '';
        const params = `?pageNumber=${pageNumber}&pageSize=${pageSize}&order=${orderBy}${fromDate}${toDate}${idTeam}${idCity}${idLeague}`;
        getWithToken(servicesUrl.getAllGames + params).then((response) => {
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
                    HomeTeam: game.HomeTeamShortName,
                    AwayTeam: game.AwayTeamShortName,
                    StadeCity: game.StadeCity,
                    Team1Color1: game.Team1Color1,
                    Team1Color2: game.Team1Color2,
                    Team2Color1: game.Team2Color1,
                    Team2Color2: game.Team2Color2,
                    Price: item.FinalPricePerFan,
                    Flagged: item.Flagged,
                    TripDays: getTripDays(item.StartDate, item.EndDate),
                };
            });
            var joined = data;
            if (!reload)
                joined = this.state.gamesList.concat(data);
            this.setState({ gamesList: joined, pageNumber, pageCount: response.PageCount, isLoading: false, isLoadingMore: false });
        });
    };

    getGameCalendar = (orderBy = '') => {
        const fromDate = this.state.fromDate ? '&date1=' + this.state.fromDate.format('yyyy-MM-DD') : '';
        const toDate = this.state.toDate ? '&date2=' + this.state.toDate.format('yyyy-MM-DD') : '';
        const idTeam = this.state.idTeam ? '&idTeam=' + this.state.idTeam : '';
        const idCity = this.state.idCity ? '&idCity=' + this.state.idCity : '';
        const idLeague = this.state.idLeague ? '&idLeague=' + this.state.idLeague : '';
        const params = `?order=${orderBy}${fromDate}${toDate}${idTeam}${idCity}${idLeague}`;

        getWithToken(servicesUrl.getGameCalendar + params).then((response) => {
            var gamesCalendar = [];
            response.map((month) => {
                return month.Days.map((day) => {
                    gamesCalendar.push(day)
                })
            })
            this.setState({ gamesCalendar, isLoading: false })
        })
    }

    getFilterData = async () => {
        var teams, cities, competitions;
        await get(servicesUrl.getAllTeams).then((response) => {
            teams = response.map(function (team) {
                return {
                    value: team.idTeams,
                    label: team.TeamName,
                };
            });
        });

        await get(servicesUrl.getAllCities).then((response) => {
            cities = response.map(function (city) {
                return {
                    value: city.ID,
                    label: city.Value,
                };
            });
        });

        await get(servicesUrl.getAllLeagues).then((response) => {
            competitions = response.map(function (comp) {
                return {
                    value: comp.ID,
                    label: comp.Value,
                };
            });

        });
        this.setState({ teams, cities, competitions });
    }

    reload = (orderBy = '', viewMode = '') => {
        if (orderBy === this.state.orderBy && viewMode === this.state.viewMode)
            return;

        if (orderBy === '')
            orderBy = this.state.orderBy;
        if (viewMode === '')
            viewMode = this.state.viewMode;

        this.setState({ isLoading: true, orderBy, viewMode, modalVisible: false }, () => {
            switch (viewMode) {
                case 'list':
                    this.getAllGames(orderBy, true);
                    break;
                case 'calendar':
                    this.getGameCalendar(orderBy);
                    break;
            }
        })
    }

    loadMore = () => {
        if (!this.state.isLoadingMore) {
            this.setState({ isLoadingMore: true, pageNumber: this.state.pageNumber + 1 }, () => {
                this.getAllGames('', false);
            });
        }
    };

    renderItem = ({ item }) => {
        return this.state.viewMode === 'list' ? <ListItem item={item} /> : <CalendarItem item={item} />
    }

    renderFooter = () => {
        return (
            //Footer View with Load More button
            <View >
                {this.state.pageCount > this.state.pageNumber ? (
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={this.loadMore}
                        style={[R.styles.loadMoreButton, { marginTop: 20 }]}>
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

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    {/* banner */}
                    <HeaderBackground title={translate('allGames')} image={R.images.trip_bg}></HeaderBackground>

                    {/* filter */}
                    <View style={{ flex: 1, flexDirection: 'row', backgroundColor: "white", width: '90%', height: 70, marginTop: -35, alignSelf: 'center', shadowColor: "grey", shadowOffset: { width: 0, height: 5, }, shadowOpacity: 0.5, shadowRadius: 5.84, elevation: 5 }}>
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'row', width: '60%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }}
                            onPress={() => {
                                this.setState({ modalVisible: true });
                            }}>
                            <Text style={{ fontSize: 20, color: '#6E6E6E', textTransform: 'uppercase' }}>
                                {translate('filter')}
                            </Text>
                            <Image source={R.images.arrow_down} style={{ width: 12, height: 12, marginStart: 20 }} />
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center', borderRightWidth: 1, borderRightColor: 'grey' }}
                            onPress={() => this.reload('', 'calendar')}>
                            <Image source={this.state.viewMode === 'calendar' ? R.images.calendar_blue : R.images.calendar_grey} style={{ width: 20, height: 20, resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ width: '20%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
                            onPress={() => this.reload('', 'list')}>
                            <Image source={this.state.viewMode === 'list' ? R.images.list_blue : R.images.list_grey} style={{ width: 20, height: 20, resizeMode: 'contain' }}></Image>
                        </TouchableOpacity>
                    </View>

                    {/* order by*/}
                    {this.state.viewMode === 'list' ?
                        <View style={{
                            flex: 1, flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', width: '90%', height: 20, marginTop: 10, ...(Platform.OS !== 'android' && {
                                zIndex: 10
                            })
                        }}>
                            <Text style={{ fontSize: 14, color: R.colors.blue, alignSelf: 'center', textTransform: 'uppercase', marginTop: 10, zIndex: 2 }}>
                                {translate('sortBy')}
                            </Text>
                            <DropDownPicker
                                items={[
                                    { label: translate("date"), value: "date" },
                                    { label: translate("price"), value: "price" },
                                ]}
                                defaultValue={this.state.orderBy}
                                containerStyle={{ height: 30 }}
                                selectedLabelStyle={{ color: R.colors.blue, textDecorationLine: 'underline' }}
                                style={{ backgroundColor: '#eee', borderWidth: 0, width: 100, marginStart: -10 }}
                                itemStyle={{ justifyContent: "flex-start", textTransform: 'uppercase' }}
                                arrowStyle={{ color: 'red' }}
                                dropDownStyle={{ width: 100 }}
                                onChangeItem={(item) => {
                                    this.reload(item.value)
                                }
                                }
                                placeholder={translate('sortBy') + ' '}
                                placeholderStyle={{ textTransform: 'uppercase' }}
                            />
                        </View>
                        : null}

                    {/* render games */}
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                        :
                        <View style={{ width: '90%', alignSelf: 'center', zIndex: 1 }}>
                            <FlatList
                                data={this.state.viewMode === 'list' ?
                                    this.state.gamesList
                                    :
                                    this.state.gamesCalendar}
                                renderItem={this.renderItem}
                                keyExtractor={(item, index) => 'item' + index}
                                ListFooterComponent={this.state.viewMode === 'list' ?
                                    this.renderFooter.bind(this)
                                    : null}
                            />
                        </View>
                    }

                    {/* Filter modal */}
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
                                                    {this.state.fromDate?.format('DD/MM/yyyy')} - {this.state.toDate?.format('DD/MM/yyyy')}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{ width: '10%', justifyContent: 'center' }}
                                            onPress={() => { this.setState({ fromDate: null, toDate: null }) }}>
                                            <Icon name='close-outline' style={{ fontSize: 20 }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <TouchableOpacity onPress={()=>this.reload()} style={{ width: '50%', marginTop: 20, padding: 20, backgroundColor: R.colors.lightGreen, alignSelf: 'center' }}>
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
                </View>
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 30,
        backgroundColor: '#eee'
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
