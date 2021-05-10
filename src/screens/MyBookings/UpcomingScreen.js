import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { Invoice } from "components/Upcoming/Invoice";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class UpcomingScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            upComingInvoices: [],
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
        this.setState({ upComingInvoices, isLoading: false });
    }

    keyExtractor = (item, index) => {
        return "trip-" + index;
    }

    renderItem = ({ item }) => {
        return <Invoice invoice={item} navigation={this.props.navigation} />
    }

    render() {
        return (
            <View style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('upcoming')} image={R.images.trip_bg} />
                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                    :
                    <FlatList
                        data={this.state.upComingInvoices}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={this.keyExtractor}
                    />
                }
            </View>
        )
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
    }
});
