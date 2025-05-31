---
description: "Lorem ipsum dolor sit amet"
isLink : false
---

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
