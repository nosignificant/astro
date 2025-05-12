---
title: "brick break"
description: "Lorem ipsum dolor sit amet"
---

## brick break

상위 항목: 단기 목표 (https://www.notion.so/1c72e24b88e7806aa061db243038609d?pvs=21)
선택: 끝

html 자체에 canvas라는 document object 가 있다고 합니다

ctx에다가 canvas자체에서 쓸 수 있는 그래픽 뭐시기들… 할당한다음에 했다고 하네요

```jsx
//mouse moving eventListner and function
document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - paddleWidth / 2;
  }
}
```

“mouse move” 가 있으면 mouseMoveHandler을 실행해라

창을 나가면 안되니까 paddlewidth/2

```jsx
if (
  x > b.x &&
  x < b.x + brickWidth &&
  y > b.y &&
  y < b.y + brickHeight
)
```

충돌 체크

반지름이나 그런거까지 체크 해주면 더 정교하게 만들 수 있겠죠

이런거 정말 귀찮은 일이네

- 코드보기
  ```jsx
  let canvas = document.getElementById("game"),
    ctx = canvas.getContext("2d"),
    ballRadius = 9,
    x = canvas.width / Math.floor(Math.random() * Math.random() * 10 + 3),
    y = canvas.height - 40,
    dx = 2,
    dy = -2;

  let paddleHeight = 12,
    paddleWidth = 72;

  let paddleX = (canvas.width - paddleWidth) / 2;

  let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 10;
  (brickPadding = 12), (topOffset = 40), (leftOffset = 33), (score = 0);

  let bricks = [];
  for (let c = 0; c < columnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < rowCount; r++) {
      bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
  }

  //mouse moving eventListner and function
  document.addEventListener("mousemove", mouseMoveHandler, false);

  function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
      paddleX = relativeX - paddleWidth / 2;
    }
  }

  //draw paddle
  function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(
      paddleX,
      canvas.height - paddleHeight,
      paddleWidth,
      paddleHeight,
      30
    );
    ctx.fillStyle = "#333";
    ctx.fill();
    ctx.closePath();
  }

  //draw ball
  function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
  }

  function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        if (bricks[c][r].status === 1) {
          let brickX = c * (brickWidth + brickPadding) + leftOffset;
          let brickY = r * (brickHeight + brickPadding) + topOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
          ctx.fillStyle = "#333";
          ctx.fill();
          ctx.closePath();
        }
      }
    }
  }

  //track score
  function trackScore() {
    ctx.font = "bold 16px sans-serif";
    ctx.fillStyle = "#333";
    ctx.fillText("score: " + score, 8, 24);
  }

  function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
      for (let r = 0; r < rowCount; r++) {
        let b = bricks[c][r];
        if (b.status == 1) {
          if (
            x > b.x &&
            x < b.x + brickWidth &&
            y > b.y &&
            y < b.y + brickHeight
          ) {
            dy = -dy;
            b.status = 0;
            score++;
            if (score === rowCount * columnCount) {
              alert("you win");
              document.location.reload();
            }
          }
        }
      }
    }
  }

  function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
      dx = -dx;
    }

    if (y + dy < ballRadius) {
      dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
      if (x > paddleX && x < paddleX + paddleWidth) {
        dy = -dy;
      } else {
        alert("Game over");
        document.location.reload();
      }
    }
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
      dy = -dy;
    }
    x += dx;
    y += dy;
  }

  setInterval(init, 10);
  ```
