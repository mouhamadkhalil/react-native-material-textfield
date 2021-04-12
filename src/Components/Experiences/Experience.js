import React, { useState } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import DatePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import { translate } from "helpers/utils.js";
import moment from 'moment';
import R from "res/R";

const Experience = ({ details, matchDate, item, index, showMoreInfo, addToTrip, isSummary }) => {

    const [experience, setExperience] = useState({ ...item });
    const [showDatePicker, setShowDatePicker] = useState(false);

    const incrementFan = () => {
        if (experience.Qty < details.NumberOfTravelers) {
            experience.Qty++;
            setExperience({ ...experience });
        }
    }

    const decrementFan = () => {
        if (experience.Qty > 1) {
            experience.Qty--;
            setExperience({ ...experience });
        }
    }

    return (
        <View style={{ marginTop: 20, backgroundColor: 'white', elevation: 5 }}>
            <View style={[R.styles.flexColumn, { padding: 15 }]}>
                <Text style={{ color: 'grey', textTransform: 'uppercase' }}>
                    {experience.ServiceCategory}
                </Text>
                <Text style={{ color: R.colors.blue, fontSize: 18, marginTop: 15, marginBottom: 15 }}>
                    {experience.ServiceName}
                </Text>
                <Image source={{ uri: experience.ImageReference }} style={{ width: '100%', height: 300, resizeMode: 'cover' }} />
                <Text style={{ color: 'grey', height: 160, marginTop: 20 }}>
                    {experience.Description}
                </Text>
                <View style={styles.fade} />

                <View style={[R.styles.flexRow, { marginTop: 10, alignItems: 'center' }]}>
                    <Icon name='information-circle-outline' size={25} style={{ color: R.colors.lightGreen }} />
                    <TouchableOpacity onPress={() => showMoreInfo(experience)}>
                        <Text style={{ fontSize: 18, marginStart: 5, color: R.colors.lightGreen, textDecorationLine: 'underline' }}>
                            {translate('moreInfo')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* when */}
            <View style={experience.isAdded ? styles.blueBackground : styles.whiteBackground}>
                <View style={[R.styles.flexColumn, { marginTop: 10, borderTopColor: 'grey', borderTopWidth: 0.5, height: 80 }]}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ textTransform: 'uppercase' }}>
                            {translate('when')}
                        </Text>
                        {experience.isAdded ?
                            <Text style={{ height: 30, fontSize: 20, fontWeight: 'bold', width: '90%', color: R.colors.lightGreen }}>
                                {moment(experience.Date ? experience.Date : matchDate).format('DD.MM.YYYY')}
                            </Text>
                            :
                            <TouchableOpacity style={{ borderBottomWidth: 0.5 }} onPress={() => setShowDatePicker(true)}>
                                <View style={{ flexDirection: 'row' }}>
                                    <Text style={{ height: 30, fontSize: 20, fontWeight: 'bold', width: '90%' }}>
                                        {moment(experience.Date ? experience.Date : matchDate).format('DD.MM.YYYY')}
                                    </Text>
                                    <Image source={R.images.calendar} style={{ width: 20, height: 20 }} />
                                </View>
                            </TouchableOpacity>
                        }
                    </View>
                    <View style={{ width: 200, height: 200 }}>
                        {showDatePicker && (
                            <DatePicker
                                value={new Date(details.StartDate)}
                                mode="date"
                                display="default"
                                minimumDate={new Date(details.StartDate)}
                                maximumDate={new Date(details.EndDate)}
                                onChange={(event, date) => {
                                    experience.Date = date;
                                    setExperience({ ...experience });
                                    setShowDatePicker(false);
                                }}
                            />
                        )}
                    </View>
                </View>

                {/* how many */}
                <View style={[R.styles.flexColumn, { marginTop: 10, borderTopColor: 'grey', borderTopWidth: 0.5, height: 80 }]}>
                    <View style={{ padding: 15 }}>
                        <Text style={{ textTransform: 'uppercase' }}>
                            {translate('howMany')}
                        </Text>
                        <View style={{ flexDirection: 'row', marginTop: 10 }}>
                            {experience.isAdded ?
                                <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10, color: R.colors.lightGreen }}>
                                    {experience.Qty > 0 }
                                </Text>
                                :
                                <>
                                    <TouchableOpacity style={{ width: 50 }} onPress={() => decrementFan()}>
                                        <Icon name='remove-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                    <Text style={{ fontSize: 20, fontWeight: 'bold', marginStart: 10, marginEnd: 10, color: "black" }}>
                                    {experience.Qty > 0 ? experience.Qty : details.NumberOfTravelers }
                                    </Text>
                                    <TouchableOpacity style={{ width: 50 }} onPress={() => incrementFan()}>
                                        <Icon name='add-circle-outline' style={styles.textStyle} />
                                    </TouchableOpacity>
                                </>
                            }
                        </View>
                    </View>
                </View>
                {/* price */}
                <View style={[R.styles.flexRow, { marginTop: 10, borderTopColor: 'grey', borderTopWidth: 0.5, height: 80 }]}>
                    <View style={{ width: '50%', height: '100%', justifyContent: 'center', padding: 15 }}>
                        <Text style={{ textTransform: 'uppercase' }}>
                            {translate('price')}
                        </Text>
                        <View style={[R.styles.flexRow, { marginTop: 5, alignItems: 'center' }]}>
                            <Text style={{ fontSize: 16, color: experience.isAdded ? R.colors.lightGreen : R.colors.blue }}>
                                {experience.UnitPrice * (experience.Qty > 0 ? experience.Qty: details.NumberOfTravelers)}$
                            </Text>
                            {experience.Qty > 1 || details.NumberOfTravelers?
                                <Text style={{ marginStart: 5, fontSize: 14, color: experience.isAdded ? R.colors.lightGreen : R.colors.blue }}>
                                    ({experience.UnitPrice} $/fan)
                                </Text>
                                : null}
                        </View>
                    </View>
                    {(experience.isAdded && !isSummary) ?
                        <TouchableOpacity style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 15 }}
                            onPress={() => addToTrip(experience, index)}>
                            <View style={[R.styles.flexRow, { justifyContent: 'center' }]}>
                                <Icon name="checkmark-outline" size={20} style={{ color: R.colors.lightGreen }} />
                                <Text style={{ textTransform: 'uppercase', marginStart: 10, color: R.colors.lightGreen }}>
                                    {translate('added')}
                                </Text>
                            </View>
                            <View style={[R.styles.flexRow, { justifyContent: 'center' }]}>
                                <Icon name='close-circle-outline' size={20} style={{ color: "white" }} />
                                <Text style={{ textTransform: 'uppercase', marginStart: 10, color: 'white' }}>
                                    {translate('remove')}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        : !isSummary ?
                            <TouchableOpacity style={styles.greenButton} onPress={() => addToTrip(experience, index)}>
                                <Text style={{ textTransform: 'uppercase', alignSelf: 'center' }}>
                                    + {translate('addToTrip')}
                                </Text>
                            </TouchableOpacity>
                            :
                            <View style={[R.styles.flexRow, { justifyContent: 'center', alignContent: 'center', alignItems: 'center' }]}>
                                <Icon name="checkmark-outline" size={20} style={{ color: R.colors.lightGreen }} />
                                <Text style={{ textTransform: 'uppercase', marginStart: 10, color: R.colors.lightGreen }}>
                                    {translate('added')}
                                </Text>
                            </View>
                    }
                </View>
            </View>
        </View>);
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: "#FFF",
        marginTop: 30,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    fade: {
        display: 'flex',
        height: 80,
        backgroundColor: 'white',
        opacity: 0.8,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    greenButton: {
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: R.colors.lightGreen
    },
    blueBackground: {
        backgroundColor: R.colors.blue
    },
    whiteBackground: {
        backgroundColor: "white"
    },
    blueText: {
        color: R.colors.blue
    },
    textStyle: {
        color: R.colors.blue,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Experience;