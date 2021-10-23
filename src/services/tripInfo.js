import * as general from "services/general";
import { formatTripInfo} from "helpers/tripInfoHelper.js";

export async function getItem(item){
    return await general.getItem(item);
}

export async function getTripInfoData(){
    return formatTripInfo(await this.getItem('upComingInvoices'));
}