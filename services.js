import { API_URL, API_TOKEN } from "@env";

authorization = "Bearer Token";
Content_Type = "application/json";
ff_language = "en";
ff_version = 10;
source = "mobile";
Accept = "application/json";

export function get(path) {

    const url = `${API_URL}${path}`;
        return fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "ff_version": 10,
                "ff_language": "en",
                "source": "mobile",
                "gps_location": "",
                "authorization" : "Bearer Token",
            },
        })
            .then((res) => res.json())
            .catch((error) => console.error("Error: ", error))
            .then((response) => {
                return response;
            });
}


