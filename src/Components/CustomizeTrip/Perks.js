import React from "react";
import { StyleSheet, View, Image, Text, FlatList, TouchableOpacity } from "react-native";
import { CheckBox } from 'react-native-elements';
import { translate } from "helpers/utils";
import R from "res/R";

const itemHeight = 150;

export class Perks extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            perks: []
        }
    }

    initPerks = () => {
        const perks = this.props.perks.filter((perk) => (perk.Price != null && perk.Price > 0) ||  perk.Selected);
        this.setState({ perks });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.perks != this.props.perks)
            this.initPerks();
    }

    selectPerk = (index) => {
        this.props.selectPerk(index);
    }

    renderItem = ({ item }) => {
        var perk = styles.perk, checkboxStyle = styles.checkboxContainer, image = item.ImageGrey,
            labelStyle = styles.perkLabel;
        if (item.Selected) {
            perk = styles.perkActive;
            checkboxStyle = styles.checkboxContainerActive;
            image = item.Image;
            labelStyle = styles.perkLabelActive;
        }
        return (
            <TouchableOpacity style={perk}
                onPress={() => this.selectPerk(item.Sequence)}>
                {item.Sequence < 2 ? null :
                    <CheckBox
                        checked={item.Selected}
                        containerStyle={checkboxStyle}
                        checkedColor='white'
                        onPress={() => this.selectPerk(item.Sequence)} />
                }
                <Image source={image} style={styles.perkImage} />
                <Text style={labelStyle}>
                    {item.Title}
                </Text>
                {item.Sequence < 2 ? null :
                    <Text style={labelStyle}>
                        +{item.Price} $
                    </Text>
                }
            </TouchableOpacity>
        )
    }

    keyExtractor = (item, index) => {
        return "perk-" + item.Label;
    }
    listKey =(item , index) => {
        return "perk-" + index;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>
                    {translate('perks')}
                </Text>
                <FlatList
                    data={this.state.perks}
                    extraData={this.props}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    listKey={this.listKey}
                    getItemLayout={(data, index) => (
                        { length: itemHeight, offset: itemHeight * index, index }
                    )}
                    style={{ marginTop: 10 }}
                    horizontal={false}
                    numColumns={2} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignSelf: 'center',
        marginTop: 50
    },
    title: {
        color: R.colors.grey,
        fontWeight: "bold",
        fontSize: 20,
        alignSelf: 'flex-start'
    },
    perk: {
        width: "50%",
        height: itemHeight,
        alignItems: "center",
        padding: 15,
        backgroundColor: 'white',
        margin: 1,
    },
    perkActive: {
        width: "50%",
        height: itemHeight,
        alignItems: "center",
        padding: 15,
        backgroundColor: R.colors.blue,
        margin: 1,
    },
    perkImage: {
        width: 44,
        height: 44,
        resizeMode: 'contain'
    },
    perkLabel: {
        fontSize: 15,
        marginTop: 15,
        fontWeight: 'bold',
        color: 'grey'
    },
    perkLabelActive: {
        fontSize: 15,
        marginTop: 15,
        fontWeight: 'bold',
        color: '#fff'
    },
    checkboxContainer: {
        backgroundColor: 'white',
        borderWidth: 0,
        position: "absolute",
        top: 0,
        left: 0
    },
    checkboxContainerActive: {
        backgroundColor: R.colors.blue,
        borderWidth: 0,
        position: "absolute",
        top: 0,
        left: 0
    }

});