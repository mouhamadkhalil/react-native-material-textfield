import React from "react";
import {
    StyleSheet,
    View,
    Image,
    TouchableHighlight
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import R from "res/R";

export default class ModalHeader extends React.PureComponent {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logo}>
                    <Image source={R.images.flyfoot_grey} />
                </View>
                <TouchableHighlight style={styles.closeButton} onPress={() => { this.props.close() }}>
                    <Icon name='close' style={styles.close} />
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        borderBottomColor: '#eee',
        borderBottomWidth: 1
    },
    logo: {
        width: '80%',
        padding: 10
    },
    closeButton: {
        width: '20%',
        backgroundColor: R.colors.blue,
        alignContent: 'center',
        justifyContent: 'center'
    },
    close: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
