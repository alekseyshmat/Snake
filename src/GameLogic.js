var sizeX = 20;
var sizeY = 20;
var length = 3;
var timer;
var startSnakeX = Math.round(Math.random() * ((sizeX - 2) - 2) + 2);
var startSnakeY = Math.round(Math.random() * ((sizeY - 5) - 5) + 5);
var gameLogic = [[startSnakeX, startSnakeY], [startSnakeX, startSnakeY + 1], [startSnakeX, startSnakeY + 2]];

var direction = [[0, 1], [1, 0], [0, -1], [-1, 0]];
var directx = route = 0;

var myKey = {
    'left': 37,
    'up': 38,
    'right': 39,
    'down': 40
};

function createField(sizeX, sizeY) {
    for (var x = 0; x < sizeX; x++) {
        var coorX = document.createElement('div');
        document.body.appendChild(coorX);
        coorX.className = 'field';
        for (var y = 0; y < sizeY; y++) {
            var coorY = document.createElement('div');
            coorX.appendChild(coorY);
            coorY.className = 'cell';
            coorY.id = x + ',' + y;
        }
    }
    createSnake();
    createApple(sizeX, sizeY);
}

function createSnake() {
    for (var i = 0; i < length; i++) {
        var snakePart = gameLogic[i];
        document.getElementById(snakePart.join()).className = 'cell snake';
    }
}

function createApple(sizeX, sizeY) {
    var x = Math.round(Math.random() * (sizeX - 1));
    var y = Math.round(Math.random() * (sizeY - 1));
    var apple = document.getElementById(x + ',' + y);
    if (apple.className === 'cell') {
        apple.className = "cell apple";
    } else {
        createApple(sizeX, sizeY);
    }
    return apple;
}

function move() {
    route = directx;
    var body = gameLogic;
    var shakeHead = gameLogic[length - 1];
    var nextCell = shakeHead.map(function (value, index) {
        return value + direction[route][index]
    });
    gamePlay(nextCell, body);
    return nextCell;

}

function gamePlay(headCell, body) {
    if (headCell[0] === -1 || headCell[0] === sizeX || headCell[1] === -1 || headCell[1] === sizeY) {
        clearInterval(timer);
        alert('Вы проиграли! Ваш счёт: ' + (length - 3));
        window.location.reload();
    }

    var tmp = document.getElementById(headCell.join());
    if (tmp != null && tmp.className === 'cell') {
        var removeTail = body.shift();
        body.push(headCell);
        document.getElementById(removeTail.join()).className = 'cell';
        document.getElementById(headCell.join()).className = 'cell snake';
    } else {
        if (tmp != null && tmp.className === 'cell apple') {
            length++;
            body.push(headCell);
            document.getElementById(headCell.join()).className = 'cell snake';
            createApple(sizeX, sizeY);
            var score = length - 3;
            document.getElementById('score').innerHTML = 'Ваш счёт: ' + score;
        } else {
            if (tmp.className === 'cell snake') {
                clearInterval(timer);
                alert('Вы проиграли! Ваш счёт: ' + (length - 3));
                window.location.reload();
            }
        }
    }
}

function keyHandler(event) {
    switch (event.keyCode) {
        case myKey.left:
            if (route !== 0) {
                directx = 2;
            }
            break;
        case myKey.right:
            if (route !== 2) {
                directx = 0;
            }
            break;
        case myKey.up:
            if (route !== 1) {
                directx = 3;
            }
            break;
        case myKey.down:
            if (route !== 3) {
                directx = 1;
            }
            break;
        default :
            return;
    }
}

function start() {
    timer = setInterval(move, 300);
}

window.addEventListener('keydown', keyHandler, false);
createField(sizeX, sizeY);