var MainHubRequestModel = {
    Type: 1, //NotificationType
    UserName: "",
    idUser: "",
    UserFullName: "",
    ConnectionId: "",
    Token: "",
    RequestObject: "",
    DateTime: "",
    TimeZoneOffset: "",
    Channel: ""
}

var Channels = {
    ChannelName: "",
    UnreadMessages: 0,
    Messages: [] //MainHubResponseModel
}

var MainHubResponseModel = {
    Type: 1, //NotificationType
    UserName: "",
    UserFullName: "",
    ResponseObject: {},
    DateTime: "",
    IsRead: false,
    idNotification: 0,
    SecondObject: {},
    RedirectTo: "",
}

var ReceiveChatObj = {
    ChatModel: {}, //ChatModel
    ChannelName: ""
}

var NotificationType = {
    PushNotification: 1,
    SMS: 2,
    Email: 3,
    WhatsAppBroadcast: 4,
    ChannelCreated: 6,
    ChannelRemoved: 7,
    ChatText: 5,
    ChatImage: 8,
    ChatVideo: 9,
    NewUserConnected: 10
}

var ChannelModel = {
    Channel: "",
    TotalMsgs: 0,
    UnreadMsgs: 0,
    lastMsgId: 0,
    Type: 1, //ChannelType
    Msgs: [], //ChatModel
    Users: [], //ChannelUser
    CanViewMsgs: true
}

var ChatModel = {
    User: "",
    Message: "",
    Date: "",
    Type: 1 // NotificationType
}

var ChannelType = {
    FlyfootPrivate: 1,
    FlyfootPublic: 2,
    ClientsPrivate: 3,
    ClientsPublic: 4
}

var ChannelUser = {
    Email: "",
    Name: "",
    UserHasApproved: false
}


export { MainHubRequestModel, Channels, MainHubResponseModel, ReceiveChatObj, NotificationType, ChannelModel, ChatModel, ChannelType, ChannelUser }