export default class Loader {
    constructor(append){
        this.append = append; //element to append to
        this.loader = this.generate();
    }

    generate() {

        const div = document.createElement('div');

        const img = document.createElement('img');
        img.src = 'https://media.giphy.com/media/swhRkVYLJDrCE/giphy.gif';
        img.alt = 'loading animation';

        div.appendChild(img);

        return div
    }
    
    hide() {
        this.append.removeChild(this.loader);
        // this.append.innerHTML = '';
        // this.append.remove(0);
    }

    render() {
        // const loader = this.generate();
        // console.log(this.loader);
        // console.log(typeof this.loader);
        this.append.appendChild(this.loader);
        // this.append.innerHTML = this.loader;
        // this.append.insertAdjacentHTML('afterBegin', this.loader);
    }
}