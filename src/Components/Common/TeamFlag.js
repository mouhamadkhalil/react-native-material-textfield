import React from 'react';
import { StyleSheet } from "react-native";
import PropTypes from 'prop-types';
import { LinearGradient } from 'expo-linear-gradient';

function TeamFlag({ color1, color2 }) {
    return (
        <LinearGradient
            colors={[color1, color2]}
            style={styles.linearGradient}
            start={[0, 0]}
            end={[1, 0]}
            locations={[0.5, 0.5]}
        />
    )
}

TeamFlag.propTypes = {
    color1: PropTypes.string.isRequired,
    color2: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
    linearGradient: {
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderRadius: 50,
        height: 20,
        width: 20,
    },
});

export default TeamFlag