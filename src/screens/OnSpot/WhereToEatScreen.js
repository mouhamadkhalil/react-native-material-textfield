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

export default class WhereToEatScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            whereToEat: [],
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
        var whereToEat = JSON.parse(await AsyncStorage.getItem('@whereToEat'));
        this.setState({ whereToEat, isLoading: false });
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
                    colors={["#fd6111", "#db373a"]}
                    style={styles.linearGradient}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 1]}
                >
                </LinearGradient>
                <ImageBackground style={{ width: "100%" }} source={R.images.whatToDo_bg} imageStyle={styles.bg}>
                    {this.state.isLoading ?
                        <ActivityIndicator color={R.colors.blue} />
                        :
                        <>
                            <Text style={{ color: "#fff", fontSize: 50, textTransform: "uppercase", marginStart: "auto", marginEnd: "auto", fontFamily: "Plaak", marginTop: 30 }}>Where to eat</Text>
                            <Text style={{ color: "#fff", fontSize: 14, textTransform: "uppercase", marginStart: "auto", marginEnd: "auto", fontWeight: "bold" }}>In Barcelona</Text>
                            <Text style={{ color: "#fff", textAlign: "center", marginTop: 15, paddingStart: 30, paddingEnd: 30 }}>Liquorice pudding jelly caramels cheesecake tart. Carrot cake jujubes muffin cake pie.</Text>
                            <FlatList
                                data={this.state.whereToEat}
                                keyExtractor={this.keyExtractor}
                                renderItem={this.renderItem}
                            />
                        </>
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
        resizeMode: "contain",
        alignSelf: "flex-end",
        marginBottom: -350
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
        textTransform: 'uppercase',
        marginBottom: 30
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
        end: 10,
        bottom: 10,
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%"
    },
});