import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    Linking,
    TouchableOpacity,
    Modal,
    TextInput
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome5';
import ModalHeader from "components/Common/ModalHeader";
import { post, servicesUrl } from "helpers/services.js";
import { translate } from "helpers/utils.js";
import R from "res/R";

export default class ContactUsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            showForm: false,
            isLoading: true,
            form: {
                FullName: global.user?.FullName,
                Address: '',
                Phone: global.user?.PhoneNumber,
                Email: global.user?.Email,
                Description: ''
            }
        };
        this.toast = React.createRef();
    }
    componentDidMount() {
        try {
            this.setState({ isLoading: false });
        } catch { }
    }

    openLink = (link) => {
        Linking.openURL(link);
    }

    submit = () => {
        post(servicesUrl.contactUs, this.state.form)
            .then((response) => {
                if (response) 
                    global.toast.show(translate('msgFeedbackSent'), { type: "success" });
                else
                    global.toast.show(translate('msgErrorOccurred'), { type: "danger" });
            });
            this.closeForm();
    }

    closeForm = () => {
        this.setState({ showForm: false });
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator color={R.colors.blue} marginTop={50} />
                    :
                    <View style={styles.chatContainer}>
                        <TouchableOpacity style={styles.linkButton}>
                            <Icon name="facebook-messenger" style={[styles.linkIcon, { color: 'dodgerblue' }]} />
                            <Text style={[styles.linkText, { color: 'dodgerblue' }]}>
                                {translate('messenger')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.linkButton}>
                            <Icon name="whatsapp" style={[styles.linkIcon, { color: R.colors.lightGreen }]} />
                            <Text style={[styles.linkText, { color: R.colors.lightGreen }]}>
                                {translate('whatsapp')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.linkButton} onPress={() => { this.setState({ showForm: true }) }}>
                            <Icon name="comment-dots" style={styles.linkIcon} />
                            <Text style={styles.linkText}>
                                {translate('feedback')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                {/* form modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.showForm}
                    onRequestClose={() => this.closeForm()}>
                    <View style={styles.modalView}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            {/* logo + close */}
                            <ModalHeader close={() => this.closeForm()} />

                            {/* fields */}
                            <View style={{ flex: 1, flexDirection: 'column', height: '90%', backgroundColor: '#fff' }}>
                                {/* name */}
                                <View style={styles.field}>
                                    <Text style={styles.fieldLabel}>
                                        {translate('fullName')} *
                                    </Text>
                                    <TextInput
                                        multiline={false}
                                        value={this.state.form.FullName}
                                        onChangeText={(fullName) => {
                                            var form = this.state.form;
                                            form.FullName = fullName;
                                            this.setState({ form })
                                        }}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldLabel}>
                                        {translate('address')} *
                                    </Text>
                                    <TextInput
                                        multiline={false}
                                        value={this.state.form.Address}
                                        onChangeText={(address) => {
                                            var form = this.state.form;
                                            form.Address = address;
                                            this.setState({ form })
                                        }}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldLabel}>
                                        {translate('phone')} *
                                    </Text>
                                    <TextInput
                                        multiline={false}
                                        value={this.state.form.Phone}
                                        onChangeText={(phone) => {
                                            var form = this.state.form;
                                            form.Phone = phone;
                                            this.setState({ form })
                                        }}
                                        style={styles.input}
                                        keyboardType="phone-pad"
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldLabel}>
                                        {translate('email')} *
                                    </Text>
                                    <TextInput
                                        multiline={false}
                                        value={this.state.form.Email}
                                        onChangeText={(email) => {
                                            var form = this.state.form;
                                            form.Email = email;
                                            this.setState({ form })
                                        }}
                                        style={styles.input}
                                        keyboardType="email-address"
                                    />
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldLabel}>
                                        {translate('description')} *
                                    </Text>
                                    <TextInput
                                        multiline={true}
                                        numberOfLines={4}
                                        value={this.state.form.Description}
                                        onChangeText={(description) => {
                                            var form = this.state.form;
                                            form.Description = description;
                                            this.setState({ form })
                                        }}
                                        style={[styles.input, { height: 120 }]}
                                    />
                                </View>

                                {/* submit */}
                                <TouchableOpacity style={styles.submitButton} onPress={() => this.submit()}>
                                    <Text style={styles.submitText}>
                                        {translate('submit')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
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
    chatContainer: {
        flexDirection: 'column',
        height: 300,
        margin: 15
    },
    linkButton: {
        ...R.styles.flexRow,
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
    },
    linkIcon: {
        color: R.colors.blue,
        fontSize: 25,
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
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderBottomColor: R.colors.lightGrey,
        borderBottomWidth: 1
    },
    fieldLabel: {
        width: "30%",
        textTransform: 'uppercase'
    },
    input: {
        height: 40,
        width: "70%",
        borderBottomWidth: 1,
        borderColor: "#ccc"
    },
    submitButton: {
        width: '50%',
        marginTop: 20,
        padding: 20,
        backgroundColor: R.colors.lightGreen,
        alignSelf: 'center'
    },
    submitText: {
        fontSize: 15,
        textTransform: 'uppercase',
        alignSelf: 'center'
    }
});