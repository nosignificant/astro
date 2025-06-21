import p5 from "p5";

export class Food {
  constructor() {
    this.food = [];
  }

  clicked(p, x, y) {
    this.food.push(p.createVector(x, y));
  }

  drawFood(p, radius) {
    p.fill(0);
    this.food.forEach((vec) => {
      p.ellipse(vec.x, vec.y, radius);
    });
  }
}
