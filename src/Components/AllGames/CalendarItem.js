import React, { useCallback } from 'react';
import { StyleSheet, Text, View, FlatList } from "react-native";
import Moment from 'moment';
import MatchItem from 'components/AllGames/MatchItem';

const CalendarItem = ({ item }) => {
    const itemHeight = 140;
    const renderItem = useCallback(
        ({ item }) => <MatchItem item={item} height={itemHeight} />, []
    );
    const keyExtractor = useCallback(
        (item) => "match" + item.idMatch, []
    );

    return (
        <View style={styles.container}>
            <View style={{ borderBottomColor: '#fff', borderBottomWidth: 1 }}>
                <Text style={styles.day} >
                    {Moment(item.Day).format('DD') + ' ' + Moment(item.Day).format('MMMM')}
                </Text>
            </View>
            <Text style={{ marginTop: 10 }} >{Moment(item.Day).format('dddd')}</Text>
            <View >
                <FlatList
                    data={item.Matches}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    getItemLayout={(data, index) => (
                        { length: itemHeight, offset: itemHeight * index, index }
                    )}
                    horizontal={false}
                    numColumns={2} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    day: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#fff'
    }
})

export default CalendarItem;