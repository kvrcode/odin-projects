import axios from 'axios';
import 'regenerator-runtime/runtime';

import { weatherKey } from '../key.js';

export default class Forecast {
    constructor(localhost){
        this.localhost = localhost;
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.data = [];
    }

    async getForecastData(lat, lon) {
        console.log('axios is getting coordinates');
        let url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`;
        if( this.localhost ) { url = this.proxy + url; }

        try {

            const res = await axios.get(url);
            const data = res.data.list; //api returns 5 day forecast over 3 hour increments. so taking every 8th obj and recording that data for daily forecast
            this.data = data.filter((obj, key) => key % 8 === 0);
            console.log(this.data);

        }catch(error){

            console.error(error);

        }

        return this.data;
    }
}