import React from "react";
import {
    StyleSheet,
    Text,
    Image,
    ScrollView,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Dimensions
} from "react-native";
import { HeaderBackground } from "components/Common/HeaderBackground";
import Image1 from "../../../assets/images/games/image1.png";
import Image2 from "../../../assets/images/games/image2.png";
import Image3 from "../../../assets/images/games/image3.png";
import Image4 from "../../../assets/images/games/image4.png";
import Image5 from "../../../assets/images/games/image5.png";
import Image6 from "../../../assets/images/games/image6.png";
import Image7 from "../../../assets/images/games/image7.png";
import Image8 from "../../../assets/images/games/image8.png";
import Image9 from "../../../assets/images/games/image9.png";
import Image10 from "../../../assets/images/games/image10.png";
import Image11 from "../../../assets/images/games/image11.png";
import Image12 from "../../../assets/images/games/image12.png";
import Image13 from "../../../assets/images/games/image13.png";
import Image14 from "../../../assets/images/games/image14.png";
import Image15 from "../../../assets/images/games/image15.png";
import R from "res/R";
import { get } from "helpers/services.js";
import { translate } from "helpers/utils.js";

export default class Leagues extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
        this.state = {
            allLeagues: [{
                ID: "",
                Value: "",
                disabled: "",
                ExtraField: "",
            }],
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch { }
    }


    getData = () => {
        const _this = this;
        get(`/mobile/leagues/all`)
            .then((response) => {
                var data = response.map(function (item) {
                    return {
                        ID: item.ID,
                        Value: item.Value,
                        disabled: item.disabled,
                        ExtraField: item.ExtraField,
                    };
                });
                this.setState({ allLeagues: data });
            });
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('leagues')} image={R.images.leagues_bg} />

                <Text style={styles.sectionHeading}>European</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image1} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image2} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image3} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Spain</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image4} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image5} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image6} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Uk</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image7} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image8} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Italy</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image9} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>Germany</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image10} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>France</Text>
                <View style={styles.teamsWrap}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image11} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.sectionHeading}>International</Text>
                <View style={{ ...styles.teamsWrap, marginBottom: 80 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image12} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image13} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image14} style={styles.teamImage} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('AllGames')}>
                        <Image source={Image15} style={styles.teamImage} />
                    </TouchableOpacity>
                </View>

            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "#fafafa",
    },
    sectionHeading: {
        fontWeight: "bold",
        fontSize: 26,
        marginTop: 50,
        marginLeft: "auto",
        marginRight: "auto"
    },
    teamImage: {
        marginTop: 50,
        width: 70,
        height: 70,
        marginLeft: 20,
        marginRight: 20
    },
    teamCircle: {
        width: 10,
        height: 10,
        borderRadius: 50,
    },
    teamsWrap: {
        flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around"
    },
    headerBg: {
        height: 200,
        alignItems: "center",
        justifyContent: "center",
    },
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        height: 20,
        width: 20,
    },
    pageTitleBar: {
        backgroundColor: "black",
        height: 8,
        width: 30,
        marginLeft: 30,
        marginTop: 35
    },
    pageTitleText: {
        color: "white",
        fontSize: 26,
        fontWeight: "bold",
    },
    specialGameMeta: {
        color: "white", fontSize: 18
    }
});