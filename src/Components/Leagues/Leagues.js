import React, { useCallback } from 'react';
import { StyleSheet, Image, View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation } from '@react-navigation/native';

const Leagues = ({ leagues }) => {
    const navigation = useNavigation();
    const itemHeight = 140;

    const navigate = (item) => {
        navigation.navigate('allGames', { idLeague: item.LeagueId });
    }

    const renderItem = useCallback(
        ({ item }) =>
            <TouchableOpacity style={styles.league} height={itemHeight} onPress={()=>navigate(item)}>
                <Image style={styles.leagueImage} source={{ uri: item.ImageReference }} />
            </TouchableOpacity>
        , []
    );
    const keyExtractor = useCallback(
        (item) => "league-" + item.LeagueId, []
    );

    return (
        <FlatList
            data={leagues}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={(data, index) => (
                { length: itemHeight, offset: itemHeight * index, index }
            )}
            horizontal={false}
            numColumns={3} />
    );
};

const styles = StyleSheet.create({
    league: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20
    },
    leagueImage: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    },
});

export default Leagues;