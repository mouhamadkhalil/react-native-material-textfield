import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ActivityIndicator,
    FlatList
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackground } from "components/Common/HeaderBackground";
import Leagues from "components/Leagues/Leagues";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class LeaguesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allLeagues: [{
                Category: '',
                Leagues: []
            }],
            isLoading: true
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    // get the data from the async storage
    getData = async () => {
        var allLeagues = JSON.parse(await AsyncStorage.getItem('@allLeagues'));
        this.setState({ allLeagues, isLoading: false });
    }

    keyExtractor = (item) => {
        return "league-" + item.Category;
    }

    /* render header background */
    renderHeader = () => {
        return (
            <>
                {/* banner */}
                <HeaderBackground title={translate('leagues')} image={R.images.leagues_bg} />
            </>
        );
    };

    /* reader leagues */
    renderItem = ({ item }) => {
        return (
            this.state.isLoading ?
                <ActivityIndicator size='large' color={R.colors.blue} />
                :
                <View style={styles.LeaguesWrap}>
                    <Text style={styles.country}>
                        {item.Category}
                    </Text>
                    <Leagues leagues={item.Leagues} />
                </View>
        );
    }

    render() {
        return (
            <View style={[R.styles.whiteContainer, styles.container]}>
                <FlatList
                    data={this.state.allLeagues}
                    ListHeaderComponent={this.renderHeader}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 60
    },
    country: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    LeaguesWrap: {
        marginStart: 15,
        marginEnd: 15,
        justifyContent: 'center',
        alignContent: 'center'
    },
});