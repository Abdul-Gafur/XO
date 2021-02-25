const game = document.querySelector('#game');
const squareList = game.querySelectorAll('.square'); 
const restartBtn = document.querySelector('button');
const endGame = document.querySelector('#end-game');
const counter = createCounter();
let clickLock = false;

document.addEventListener('mousedown', event => {
    event.preventDefault();
})
restartBtn.addEventListener('click', event => {
    restart(squareList);
});
game.addEventListener('click', step)

function step(event) {
    if (clickLock) return;

    if (!event.target.classList.contains('square')) return;

    const square = event.target;

    if (square.dataset.clicked == 'true') return;

    if (counter.next() % 2 == 0) {
        square.innerHTML = 'X';
        square.dataset.clicked = 'true';
    } else {
        square.innerHTML = 'O';
        square.dataset.clicked = 'true';
    }

    if (compare(squareList, 0, 1, 2) || 
        compare(squareList, 3, 4, 5) ||
        compare(squareList, 6, 7, 8) ||
        compare(squareList, 0, 4, 8) ||
        compare(squareList, 2, 4, 6) ||
        compare(squareList, 0, 3, 6) ||
        compare(squareList, 1, 4, 7) ||
        compare(squareList, 2, 5, 8)) {

        setTimeout(() => {
            clickLock = true;
            endGame.style.display = 'flex';

            setTimeout(() => {
                document.addEventListener('click', hidden);
            }, 1000);
        })

    }
}

function hidden() {
    endGame.style.display = 'none';
    document.removeEventListener('click', hidden)
}

function restart() {
    cleanInnerElements(squareList);
    counter.clear();
    filledCount = 0;
    clickLock = false;
}

function createCounter() {
    let count = 0;

    return {
        next: function() {
            return count++
        },
        clear: function() {
            count = 0;
        }
    }
}

function compare(list, order_1, order_2, order_3) {
    if (list[order_1].innerHTML == '' || 
        list[order_2].innerHTML == '' || 
        list[order_3].innerHTML == '') return false;

    if (list[order_1].innerHTML == list[order_2].innerHTML && 
        list[order_2].innerHTML == list[order_3].innerHTML) return true;

    return false;
}

function cleanInnerElements(elementList) {
    for (let element of elementList) {
        element.innerHTML = '';
        element.dataset.clicked = 'false';
    }
}