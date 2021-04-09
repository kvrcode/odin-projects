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

    const setMark = (mark) => {
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

    const squareIsOccupied = () => {

        console.log('i am here');
    }

    const boardIsFull = () => {

        return !results.includes('') ? true : false;

    }

    return {
        results,
        boardIsFull
    }

})()

const AI = (() => {
    const buttons = document.querySelectorAll('.square');

    const randomNumber = () => {
        return Math.floor(Math.random() * 8); //random number 0 - 8
    }

    const chooseSquare = (num) => {

        return buttons[num];

    }

    const aiPlay = () => {
        if(Gameboard.boardIsFull()) return //dont make a move on a full board

        const aiMark = Game.getAIPlayer().getMark();
        let rand = randomNumber();
        let square = chooseSquare(rand);

        if(square.textContent !== '') { //pick another square if current choice is taken -- currently failing
            rand = randomNumber();
            square = chooseSquare(rand);
        }

        //instead of random ^^^
        //from Gameboard.results array...
        //choose from element indexes that === ''
        //then get that index to apply AIMark to the corresponding button

        square.textContent = aiMark;
        Gameboard.results[rand] = aiMark;

        // if(buttons[rand].textContent !== '') { rand = Math.floor(Math.random() * 8) };
        // console.log(square);

        displayController.enableButtons(buttons);
    }

    return {
        aiPlay
    }
})()

const Game = (() => {
    const human = Player('');
    const ai = Player('');

    let played = false;

    const getHumanPlayer = () => human;

    const getAIPlayer = () => ai;

    const humanTurn = (button, key, callback)  => {
        if(getHumanPlayer().getMark() === '') return
        if(button.textContent !== '') return

        displayController.disableButtons(displayController.buttons);

        const playerMark = getHumanPlayer().getMark();

        button.textContent = playerMark;
        Gameboard.results[key] = playerMark;

        played = true;
        console.log(Gameboard.results, played);

        setTimeout(callback, 1000);
    }

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

        displayController.enableSelectors(displayController.x, displayController.o);
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

    const disableSelectors = (x, o) => {
        x.disabled = true;
        o.disabled = true;
    }

    const enableSelectors = (x, o) => {
        x.disabled = false;
        o.disabled = false;
    }

    const disableButtons = () => {
        buttons.forEach(button => button.disabled = true);
    }

    const enableButtons = () => {
        buttons.forEach(button => button.disabled = false);
    }

    const changePlayerMark = (mark) => {
        if(mark === 'X'){
            x.classList.add('active-selector');
            o.classList.remove('active-selector');
            Game.getHumanPlayer().setMark(mark);
            Game.getAIPlayer().setMark('O');
        }else {
            x.classList.remove('active-selector');
            o.classList.add('active-selector');
            Game.getHumanPlayer().setMark(mark);
            Game.getAIPlayer().setMark('X');
            AI.aiPlay(); //AI goes first if player chooses 'O'
        }
        disableSelectors(x, o);
    }

    x.addEventListener('click', () => changePlayerMark('X'));
    o.addEventListener('click', () => changePlayerMark('O'));

    buttons.forEach((button, key) => {
        button.addEventListener('click', () => Game.humanTurn(button, key, AI.aiPlay)) //Game.aiTurn ???
    })

    restart.addEventListener('click', () => Game.restart(buttons, x, o));

    return {
        x,
        o,
        buttons,
        enableSelectors,
        disableButtons,
        enableButtons
    }
})()

