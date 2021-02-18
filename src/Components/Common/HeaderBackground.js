import React from "react";
import {
    Text,
    ImageBackground,
} from "react-native";
import R from "res/R";

export class HeaderBackground extends React.Component {
    render() {
        return (
            <ImageBackground source={this.props.image} style={R.styles.headerBackground}>
                <Text style={R.styles.pageTitleText}>
                    {this.props.title}
                </Text>
            </ImageBackground>
        );
    }
}

