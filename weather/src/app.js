//need to implement MVC, oop, better system for state and fluidity of app.
//make sure app follows this flow and code is readable

//get CORRECT user input from 'form'

//hit geocode api to get coordinates lat, lon
//use coordinates to hit current weather api

//based of current weather description, hit giphy api to get a related gif
//update screen with gif(as background img), and current weather and location
//button to display current weather specific details

//button to display 5 day forecast
//using coordinates hit forecast api and render results

import 'regenerator-runtime/runtime';

import { getCoordinates, getCurrentWeather } from './api/OpenWeather.js';
// import { getCityId } from './api/city.js';
import { updateCurrentDisplay } from './dom/dom.js';

import './app.css';

window.state = {
    proxy: 'https://cors-anywhere.herokuapp.com/',
    location: '',       //string from input.value 'Boston, MA'
    latitude: '',       //coordinates
    longitude: '',      //coordinates
    currentData: {},    //reuturned data
    forecastData: {},    //returned data
    fahrenheit: true,
    updateState: function() {
        console.log(this.proxy, 'update');
    }
}

const resetState = () => {
    console.log('state reset');
}

// const updateStateValue = (prop, value) => {

// }

// const getStateValue = () => {

// }

const locationSearchHandler = async () => {
    const input = document.querySelector('.location-input');

    if (input.value === '') return //cant search for '', ''. implement better error handling to make it clear to user what to do

    const locationQuery = input.value;
    state.location = locationQuery;
    const arr = locationQuery.split(',');
    const city = arr[0];
    const stateCode = arr[1].replace(/\s/g, ""); //changes ' MA' to 'MA'
    // ^^^ refactor ^^^


    const { latitude, longitude }  = await getCoordinates(state, city, stateCode); //returns {latitude: Num, longitude: Num}
    state.latitude = latitude;
    state.longitude = longitude;
    // ^^^ functions to interact with state instead of blocks like this? ^^^

    state.currentData = {...await getCurrentWeather(state)};
    updateCurrentDisplay(state);
    // showForecastOption();

    //getCityId(city, state); //worry about this later, recommended just need to do it efficiently

}

const locationSearchListener = (() => {
    const search = document.querySelector('.location-search');

    search.addEventListener('click', locationSearchHandler);
})()

document.addEventListener('DOMContentLoaded', () => console.log('--- app loaded ---'));