import axios from 'axios';
import 'regenerator-runtime/runtime';

import { weatherKey } from '../key.js';
import { isLocalHost } from '../../dom/Dom.js';

export default class Geocode {
    constructor(){
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.coords = [];
    }

    async getCoordinates(city, state) {
        console.log('axios is getting coordinates');
        console.log(weatherKey);
        let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=3&appid=${weatherKey}`;
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