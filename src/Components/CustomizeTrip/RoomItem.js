import React from "react";
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import { CheckBox } from 'react-native-elements';
import { translate } from "helpers/utils.js";
import R from "res/R";

export class RoomItem extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        var roomType= this.props.item.AdultNum.RoomType, infantBed = this.props.item.AdultNum.RQBedChild;
        return (
            <View style={{ flex: 1, flexDirection: 'column', height: '100%' }}>
                <Text style={{ color: 'grey', fontSize: 20, fontWeight: "bold" }}>
                    #{this.props.index + 1}
                </Text>
                <View style={{ flex: 1, flexDirection: 'row', height: 50, marginTop: 20 }}>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Single' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Single' ? 'white' : 'black' }}>
                            {translate('single')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Double' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Double' ? 'white' : 'black' }}>
                            {translate('double')}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.roomButton, { backgroundColor: roomType === 'Triple' ? R.colors.blue : R.colors.lightGrey }]}>
                        <Text style={{ fontSize: 16, color: roomType === 'Triple' ? 'white' : 'black' }}>
                            {translate('triple')}
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                    roomType === 'Triple' ? (
                        <CheckBox title={translate('infantBed')} checked={infantBed}
                            containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                            checkedColor='white'
                            textStyle={{ color: 'black' }}
                            onPress={() => this.selectInfant(this.props.index)} />
                    ) : null
                }
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        backgroundColor: '#eee',
        width: '100%',
        height: '100%',
    },
    blueText: {
        fontWeight: "bold",
        color: R.colors.blue,
        fontSize: 17.5
    },
    darkText: {
        fontWeight: "normal",
        color: "#151b20",
        fontSize: 14
    },
    modalView: {
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
    },
    textStyle: {
        color: R.colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    roomButton: {
        width: '30%',
        backgroundColor: R.colors.lightGrey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
});
