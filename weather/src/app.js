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
import Search from './dom/Search';
import { renderCurrentView } from './dom/CurrentView';

let state = {
    dom: new Dom(),
    search: {},
    geocode: {},
    giphy: {},
    current: {},
    forecast: {}
}

const getDataForCurrentView = async () => {
    state.current = new Current();
    state.giphy = new Giphy();

    await state.geocode.getCoordinates(state.search.city, state.search.state);
    await state.current.getCurrentWeather(state.geocode.coords[0], state.geocode.coords[1]);
    const query = `${state.current.data.weather[0].description} weather`
    await state.giphy.getRelatedGif(query);
}

//from user input, gets coordinates, to get current weather, to get related gif
const handleSearch = async () => {
    if (state.dom.input.value === '') return //basic err handling
    console.log('--- handling search ---');

    const { search } = state;

    search.location = search.formatText(search.input.value);
    search.updateCityState();
    search.clearText();

    await getDataForCurrentView();
    renderCurrentView(state.dom, state.search, state.current, state.giphy);
    console.log(state);
}

document.addEventListener('DOMContentLoaded', async (e) => {
    console.log('--- app loaded ---');

    state.search = new Search(state.dom.search, state.dom.input);
    state.geocode = new Geocode();

    state.search.listener(handleSearch);
    console.log(state);
});