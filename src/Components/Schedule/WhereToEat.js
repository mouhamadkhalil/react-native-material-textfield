import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    ActivityIndicator,
    View,
    Image,
    Pressable,
    FlatList,
    Dimensions
} from "react-native";
import { formatWhereToEat } from "helpers/onSpotHelper";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Carousel from 'react-native-snap-carousel';

const sliderWidth = Dimensions.get('window').width;
const itemWidth = Math.round(sliderWidth * 0.7);
const itemHeight = Math.round(itemWidth * 3 / 4);

const Screen = Dimensions.get('window');

export default class WhereToEat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            whereToEat: [],
            carouselItems: [
                {
                    title: "Item 1",
                    text: "Text 1",
                },
                {
                    title: "Item 2",
                    text: "Text 2",
                },
                {
                    title: "Item 3",
                    text: "Text 3",
                },
                {
                    title: "Item 4",
                    text: "Text 4",
                },
                {
                    title: "Item 5",
                    text: "Text 5",
                },
            ],
            isLoading: true
        };
        this.specialGamesCarousel = {}
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }

    // get the data from the async storage
    getData = async () => {
        var whereToEat = JSON.parse(await AsyncStorage.getItem('@whereToEat'));
        whereToEat = formatWhereToEat(whereToEat)
        this.setState({ whereToEat, isLoading: false });
    }

    keyExtractor = (item) => {
        return "category-" + item.CategoryName;
    }

    renderRestaurant = ({ item }) => {
        const image = { uri: item.ImageReference };
        return (
            <Pressable key={'rest-' + item.idCityPlaces} style={{ width: 130, height: 180, margin: 20, backgroundColor: "#fff", borderRadius: 20, justifyContent: "center", shadowColor: { width: 0, height: 8, }, shadowOpacity: .44, shadowRadius: 10, elevation: 15, justifyContent: "center", alignItems: "center" }}>
                <Image source={image} style={{ width: 80, height: 80 }} />
                <Text style={{ fontSize: 16, fontWeight: 'bold', width: "80%", textAlign: "center", marginTop: 7 }}>{item.Name}</Text>
            </Pressable>
        );
    }

    _renderItem({ item, index }) {
        return (
            <View style={{
                backgroundColor: 'floralwhite',
                borderRadius: 5,
                height: 250,
                padding: 50,
                marginLeft: 25,
                marginRight: 25,
            }}>
                <Text style={{ fontSize: 30 }}>hell</Text>
                <Text>{item.text}</Text>
            </View>

        )
    }

    renderItem = ({ item }) => {
        return (
            <>
                <View style={{ ...styles.box, backgroundColor: '#EEEEEE', height: 250 }}>
                    <View style={styles.pageTitleWrap}>
                        <View style={styles.pageTitleBar}></View>
                        <Text style={styles.pageTitleText}>{item.CategoryName}</Text>
                    </View>
                    <View style={{ backgroundColor: "#fff", marginTop: 150, height: 200, marginLeft: 0, marginRight: 0 }}></View>
                    <View style={{ marginBottom: 0, paddingBottom: 50 }}>
                        <Carousel
                            layout={"default"}
                            ref={(c) => { this.popularTeamsCarousel = c; }}
                            data={item.Places}
                            sliderWidth={Screen.width}
                            itemWidth={150}
                            itemHeight={200}
                            renderItem={this._renderItem}
                            firstItem={0}
                            initialScrollIndex={0}
                            getItemLayout={(data, index) => (
                                { length: 150, offset: 150 * index, index }
                            )}
                            inactiveSlideOpacity={0}
                        />
                    </View>
                </View>
            </>
        )
    }
    render() {
        return (
            <View style={styles.container}>

                {this.state.whereToEat.map((category) => {
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                        <Carousel
                            layout={"default"}
                            ref={ref => this.carousel = ref}
                            data={category.Places}
                            sliderWidth={300}
                            itemWidth={300}
                            renderItem={this._renderItem}
                            onSnapToItem={index => this.setState({ activeIndex: index })} />
                    </View>
                })}
                {/*this.state.whereToEat.map((category) => {
                    return <View key={"cat-"+ category.CategoryName} style={{ ...styles.box, backgroundColor: '#EEEEEE', height: 250 }}>
                        <View style={styles.pageTitleWrap}>
                            <View style={styles.pageTitleBar}></View>
                            <Text style={styles.pageTitleText}>{category.CategoryName}</Text>
                        </View>
                        <View style={{ backgroundColor: "#fff", marginTop: 150, height: 200, marginLeft: 0, marginRight: 0 }}></View>
                        <View style={{ marginBottom: 0, paddingBottom: 50 }}>
                            <Carousel
                                layout={"default"}
                                ref={(c) => { this.popularTeamsCarousel = c; }}
                                data={this.state.carouselItems}
                                sliderWidth={Screen.width}
                                itemWidth={150}
                                itemHeight={200}
                                renderItem={this._renderItem}
                                firstItem={0}
                                initialScrollIndex={0}
                                getItemLayout={(data, index) => (
                                    { length: 150, offset: 150 * index, index }
                                )}
                                inactiveSlideOpacity={0}
                            />
                        </View>
                    </View>
                })}

                {/*
                <FlatList
                    data={this.state.whereToEat}
                    keyExtractor={this.keyExtractor}
                    renderItem={this.renderItem}
       />*/}
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
    box: { width: "100%", marginTop: 30, alignSelf: 'center' },
    pageTitleWrap: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 30
    },
    topNavBtn: {
        height: 50,
        padding: 10,
        marginTop: 0,
        marginStart: 10
    },
    topNavBtnText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
    },
    pageTitleText: {
        fontFamily: 'Hellix-Regular',
        color: "black",
        fontSize: 20,
        marginLeft: 10,
        marginRight: 10,
        textTransform: 'uppercase'
    },
    specialGameMeta: {
        color: "white",
        fontSize: 20,
        fontFamily: 'BarlowCondensed-Bold'
    },
    image: {
        borderRadius: 20,
        backgroundColor: '#ee0000',
        resizeMode: "cover",
        justifyContent: "center"
    },
    popularGameItem: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#F7F7F7",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        padding: 10,
        marginEnd: 15,
        marginStart: 15,
        marginTop: 20,
        marginBottom: 10,
    }
});