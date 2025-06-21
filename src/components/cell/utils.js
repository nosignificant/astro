export default class utils {
  drawPolygon(x, y, radius, sides, p) {
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

  dist(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  closestObj(array, obj) {
    let closest = null;
    let secondClosest = null;
    let closestDist = Infinity;
    let secondClosestDist = Infinity;
    array.forEach((element) => {
      const dist = this.dist(element.x, element.y, obj.x, obj.y);

      if (dist < closestDist) {
        secondClosestDist = closestDist;
        secondClosest = closest;

        closestDist = dist;
        closest = element;
      } else if (dist < secondClosestDist) {
        secondClosestDist = dist;
        secondClosest = element;
      }
    });
    return { closest, secondClosest };
  }

  towards(obj, force, other, attract = true) {
    const dx = other.x - obj.x;
    const dy = other.y - obj.y;
    const dist = this.dist(other.x, other.y, obj.x, obj.y);
    if (dist === 0) return;

    const offsetX = dx / dist;
    const offsetY = dy / dist;

    const direction = attract ? 1 : -1;

    obj.x += offsetX * force * direction;
    obj.y += offsetY * force * direction;
    return obj;
  }
}
