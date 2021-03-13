import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import { translate } from "helpers/utils";
import PerkItem from "./PerkItem";

const itemHeight = 100;

export class Perks extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            perks: []
        }
    }

    componentDidMount = () => {
        var perks = this.props.perks.filter((perk, index) => (perk.Selected == true && index == 1) || index != 1);
        this.setState({ perks });
    }

    renderItem = ({ item }) => {
        return <PerkItem item={item} height={itemHeight} />
    }

    keyExtractor = (item) => {
        return "perk-" + item.Title;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {translate('perks')}
                </Text>
                <FlatList
                    data={this.state.perks}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    getItemLayout={(data, index) => (
                        { length: itemHeight, offset: itemHeight * index, index }
                    )}
                    horizontal={false}
                    numColumns={2} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 25,
        backgroundColor: 'white',
        borderBottomWidth: 2,
        borderColor: "#eee"
    },
    title: {
        fontSize: 12,
        color: "gray",
        fontWeight: "bold",
        marginBottom: 15
    }
});