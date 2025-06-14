---
description: 'Lorem ipsum dolor sit amet'
date: 2025-04-07
isLink: true
---

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
  html += `<div class="${i === 0 ? 'head' : 'body'}" style="grid-area: ${
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
