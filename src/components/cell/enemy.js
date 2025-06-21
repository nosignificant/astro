export default class Enemy {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20; // 기본 크기
  }

  update(x, y) {
    this.x = x;
    this.y = y;
  }

  draw(p, x, y) {
    this.update(x, y);

    p.fill(255, 0, 0); // 빨간색
    p.noStroke();
    p.ellipse(this.x, this.y, this.size);
  }
}
