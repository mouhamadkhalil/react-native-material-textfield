"use strict";
/*var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};*/
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalrService = void 0;
var react = require("react-native");
var signalR = require("@microsoft/signalr");
var services = require("../services");
var signalRModels = require("./Signalr-models");
var SignalrService = /** @class */ (function () {
    function SignalrService() {
        this.hubConnection = null;
        this.connectionState = signalR.HubConnectionState.Disconnected;
        this.connectionUrl = "";
        this.chatReceived = react.DeviceEventEmitter;
        this.newUserConnected = react.DeviceEventEmitter;
        this.connectionChanged = react.DeviceEventEmitter;
        this.channelCreated = react.DeviceEventEmitter;
        this.channelRemoved = react.DeviceEventEmitter;
        this.notification = react.DeviceEventEmitter;
        this.connectionUrl = services.Server_URL + 'mainhub';
    }

    SignalrService.prototype.connect = function () {
        if (services.getToken() == null) {
            return;
        }
        if (!this.hubConnection || this.hubConnection.state !== signalR.HubConnectionState.Connected) {
            this.startConnection();
            this.addListeners();
        }
    };

    SignalrService.prototype.getConnectionId = function () {
        return this.hubConnection?.connectionId;
    };

    SignalrService.prototype.getConnection = function () {
        var protocol = new signalR.JsonHubProtocol();
        var connection = new signalR.HubConnectionBuilder()
            .withUrl(this.connectionUrl, {
                transport: signalR.HttpTransportType.WebSockets
            })
            .withHubProtocol(protocol)
            .configureLogging(1)
            .build();
        connection.serverTimeoutInMilliseconds = 1000 * 60 * 60 * 3; // 1 second * 60 * 60 * 2 = 2 hrs.
        return connection;
    };

    SignalrService.prototype.disconnect = function () {
        var _a;
        (_a = this.hubConnection) === null || _a === void 0 ? void 0 : _a.stop();
        this.hubConnection = null;
    };

    SignalrService.prototype.startConnection = function () {
        var _this = this;
        this.hubConnection = this.getConnection();
        Object.defineProperty(WebSocket, 'OPEN', {
            value: 1,
        });
        this.hubConnection.start()
            .then(function () {
                console.log("SignalR connection success! connectionId: " + _this.hubConnection.connectionId + " ");
                _this.connectionState = _this.hubConnection.state;
                _this.connectionChanged.emit(_this.hubConnection.state);
                _this.UpdateSignalrUserInfo();
            })
            .catch(function (err) {
                console.log('error while establishing signalr connection: ' + err);
                _this.connectionState = _this.hubConnection.state;
                setTimeout(function () { _this.connect(); }, 1000 * 120);
                _this.connectionChanged.emit(_this.hubConnection.state);
            });
        this.hubConnection.onclose(function (error) {
            _this.connectionState = _this.hubConnection.state;
            _this.connectionChanged.emit(_this.hubConnection.state);
            _this.removeListeners();
            console.log("xxxyyy, onClose", error);
            setTimeout(function () { _this.connect(); }, 1000 * 120);
        });
    };

    SignalrService.prototype.addListeners = function () {
        var _this = this;
        this.hubConnection.on("ReceiveChat", function (chatModel, channelName) {
            console.log("ReceiveChat", chatModel, channelName);
            _this.chatReceived.emit('chatReceived', { ChannelName: channelName, ChatModel: chatModel });
        });
        this.hubConnection.on("NewUserConnected", function (data) {
            console.log("NewUserConnected", data);
            _this.newUserConnected.emit(data);
        });
        this.hubConnection.on("ChannelRemoved", function (data) {
            console.log("ChannelRemoved", data);
            _this.channelRemoved.emit(data);
        });
        this.hubConnection.on("NewChannel", function (data) {
            console.log("NewChannel", data);
            _this.channelCreated.emit(data);
        });
        this.hubConnection.on("MobileNotification", function (data) {
            console.log("MobileNotification", data);
            _this.notification.emit('MobileNotification', data);
        });
    };

    SignalrService.prototype.removeListeners = function () {
        this.chatReceived.removeListener();
        this.newUserConnected.removeListener();
        this.channelRemoved.removeListener();
        this.channelCreated.removeListener();
    }

    SignalrService.prototype.UpdateSignalrUserInfo = function () {
        return services.postConnection('/backend/Notifications/UpdateSignalrUserInfo', this.getConnectionId(), null)
            .then((response) => { return response; });
    };

    SignalrService.prototype.getChannels = function (channelName) {
        var params = '';
        if (channelName) {
            params = '?channelName=' + channelName;
        }
        return services.getConnection('/backend/Notifications/getChannels' + params, this.getConnectionId())
            .then((response) => { return response; });
    }

    SignalrService.prototype.selectChannel = function (lastId, channel) {
        var params = '';
        if (lastId)
            params = '?lastId=' + lastId.toString();
        const msgObj = this.buildChatMessage('', channel);

        return services.postConnection('/backend/Notifications/selectChannel' + params, this.getConnectionId(), msgObj)
            .then((response) => { return response; });
    }

    SignalrService.prototype.sendChatMessage = function (message, channel) {
        const msgObj = this.buildChatMessage(message, channel);
        return services.postConnection("/backend/Notifications/SendChatMessage", this.getConnectionId(), msgObj)
            .then((response) => { return response; });
    }

    SignalrService.prototype.SendMediaMessage = function (message, channel, file) {
        const msgObj = this.buildChatMessage(message, channel);

        const formData = new FormData();
        if (file) {
            formData.append('file', {
                uri: file,                  // this is the path to your file. see Expo ImagePicker or React Native ImagePicker
                type: `image/png`,  // example: image/jpg
                name: `upload.png`    // example: upload.jpg
            }, file.name);
        }
        formData.append('document', JSON.stringify(msgObj));
        return services.postConnection("/backend/Notifications/SendMediaMessage", this.getConnectionId(), formData)
            .then((response) => { return response; });
    }


    SignalrService.prototype.buildChatMessage = function (message, channel) {
        var _this = this;
        var user = global.user?.FirstName; 
        var email = global.user?.Email;
        var idUser = global.user?.Id;

        const d = new Date();
        return {
            UserFullName: user,
            UserName: email,
            ConnectionId: _this.getConnectionId(),
            Token: null,
            RequestObject: message,
            DateTime: new Date(),
            Channel: channel,
            idUser: idUser,
            TimeZoneOffset: d.getTimezoneOffset(),
            Type: signalRModels.NotificationType.ChatText
        };
    }


    /*SignalrService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SignalrService);*/
    return SignalrService;
}());

exports.SignalrService = SignalrService;
