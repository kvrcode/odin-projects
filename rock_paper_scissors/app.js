//
let score = {
    player: 0,
    computer: 0
}

const generate_random_number = (num) => {
    return Math.floor(Math.random() * num);
}

const computer_play = () => {
    const options = ['rock', 'paper', 'scissors'];
    const index = generate_random_number(3); //0, 1, or 2
    const choice = options[index];

    console.log('computer', choice);
    return choice;
}

const player_play = () => {
    let choice = prompt('Rock, Paper, or Scissors?');
    console.log('player', choice)
    return choice;
}

const play_round = () => {

    const player_choice = player_play().toLowerCase();
    const computer_choice = computer_play().toLowerCase();

    if( player_choice === computer_choice ) { console.log('tie') }
    else if(
        computer_choice === 'rock' && player_choice === 'scissors' ||
        computer_choice === 'paper' && player_choice === 'rock' ||
        computer_choice === 'scissors' && player_choice === 'paper' )
        {
            console.log(`computer wins! ${computer_choice} beats ${player_choice}`);
            score.computer++;
            return 'computer';
        }
    else if(
        player_choice === 'rock' && computer_choice === 'scissors' ||
        player_choice === 'paper' && computer_choice === 'rock' ||
        player_choice === 'scissors' && computer_choice === 'paper' )
        {
            console.log(`player wins! ${player_choice} beats ${computer_choice}`);
            score.player++;
            return 'player';
        }

}

const reset = () => {
    location.reload(); //not best practice, would rather reset "state" object but its not entirely important here.
}

const game = () => {
    let round_total = 0;

    while ( round_total < 5) {
        const result = play_round();
        round_total++;

        console.log(score, round_total);
    }
    let { player, computer } = score;
    alert(`player score: ${player} || computer score: ${computer}`);

    if(round_total === 5) { reset(round_total); };

}
game();