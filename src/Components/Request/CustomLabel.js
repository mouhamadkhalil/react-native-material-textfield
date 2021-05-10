import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

CustomLabel.defaultProps = {
    leftDiff: 0,
};

const width = 50;
const pointerWidth = width * 0.47;

function LabelBase(props) {
    const { position, value, pressed } = props;
    const cachedPressed = React.useRef(pressed);

    React.useEffect(() => {
        cachedPressed.current = pressed;
    }, [pressed]);

    return (
        Number.isFinite(position) &&
        Number.isFinite(value) && (
            <View style={[styles.sliderLabel, { left: position - width / 3 }]}>
                <Text style={styles.sliderLabelText}>
                    {value}
                </Text>
            </View>
        )
    );
}

export default function CustomLabel(props) {
    const {
        leftDiff,
        oneMarkerValue,
        twoMarkerValue,
        oneMarkerLeftPosition,
        twoMarkerLeftPosition,
        oneMarkerPressed,
        twoMarkerPressed,
    } = props;

    return (
        <View style={styles.parentView}>
            <LabelBase
                position={oneMarkerLeftPosition}
                value={oneMarkerValue}
                leftDiff={leftDiff}
                pressed={oneMarkerPressed}
            />
            <LabelBase
                position={twoMarkerLeftPosition}
                value={twoMarkerValue}
                leftDiff={leftDiff}
                pressed={twoMarkerPressed}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    parentView: {
        position: 'relative',
    },
    sliderLabel: {
        position: 'absolute',
    },
    sliderLabelText: {
        flex: 1,
        fontSize: 14,
        color: '#00f',
        bottom: 4,
        left: (width - pointerWidth) / 2,
    },
});