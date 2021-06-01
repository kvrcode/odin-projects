export default class Search{
    constructor(search, input){
        this.search = search;
        this.input = input;
        this.location = ''; //"Boston, MA"
        this.city = '';
        this.state = '';
    }

    formatText(str) { //str captured from input on user submit
        const split = str.split(',');

        const city = split[0].charAt(0).toUpperCase() + split[0].slice(1);
        const state = split[1].toUpperCase();

        const format = `${city}, ${state}`;
        return format;
    }

    updateCityState = () => {
        this.city = this.location.split(',')[0];
        this.state = this.location.split(',')[1].replace(/\s/g, "");
    }

    clearText() {
        this.input.value = '';
    }

    handler() {
        this.location = this.formatText(this.input.value);
        this.updateCityState();
    }

    listener(callback) {
        console.log('listening for search');

        this.search.addEventListener('click', function() {
            callback();
        });
        this.input.addEventListener('keydown', (e) => {
            if(e.key === 'Enter') {
                callback();
            }
        })
    }

}