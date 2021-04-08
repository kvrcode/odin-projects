// "use strict";

//player needs to select their 'mark'
//AI is assigned to whatever 'mark' player did not select

// X always make first move
//O always makes second move
//makes a difference based on what 'mark' player chooses

//on pressing button -- player's mark updates text content of selected button

//recruit difficulty AI, generate random number 0-8 and update that button-Nodelist[num 0-8] with AI's mark


//if button-Nodelist[index].textContent !== '' return cant play in a square thats already taken

//have arrays of possible wins to check against current gameboard array for win, loss, tie

//restart button - function

//display winner and etc

//just use 'recruit level AI' for now
//once everything finished - try applying minimax algorithm




const Player = (mark) => {

    let _mark = mark;

    const getMark = () => _mark;

    const setMark = (mark, active) => {
        _mark = mark;
    }

    return { getMark, setMark }
}

// console.log(Player('X').setMark())

const Gameboard = (() => {
    let results = [
                   '','','',
                   '','','',
                   '','',''
                  ];
    //let board = document.querySelectorAll('.square'); //   Nodelist[9 squares]

    const isBoardFull = () => {
        displayController.buttons.forEach(button => {
            if(button.textContent === '') {
                console.log(full);
            }
        })
    }

    return {
        results
    }

})()

const AI = (() => {
    const buttons = document.querySelectorAll('.square');

    const chooseSquare = () => {
        let rand = Math.floor(Math.random() * 8);

        const square = buttons[rand];

        return square
    }

    const aiPlay = () => {
        let rand = Math.floor(Math.random() * 8); //random number 0 - 8
        if(buttons[rand].textContent !== '') { rand = Math.floor(Math.random() * 8) };
        const aiMark = Game.getAIPlayer().getMark();
        buttons[rand].textContent = aiMark;
        console.log(buttons[rand]);
        Gameboard.results[rand] = aiMark;
    }

    return {
        aiPlay
    }
})()

const Game = (() => {
    const human = Player('X');
    const ai = Player('O');

    //if human chooses O, AI has to go first, not possible with my code rn

    let played = false;

    const getHumanPlayer = () => human;

    const getAIPlayer = () => ai;

    // const checkBoard = () => {

    // }

    const humanTurn = (button, key, callback)  => {
        if(button.textContent !== '') return // cant play on an already played square
        const playerMark = getHumanPlayer().getMark();
        button.textContent = playerMark;
        Gameboard.results[key] = playerMark;
        played = true;
        console.log(Gameboard.results, played);
        setTimeout(callback, 1000);
        // callback();
    }
    // humanTurn()

    const aiTurn = () => {
        if(played) {
            AI.aiPlay();
        }
        played = false;
    }

    const restart = (buttons, x, o) => {
        Gameboard.results = ['','','','','','','','',''];
        buttons.forEach(button => button.textContent = '');

        if(x.classList.contains('active-selector') ||o.classList.contains('active-selector')) {
            x.classList.remove('active-selector');
            o.classList.remove('active-selector');
        }

        displayController.enable(displayController.x, displayController.o);
    }

    return {
        getHumanPlayer,
        getAIPlayer,
        humanTurn,
        restart
    }
})()

const displayController = (() => {
    const x = document.querySelector('.X-selection');
    const o = document.querySelector('.O-selection');
    const buttons = document.querySelectorAll('.square');
    const restart = document.querySelector('.restart > button');

    const disable = (x, o) => {
        console.log('disabled');
        x.disabled = true;
        o.disabled = true;
    }

    const enable = (x, o) => {
        x.disabled = false;
        o.disabled = false;
    }

    const changePlayerMark = (mark) => {
        if(mark === 'X'){
            x.classList.add('active-selector');
            o.classList.remove('active-selector');
            Game.getHumanPlayer().setMark(mark);
            Game.getAIPlayer().setMark('O');
            disable(x, o);
        }else {
            x.classList.remove('active-selector');
            o.classList.add('active-selector');
            Game.getHumanPlayer().setMark(mark);
            Game.getAIPlayer().setMark('X');
            disable(x, o);
        }
    }

    x.addEventListener('click', () => changePlayerMark('X'));
    o.addEventListener('click', () => changePlayerMark('O'));

    buttons.forEach((button, key) => {
        button.addEventListener('click', () => Game.humanTurn(button, key, AI.aiPlay))
    })

    restart.addEventListener('click', () => Game.restart(buttons, x, o));

    return {
        x,
        o,
        buttons,
        enable
    }
})()

