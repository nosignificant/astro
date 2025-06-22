export default class utils {
  dist(x1, y1, x2, y2) {
    const dx = x1 - x2;
    const dy = y1 - y2;
    return Math.sqrt(dx * dx + dy * dy);
  }

  closestObj(array, obj) {
    return array.slice().sort((a, b) => {
      const distA = this.dist(a.x, a.y, obj.x, obj.y);
      const distB = this.dist(b.x, b.y, obj.x, obj.y);
      return distA - distB;
    });
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

  checkNearObj(arr, storeArr, obj) {
    arr.forEach((element) => {
      const d = this.dist(obj.x, obj.y, element.x, element.y);
      if (d < obj.near) {
        storeArr.push(element);
      }
    });
  }
  checkObjGoaway(storeArr) {
    storeArr = storeArr.filter((enemy) => {
      const d = this.dist(this.x, this.y, enemy.x, enemy.y);
      return d <= 10;
    });
  }
}
