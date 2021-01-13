import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
    Button
} from "react-native";
import { API_URL, API_TOKEN } from "@env";
import Line1 from "../../assets/Images_Design/line1.png";
import Line2 from "../../assets/Images_Design/line2.png";
import Search from "../../assets/Images_Design/search1.png";
import Notifictaion from "../../assets/Images_Design/notification1.png";
import Card1 from "../../assets/Images_Design/card1.png";
import Card2 from "../../assets/Images_Design/card2.png";
import Btn1 from "../../assets/Images_Design/btn1.png";
import Btn2 from "../../assets/Images_Design/btn2.png";
import Arrow from "../../assets/Images_Design/arrow_right1.png";
import Liverppol from "../../assets/Images_Design/liverpool.png";
import Real from "../../assets/Images_Design/real.png";
import Carousel from 'react-native-snap-carousel';

const sourceFile = require('../../services.js');

export default class Day2Screen extends React.Component {

    state = {
        Picture1: "",
        Picture2: "",
        Picture3: "",
        Picture4: "",
        isDone: false,
        searchText: "",
        idMatch: "",
        City: "",
        Stade: "",
        GameDate: "",
        LeaguesName: "",
        GameCode: "",
        HomeTeam: "",
        AwayTeam: "",
        StadeCity: "",
        activeIndex: 0,
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
            {
                title: "Item 6",
                text: "Text 6",
            },
        ],
    };


    searchGame = () => {
        const urlSearch = `${API_URL}/mobile/game/search?text=${this.state.searchText}`;
        fetch(urlSearch, {
            method: "GET",
            headers: {
                "Content-Type": sourceFile.Content_Type,
                "Accept": sourceFile.Accept,
                "ff_version": sourceFile.ff_version,
                "ff_language": sourceFile.ff_language,
                "source": sourceFile.source,
                // "authorization" : sourceFile.authorization,
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                console.log("test", response[0].City);
                this.setState({ idMatch: response[0].idMatch });
                this.setState({ City: response[0].City });
                this.setState({ Stade: response[0].Stade });
                this.setState({ GameDate: response[0].GameDate });
                this.setState({ LeaguesName: response[0].LeaguesName });
                this.setState({ GameCode: response[0].GameCode });
                this.setState({ HomeTeam: response[0].HomeTeam });
                this.setState({ AwayTeam: response[0].AwayTeam });
                this.setState({ StadeCity: response[0].StadeCity });
            });
    };

    // Carousal 1
    _renderItem1({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 170, height: 250, marginLeft: 150 }}>
                <ScrollView style={{ backgroundColor: "#483ED4", borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginTop: 20, marginLeft: 20, fontSize: 16 }}>Semi Final Champions</Text>
                    <Text style={{ marginLeft: 20, color: "white", marginTop: 10, fontSize: 10 }}>BARCELONA</Text>
                    <Text style={{ marginLeft: 100, color: "white", marginTop: -14, fontSize: 10 }}>5 DAYS TRIP </Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 20 }}>12 </Text>
                    <Text style={{ color: "white", marginLeft: 70, marginTop: -19 }}>FC. Barcelona </Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 5 }}>sep </Text>
                    <Text style={{ color: "white", marginLeft: 70, marginTop: -19 }}>Chelsea FC.</Text>
                    <Text style={{ color: "white", marginLeft: 20, marginTop: 10, fontWeight: "bold" }}>Early Bird Form</Text>
                    <Text style={{ color: "white", fontSize: 7, marginLeft: 20, marginTop: 4 }}>* price based on 2 fans flyings together</Text>
                </ScrollView>
                <TouchableOpacity style={{ backgroundColor: "red", width: 100, height: 50, marginLeft: 33, marginTop: -25 }}>
                    <ScrollView style={{ backgroundColor: "#62F622", width: 100, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 87, marginTop: -10 }} />
                        <Text style={{ marginTop: -3, marginLeft: 11, fontSize: 9, color: "gray" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    // Carousal 2
    _renderItem2({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 60, width: 250, height: 250, marginLeft: 150 }}>
                <ScrollView style={{ backgroundColor: "#DA2828", borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginTop: 20, marginLeft: 20, fontSize: 25 }}>Kopites trip</Text>
                    <Text style={{ marginLeft: 20, color: "white", marginTop: 10, fontSize: 10 }}>DUBLIN -- 5 DAYS</Text>
                    <Text style={{ marginLeft: 77, color: "white", marginTop: 20, fontSize: 20 }}>Manchester c.</Text>
                    <Text style={{ marginLeft: 77, color: "white", marginTop: 0, fontSize: 20 }}>arsenal</Text>
                    <Text style={{ marginLeft: 25, color: "white", marginTop: -45, fontSize: 17 }}>15 </Text>
                    <Text style={{ marginLeft: 25, color: "white", marginTop: 0, fontSize: 17 }}>sep </Text>
                    <Text style={{ color: "white", marginLeft: 75, fontSize: 8, marginTop: 10 }}>* price based on 2 fans flyings together</Text>
                </ScrollView>
                <TouchableOpacity style={{ width: 120, height: 50, marginLeft: 65, marginTop: -25 }} >
                    <ScrollView style={{ backgroundColor: "#62F622", width: 120, height: 50 }}>
                        <Text style={{ marginLeft: 10, marginTop: 10, fontWeight: "bold", fontSize: 15 }}>1450$<Text style={{ fontSize: 11, marginTop: -3 }}>/Fan</Text></Text>
                        <Image source={Arrow} style={{ marginLeft: 95, marginTop: -10 }} />
                        <Text style={{ marginTop: -3, marginLeft: 11, fontSize: 9, color: "gray" }}>BOOK NOW</Text>
                    </ScrollView>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }

    // Carousal 3
    _renderItem3 = ({ item, index }) => {
        return (
            <TouchableOpacity style={{ marginTop: 40, width: 250, height: 250, marginLeft: 10, marginBottom: 0 }}>

                <TouchableOpacity style={{ marginLeft: -50, width: 250, height: 250 }}>
                    <Image source={Liverppol} style={{ marginLeft: 200, marginTop: 0 }} />
                    <Image source={Real} style={{ marginLeft: 370, marginTop: -188 }} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    // Carousal 4
    _renderItem4({ item, index, state }) {
        return (
            <TouchableOpacity style={{ marginTop: 20, width: 250, height: 250, marginLeft: 10, marginBottom: 100 }}>
                <TouchableOpacity style={{ marginLeft: -50, width: 250, height: 250 }}>
                    <Image source={Card1} style={{ marginLeft: 200, marginTop: 0 }} />
                </TouchableOpacity>
                <Image source={Btn2} style={{ marginLeft: 185, marginTop: -22 }} />
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <TextInput
                    style={{ paddingLeft: 10, borderRadius: 20, marginLeft: 190, marginTop: 45, backgroundColor: "white", width: 185, height: 35 }}
                    placeholder="  &nbsp;&nbsp;Search your game ... "
                    placeholderTextColor="#46D822"
                    autoCapitalize="none"
                    onChangeText={searchText => {
                        this.setState({ searchText });
                    }}
                    onSubmitEditing={this.searchGame}
                    value={this.state.searchText}
                />
                <Text
                    style={{
                        alignContent: "center",
                        color: "#4c0099",
                        fontWeight: "bold",
                        marginTop: 30,
                        fontSize: 19,
                        marginLeft: 210
                    }}
                >
                    MONDAY 12 SEPT
                </Text>
                <TouchableOpacity onPress={this.searchGame} style={{ width: 40, marginLeft: 380, marginTop: -95 }}>
                    <Image source={Search} style={{ marginTop: 0, marginLeft: 0, height: 40, width: 40 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert("hello Im Notification !")} style={{ width: 40, marginLeft: 430, marginTop: -30 }}>
                    <Image source={Notifictaion} style={{ marginTop: 0, marginLeft: 0, height: 20, width: 20 }} />
                </TouchableOpacity>
                <View style={{ marginTop: -24, width: 190 }}>
                    <TouchableOpacity>
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: 0 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                        <Image source={Line2} style={{ width: 35, height: 15, marginLeft: 140, marginTop: -5 }} />
                    </TouchableOpacity>
                </View>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 100 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -20,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    SPECIAL GAME
                </Text>
                <ScrollView>

                    {/* carousel 1 */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem1}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 50 }}>
                </ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    POPULAR GAMES
                </Text>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>31 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Barcelona</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>CHELESEA FC.</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>05 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>BV. dortmun</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>Real madrid</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 30, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 0, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity>
                    <ScrollView style={{ backgroundColor: "#F2E0E0", width: 310, height: 70, marginLeft: 140, marginTop: 0, marginBottom: 30, borderRadius: 20 }}>
                        <Text style={{ marginLeft: 20, marginTop: 27, fontSize: 12, fontWeight: "bold" }}>24 JAN</Text>
                        <Text style={{ marginLeft: 75, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>AS. Roma</Text>
                        <Text style={{ marginLeft: 185, fontSize: 15, fontWeight: "bold", marginTop: -20 }}>FC. Bayern</Text>
                        <Image source={Arrow} style={{ marginLeft: 295, marginTop: -16 }} />
                    </ScrollView>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "#4AD219", width: 150, height: 50, marginLeft: 220, marginBottom: 30, marginTop: -45, borderRadius: 20 }}>
                    <Text style={{ color: "white", fontWeight: "bold", marginLeft: 33, marginTop: 15 }}>LOAD MORE &nbsp;+</Text>
                </TouchableOpacity>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 0 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    HOT GAMES
                </Text>
                <ScrollView>

                    {/* carousel 2 */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem2}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 90 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    POPULAR TEAMS
                </Text>
                <ScrollView>

                    {/* Carousal 3  */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem3}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
                <ScrollView style={{ backgroundColor: "black", height: 15, width: 50, marginLeft: 140, marginTop: 30 }}></ScrollView>
                <Text
                    style={{
                        marginTop: -22,
                        color: "black",
                        fontSize: 20,
                        marginLeft: 200
                    }}
                >
                    COMPETETIONS
                </Text>
                <ScrollView>
                    {/* carousel 4 */}
                    <SafeAreaView style={{ flex: 1, paddingTop: 0, marginTop: 0, marginRight: 40 }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', }}>
                            <Carousel
                                style={{ marginLeft: 50 }}
                                layout={"default"}
                                ref={ref => this.carousel = ref}
                                data={this.state.carouselItems}
                                sliderWidth={170}
                                itemWidth={290}
                                // autoplay={true}
                                renderItem={this._renderItem4}
                                onSnapToItem={index => this.setState({ activeIndex: index })}
                            />
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        height: 1100,
        marginLeft: -110,
        width: 500,
        marginTop: 30,
        marginBottom: 0,
        backgroundColor: "#F5F7EC",
    },
});
