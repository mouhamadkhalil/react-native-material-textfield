import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Image,
    FlatList,
    Linking,
    TouchableOpacity,
    Modal
} from "react-native";
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalHeader from "components/Common/ModalHeader";
import R from "res/R";

export default class MoreScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            menuLinks: [],
            uri: '',
            modalVisible: false,
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
        var menuLinks = JSON.parse(await AsyncStorage.getItem('@menuLinks'));
        menuLinks = menuLinks?.map((link) => {
            return {
                Name: link.ID,
                Link: link.Value
            }
        });
        this.setState({ menuLinks, isLoading: false });
    }

    openLink = (link) => {
        Linking.openURL(link);
    }

    keyExtractor = (item) => {
        return "menu-" + item.Name;
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={styles.linkButton} onPress={() => this.setState({ modalVisible:true, uri: item.Link })}>
                <Image source={R.images.arrow_right_sm} />
                <Text style={styles.linkText}>
                    {item.Name}
                </Text>
            </TouchableOpacity>
        )
    }
    render() {
        var uri = this.state.uri;
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator color={R.colors.blue} marginTop={50} />
                    :
                    <FlatList
                        data={this.state.menuLinks}
                        keyExtractor={this.keyExtractor}
                        renderItem={this.renderItem}
                    />
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}>
                    <View style={styles.modalView}>
                        {/* logo + close */}
                        <ModalHeader close={() => this.setState({ modalVisible: false })} />
                        <WebView source={{ uri: uri }} />
                    </View>
                </Modal>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#eee",
    },
    linkButton: {
        backgroundColor: "white",
        height: 60,
        marginTop: 30,
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginLeft: 15,
        marginRight: 15
    },
    linkIcon: {
        width: 20,
        height: 25
    },
    linkText: {
        color: "blue",
        fontSize: 15,
        marginStart: 15
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
});