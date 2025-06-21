import p5 from "p5";

export function drawPolygon(x, y, radius, sides, p) {
  const angleStep = p.TWO_PI / sides;

  p.beginShape();
  for (let i = 0; i < sides; i++) {
    const angle = i * angleStep;
    const px = x + p.cos(angle) * radius;
    const py = y + p.sin(angle) * radius;
    p.vertex(px, py);
  }
  p.endShape(p.CLOSE);
}

export function drawLineFrom(x, y, angle, length, p) {
  const x2 = x + p.cos(angle) * length;
  const y2 = y + p.sin(angle) * length;
  p.line(x, y, x2, y2);
}
