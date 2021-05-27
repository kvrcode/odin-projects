import axios from 'axios';
import 'regenerator-runtime/runtime';

import { isLocalHost } from '../dom/dom.js';

//obj param === state object{} initialized in app.js
//location param is a string in format City, State

class OpenWeather {
    constructor(){
        this.proxy = 'https://cors-anywhere.herokuapp.com/';
        this.longitude;
        this.latitude;
        this.currentData = {};
        this.forecastData = {};
    }
}
export const getCoordinates = async (obj, city, state) => {
    console.log('axios is getting coordinates');

    let url = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${state},US&limit=3&appid=bac6ad00cf12b40e2e59e4642b2c4b9d`; //scuffed

    if( isLocalHost() ) { url = obj.proxy + url; }

    let data, latitude, longitude;

    try {
        const res = await axios.get(url);
        data = res.data;
        const {lat, lon} = data[0];
        latitude = lat;
        longitude = lon;
    } catch (error) {
        console.error(error);
    }

    console.log(latitude, longitude);

    return {
        latitude,
        longitude
    }
}


export const getCurrentWeather = async (obj) => {
    console.log('axios is getting current weather using coordinates');

    let url = `http://api.openweathermap.org/data/2.5/weather?lat=${obj.latitude}&lon=${obj.longitude}&units=imperial&appid=bac6ad00cf12b40e2e59e4642b2c4b9d`;
    if( isLocalHost() ) { url = obj.proxy + url; }

    let data;

    try {
        const res = await axios.get(url);
        data = res.data;
    } catch(error) {
        console.error(error);
    }

    console.log(data);

    return data;
}

export const getForecast = () => {
    console.log('axios is getting forecast...');

}