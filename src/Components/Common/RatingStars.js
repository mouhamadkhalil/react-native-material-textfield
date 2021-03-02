
import React from "react";
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons';
import R from "res/R";

function RatingStars({ rating, key }) {
    var array = new Array(rating).fill(1);
    return (
        array.map((star, index) => {
            return (
                <Icon key={key + 'star' + index} name='star' style={R.styles.star} />
            );
        })
    )
}

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    key: PropTypes.string,
}

export default RatingStars