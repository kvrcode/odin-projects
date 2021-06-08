export default class Dom {
    constructor() {
        this.localHost      = undefined;
        this.current        = document.querySelector('#current');
        this.search         = document.querySelector('.location-search');
        this.input          = document.querySelector('.location-input');
        this.temperature    = document.querySelector('.temperature');
        this.location       = document.querySelector('.location');
        this.gif            = document.querySelector('.giphy');
        this.more           = document.querySelector('.more');
        this.description    = document.querySelector('.description');
        this.forecastBtn    = document.querySelector('.forecast-button');
    }

    isLocalHost() {
        const bool = window.location.hostname === 'localhost' ? true : false
        this.localHost = bool;
        return this.localHost;
    }

    formatText(str) { //str captured from input on user submit
        const split = str.split(',');

        const city = split[0].charAt(0).toUpperCase() + split[0].slice(1);
        const state = split[1].toUpperCase();

        const format = `${city}, ${state}`;
        return format
    }

    // generateLoader(url) {
    //     const html = `
    //         <div>
    //             <img class="h-48 w-48 src=${url} alt="loading-gif"/>
    //         </div>
    //     `
    //     return html;
    // }

    // hideLoader(el, url) {
    //     const loader = loader(url);
    //     return el.appendChild(loader);
    // }

    // renderLoader() {
    //     return el.classList.remove('block');
    // }
}

// export const isLocalHost = () => {
//     return window.location.hostname === 'localhost' ? true : false
// };

