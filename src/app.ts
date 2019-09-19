import { getRandomInt } from './utils';
let squares: NodeListOf<HTMLDivElement>;
export function runApp() {
    const secretNumber = getRandomInt(1, 6);
    squares = document.querySelectorAll('.square');
    let currentSquare = 1;
    squares.forEach((sq: HTMLDivElement) => {
        if (currentSquare === secretNumber) {
            sq.dataset.winner = 'true';
        }
        currentSquare++;
        sq.addEventListener('click', handleClick);
    });
}

function handleClick() {
    // when a function responds to an even the this. is set to what element was the source of that event.
    const isWinner = this.dataset.winner === 'true';
    const clickedSquare = this as HTMLDivElement;
    const header = document.querySelector('h1');
    const playAgainButton = document.querySelector('button');
    playAgainButton.addEventListener('click', playAgain);
    let loserCount = 0;

    if (isWinner) {
        clickedSquare.classList.add('winner');
        header.innerText = 'You win!';
        squares.forEach(s => {
            if (s !== clickedSquare) {
                s.classList.add('loser');
            }
            s.removeEventListener('click', handleClick);
        });
    } else {
        clickedSquare.classList.add('loser');
        squares.forEach(s => {
            if (s.classList.contains('loser')) {
                loserCount++;
            }
        });
        if (loserCount === 5) {
            header.innerText = 'You LOSE!';
        }
    }
    playAgainButton.toggleAttribute('hidden', false);
}

function playAgain() {
    const header = document.querySelector('h1');
    squares.forEach(s => {
        if (s.classList.contains('loser')) {
            s.classList.remove('loser');
        } else if (s.classList.contains('winner')) {
            s.classList.remove('winner');
        }
    });
    header.innerText = 'Guessing Game';
    runApp();
}
