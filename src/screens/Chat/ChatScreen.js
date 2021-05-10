import React, { Component } from 'react'
import { Image } from 'react-native';
import { StyleSheet, View, Text, DeviceEventEmitter, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { translate } from 'helpers/utils.js';
import moment from 'moment';
import R from 'res/R';

export default class ChatScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      isLoading: true
    }
  }

  componentDidMount() {
    this.getChannels();
    DeviceEventEmitter.addListener('chatReceived', this.onReceive);
  }

  componentWillUnmount() {
  }

  getChannels = () => {
    global.signalR.getChannels().then((channels) => {
      this.setState({ channels, isLoading: false });
    });
  }

  onReceive = (chat) => {
    var channels = this.state.channels;
    var channel = channels.find(c => c.Channel === chat.ChannelName);
    if (channel) {
      msg = chat.ChatModel;
      channel.UnreadMsgs ++;
      channel.Msgs.unshift(msg);
      this.setState(channels);
    }
  }

  openChatRoom = (item) => {
    this.props.navigation.navigate('chatRoom', { channel: item });
  }

  renderItem = ({ item }) => {
    let lastMsg = null;
    if (item.Msgs && item.Msgs.length > 0)
      lastMsg = item.Msgs[item.Msgs.length - 1];
    return <TouchableOpacity style={styles.channel} onPress={() => this.openChatRoom(item)}>
      <Image source={{ uri: "https://icons.iconarchive.com/icons/bokehlicia/captiva/128/chat-bubble-icon.png" }} style={styles.icon} />
      <View style={R.styles.flexColumn}>
        <View style={styles.details}>
          <Text style={{ fontWeight: 'bold' }}>
            {item.Channel} {item.UnreadMsgs > 0 ? "(" + item.UnreadMsgs + ")" : ""}
          </Text>
          {lastMsg ? <Text>{moment(lastMsg.Date).format("hh:mm a")}</Text> : null}
        </View>
        {lastMsg ? <Text numberOfLines={1} ellipsizeMode='tail' style={styles.msg}>
          {global.user?.FullName === lastMsg.User ? translate("you") : lastMsg.User}: {lastMsg.Type == 5 ? lastMsg.Message : lastMsg.Type == 8 ? translate("image") : translate("video")}
        </Text> : null}
      </View>
    </TouchableOpacity>
  }

  keyExtractor = (item) => {
    return 'channel-' + item.Channel;
  }

  render() {
    return (
      this.state.isLoading ?
        <ActivityIndicator color="blue" size='large' marginTop={20} />
        :
        <View style={styles.container} accessible accessibilityLabel='main' testID='main'>
          <FlatList
            data={this.state.channels}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  channel: {
    flex: 1,
    flexDirection: 'row',
    height: 60,
    marginTop: 5,
    borderBottomWidth: 0.5,
    marginStart: 15,
    marginEnd: 15
  },
  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
    margin: 5
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  msg: {
    marginStart: 5,
    color: 'grey',
    width: '80%'
  }
})