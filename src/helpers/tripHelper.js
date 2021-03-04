import moment from 'moment';
import { translate } from 'helpers/utils';
import R from "res/R";

// convert array of string to array of objects
export function getHotelImages(images) {
    var hotelImages = [];
    for (let img of images) {
        hotelImages.push({ url: img });
    }
    return hotelImages;
}

export function getTripDays(date1, date2) {
    if (!date1 || !date1)
        return 0;
    let firstDate = moment(date1);
    let secondDate = moment(date2);
    return secondDate.diff(firstDate, 'days') + 1;
}

export function formatDetails(bundle) {
    var details = {
        idMatchBundle: bundle.idMatchBundle,
        BundleCode: bundle.BundleCode,
        StartDate: bundle.StartDate,
        EndDate: bundle.EndDate,
        TripDays: getTripDays(bundle.StartDate, bundle.EndDate),
        NumberOfTravelers: bundle.NumberOfTravelers,
        BasePricePerFan: bundle.BasePricePerFan,
        PricePerFan: bundle.PricePerFan,
        ExtraFeesPerFan: bundle.ExtraFeesPerFan,
        FinalPrice: bundle.FinalPrice,
        FinalPricePerFan: bundle.FinalPricePerFan,
        NumberOfRooms: bundle.NumberOfRooms,
        SharingRoomNote: bundle.SharingRoomNote,
    }
    return details;
}

export function formatGames(bundle){
    var game = bundle.MatchBundleDetail[0].Game;
    return game;
}

export function formatBundle(bundle) {
    if (bundle == null || bundle == undefined)
        return null;

    var details = formatDetails(bundle);
    var game = formatGames(bundle);
    var hotel = bundle.SelectedHotel;
    hotel.HotelRoomType = bundle.HotelRoomType;
    hotel.NumberOfRooms = bundle.NumberOfRooms;

    var seating = bundle.MatchBundleDetail[0].GameSeat;
    var perks = [
        {
            Title: translate('onSpotService'),
            Price: bundle.Price_OnSpot,
            Image: R.images.onspot,
            ImageGrey: R.images.onspotGrey,
            Selected: true
        },
        {
            Title: translate('train'),
            Price: bundle.Price_Train,
            Image: R.images.train,
            ImageGrey: R.images.trainGrey,
            Selected: bundle.Service_Train
        },
        {
            Title: translate('airportPickup'),
            Price: bundle.Price_AirtportPickup,
            Image: R.images.car,
            ImageGrey: R.images.carGrey,
            Selected: bundle.Service_AirPortPickup
        },
        {
            Title: translate('airportDropOff'),
            Price: bundle.Price_AirportDropoff,
            Image: R.images.car,
            ImageGrey: R.images.carGrey,
            Selected: bundle.Service_AirPortDropOff
        },
        {
            Title: translate('stadiumTour'),
            Price: bundle.Price_StadiumTour,
            Image: R.images.stadium,
            ImageGrey: R.images.stadiumGrey,
            Selected: bundle.Service_StadiumTour
        },
        {
            Title: translate('cityTour'),
            Price: bundle.Price_CityTour,
            Image: R.images.hotel,
            ImageGrey: R.images.hotelGrey,
            Selected: bundle.Service_CityTour
        },
        {
            Title: translate('insurance'),
            Price: bundle.Price_Insurance,
            Image: R.images.insurance,
            ImageGrey: R.images.insuranceGrey,
            Selected: bundle.Service_Insurance
        }
    ];

    return [details, game, hotel, seating, perks]
}


