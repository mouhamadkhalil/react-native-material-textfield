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

roomItem = (item, index) => {
    const roomType = item.AdultNum.RoomType, infantBed = item.AdultNum.RQBedChild;
    return (
        <View style={{ flex: 1, flexDirection: 'column', height: '100%' }}>
            <Text style={{ color: 'grey', fontSize: 20, fontWeight: "bold" }}>
                #{index + 1}
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
            {roomType === 'Triple' ? (
                <CheckBox title={translate('infantBed')} checked={infantBed}
                    containerStyle={{ backgroundColor: 'white', borderWidth: 0 }}
                    checkedColor='white'
                    textStyle={{ color: 'black' }}
                    onPress={() => this.selectInfant(index)} />
            ) : null}
        </View>
    )
}