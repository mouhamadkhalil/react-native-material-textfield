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
var SignalrService = /** @class */ (function () {
    function SignalrService() {
        var _this = this;
        this.hubConnection = null;
        this.connectionState = signalR.HubConnectionState.Disconnected;
        this.connectionUrl = "";
        this.chatReceived = react.DeviceEventEmitter;
        this.newUserConnected = react.DeviceEventEmitter;
        this.connectionChanged = react.DeviceEventEmitter;
        this.channelCreated = react.DeviceEventEmitter;
        this.channelRemoved = react.DeviceEventEmitter;
        this.connect = function () {
            if (services.getToken() == null) {
                return;
            }
            if (!_this.hubConnection || _this.hubConnection.state !== signalR.HubConnectionState.Connected) {
                _this.startConnection();
                _this.addListeners();
            }
        };
        this.connectionUrl = services.API_URL + '/mainhub';
    }

    SignalrService.prototype.getConnectionId = function () {
        return 1;//this.hubConnection?.connectionId;
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
            })
            .catch(function (err) {
                console.log('error while establishing signalr connection: ' + err);
                _this.connectionState = _this.hubConnection.state;
                setTimeout(function () { _this.connect(); }, 1000 * 60);
                _this.connectionChanged.emit(_this.hubConnection.state);
            });
        this.hubConnection.onclose(function (error) {
            _this.connectionState = _this.hubConnection.state;
            _this.connectionChanged.emit(_this.hubConnection.state);
            console.log("xxxyyy, onClose", error);
            setTimeout(function () { _this.connect(); }, 1000 * 60);
        });
    };

    SignalrService.prototype.addListeners = function () {
        var _this = this;
        this.hubConnection.on("ReceiveChat", function (chatModel, channelName) {
            console.log("ReceiveChat", chatModel, channelName);
            _this.chatReceived.emit({ ChannelName: channelName, ChatModel: chatModel });
        });
        this.hubConnection.on("newUserConnected", function (data) {
            console.log("newUserConnected", data);
            _this.newUserConnected.emit(data);
        });
        this.hubConnection.on("ChannelRemoved", function (data) {
            console.log("ChannelRemoved", data);
            _this.channelCreated.emit(data);
        });
        this.hubConnection.on("NewChannel", function (data) {
            console.log("NewChannel", data);
            _this.channelRemoved.emit(data);
        });
    };

    SignalrService.prototype.UpdateSignalrUserInfo = function () {
        return services.postConnection('/Notifications/UpdateSignalrUserInfo', this.getConnectionId())
            .then((response) => { return response; });
    };

    /*SignalrService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], SignalrService);*/
    return SignalrService;
}());

exports.SignalrService = SignalrService;
