import axios from 'axios';
import 'regenerator-runtime/runtime';

import { weatherKey } from '../key.js';
import { isLocalHost } from '../../dom/dom.js';

export default class Forecast {
    constructor(){
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.data = {};
    }

    async getForecast(lat, lon) {
        console.log('axios is getting coordinates');
        let url = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${weatherKey}`;
        if( isLocalHost() ) { url = this.proxy + url; }

        try {

            const res = await axios.get(url);
            const data = res.data;
            const {lat, lon} = data[0];
            this.coords.push(lat, lon);

        }catch(error){

            console.error(error);

        }

        return this.coords;
    }
}