import React from "react";
import { WebView } from 'react-native-webview';

export default class LeaderBoard extends React.Component {

    constructor(props) {
        super(props);
        const navigation = this.props;
    }

    render() {
        return <WebView source={{ uri: 'https://beta.fly-foot.com/en/gamification/leaderboard' }} />;
    }
}

