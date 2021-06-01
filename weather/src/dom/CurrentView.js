// would make more sense to have html written up and inject via js since im following mvc
//and pass data from model to here(view) via controller...
export const renderCurrentView = (dom, search, current, gif) => {
    //display gif
    dom.gif.src = gif.gifSRC;
    dom.gif.alt = current.data.weather[0].description;
    //display current temp
    dom.temperature.textContent = current.data.main.temp;
    //display location
    dom.location.textContent = search.location;
    //desc
    dom.description.textContent = current.data.weather[0].description;
    //display see more button -- either for meta data (humidity, etc) or hourly! ( horizontal scroll )
}