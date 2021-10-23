import { translate } from 'helpers/utils';
import moment from 'moment';
import R from "res/R";

export function formatTripInfo(upComingInvoices) {
    if (upComingInvoices == null || upComingInvoices == undefined || upComingInvoices.length == 0)
        return null;
    var bundle = upComingInvoices[0];
    var travel = [];
    if (bundle.SelectedFlight != null) {
        var flight = {
            title: translate('flight'),
            image: R.images.airplaneLightblue,
            details: '',
            type: 1
        }
        travel.push(flight);
    }

    // SelectedPricedItinerary

    var travelPerks = [
        {
            title: translate('train'),
            image: R.images.train,
            details: '',
            selected: bundle.Service_Train,
            type: 2
        },
        {
            title: translate('airportPickup'),
            image: R.images.carLightblue,
            details: '',
            selected: bundle.Service_AirPortPickup,
            type: 2
        },
        {
            title: translate('airportDropOff'),
            image: R.images.car,
            details: '',
            selected: bundle.Service_AirPortDropOff,
            type: 2
        },
        {
            title: translate('stadiumTour'),
            image: R.images.stadium,
            details: '',
            selected: bundle.Service_StadiumTour,
            type: 2
        },
        {
            title: translate('cityTour'),
            image: R.images.hotel,
            details: '',
            selected: bundle.Service_CityTour,
            type: 2
        },
        {
            title: translate('insurance'),
            image: R.images.insurance,
            details: '',
            selected: bundle.Service_Insurance,
            type: 2
        }
    ];

    travelPerks = travelPerks.filter((perk) => perk.selected);
    travel = travel.concat(travelPerks);

    if (bundle.MatchBundleHotels != null) {
        bundle.MatchBundleHotels.map((matchHotel, index) => {
            var hotel = {
                title: translate('hotelReservation'),
                image: R.images.hotelLightblue,
                details: matchHotel.HotelName,
                index: index,
                type: 3
            }
            travel.push(hotel);
        })
    }

    if (bundle.MatchBundleDetail != null) {
        bundle.MatchBundleDetail.map((match, index) => {
            var game = {
                title: translate('gameTickets'),
                image: R.images.gameTicket,
                details: moment(match.Game.GameDate).format("D MMMM") + " " + match.Game.Stade,
                index: index,
                type: 4
            }
            travel.push(game);
        })
    }

    var perks = [{
        title: "Sagrada familia", image: R.images.airplaneLightblue, details: "10 Octobre, 14:30h", index: 1, type: 5
    },
    {
        title: "Sagrada familia", image: R.images.carLightblue, details: "10 Octobre, 14:30h", index: 2, type: 5
    }];
    if (bundle.ExtraServices != null)
        perks = bundle.ExtraServices

    var reservations = [{
        title: "Hotel reservation", image: R.images.hotelLightblue, details: "Hotel Gran de Barcelona", index:1, type: 6
    }];
    return [travel, perks, reservations]
}
