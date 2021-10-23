import * as general from "services/general";
import { formatChangeTypes} from "helpers/manageTripHelper.js";

export async function requestChange(packageChangeRequest) {
    const path = general.servicesUrl.requestChange;
    return general.post(path, packageChangeRequest).then(response => { return response; });
}

export async function uploadDocument(requestCode, idContact, uri) {
    const token = await general.getToken();
    const param = `?requestCode=${requestCode}&idContact=${idContact}`;
    const path = general.servicesUrl.documentUpload + param;
    const uriParts = uri.split('.');
    const fileType = uriParts[uriParts.length - 1];
    const url = path;
    const formData = new FormData();
    formData.append("file", { uri, name: `passport.${fileType}`, type: `image/${fileType}` });
    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "ff-version": 10,
            "ff-language": "en",
            "is-mobile": true,
            "Authorization": "Bearer " + token
        },
        body: formData
    };
    return await fetch(url, options).then(response => { return response; });
}

export async function inviteToApp(contact) {
    const path = general.servicesUrl.inviteToApp;
    return await general.post(path, contact).then(response => { return response; });
}

export async function getItem(item){
    return await general.getItem(item);
}

export async function getChangeTypes(){
    return formatChangeTypes(JSON.parse(await this.getItem('cancellationDropdown')));
}

