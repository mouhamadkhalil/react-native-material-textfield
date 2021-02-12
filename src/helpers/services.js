import * as SecureStore from 'expo-secure-store';
import { API_URL, API_TOKEN } from "@env";

export const servicesUrl = {
    /* GET */
    getAllTeams: '/mobile/team/all',
    getAllCities: '/mobile/city/destinationCity',
    getAllLeagues: '/mobile/leagues/all',
    getCountriesWithTeams: '/mobile/team/countriesWithTeams',
    getSearchTeam: '/mobile/team/search?text=',

    /* POST */
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
            "authorization": "Bearer " + token
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



