import React from "react";
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    Image,
    ImageBackground,
    ActivityIndicator,
    TouchableOpacity
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckBox } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import * as services from "services/myBooking";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class UpcomingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upComingInvoices: [],
            customerStatuses: [],
            isSettingStatus: false,
            isLoading: true,
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    // get the data from the async storage
    getData = async () => {
        var upComingInvoices = JSON.parse(await AsyncStorage.getItem('@upComingInvoices'));
        var customerStatuses = JSON.parse(await AsyncStorage.getItem('@customerStatuses'));
        this.setState({ upComingInvoices, customerStatuses, isLoading: false });
    }

    setStatus = async (statusId) => {
        try {
            this.setState({ isSettingStatus: true }, async() => {
                var user = global.user;
                var status =
                {
                    idCustomerStatus: statusId,
                    contactModel: {
                        fullName: user.FullName,
                        address: user.Address,
                        phone: user.PhoneNumber,
                        email: user.Email,
                        description: user.Description
                    }
                }
                var response = await services.setStatus(status);
                if (response) {
                    var customerStatuses = response
                    this.setState({ customerStatuses, isSettingStatus: false });
                    AsyncStorage.setItem("@customerStatuses", JSON.stringify(customerStatuses))
                }
            });
        } catch (error) {
            this.setState({ isSettingStatus: false });
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    navigateToGuide = (type) => {
        var screenName = 'whatToDo';
        switch (type) {
            case 2: screenName = 'whereToEat'
                break;
        }
        this.props.navigation.navigate(screenName)
    }

    renderGuide = ({ type }) => {
        return <TouchableOpacity onPress={() => this.navigateToGuide(type)}>
            <LinearGradient style={styles.guideBox}
                colors={type == 1 ? ["#5D05D5", "#8B22AC"] : ["#DA353D", "#FF6310"]}
                start={[0, 0]}
                end={[0, 1]}
                locations={[0, 1]}>
                <Text style={styles.guideCategory}>
                    Guide
                </Text>
                <Text style={styles.guideName}>
                    {type == 1 ? "What to do" : "Where to eat"}
                </Text>
                <Image source={type == 1 ? R.images.guideWhatToDo : R.images.guideWhereToEat} />
            </LinearGradient>
        </TouchableOpacity>
    }

    renderOther = ({ type }) => {
        return <ImageBackground style={styles.otherBox} source={type == 1 ? R.images.otherDownloadFlights : null} resizeMode="cover" >
            <Text style={styles.otherName}>{type == 1 ? "Download Flights" : ""}</Text>
        </ImageBackground>
    }

    renderTour = ({ name, background }) => {
        return <ImageBackground style={styles.otherBox} source={background} resizeMode="cover" >
            <Text style={styles.tourCategory}>Tour</Text>
            <Image source={R.images.tourLocation} />
            <Text style={styles.otherName}>{name}</Text>
        </ImageBackground>
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <View style={styles.pageHeader}>
                    <Text style={styles.pageTitle}>Day 3</Text>
                    <Text style={styles.plannedActivities}>3 planned activities</Text>
                    <Image source={R.images.arrow_down} style={styles.expandArrow} />
                    <LinearGradient
                        colors={["#0000000f", "#fff"]}
                        style={styles.linearGradient}
                        start={[0, 0]}
                        end={[0, 1]}
                        locations={[0, 1]}
                    >
                    </LinearGradient>
                </View>
                {this.state.customerStatuses.length > 0 ?
                    <View style={{ backgroundColor: R.colors.lightGreen, margin: 15, padding: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>{this.state.customerStatuses[0].Title}</Text>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }} >
                            <Text>{this.state.customerStatuses[0].Caption}</Text>
                            {this.state.isSettingStatus ?
                                <ActivityIndicator color={R.colors.blue} size='small' />
                                :
                                <CheckBox
                                    containerStyle={{ margin: 0, padding: 0 }}
                                    checkedColor='black'
                                    uncheckedColor='black'
                                    onPress={() => this.setStatus(this.state.customerStatuses[0].id)} />
                            }
                        </View>
                    </View>
                    : null}
                <View style={{ flex: 1 }}>
                    <View style={styles.pageContent} contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.weatherBox}>
                            <Image style={styles.weatherIcon} source={R.images.weather} />
                            <Text style={styles.weatherText}>Chance of rain in Barcelona, don’t forget your umbrella!</Text>
                            <Text style={styles.weatherTemp}>23°</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            {this.renderOther({ type: 1 })}
                            <View style={styles.spacer}></View>
                            {this.renderTour({ name: "Sagrada Familia", background: require("../../../assets/images/tours/tour-sagrada.png") })}
                        </View>
                        {this.renderGuide({ type: 1 })}
                        {this.renderGuide({ type: 2 })}
                        <View style={{ flexDirection: "row" }}>
                            {this.renderTour({ name: "Gaudi", background: require("../../../assets/images/tours/tour-gaudi.png") })}
                            <View style={styles.spacer}></View>
                            {this.renderOther({ type: 1 })}
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    };

}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%"
    },
    pageHeader: {
        alignItems: "center",
        paddingTop: 10,
        backgroundColor: "#f7f7f7"
    },
    pageTitle: {
        fontSize: 70,
        color: "#374BBF",
        textTransform: "uppercase"
    },
    plannedActivities: {
        fontSize: 16,
        color: "#374BBF"
    },
    expandArrow: {
        marginTop: 15
    },
    pageContent: {
        padding: 15,
        flex: 1,
    },
    linearGradient: {
        width: "100%",
        height: 25,
        marginTop: 15
    },
    weatherBox: {
        backgroundColor: "#f7f7f7",
        padding: 15,
        marginBottom: 15,
        flexDirection: "row",
        borderRadius: 7,
        alignItems: "center"
    },
    weatherIcon: {
        flex: 0
    },
    weatherText: {
        flex: 1,
        marginHorizontal: 15,
        fontSize: 12
    },
    weatherTemp: {
        fontSize: 45,
        color: "#374BBF"
    },
    guideBox: {
        borderRadius: 7,
        padding: 30,
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between",
        height: 150,
        marginBottom: 15
    },
    guideCategory: {
        fontWeight: "bold",
        color: "white",
        fontSize: 14,
        flexBasis: "100%",
        flexGrow: 1
    },
    guideName: {
        color: "white",
        flex: 0,
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 20
    },
    guideIcon: {
        alignSelf: "baseline"
    },
    otherBox: {
        borderRadius: 7,
        padding: 15,
        height: 150,
        marginBottom: 15,
        flex: 1,
        flexBasis: "48%",
        justifyContent: "space-between",
        flexWrap: "wrap",
        flexDirection: "row",
        alignContent: "space-between"
    },
    otherName: {
        fontSize: 25,
        color: "#fff",
        fontWeight: "bold",
        marginTop: "auto",
        flex: 0,
        width: "100%"
    },
    tourCategory: {
        fontWeight: "bold",
        color: "white",
        fontSize: 14,
        flex: 0
    },
    tourIcon: {
        flex: 0,
        marginRight: 30
    },
    spacer: {
        width: 15,
        flex: 0,

    }
});
