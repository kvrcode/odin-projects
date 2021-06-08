import axios from 'axios';
import 'regenerator-runtime/runtime';

import { gifKey } from '../key.js';

export default class Giphy {
    constructor(localhost){
        this.localhost = localhost;
        this.proxy  = 'https://cors-anywhere.herokuapp.com/';
        this.gifs   = []; //in future - array of random gifs selected from matching keywords, choosing one at random to display or cycle through
        this.gifSRC = '';
        this.loader = '';
    }

    formatQuery(query) {
        return query.replace(/\s/g, '+');
    }

    async getRelatedGif(query){
        console.log('axios is getting related gif based off current weather description');

        query = this.formatQuery(query); //cloudy+day+weather
        // console.log(search);

        let url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=${gifKey}`;
        if( this.localhost ) { url = this.proxy + url; }

        let data;

        try{
            const res = await axios.get(url);
            data = res.data;
        }catch (error) {
            console.error(error);
        }

        this.gifSRC = data.data[0].images.original.webp; //filter gifs into new array based on matching keywords in title property. generate random number based on arr.length and choose gif at random...

        return this.gifSRC;

    }

    async getLoaderGif() {
        console.log('getting loader gif');

        let url = `http://api.giphy.com/v1/gifs/search?q=loader&api_key=${gifKey}`;
        if( this.localhost ) { url = this.proxy + url; }

        try{
            const res = await axios.get(url);
            this.loader = res.data.data[0].images.original.webp;
        }catch(error) {
            console.error(error);
        }

        return this.loader;
    }
}