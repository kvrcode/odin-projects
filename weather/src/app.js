import './app.css';
import 'regenerator-runtime/runtime';

//model
import Giphy from './api/gif/Giphy';
import Geocode from './api/weather/Geocode';
import Current from './api/weather/Current';
import Forecast from './api/weather/Forecast';
// import Storage from './api/data/LocalStorage  -- add something like this in future

//view -- in this case, methods to interact with view
import Dom from './dom/Dom';
import Loader from './dom/Loader';
import Search from './dom/Search';
import { renderCurrentView } from './dom/CurrentView';
import { renderExpandForecastBtn } from './dom/ForecastView';
import { renderForecastView } from './dom/ForecastView';

let state = {
    dom: new Dom(),
    search: {},
    geocode: {},
    giphy: {},
    current: {},
    forecast: {}
}

const getDataForCurrentView = async () => {
    state.current = new Current(state.dom.localHost);
    state.giphy = new Giphy(state.dom.localHost);

    await state.geocode.getCoordinates(state.search.city, state.search.state);
    await state.current.getCurrentWeather(state.geocode.coords[0], state.geocode.coords[1]);
    const query = `${state.current.data.weather[0].description} weather`
    await state.giphy.getRelatedGif(query);
}

//from user input, gets coordinates, to get current weather, to get related gif
const handleSearch = async () => {
    if (state.dom.input.value === '') return //basic err handling
    console.log('--- handling search request ---');

    const { search } = state;

    // const loaderSRC = state.giphy.getLoaderGif();
    const loader = new Loader(state.dom.current);

    search.location = search.formatText(search.input.value);
    search.updateCityState();
    search.clearText();

    //add loader Loader.render();
    loader.render();

    await getDataForCurrentView();

    //remove loader Loader.hide();
    loader.hide();

    renderCurrentView(state.dom, state.search, state.current, state.giphy); //add animations here animate.css or gsap

    renderExpandForecastBtn(state.dom.forecastBtn);

    console.log(state);
}

const forecastHandler = async() => {
    console.log('handling forecast btn');

    state.forecast = new Forecast(state.dom.localHost);

    state.dom.forecastBtn.classList.add('hidden');

    await state.forecast.getForecastData(state.geocode.coords[0], state.geocode.coords[1]);

    renderForecastView(state.forecast.data, state.dom.tableBody, state.dom.forecast);
}

document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('--- app loaded ---');

    state.dom.isLocalHost(); //boolean when page loads is it run locally or via github pages

    state.search = new Search(state.dom.search, state.dom.input);
    state.geocode = new Geocode(state.dom.localHost);

    state.search.listener(handleSearch);
    console.log(state);
    state.dom.forecastBtn.addEventListener('click', forecastHandler);
});