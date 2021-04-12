import moment from 'moment';
import { translate } from 'helpers/utils';
import R from "res/R";


export function formatWhereToEat(whereToEat) {

    var formated = [];
    if (whereToEat) {
        whereToEat.map((place) => {
            if (formated.findIndex((e) => e.CategoryName === place.CategoryName) == -1)
                formated.push({
                    CategoryName: place.CategoryName,
                    Places: []
                })
        })

        whereToEat.map((place) => {
            var index = formated.findIndex((e) => e.CategoryName === place.CategoryName)
            formated[index].Places.push(place);
        })
    }

    return formated;
}
