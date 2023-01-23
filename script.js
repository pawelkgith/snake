let snake = [{x: 200, y: 200}, {x: 190, y: 200}, {x: 180, y: 200}],
kierunek = false,
jablko_x,
jablko_y,
directionX = 10,
directionY = 0,
wynik = 0;

const plansza = document.querySelector("#plansza"),
planszaContext = plansza.getContext("2d");
genFood();
gameplay();
document.addEventListener("keydown", zmienKierunek);

function gameplay() {
    if(koniec() === true)
        return 0;
    kierunek = false;
    setTimeout(() => {
        generujPlansze();
        food();
        snakeGen();
        ruszSieKurwo();
        gameplay();
    }, 80);
}

function generujPlansze() {
    planszaContext.fillStyle = "white";
    planszaContext.strokeStyle = "black";
    planszaContext.fillRect(0, 0, plansza.width, plansza.height);
    planszaContext.strokeRect(0, 0, plansza.width, plansza.height);
}

function snakeGen() {
    snake.forEach(snakePart);
}

function snakePart(part) {
    planszaContext.fillStyle = "orange";
    planszaContext.strokeStyle = "red";
    planszaContext.fillRect(part.x, part.y, 10, 10);
    planszaContext.strokeRect(part.x, part.y, 10, 10);
}

function randomJapko(min, max) {
    return Math.round((Math.random()*(max-min)+min)/10)*10;
}

function food() {
    planszaContext.fillStyle = "lightgreen";
    planszaContext.strokeStyle = "darkgreen";
    planszaContext.fillRect(jablko_x, jablko_y, 10, 10);
    planszaContext.strokeRect(jablko_x, jablko_y, 10, 10);
}

function genFood() {
    jablko_x = randomJapko(0, plansza.width - 10);
    jablko_y = randomJapko(0, plansza.height - 10);
    snake.forEach((part) =>{
      const zjedzone = part.x == jablko_x && part.y == jablko_y;
      if (zjedzone === true) 
        genFood();
    });
}

function koniec() {
    for(let i=3; i<snake.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y)
            return true;
    }

    return snake[0].x < 0 
    || snake[0].x > plansza.width - 10 
    || snake[0].y < 0 
    || snake[0].y > plansza.height - 10;
}

function zmienKierunek(k) {
    if (kierunek === true) 
        return;
    kierunek = true;

    const klawisz = k.keyCode;

    if (klawisz === 37 && directionX !== 10) {
      directionX = -10;
      directionY = 0;
    }
    if (klawisz === 38 && directionY !== 10) {
      directionX = 0;
      directionY = -10;
    }
    if (klawisz === 39 && directionX !== -10) {
      directionX = 10;
      directionY = 0;
    }
    if (klawisz === 40 && directionY !== -10) {
      directionX = 0;
      directionY = 10;
    }
}

function ruszSieKurwo() {
    const glowa = {x: snake[0].x + directionX, y: snake[0].y + directionY};
    snake.unshift(glowa);
    const czyWpierdolilJedzenie = snake[0].x === jablko_x && snake[0].y === jablko_y;
    if(czyWpierdolilJedzenie === true) {
        genFood();
        wynik += 1;
    }

    else
        snake.pop();

    document.querySelector(".wynik").innerText = "" + wynik;
}