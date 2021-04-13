
import React from "react";
import { StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types'

function RatingStars({ rating, tag = '' }) {
    if (isNaN(rating))
        rating = 0;
    var array = new Array(rating).fill(1);
    return (
        array.map((star, index) => {
            return (
                <Icon key={tag + 'star' + index} name='star' style={styles.star} />
            );
        })
    )
}

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    tag: PropTypes.string,
}

const styles = StyleSheet.create({
    star: {
        color: "#f9d155",
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});

export default RatingStars