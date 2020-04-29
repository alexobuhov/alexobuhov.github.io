let field = document.createElement("div");
document.body.appendChild(field);
field.classList.add("field");

for (let i = 1; i < 101; i++) {
  let excel = document.createElement("div");
  field.appendChild(excel);
  excel.classList.add("excel");
}

let excel = document.getElementsByClassName("excel");
let x = 1,
  y = 10;
for (let i = 0; i < excel.length; i++) {
  if (x > 10) {
    x = 1;
    y--;
  }
  excel[i].setAttribute("posX", x);
  excel[i].setAttribute("posY", y);
  x++;
}

function generateSnake() {
  let posX = Math.round(Math.random() * (10 - 3) + 3);
  let posY = Math.round(Math.random() * (10 - 1) + 1);
  return [posX, posY];
}

let coordinates = generateSnake();
let snakeBody = [
  document.querySelector(
    `[posX = "${coordinates[0]}"][posY = "${coordinates[1]}"]`
  ),
  document.querySelector(
    `[posX = "${coordinates[0] - 1}"][posY = "${coordinates[1]}"]`
  ),
  document.querySelector(
    `[posX = "${coordinates[0] - 2}"][posY = "${coordinates[1]}"]`
  ),
];

for (let i = 0; i < snakeBody.length; i++) {
  snakeBody[i].classList.add("snakeBody");
}
snakeBody[0].classList.add("snakeHeadRight");

let mouse;
let point;

function createMouse() {
  function generateMouse() {
    let posX = Math.round(Math.random() * (10 - 1) + 1);
    let posY = Math.round(Math.random() * (10 - 1) + 1);
    return [posX, posY];
  }

  let mouseCoordinates = generateMouse();
  mouse = document.querySelector(
    `[posX = "${mouseCoordinates[0]}"][posY = "${mouseCoordinates[1]}"]`
  );

  while (mouse.classList.contains("snakeBody")) {
    let mouseCoordinates = generateMouse();
    mouse = document.querySelector(
      `[posX = "${mouseCoordinates[0]}"][posY = "${mouseCoordinates[1]}"]`
    );
  }

  mouse.classList.add("mouse");
  point = document.createElement("div");
  mouse.appendChild(point);
}

createMouse();

function move() {
  let snakeCoordinates = [
    snakeBody[0].getAttribute("posX"),
    snakeBody[0].getAttribute("posY"),
  ];
  snakeBody[0].classList.remove("snakeHeadRight");
  snakeBody[0].classList.remove("snakeHeadDown");
  snakeBody[0].classList.remove("snakeHeadLeft");
  snakeBody[0].classList.remove("snakeHeadUp");
  snakeBody[snakeBody.length - 1].classList.remove("snakeBody");
  snakeBody.pop();
  if (direction == "right") {
    if (snakeCoordinates[0] < 10) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${parseInt(snakeCoordinates[0]) + 1}"][posY = "${
            snakeCoordinates[1]
          }"]`
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${1}"][posY = "${snakeCoordinates[1]}"]`
        )
      );
    }
  } else if (direction == "left") {
    if (snakeCoordinates[0] > 1) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${parseInt(snakeCoordinates[0]) - 1}"][posY = "${
            snakeCoordinates[1]
          }"]`
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${10}"][posY = "${snakeCoordinates[1]}"]`
        )
      );
    }
  } else if (direction == "up") {
    if (snakeCoordinates[1] < 10) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${
            parseInt(snakeCoordinates[1]) + 1
          }"]`
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${1}"]`
        )
      );
    }
  } else if (direction == "down") {
    if (snakeCoordinates[1] > 1) {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${
            parseInt(snakeCoordinates[1]) - 1
          }"]`
        )
      );
    } else {
      snakeBody.unshift(
        document.querySelector(
          `[posX = "${snakeCoordinates[0]}"][posY = "${10}"]`
        )
      );
    }
  }

  if (
    snakeBody[0].getAttribute("posX") == mouse.getAttribute("posX") &&
    snakeBody[0].getAttribute("posY") == mouse.getAttribute("posY")
  ) {
    document.querySelector(".mouse").removeChild(point);
    mouse.classList.remove("mouse");
    let a = snakeBody[snakeBody.length - 1].getAttribute("posX");
    let b = snakeBody[snakeBody.length - 1].getAttribute("posY");
    snakeBody.push(document.querySelector(`[posX = "${a}"][posY = "${b}"]`));
    createMouse();
  }

  if (snakeBody[0].classList.contains("snakeBody")) {
    clearInterval(interval);
    snakeBody[0].style.background = "red";
    alert("Game Over");
  }

  if (direction == "down") {
    snakeBody[0].classList.add("snakeHeadDown");
  } else if (direction == "left") {
    snakeBody[0].classList.add("snakeHeadLeft");
  } else if (direction == "right") {
    snakeBody[0].classList.add("snakeHeadRight");
  } else if (direction == "up") {
    snakeBody[0].classList.add("snakeHeadUp");
  }

  for (let i = 0; i < snakeBody.length; i++) {
    snakeBody[i].classList.add("snakeBody");
  }

  step = true;
}

let direction = "right";
let step = false;

let interval = setInterval(move, 300);

window.addEventListener("keydown", function (e) {
  if (step) {
    if (e.keyCode == 37 && direction != "right") {
      direction = "left";
      step = false;
    }
    if (e.keyCode == 38 && direction != "down") {
      direction = "up";
      step = false;
    }
    if (e.keyCode == 39 && direction != "left") {
      direction = "right";
      step = false;
    }
    if (e.keyCode == 40 && direction != "up") {
      direction = "down";
      step = false;
    }
  }
});
