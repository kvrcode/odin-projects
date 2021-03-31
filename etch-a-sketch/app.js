const create_square = (i) => {
    const square = document.createElement('div');
    square.id = i;
    square.classList.add('square');
    return square;
}

const add_squares = (size) => {
    const area = size ** 2;
    console.log(area);
    const container = document.querySelector('.sketch');

    for(let i = 0; i <= area - 1; i++){
        container.appendChild(create_square(i));
    }
    container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
}
add_squares(16);

const change_color = (el) => {
    if(el.style.backgroundColor !== "") { return }
    const random_num = (Math.random()*16777215).toString(16);
    const random_hex = '#' + random_num;
    // console.log(random_hex, random_hex.split('').splice(0, 7).join(''));
    el.style.backgroundColor = random_hex.split('').splice(0, 7).join('');
}

const handle_mouse_event = () => {
    const squares = document.querySelectorAll('.square');

    squares.forEach(square => {
        // square.addEventListener('onmouseenter', () => {
        //     change_color(square);
        // });
        square.addEventListener('mouseenter', () => {
            change_color(square);
            console.log(square.style.backgroundColor);
            console.log('hi', square.id);
        })
        // console.log(square.id)
    })
}
// handle_mouse_event();

document.addEventListener('DOMContentLoaded', handle_mouse_event);