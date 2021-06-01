export default class Dom {
    constructor() {
        this.localHost      = undefined;
        this.search         = document.querySelector('.location-search');
        this.input          = document.querySelector('.location-input');
        this.temperature    = document.querySelector('.temperature');
        this.location       = document.querySelector('.location');
        this.gif            = document.querySelector('.giphy');
        this.more           = document.querySelector('.more');
        this.description    = document.querySelector('.description');
    }

    isLocalHost() {
        return window.location.hostname === 'localhost' ? true : false
    }

    formatText(str) { //str captured from input on user submit
        const split = str.split(',');

        const city = split[0].charAt(0).toUpperCase() + split[0].slice(1);
        const state = split[1].toUpperCase();

        const format = `${city}, ${state}`;
        return format
    }
}

export const isLocalHost = () => {
    return window.location.hostname === 'localhost' ? true : false
};

