---
title: "snake game"
description: "Lorem ipsum dolor sit amet"
---

## snake game

css 에도 함수 쓸 수 있구나

```jsx
calc(100% / 4);
```

snake game 에서 필요한 기능

1. 음식을 먹으면 `(snakeX === foodX && snakeY === foodY)`
2. snake 의 몸통이 늘어나고 `snakeBody.push()`
3. 몸통은 머리의 방향을 따라온다

```jsx
for (let i = snakeBody.length - 1; i > 0; i--) {
  snakeBody[i] = snakeBody[i - 1];
}
snakeBody[0] = [snakeX, snakeY];
```

하고 render

```jsx
let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
for (let i = 0; i < snakeBody.length; i++) {
  html += `<div class="${i === 0 ? "head" : "body"}" style="grid-area: ${
    snakeBody[i][1]
  } / ${snakeBody[i][0]}"></div>`;
}

playBoard.innerHTML = html;
```

game over 조건

1. 벽에 부딪히면 `(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30)`
2. 몸통끼리 부딪히면

```
  for (let i = 1; i < snakeBody.length; i++) {
    if (
      snakeBody[0][0] === snakeBody[i][0] &&
      snakeBody[0][1] === snakeBody[i][1]
    ) {
```

- 코드 전문 보기

  ```jsx
  const playBoard = document.querySelector(".play-board");
  const scoreElement = document.querySelector(".score");
  const highScoreElement = document.querySelector(".high-score");
  const controls = document.querySelectorAll(".controls i");

  let gameOver = false;
  let foodX, foodY;
  let snakeX = 5,
    snakeY = 5;
  let velocityX = 0,
    velocityY = 0;
  let snakeBody = [];
  let setIntervalID;
  let score = 0;

  let highScore = localStorage.getItem("high-score") || 0;
  highScoreElement.innerText = `High score: ${highScore}`;

  const updateFoodPosition = () => {
    foodX = Math.floor(Math.random() * 30 + 1);
    foodY = Math.floor(Math.random() * 30 + 1);
  };

  const handleGameOver = () => {
    clearInterval(setIntervalID);
    alert("Game Over");
    location.reload();
  };

  const changeDirection = (e) => {
    if (e.key === "ArrowUp" && velocityY !== 1) {
      velocityX = 0;
      velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY !== -1) {
      velocityX = 0;
      velocityY = 1;
    } else if (e.key === "ArrowLeft" && velocityX !== 1) {
      velocityX = -1;
      velocityY = 0;
    } else if (e.key === "ArrowRight" && velocityX !== -1) {
      velocityX = 1;
      velocityY = 0;
    }
  };

  controls.forEach((button) =>
    button.addEventListener("click", () =>
      changeDirection({ key: button.dataset.key })
    )
  );

  const initGame = () => {
    if (gameOver) return handleGameOver();

    // check if food eaten (do this first)
    if (snakeX === foodX && snakeY === foodY) {
      updateFoodPosition();
      snakeBody.push([foodX, foodY]);
      console.table(snakeBody);
      score++;
      if (score >= highScore) highScore = score;
      localStorage.setItem("high-score", highScore);
      scoreElement.innerText = `Score: ${score}`;
      highScoreElement.innerText = `High Score: ${highScore}`;
    }

    // move snake head
    snakeX += velocityX;
    snakeY += velocityY;

    // update body
    for (let i = snakeBody.length - 1; i > 0; i--) {
      snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    // check collision with walls
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
      gameOver = true;
      return;
    }

    // check self-collision
    for (let i = 1; i < snakeBody.length; i++) {
      if (
        snakeBody[0][0] === snakeBody[i][0] &&
        snakeBody[0][1] === snakeBody[i][1]
      ) {
        gameOver = true;
        return;
      }
    }

    // render
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    for (let i = 0; i < snakeBody.length; i++) {
      html += `<div class="${i === 0 ? "head" : "body"}" style="grid-area: ${
        snakeBody[i][1]
      } / ${snakeBody[i][0]}"></div>`;
    }

    playBoard.innerHTML = html;
  };

  updateFoodPosition();
  setIntervalID = setInterval(initGame, 100);
  document.addEventListener("keyup", changeDirection);
  ```
