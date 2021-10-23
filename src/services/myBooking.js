import * as general from "services/general";

export async function setStatus(status) {
    const path = general.servicesUrl.setStatus;
    return general.post(path, status).then(response => { return response; });
}