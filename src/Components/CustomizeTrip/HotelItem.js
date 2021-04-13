import React , {useState} from "react";
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { CheckBox, Tooltip } from 'react-native-elements';
import RatingStars from "components/Trips/RatingStars";
import { translate } from "helpers/utils.js";
import R from "res/R";

const HotelItem = ({ item, isSelected }) => {
    const rating = parseInt(item.Rating);
    const policy = item.SelectedPolicy;

    const [isGettingPolicy, setIsGettingPolicy] = useState(false);

    const selectHotel = () => {

    }

    return (
        <View style={[R.styles.flexColumn,{ backgroundColor: isSelected ? R.colors.blue : 'white', height: 200, marginTop: 10 }]}>
            <View style={R.styles.flexRow}>
                {/* images */}
                <View style={{ width: '30%', height: '100%' }}>
                    <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.openPictures(item.Images)}>
                        <View>
                            <View style={{ position: 'absolute', zIndex: 2, width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.7, alignItems: 'center', justifyContent: 'center' }}>
                                <Icon name='eye-outline' style={{ fontSize: 24, color: 'white', fontWeight: 'bold' }} />
                            </View>
                            <Image source={{ uri: item.Image }} style={{ width: "100%", height: '100%' }} />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* details */}
                <View style={{ width: '70%', flex: 1, flexDirection: 'column', padding: 10 }}>
                    {/* hotel name */}
                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: isSelected ? 'white' : 'black' }}>
                        {item.HotelName}
                    </Text>

                    {/* rating + cost */}
                    <View style={R.styles.flexRow}>
                        <RatingStars rating={rating} tag={item.HotelId} />
                        <Text style={{ fontWeight: 'bold', color: isSelected ? R.colors.lightGreen : 'black', alignSelf: 'flex-end', }}>
                            + {item.SelectedCategory.ExtraCostPerFan} $
                        </Text>
                    </View>

                    {/* category */}
                    {item.SelectedCategory?.Name ? (
                        <View style={R.styles.flexRow}>
                            <Image source={isSelected ? R.images.bedWhite : R.images.bedGrey} style={{ width: 25 }} />
                            <Text numberOfLines={1} ellipsizeMode='tail' style={{ width: '80%', color: isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                {item.SelectedCategory.Name}
                            </Text>
                        </View>
                    ) : null}

                    {/* breakfast */}
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Image source={isSelected ? R.images.coffeeCupWhite : R.images.coffeeCupGrey} style={{ width: 25 }} />
                        <Text style={{ color: isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                            {item.SelectedCategory.NoBreakFast ? translate('noBreakfast') : translate('includeBreakfast')}
                        </Text>
                    </View>

                    {/* policy */}
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        {isGettingPolicy ? (<ActivityIndicator size='small' color='white' />) : null}
                        {item.HasPolicy  ?
                            <>
                                {policy.Refundable ?
                                    (<>
                                        <Image source={isSelected ? R.images.refundWhite : R.images.refundGrey} style={{ width: 25 }} />
                                        <Text style={{ color: isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                            {translate('refundable')}
                                        </Text>
                                        <Tooltip popover={<Text>{policy.RefundableText}</Text>} withOverlay={false} width={350} backgroundColor='white'>
                                            <Image source={isSelected ? R.images.infoWhite : R.images.infoGrey} style={{ width: 25 }} />
                                        </Tooltip>
                                    </>
                                    )
                                    :
                                    (
                                        <>
                                            <Image source={isSelected ? R.images.norefundWhite : R.images.norefundGrey} style={{ width: 25 }} />
                                            <Text style={{ color: isSelected ? R.colors.lightGrey : R.colors.grey, paddingStart: 10 }}>
                                                {translate('nonRefundable')}
                                            </Text>
                                        </>
                                    )
                                }
                            </>
                            : null}
                    </View>
                </View>
            </View>

            {/* selection */}
            <View style={{ borderTopWidth: 0.2 }}>
                <CheckBox title={translate('selectHotel')}
                    checked={isSelected}
                    containerStyle={{ backgroundColor: isSelected ? R.colors.blue : 'white', borderWidth: 0 }}
                    checkedColor='white'
                    textStyle={{ color: isSelected ? 'white' : 'black', textTransform: 'uppercase' }}
                    center
                    checkedIcon='dot-circle-o'
                    uncheckedIcon='circle-o'
                    onPress={selectHotel} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

    radioButtonContainter: {}
});



export default HotelItem;