import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { servicesUrl } from "helpers/services.js";
import R from "res/R";

export default class DocumentItem extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            uri: '',
            isDownloading: false,
            isDownloaded: false,
            downloadProgress: 0,
        };

        this.callback = downloadProgress => {
            const progress = downloadProgress.totalBytesWritten / downloadProgress.totalBytesExpectedToWrite;
            let percent = Number(progress).toFixed(2) * 100;
            this.setState({
                downloadProgress: percent,
            });
        };

    }

    componentDidMount() {
        this.init();
    }

    init = async () => {
        let fileName = FileSystem.documentDirectory + this.props.item.idDocument + '.pdf'
        let fileInfo = await FileSystem.getInfoAsync(fileName);
        if (fileInfo && fileInfo.exists)
            this.setState({ isDownloaded: true, uri: fileInfo.uri })
    }

    download = () => {
        if (!this.state.isDownloading) {
            this.setState({ isDownloading: true }, async () => {
                try {
                    let item = this.props.item;
                    let fileURL = servicesUrl.documentDownload + item.idDocument + "?session=" + this.state.token;
                    const downloadResumable = FileSystem.createDownloadResumable(fileURL, FileSystem.documentDirectory + item.idDocument + '.pdf', {}, this.callback);
                    const { uri } = await downloadResumable.downloadAsync();
                    this.setState({ isDownloading: false, isDownloaded: true, uri });
                } catch (e) {
                    console.error(e);
                    this.setState({ isDownloading: false });
                }
            })
        }
    }

    openShareDialog = async () => {
        if (!(await Sharing.isAvailableAsync())) {
            alert(`Uh oh, sharing isn't available on your platform`);
            return;
        }
        await Sharing.shareAsync(this.state.uri, { dialogTitle: this.props.item.DocType });
    };

    render() {
        let item = this.props.item
        let color = "#48D52C";
        let image = R.images.airplane;
        switch (item.DocType) {
            case 'Hotel Voucher':
                image = R.images.hotel;
                break;
            case 'Taxi Voucher':
                image = R.images.car;
                break;
            case 'Airplane Voucher':
                image = R.images.car;
                break;
            case 'Game Voucher':
                image = R.images.stadium;
                break;
            default:
                image = R.images.guideWhereToEat_blue;
                color = "red";
                break;
        }
        let title = item.DocType;

        return (
            <View style={styles.container}>
                <View style={{ backgroundColor: color, width: 7, height: '100%' }} />
                <Image style={styles.image} source={image} />
                <View >
                    <Text style={{ color: "blue", fontWeight: "bold", textTransform: 'uppercase' }}>
                        {title}
                    </Text>
                    <Text style={{ color: "gray", }}>
                        Reference no:JZ9213
                    </Text>
                </View>
                {this.state.isDownloaded ?
                    <View style={{ flexDirection: 'row', width: 100 }}>
                        <TouchableOpacity style={styles.smallButton} onPress={() => { this.props.openPDF(this.state.uri) }}>
                            <Icon name='eye' style={styles.icon} />
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.smallButton} onPress={() => { this.openShareDialog() }}>
                            <Icon name='share-social' style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    :
                    <TouchableOpacity style={styles.button} onPress={() => { this.download() }}>
                        {this.state.isDownloading ?
                            <>
                                <Text>{this.state.downloadProgress}%</Text>
                                <ActivityIndicator size='small' color='green' />
                            </>
                            :
                            <Icon name='arrow-down-circle' style={styles.icon} />
                        }
                    </TouchableOpacity>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        height: 60,
        marginBottom: 10,
        alignItems: 'center',
        justifyContent:'space-between'
    },
    image: {
        height: '100%',
        width: 30,
        resizeMode: "contain",
        margin:10
    },
    icon: {
        fontSize: 35,
        color: R.colors.lightGreen,
    },
    smallButton: {
        margin: 5
    },
    button: {
        margin: 10
    }
});
