import * as SecureStore from 'expo-secure-store';
import { API_URL, API_TOKEN } from "@env";

export const servicesUrl = {
    /* GET */
    getHomePageData: '/mobile/game/GetHomePageDataMobile',
    getAllGames: '/mobile/game/getall',
    getGameCalendar: '/mobile/game/GameCalendar',
    getAllTeams: '/mobile/team/all',
    getAllCities: '/mobile/city/destinationCity',
    getAllLeagues: '/mobile/leagues/all',
    getCountriesWithTeams: '/mobile/team/countriesWithTeams',
    getSearchTeam: '/mobile/team/search?text=',
    getGameV2: '/mobile/game/v2/',
    getAmadeusCities: '/mobile/city/amadeusCity',
    getFlagBundle: '/mobile/game/flagBundle',
    getSuggestedGames: '/mobile/game/getSuggestedGames',
    getGameSearch: '/mobile/game/search?text=',
    getTeamSearch: '/mobile/team/search?text=',

    /* POST */
    login: '/mobile/profile/login',
    searchFlights: '/mobile/game/SearchFlight',
    searchHotel: '/mobile/game/SearchHotel',
    getPagedHotels: '/mobile/game/getPagedHotels',
    viewCancelPolicy: '/mobile/hotel/ViewCancelPolicyV2',
    saveBundleMulti: '/mobile/game/saveBundleMulti',
    saveBundle: '/mobile/game/saveBundle',
    getExtraServices: '/mobile/game/getExtraServices',
    addGames: "/mobile/game/addGames",
    intent: "/mobile/game/stripe/intent",
}

export async function setUserCredentials(email, password) {
    try {
        await SecureStore.setItemAsync('email', email);
        await SecureStore.setItemAsync('password', password);
    } catch (error) {
        console.error("Error: ", error);
    }
}

export async function getUserCredentials() {
    var email = '', password='';
    try {
        var email = await SecureStore.getItemAsync('email');
        if (email == null)
            email = '';
        var password = await SecureStore.getItemAsync('password');
        if (password == null)
            password = '';
    } catch (error) {
        console.error("Error: ", error);
    }
    return [email, password];
}


getToken = async () => {
    try {
        const value = await SecureStore.getItemAsync('token');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Error: ", error);
    }
};
getLocation = async () => {
    try {
        const value = await SecureStore.getItemAsync('location');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Error: ", error);
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
            "ff_version": 10,
            "ff_language": "en",
            "source": "mobile",
            "gps_location": location
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
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
            "ff_version": 10,
            "ff_language": "en",
            "source": "mobile",
            "gps_location": location,
            "Authorization": 'Bearer ' + token
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
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
            "ff_version": 10,
            "ff_language": "en",
            "source": "mobile",
            "gps_location": location,
            "Authorization": 'Bearer ' + token
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
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
            "ff_version": 10,
            "ff_language": "en",
            "source": "mobile",
            "gps_location": location,
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
        .then((response) => {
            return response;
        });
}



