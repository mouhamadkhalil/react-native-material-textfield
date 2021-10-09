import { MaterialIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import React, { Component } from 'react'
import { StyleSheet, View, Text, Platform, Dimensions, DeviceEventEmitter, ActivityIndicator } from 'react-native'
import { Bubble, GiftedChat, SystemMessage, Send } from "react-native-gifted-chat";
import CustomActions from "components/Chat/CustomActions";
import { translate, openLink } from "helpers/utils";
import R from "res/R";

const { width } = Dimensions.get('window');

export default class ChatRoomScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      inverted: false,
      step: 0,
      messages: [],
      earlierMessages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
      isLoading: true,
      isTyping: false,
      channel: props?.route?.params?.channel,
      user: {
        _id: 1,
        name: global.user?.FullName
      }
    }
  }

  pageEmit;
  _isMounted = false;

  componentDidMount() {
    this.init();
  }

  componentWillUnmount() {
    this._isMounted = false
    this.pageEmit && this.pageEmit.remove();
  }

  init = () => {
    this.props.navigation.setOptions({
      headerStyle: {
        backgroundColor: R.colors.blue,
      },
      headerTintColor: 'white',
      title: this.state.channel?.Channel
    })
    var _this = this;
    this._isMounted = true;
    var channel = this.state.channel;
    channel.UnreadMsgs = 0;
    global.signalR.selectChannel(null, channel.Channel).then(() => {
      var messages = _this.formatChat([...channel.Msgs].reverse());
      _this.setState({
        channel,
        messages,
        earlierMessages: [],
        isLoading: false,
        isTyping: false,
      });
    });

    this.pageEmit = DeviceEventEmitter.addListener('chatReceived', this.onReceive);

  }

  formatChat = (msgs) => {
    var _this = this;
    if (msgs == null || msgs.length == 0)
      return [];
    return msgs.map(function (msg) {
      var data = {
        _id: Math.round(Math.random() * 1000000),
        createdAt: msg.Date,
        user: {
          _id: msg.User === global.user?.FullName ? 1 : 2,
          name: msg.User,
          //avatar: msg.User == global.user?.FullName ? '' : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
        }
      }
      switch (msg.Type) {
        case 5:
          data.text = msg.Message;
          break;
        case 8: // image
          data.image = msg.Message;
          break;
        case 9: // video
          data.video = msg.Message;
          break;
      }

      return data
    })
  }

  onLoadEarlier = () => {
    this.setState(() => {
      return {
        isLoadingEarlier: true,
      }
    })

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(
              previousState.messages,
              this.state.earlierMessages,
              Platform.OS !== 'web',
            ),
            loadEarlier: true,
            isLoadingEarlier: false,
          }
        })
      }
    }, 1500) // simulating network
  }

  onSendFromUser = (messages = []) => {
    messages.map(message => (
      this.onSendMedia(message)
    ))
  }

  onSend = (messages = []) => {
    global.signalR.sendChatMessage(messages[0].text, this.state.channel.Channel);
  }

  onSendMedia = (message) => {
    try {
      global.signalR.SendMediaMessage(message.text, this.state.channel.Channel, message.image);
    } catch (error) {
      global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
    }
  }

  botSend = (step = 0) => {
    const newMessage = (messagesData)
      .reverse()
      // .filter(filterBotMessages)
      .find(findStep(step))
    if (newMessage) {
      this.setState((previousState) => ({
        messages: GiftedChat.append(
          previousState.messages,
          [newMessage],
          Platform.OS !== 'web',
        ),
      }))
    }
  }

  parsePatterns = (linkStyle) => {
    return [
      {
        type: 'phone',
        style: { textDecorationLine: 'underline' },
        onPress: (url) => { openLink('tel', url) }
      },
    ]
  }

  onReceive = (chat) => {
    if (chat.ChannelName === this.state.channel.Channel) {
      var msg = chat.ChatModel;
      // update selected channel;
      var channel = this.state.channel;
      channel.UnreadMsgs = 0;

      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(
            previousState.messages,
            [
              {
                _id: Math.round(Math.random() * 1000000),
                text: msg.Message,
                createdAt: msg.Date,
                user: {
                  _id: msg.User === global.user?.FullName ? 1 : 2,
                  name: msg.User,
                  //avatar: msg.User == global.user?.FullName ? '' : 'https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png'
                }
              },
            ],
            Platform.OS !== 'web',
          ),
          channel
        }
      })
    }
  }

  setIsTyping = () => {
    this.setState({
      isTyping: !this.state.isTyping,
    })
  }

  renderCustomActions = props =>
    <CustomActions {...props} onSend={this.onSendFromUser} />

  renderMessageVideo = (props) => {
    const { currentMessage } = props;
    return (
      <Video
        useNativeControls
        source={{ uri: currentMessage.video }}
        style={styles.video}
        resizeMode="cover"
      />
    );
  };

  renderBubble = (props) => {
    return <Bubble {...props} />
  }

  renderSystemMessage = props => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          fontSize: 14,
        }}
      />
    )
  }

  onQuickReply = replies => {
    const createdAt = new Date()
    if (replies.length === 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies[0].title,
          user,
        },
      ])
    } else if (replies.length > 1) {
      this.onSend([
        {
          createdAt,
          _id: Math.round(Math.random() * 1000000),
          text: replies.map(reply => reply.title).join(', '),
          user,
        },
      ])
    } else {
      console.warn('replies param is not set correctly')
    }
  }

  renderQuickReplySend = () => <Text>{' custom send =>'}</Text>

  renderSend = (props) => (
    <Send {...props} containerStyle={{ justifyContent: 'center' }}>
      <MaterialIcons size={30} color={'tomato'} name={'send'} />
    </Send>
  )

  render() {
    return (
      this.state.isLoading ?
        <ActivityIndicator color="blue" size='large' marginTop={20} />
        :
        <View style={styles.container} accessible accessibilityLabel='main' testID='main'>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            loadEarlier={this.state.loadEarlier}
            onLoadEarlier={this.onLoadEarlier}
            isLoadingEarlier={this.state.isLoadingEarlier}
            parsePatterns={this.parsePatterns}
            user={this.state.user}
            scrollToBottom
            onLongPressAvatar={user => alert(JSON.stringify(user))}
            onPressAvatar={() => alert('short press')}
            onQuickReply={this.onQuickReply}
            keyboardShouldPersistTaps='never'
            renderMessageVideo={this.renderMessageVideo}
            renderActions={this.renderCustomActions}
            renderBubble={this.renderBubble}
            renderSystemMessage={this.renderSystemMessage}
            renderSend={this.renderSend}
            quickReplyStyle={{ borderRadius: 2 }}
            renderQuickReplySend={this.renderQuickReplySend}
            inverted={Platform.OS !== 'web'}
            timeTextStyle={{ left: { color: 'red' }, right: { color: 'yellow' } }}
            isTyping={this.state.isTyping}
            infiniteScroll
          />
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: {
    width: width / 1.5,
    height: 150,
    margin: 13,
    borderRadius: 13,
  },
})