// would make more sense to have html written up and inject via js since im following mvc
//and pass data from model to here(view) via controller...
export const renderCurrentView = (dom, search, current, gif) => {
    console.log('rendering current view')
    //display gif
    dom.gif.src = gif.gifSRC;
    dom.gif.alt = current.data.weather[0].description;
    //display current temp
    dom.temperature.innerHTML = `${Math.round(current.data.main.temp)}&#176;`;
    //display location
    dom.location.textContent = search.location;
    //desc
    dom.description.textContent = current.data.weather[0].description;
    //display see more button -- either for meta data (humidity, etc) or hourly! ( horizontal scroll )
}

//last features to add to current view and additional current model needed...
// export const renderCurrentHourlyBtn = () => {

// }

// export const renderCurrentHourlyView = () => {

// }