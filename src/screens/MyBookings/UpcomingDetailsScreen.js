import React from "react";
import {
    StyleSheet,
    View,
    ActivityIndicator,
    TouchableOpacity,
    Text,
    Image,
    Modal,
    ScrollView
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { HeaderBackground } from "components/Common/HeaderBackground";
import { MatchHeader } from "components/Trips/MatchHeader";
import ModalHeader from "components/Common/ModalHeader";
import { getWithToken, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

export default class UpcomingDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            invoice: props?.route?.params?.invoice,
            token: "",
            isLoading: true,
            isGettingToken: false,
            modalVisible: false,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    openDownload = () => {
        if (!this.state.isGettingToken) {
            this.setState({ isGettingToken: true, modalVisible: true }, function () {
                getWithToken(servicesUrl.GetToken).then((response) => {
                    this.setState({ token: response.Value, isGettingToken: false });
                })
            }
            )
        }
    }

    download = (idDocument) => {
        /* let fileURL = "https://beta.fly-foot.com/api/mobile/download/"+idDocument+"?session="+ this.state.token;
         RNFetchBlob.config({
             fileCache : true,
             addAndroidDownloads : {
               notification : true,
               title : 'Great ! Download Success ! ',
               // File description (not notification description)
               description : 'A travel document file.',
               // Make the file scannable  by media scanner
               mediaScannable : true,
             }
           })
           .fetch('GET', fileURL)
           .then((resp) => {
             // ...
           })
           .catch((err) => {
             // ...
           })*/
    }

    render() {
        var invoice = this.state.invoice;
        return (
            <ScrollView style={styles.container}>
                {/* banner */}
                <HeaderBackground title={translate('upcoming')} image={R.images.trip_bg} />

                {/* match header */}
                <MatchHeader isLoading={this.state.isLoading} isInvoice={true} bundle={invoice} />

                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                    :
                    <View style={styles.main}>
                        {/* payment section */}
                        <View style={styles.paymentSection}>
                            <View style={styles.TitleSection}>
                                <Text style={styles.Title}>
                                    {translate('payment')}
                                </Text>

                            </View>
                            <View style={styles.Details}>
                                <Text style={styles.DetailsText}>
                                    {translate('total') + ": " + invoice?.FinalPrice + "$"}
                                </Text>
                                <Text style={styles.DetailsText}>
                                    {translate('pending') + ": " + invoice?.PendingPayment + "$"}
                                </Text>
                            </View>
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.buttonText}>
                                        {translate('payNow')}
                                    </Text>
                                    <Icon name='arrow-forward-outline' style={styles.icon} />
                                </TouchableOpacity>
                                <Text style={styles.redText}>
                                    {translate('before') + " " + moment(invoice?.Payments[0].PaymentExpiryDate).format("DD/MM")}
                                </Text>
                            </View>
                        </View>

                        {/* passport section */}
                        <View style={styles.passportSection}>
                            <View style={styles.TitleSection}>
                                <Text style={styles.Title}>
                                    {translate('passport')}
                                </Text>

                            </View>
                            <View style={styles.Details}>
                                <Text style={styles.DetailsText}>
                                    {translate('msgWithin24hrs')}
                                </Text>
                            </View>
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionButton}>
                                    <Text style={styles.buttonText}>
                                        {translate('upload')}
                                    </Text>
                                    <Icon name='cloud-upload-outline' style={styles.icon} />
                                </TouchableOpacity>
                                <Text style={styles.redText}>
                                    {translate('Within24hrs')}
                                </Text>
                            </View>
                        </View>

                        {/* documents section */}
                        <View style={styles.documentsSection}>
                            <View style={styles.TitleSection}>
                                <Text style={styles.Title}>
                                    Travel documents
                                </Text>

                            </View>
                            <View style={styles.Details}>
                                <Text style={styles.DetailsText}>
                                    Flight, game ticket, hotel,
                                    reservation, travel insurance
                                </Text>
                            </View>
                            <View style={styles.actionSection}>
                                <TouchableOpacity style={styles.actionButton} onPress={() => { this.openDownload() }}>
                                    <Text style={styles.buttonText}>
                                        {translate('download')}
                                    </Text>
                                    <Icon name='cloud-download-outline' style={styles.icon} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={{marginTop:20}}>
                            <View style={styles.accordion}>
                                <Text style={styles.accordionText}>Booking Summary</Text>
                                <Icon name='arrow-down-outline' style={styles.icon} />
                            </View>
                            <View style={styles.accordion}>
                                <Text style={styles.accordionText}>Fans</Text>
                                <Icon name='arrow-down-outline' style={styles.icon} />
                            </View>
                            <View style={styles.accordion}>
                                <Text style={styles.accordionText}>Accomodation</Text>
                                <Icon name='arrow-down-outline' style={styles.icon} />
                            </View>
                            <View style={styles.accordion}>
                                <Text style={styles.accordionText}>Game Seat</Text>
                                <Icon name='arrow-down-outline' style={styles.icon} />
                            </View>
                            <View style={styles.accordion}>
                                <Text style={styles.accordionText}>Perks</Text>
                                <Icon name='arrow-down-outline' style={styles.icon} />
                            </View>
                        </View>
                    </View>
                }

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({ modalVisible: false })}>
                    <View style={styles.modalView}>
                        {/* logo + close */}
                        <ModalHeader close={() => this.setState({ modalVisible: false })} />
                        <Text style={{ margin: 15, color: R.colors.blue, fontWeight: 'bold', fontSize: 18 }}>
                            Download your travel documents
                        </Text>
                        {this.state.isGettingToken ?
                            <ActivityIndicator size="large" color="blue" style={{ marginTop: 120 }} />
                            :
                            <View style={{ margin: 15 }}>
                                {this.state.invoice?.Documents?.map(function (document) {
                                    return (
                                        <TouchableOpacity style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }} onPress={() => { this.download(document.idDocument) }}>
                                            <Text style={{ fontSize: 16 }}>
                                                {document.DocType + " - " + document.DocName}
                                            </Text>
                                            <Icon name='cloud-download-outline' style={styles.icon} />
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        }
                    </View>
                </Modal>
            </ScrollView>
        )
    };

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
    },
    main: {
        margin: 15,
    },
    paymentSection: {
        backgroundColor: 'white',
        marginTop: 60,
        borderBottomColor: 'red',
        borderBottomWidth: 4
    },
    TitleSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15
    },
    Title: {
        color: R.colors.blue,
        fontWeight: 'bold',
        fontSize: 18
    },
    Details: {
        marginBottom: 15,
        paddingStart: 15,
        paddingEnd: 15,
        width: '70%'
    },
    DetailsText: {
        color: 'grey',
        fontSize: 16
    },
    actionSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingStart: 15,
        paddingEnd: 15,
        marginBottom: 20
    },
    actionButton: {
        flexDirection: 'row',
        borderBottomWidth: 1
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    redText:
    {
        color: 'red'
    },
    passportSection: {
        backgroundColor: 'white',
        borderBottomColor: 'red',
        borderBottomWidth: 4
    },
    documentsSection: {
        backgroundColor: 'white',
        marginTop: 40,

    },
    icon: {
        marginStart: 5,
        fontSize: 18
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    accordion:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:60,
        backgroundColor:'#eee',
        borderBottomWidth:1,
        borderBottomColor:'white'
    },
    accordionText : {
        fontSize:20,
        color: 'grey',
        textTransform:'uppercase',
        fontWeight:'bold'
    }
});
