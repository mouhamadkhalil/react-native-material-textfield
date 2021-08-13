import * as SecureStore from 'expo-secure-store';
import { translate } from "helpers/utils";

export const Server_URL = "https://apitest.fly-foot.com/"
export const API_URL = "https://beta.fly-foot.com/api"

export const servicesUrl = {
    /* GET */
    getHomePageData: '/mobile/game/GetHomePageDataMobile',
    getAllGames: '/mobile/game/getall',
    getGameCalendar: '/mobile/game/GameCalendar',
    getAllTeams: '/mobile/team/all',
    getAllCities: '/mobile/city/destinationCity',
    getAllLeagues: '/mobile/leagues/all',
    getCountry: '/mobile/country',
    getCountriesWithTeams: '/mobile/team/countriesWithTeams',
    getSearchTeam: '/mobile/team/search?text=',
    getGameV2: '/mobile/game/v2/',
    getAmadeusCities: '/mobile/city/amadeusCity',
    getFlagBundle: '/mobile/game/flagBundle',
    getSuggestedGames: '/mobile/game/getSuggestedGames',
    getGameSearch: '/mobile/game/search?text=',
    getTeamSearch: '/mobile/team/search?text=',
    GetFlightRule: '/mobile/game/flight/GetFlightRule',
    GetNotificationList: '/mobile/getNotificationList',
    GetToken: '/mobile/getToken',

    /* POST */
    login: '/mobile/profile/login',
    searchFlights: '/mobile/game/SearchFlight',
    searchFlightInventory: '/mobile/game/searchFlightInventory',
    getPagedFlights: '/mobile/game/getPagedFlights',
    searchHotel: '/mobile/game/SearchHotel',
    getPagedHotels: '/mobile/game/getPagedHotels',
    viewCancelPolicy: '/mobile/hotel/ViewCancelPolicyV2',
    saveBundleMulti: '/mobile/game/saveBundleMulti',
    saveBundle: '/mobile/game/saveBundle',
    getExtraServices: '/mobile/game/getExtraServices',
    addGames: "/mobile/game/addGames",
    intent: "/mobile/game/stripe/intent",
    contactUs: "/mobile/about/contactus",

    /*documents*/
    documentDownload: API_URL +'/mobile/download/'

}

export async function getToken() {
    try {
        const value = await SecureStore.getItemAsync('token');
        if (value !== null) {
            return value
        }
    } catch (error) {
        global.toast.show(translate('msgErrorOccurred'), { type: "danger" });
    }
};

getLocation = async () => {
    try {
        const value = await SecureStore.getItemAsync('location');
        if (value !== null) {
            return value
        }
    } catch (error) {
        global.toast.show(translate('msgErrorOccurred'), { type: "danger" });
    }
};

export async function get(path) {
    const location = await getLocation();
    const url = `${API_URL}${path}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location
        },
    })
        .then((res) => res.json())
        .catch((error) => global.toast.show(translate('msgErrorOccurred'), { type: "danger" }))
        .then((response) => {
            return response;
        });
}

export async function getWithToken(path) {
    const token = await getToken();
    const location = await getLocation();
    const url = `${API_URL}${path}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location,
            "Authorization": 'Bearer ' + token
        },
    })
        .then((res) => res.json())
        .catch((error) => global.toast.show(translate('msgErrorOccurred'), { type: "danger" }))
        .then((response) => {
            return response;
        });
}

export async function post(path, data) {
    const token = await getToken();
    const location = await getLocation();
    const url = `${API_URL}${path}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location,
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => global.toast.show(translate('msgErrorOccurred'), { type: "danger" }))
        .then((response) => {
            return response;
        });
}

export async function postLogin(path, data) {
    const location = await getLocation();
    const url = `${API_URL}${path}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location,
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => global.toast.show(translate('msgErrorOccurred'), { type: "danger" }))
        .then((response) => {
            return response;
        });
}

export async function getConnection(path, connectionId) {
    const token = await getToken();
    const location = await getLocation();
    const url = `https://botest.fly-foot.com/api${path}`;
    return fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location,
            "Authorization": 'Bearer ' + token,
            "signalr-connectionid": connectionId
        },
    })
        .then((res) => res.json())
        .catch((error) =>
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" })
        )
        .then(response => {
            return response;
        });
}

export async function postConnection(path, connectionId, data) {
    const token = await getToken();
    const location = await getLocation();
    if (data && data.UserFullName)
        data.token = token;
    else if (data && data._parts) {
        var array = data._parts[1];
        array[1] = array[1].replace('"Token":null', '"Token":"' + token + '"');
    }
    const url = `https://botest.fly-foot.com/api${path}`;
    return fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": data && data._parts ? "" : "application/json",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "gps_location": location,
            "Authorization": 'Bearer ' + token,
            "signalr-connectionid": connectionId,
        },
        body: data != null && data._parts ? data : JSON.stringify(data)
    })
        .catch((error) =>
            global.toast.show(translate('msgErrorOccurred'), { type: "danger" }))
        .then(response => {
            return response;
        });
}

