import { getRelatedGif } from '../api/Giphy.js';

export const isLocalHost = () => {
    return window.location.hostname === 'localhost' ? true : false
}

//str in format boston, ma (city,state) --> Boston, MA
const formatText = (str) => {
    const split = str.split(',');

    const city = split[0].charAt(0).toUpperCase() + split[0].slice(1);
    const state = split[1].toUpperCase();

    const format = `${city}, ${state}`;
    return format
}

const pageInit = () => {

}

//obj is state obj -- fix this later
export const updateCurrentDisplay = async (obj) => {
    console.log('display is being updated with current weather and getting gif')

    const temperature = document.querySelector('.temperature');
    const location = document.querySelector('.location');
    const gif = document.querySelector('.giphy');
    const description = document.querySelector('.description');
    // const current = document.querySelector('#current');

    const query = `${obj.currentData.weather[0].description} weather`; 
    // const src = await getRelatedGif(obj, query);

    gif.src = await getRelatedGif(obj, query);

    const temp = Math.floor(parseInt(obj.currentData.main.temp)).toString();

    temperature.innerHTML = `${temp}&#176;`;
    description.textContent = `${obj.currentData.weather[0].description}`;
    location.textContent = formatText(obj.location);


}

export const updateForecast = () => {

}

export const celsiusFahrenheit = () => {

}

const error404 = () => {
    console.log('displaying error');
}