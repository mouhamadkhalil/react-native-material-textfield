import React from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    View,
    Modal,
    TouchableOpacity,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { translate } from "helpers/utils.js";
import * as services from "services/manageTrip.js";
import { formatChangeTypes } from "helpers/tripHelper.js";
import R from "res/R";

export default class TripChangesScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            changeTypes: [],
            packageChangeRequest: {
                ChangeType: '',
                Description: '',
            },
            showModal: false
        };
    }

    componentDidMount() {
        try {
            this.getData();
        } catch (error) {
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        }
    }

    // get the data from the async storage
    getData = async () => {
        var changeTypes = formatChangeTypes(JSON.parse(await AsyncStorage.getItem('@cancellationDropdown')));
        this.setState({ changeTypes });
    }

    cancel = () => {
        var packageChangeRequest = {
            ChangeType: '',
            Description: '',
        }
        this.setState({ packageChangeRequest, showModal: false });
    }

    submit = () => {
        var packageChangeRequest = this.state.packageChangeRequest;
        if (packageChangeRequest != null && packageChangeRequest.ChangeType != '' && packageChangeRequest.Description != '') {
            services.requestChange(packageChangeRequest).then((response) => {
                if (response)
                    this.setState({ showModal: true });
                else
                    global.toast.show(translate('msgErrorOccurred'), { type: "danger" });
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Text style={{ fontSize: 17 }}>
                        {translate("changesDescription")}
                    </Text>
                    <View style={{ backgroundColor: "white", marginTop: 30 }}>
                        <Text style={styles.title}>
                            {translate("changesCancellations")}
                        </Text>

                        <View style={{ width: 200, margin: 10 }}>
                            <DropDownPicker
                                items={this.state.changeTypes}
                                defaultValue={this.state.packageChangeRequest.ChangeType}
                                containerStyle={{ height: 40 }}
                                style={{ backgroundColor: "#fff" }}
                                itemStyle={{ justifyContent: "flex-start", }}
                                dropDownStyle={{ color: "gray" }}
                                onChangeItem={(item) => {
                                    var packageChangeRequest = this.state.packageChangeRequest;
                                    packageChangeRequest.ChangeType = item.value;
                                    this.setState({ packageChangeRequest })
                                }
                                }
                            />
                        </View>
                        <View style={{ margin: 10 }} >
                            <Text>
                                {translate("reason")}
                            </Text>
                            <TextInput placeholder={translate("explainReason")} multiline={true} style={styles.input}
                                value={this.state.packageChangeRequest.Description}
                                onChangeText={(text) => {
                                    var packageChangeRequest = this.state.packageChangeRequest;
                                    packageChangeRequest.Description = text;
                                    this.setState({ packageChangeRequest })
                                }} />
                        </View>
                    </View>
                    <View style={{ height: 60, flexDirection: "row" }}>
                        <TouchableOpacity style={R.styles.blackButton} onPress={() => this.cancel()}>
                            <Text style={styles.textButton}>
                                {translate('cancel')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={R.styles.blueButton} onPress={() => this.submit()}>
                            <Text style={styles.textButton}>
                                {translate('submit')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showModal}
                    onRequestClose={() => { this.setState({ showModal: false }) }}>
                    <View style={styles.modalView}>
                        <View style={styles.modalContainer}>
                            <View>
                                <Text style={styles.modalText}>
                                    {translate('msgChangeSent')}
                                </Text>
                            </View>
                            <View style={{ height: 60, flexDirection: "row", marginTop: 50 }}>
                                <TouchableOpacity style={R.styles.blackButton} onPress={() => this.cancel()}>
                                    <Text style={styles.textButton}>
                                        {translate('submitNew')}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={R.styles.blueButton} onPress={() => this.setState({ showModal: false })}>
                                    <Text style={styles.textButton}>
                                        {translate('ok')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        color: R.colors.blue,
        fontWeight: "bold",
        fontSize: 15,
        marginTop: 10,
        marginStart: 15,
        textTransform: "uppercase"
    },
    input: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginBottom: 30
    },
    button: {
        backgroundColor: R.colors.blue,
        height: 50,
        width: 180,
    },
    textButton: {
        fontSize: 17,
        fontWeight: "bold",
        color: "white",
        textAlign: "center",
        alignSelf: 'center',
        textTransform: "uppercase"
    },
    modalView: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(100, 100, 100, 0.5)'
    },
    modalContainer: {
        width: '85%',
        height: '20%',
        backgroundColor: '#fff',
    },
    modalText: {
        color: R.colors.blue,
        fontSize: 20,
        textAlign: 'center',
    }
});
