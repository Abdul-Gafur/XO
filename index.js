const game = document.querySelector('#game');
const squareList = game.querySelectorAll('.square'); 
const restartBtn = document.querySelector('button');
const counter = createCounter();

document.addEventListener('mousedown', event => {
    event.preventDefault();
})
restartBtn.addEventListener('click', event => {
    restart(squareList);
});
game.addEventListener('click', step)

function step(event) {
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
            alert('Игра окончена!');

            restart(squareList);
        })

    }
}

function restart(elementList) {
    cleanInnerElements(elementList);
    counter.clear();
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