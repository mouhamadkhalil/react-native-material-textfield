import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { CheckBox } from 'react-native-elements';
import Svg from 'react-native-remote-svg';
import { translate } from "helpers/utils.js";
import R from "res/R";

export class Stadium extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            matchBundleDetails: []
        };
    }

    selectSeat = (option, index) => {
        this.props.selectSeat({ ...option }, index);
    }

    keyExtractor = (item) => {
        return 'stade-' + item.idMatchBundleDetail
    }

    renderItem = ({ item, index }) => {
        return (
            /* stadium */
            <View style={[R.styles.flexColumn, styles.container]}>
                <Text style={styles.title}>
                    {translate('stadium')}
                </Text>

                {/* stadium map */}
                <View style={[R.styles.flexColumn, styles.stadiumMapContainer]}>
                    <Text style={styles.stadeName}>
                        {item.Game.Stade}
                    </Text>
                    <View style={styles.imageContainer}>
                        <Svg source={{ uri: item.GameSeat.StadiumMap_SVG_v3 }} style={styles.image} />
                    </View>
                </View>

                {/* seating options */}
                <View style={styles.seatingOptionsContainer}>
                    <Text style={styles.seatingOptions}>
                        {translate('seatingOptions')}
                    </Text>
                    <View>
                        {item.GameSeats.map((option) => {
                            const checked = item.GameSeat.SeatCode === option.SeatCode;
                            return (
                                <CheckBox key={'seat-' + option.SeatCode} title={
                                    <View style={styles.checkboxText}>
                                        <Text style={{ color: checked ? 'white' : 'black' }}>
                                            {option.SeatCode}
                                        </Text>
                                        <Text style={{ color: checked ? 'white' : 'black' }}>
                                            +{option.ExtraCostPerFan}$
                                        </Text>
                                    </View>}
                                    checked={checked}
                                    containerStyle={checked ? styles.checkboxContainerActive : styles.checkboxContainerInActive}
                                    checkedColor='white'
                                    checkedIcon='dot-circle-o'
                                    uncheckedIcon='circle-o'
                                    onPress={() => this.selectSeat(option, index)}
                                />
                            );
                        })}
                    </View>
                </View>
            </View>
        )
    }
    render() {
        return (
            <FlatList
                data={this.props.matchBundleDetails}
                extraData={this.props}
                keyExtractor={this.keyExtractor}
                renderItem={this.renderItem}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50
    },
    title: {
        color: R.colors.grey,
        fontWeight: "bold",
        fontSize: 20
    },
    stadeName: {
        fontSize: 16,
        textTransform: 'uppercase'
    },
    stadiumMapContainer: {
        backgroundColor: R.colors.lightGrey,
        height: 300,
        marginTop: 10,
        padding: 20
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    image: {
        width: '90%',
        height: '90%',
        resizeMode: 'contain',
        alignSelf: 'center'
    },
    seatingOptionsContainer: {
        backgroundColor: 'white',
        padding: 20
    },
    seatingOptions: {
        fontSize: 14,
        color: "gray",
        fontWeight: "bold",
        textTransform: 'uppercase'
    },
    checkboxText: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    checkboxContainerActive: {
        backgroundColor: R.colors.blue,
        borderWidth: 0
    },
    checkboxContainerInActive: {
        backgroundColor: 'white',
        borderWidth: 0
    }
});