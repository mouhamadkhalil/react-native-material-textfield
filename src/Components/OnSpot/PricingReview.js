import React from "react";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'

function PricingReview({ review, tag = '' }) {
    if (isNaN(review))
    review = 0;
    var array = new Array(5).fill(1);
    return (
        array.map((star, index) => {
            return (
                <Icon key={tag + 'price' + index} name='logo-usd' style={index < review? styles.active : styles.inactive} />
            );
        })
    )
}

PricingReview.propTypes = {
    review: PropTypes.number.isRequired,
    tag: PropTypes.string,
}

const styles = StyleSheet.create({
    active: {
        color: "#fff",
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    inactive: {
        color: "#bbb",
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default PricingReview