export default class Loader {
    constructor(append){
        this.append = append; //element to append to
        this.loader = this.generate();
    }

    generate() {

        const div = document.createElement('div');


        div.classList.add('absolute', '-top-0', 'z-50');

        const img = document.createElement('img');
        img.src = 'https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif';
        img.alt = 'loading animation';

        div.appendChild(img);

        return div
    }
    
    hide() {
        return this.append.removeChild(this.loader);
    }

    render() {
        return this.append.appendChild(this.loader);
    }
}