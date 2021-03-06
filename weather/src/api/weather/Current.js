import axios from 'axios';
import 'regenerator-runtime/runtime';

import { weatherKey } from '../key.js';

export default class Current {
    constructor(localhost) {
        this.localhost = localhost;
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.data = {};
    }

    async getCurrentWeather(lat, lon) {
        console.log('axios is getting current weather using coordinates');
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${weatherKey}`;
        if( this.localhost ) { url = this.proxy + url; }

        try {

            const res = await axios.get(url);
            this.data = { ...res.data };

        } catch(error) {

            console.error(error);

        }

        return this.data;
    }
}