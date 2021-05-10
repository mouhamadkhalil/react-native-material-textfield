import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ScrollView,
    Pressable,
    ImageBackground,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import RatingStars from "components/OnSpot/RatingStars";
import PricingReview from "components/OnSpot/PricingReview";
import { translate, openLink } from "helpers/utils";
import R from "res/R";

export default class PlaceDetailsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            place: props?.route?.params?.place,
            isLoading: true
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false });
    }

    render() {
        const place = this.state.place;
        const image = { uri: place.ImageReference };
        return (
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <LinearGradient
                    colors={["#fd6111", "#db373a"]}
                    style={styles.linearGradient}
                    start={[0, 0]}
                    end={[0, 1]}
                    locations={[0, 1]}
                >
                </LinearGradient>
                {this.state.isLoading ?
                    <ActivityIndicator color={R.colors.blue} />
                    :
                    <View style={R.styles.flexColumn}>
                        <ImageBackground source={image} style={styles.placeImage}>
                            <Text style={styles.placeName}>
                                {place.Name}
                            </Text>
                            <Text style={{ ...styles.placeName, fontSize: 14 }}>
                                {place.CategoryName}
                            </Text>
                        </ImageBackground>

                        {/* details */}
                        <View style={styles.details}>

                            {/* description */}
                            <Text style={styles.description}>
                                {place.Description}
                            </Text>

                            {/* rating + price */}
                            <View style={[R.styles.flexRow, { marginTop: 20 }]}>
                                <View style={styles.half}>
                                    <Text style={styles.rating}>
                                        {translate('rating')}
                                    </Text>
                                    <View style={R.styles.flexRow}>
                                        <RatingStars rating={place.CustomerReviewRating} />
                                    </View>
                                </View>
                                <View style={styles.half}>
                                    <Text style={styles.rating}>
                                        {translate('price')}
                                    </Text>
                                    <View style={R.styles.flexRow}>
                                        <PricingReview review={place.PricingReview} />
                                    </View>
                                </View>
                            </View>

                            {/* location */}
                            {place.Location ?
                                <Pressable style={R.styles.flexRow} onPress={() => openLink('location', place.Location)}>
                                    <Icon name='location-outline' style={styles.icon} />
                                    <Text style={styles.info}>
                                        {place.Location}
                                    </Text>
                                </Pressable>
                                : null
                            }

                            {/* phone */}
                            {place.Phone ?
                                <Pressable style={R.styles.flexRow} onPress={() => openLink('tel', place.phone)}>
                                    <Icon name='call-outline' style={styles.icon} />
                                    <Text style={styles.info}>
                                        {place.Phone}
                                    </Text>
                                </Pressable>
                                : null
                            }

                            {/* email */}
                            {place.Email ?
                                <Pressable style={R.styles.flexRow} onPress={() => openLink('mailto', place.Email)}>
                                    <Icon name='mail-outline' style={styles.icon} />
                                    <Text style={styles.info}>
                                        {place.Email}
                                    </Text>
                                </Pressable>
                                : null
                            }

                            {/* website */}
                            {place.Website ?
                                <Pressable style={R.styles.flexRow} onPress={() => openLink('web', place.Website)}>
                                    <Icon name='earth-outline' style={styles.icon} />
                                    <Text style={styles.info}>
                                        {place.Website}
                                    </Text>
                                </Pressable>
                                : null
                            }
                        </View>
                    </View>
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%'
    },
    bg: {
        flex: 1,
        resizeMode: "cover",
    },
    placeImage: {
        width: "100%",
        height: 200,
        resizeMode: "cover",
        justifyContent: 'flex-end'
    },
    placeName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginStart: 15,
        marginEnd: 15,
        marginBottom: 15
    },
    details: {
        flex: 1,
        flexDirection: 'column',
        marginTop: 30,
        marginStart: 15,
        marginEnd: 15
    },
    description: {
        fontSize: 16,
        color: 'white',
        lineHeight: 22
    },
    half: {
        width: '50%',
        height: 50
    },
    rating: {
        color: "#fff",
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    icon: {
        color: "#bbb",
        fontSize: 24,
        fontWeight: 'bold',
    },
    info: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        marginStart: 10
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