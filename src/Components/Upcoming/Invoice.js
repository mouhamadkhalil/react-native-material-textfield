import React from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from "react-native";
import { Game } from "components/Upcoming/Game";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export class Invoice extends React.PureComponent {

    constructor(props) {
        super(props);
    }

    keyExtractor = (item, index) => {
        return "invoice-" + index;
    }

    renderItem = ({ item }) => {
        return (
            <Game match={item} />
        );
    }


    render() {
        var invoice = this.props.invoice;
        return (
            <View style={styles.container}>
                {/* games */}
                <FlatList
                    data={invoice?.MatchBundleDetail}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                />
                {/* trip details */}
                <View>
                    {/* trip date */}
                    <View style={R.styles.flexRow}>
                        <View style={styles.whiteBlock} />
                        <Text style={styles.details}>
                            {moment(invoice?.StartDate).format('DD') + " - " + moment(invoice?.EndDate).format('DD MMM')}
                        </Text>
                    </View>
                    {/* trip city */}
                    <View style={R.styles.flexRow}>
                        <View style={styles.whiteBlock} />
                        <Text style={styles.details}>
                            {invoice && invoice.MatchBundleDetail && invoice.MatchBundleDetail.length > 0 ?
                                invoice?.MatchBundleDetail[0]?.Game?.City : ""}
                        </Text>
                    </View>
                    {/* fans */}
                    <View style={R.styles.flexRow}>
                        <View style={styles.whiteBlock} />
                        <Text style={[styles.details, { marginBottom: 10 }]}>
                            {invoice?.NumberOfTravelers + " " + translate('fans')}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', backgroundColor: '#F7F7F7', height: 80, justifyContent: 'space-between' }}>
                    <View style={styles.price}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {translate('total')}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: R.colors.blue }}>
                            {invoice?.FinalPrice}$
                        </Text>
                    </View>
                    <View style={styles.price}>
                        <Text style={{ fontWeight: 'bold' }}>
                            {translate('pending')}
                        </Text>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'red' }}>
                            {invoice?.PendingPayment}$
                        </Text>
                    </View>
                </View>
                <TouchableOpacity style={styles.button} onPress={() => { this.props.navigation.navigate('upcomingDetails', { invoice: invoice }) }}>
                    <Text style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>
                        {translate('view')}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        margin: 15,
    },
    whiteBlock: {
        width: 100,
        borderRightWidth: 1,
        borderRightColor: "#eee"
    },
    details: {
        marginStart: 20,
        marginTop: 5,
        textTransform: 'uppercase'
    },
    price: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        height: 50,
        backgroundColor: R.colors.lightGreen,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
