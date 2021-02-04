import { API_URL, API_TOKEN } from "@env";
import { AsyncStorage } from 'react-native';

authorization = "Bearer Token";
Content_Type = "application/json";
ff_language = "en";
ff_version = 10;
source = "mobile";
Accept = "application/json";

getToken = async () => {
    try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Error: ", error);
    }
};
getLocation = async () => {
    try {
        const value = await AsyncStorage.getItem('location');
        if (value !== null) {
            return value
        }
    } catch (error) {
        console.error("Error: ", error);
    }
};

export async function get(path) {
    const location = await this.getLocation();
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
    const token = await this.getToken();
    const location = await this.getLocation();
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
            "authorization": "Bearer" + token
        },
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
        .then((response) => {
            return response;
        });
}

export async function post(path, data) {
    const token = await this.getToken();
    const location = await this.getLocation();
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
            "authorization": "Bearer" + token
        },
        body: JSON.stringify(data)
    })
        .then((res) => res.json())
        .catch((error) => console.error("Error: ", error))
        .then((response) => {
            return response;
        });
}



