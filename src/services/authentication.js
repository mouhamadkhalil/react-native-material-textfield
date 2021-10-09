import { translate } from "helpers/utils";
import * as general from "services/general";

export async function postLogin(data) {
    const location = await general.getLocation();
    const url = `${general.API_URL}${general.servicesUrl.login}`;
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

export async function forgetPassword(email) {
    const path = `${general.servicesUrl.getForgetPassword}${email}`;
    general.get(path).then(response => { return response; });
}


