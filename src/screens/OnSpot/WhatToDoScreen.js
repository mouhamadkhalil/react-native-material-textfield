import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image,
    Pressable,
    FlatList,
    Dimensions,
    ImageBackground
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';
import { formatWhereToEat } from "helpers/onSpotHelper";
import R from "res/R";

function wp(percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
const slideWidth = wp(50);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;
export const itemHeight = itemWidth;

export default class WhatToDoScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            whatToDo: [],
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
        var whatToDo = JSON.parse(await AsyncStorage.getItem('@whatToDo'));
        whatToDo = formatWhereToEat(whatToDo)
        this.setState({ whatToDo, isLoading: false });
    }

    navigate = (item) => {
        this.props.navigation.navigate('placeDetails', { place: item });
    }

    keyExtractor = (item) => {
        return "category-" + item.CategoryName;
    }

    renderRestaurant = ({ item }) => {
        const image = { uri: item.ImageReference };
        return (
            <Pressable key={'rest' + item.Name} style={styles.card} onPress={() => this.navigate(item)}>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <Image source={image} style={styles.restaurantImage} />
                    <Text style={styles.restaurantName}>
                        {item.Name}
                    </Text>
                </View>
            </Pressable>
        );
    }

    renderItem = ({ item }) => {
        return (
            <>
                <View style={{ ...styles.box, height: 300 }}>
                    <View style={styles.pageTitleWrap}>
                        <Text style={styles.pageTitleText}>
                            {item.CategoryName}
                        </Text>
                    </View>
                    <View style={{ marginBottom: 0, paddingBottom: 50 }}>
                        <Carousel
                            layout={"default"}
                            data={item.Places}
                            renderItem={this.renderRestaurant}
                            sliderWidth={sliderWidth}
                            itemWidth={itemWidth}
                            itemHeight={itemHeight}
                            inactiveSlideScale={0.70}
                            inactiveSlideOpacity={0.7}
                            activeSlideAlignment={'start'}
                        />
                    </View>
                </View>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={["#FF6310", "#DA353D"]}
                    style={styles.linearGradient}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 1]}
                >
                </LinearGradient>
                <ImageBackground source={R.images.whatToDo_bg} style={styles.bg}>
                    {this.state.isLoading ?
                        <ActivityIndicator color={R.colors.blue} />
                        :
                        <FlatList
                            data={this.state.whatToDo}
                            keyExtractor={this.keyExtractor}
                            renderItem={this.renderItem}
                        />
                    }
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: "#FFF",
    },
    bg: {
        flex: 1,
        resizeMode: "cover",
    },
    box: { width: "100%", marginTop: 30, alignSelf: 'center' },
    pageTitleWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingStart: 20,
        marginTop: 30
    },
    pageTitleText: {
        fontFamily: 'Hellix-Regular',
        fontWeight: "bold",
        color: "white",
        fontSize: 20,
        textTransform: 'uppercase'
    },
    card: {
        width: itemWidth - 20,
        height: itemHeight,
        margin: 20,
    },
    restaurantImage: {
        borderRadius: 10,
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    restaurantName: {
        position: 'absolute',
        bottom: 0,
        start: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: 500
    },
});