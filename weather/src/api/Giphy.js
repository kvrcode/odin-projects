import axios from 'axios';
import 'regenerator-runtime/runtime';

import { isLocalHost } from '../dom/dom.js';

export const getRelatedGif = async (obj, query) => {
    console.log('axios is getting related gif based off current weather description');

    query = query.replace(/\s/g, '+');
    console.log('search query', query);

    let url = `http://api.giphy.com/v1/gifs/search?q=${query}&api_key=bG86bn0s0QPdW6zQU9yjsgWHdBYdDiUZ`;
    if( isLocalHost() ) { url = obj.proxy + url; }

    let data;

    try{
        const res = await axios.get(url);
        data = res.data;
    }catch (error) {
        console.error(error);
    }

    const gifSRC = data.data[0].images.original.webp; //filter gifs into new array based on matching keywords in title property. generate random number based on arr.length and choose gif at random...ideally

    console.log('gifs', data);

    return gifSRC;
}
