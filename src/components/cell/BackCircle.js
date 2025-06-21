export default class BackCircle {
  constructor() {
    this.backCircle = [];
  }

  drawBackCircle(width, slice, p) {
    const stepX = width / slice;

    for (let j = 0; j < slice; j++) {
      for (let i = 0; i < slice; i++) {
        const cx = stepX * i + stepX / 2;
        const cy = stepX * j + stepX / 2;
        p.fill(0);
        //p.ellipse(cx, cy, 5);
        this.backCircle.push(p.createVector(cx, cy));
      }
    }
  }
}
