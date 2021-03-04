
import React from "react";
import PropTypes from 'prop-types'
import Icon from 'react-native-vector-icons/Ionicons';
import R from "res/R";

function RatingStars({ rating, tag = '' }) {
    if (isNaN(rating))
        rating = 0;
    var array = new Array(rating).fill(1);
    return (
        array.map((star, index) => {
            return (
                <Icon key={tag + 'star' + index} name='star' style={R.styles.star} />
            );
        })
    )
}

RatingStars.propTypes = {
    rating: PropTypes.number.isRequired,
    tag: PropTypes.string,
}

export default RatingStars