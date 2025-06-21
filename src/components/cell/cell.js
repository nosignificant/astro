import p5 from 'p5';
import Utils from './utils';

export default class Cell {
  util = new Utils();

  constructor(x, y) {
    // 위치 및 생명력
    this.x = x;
    this.y = y;
    this.character = Math.floor(Math.random() * 10);
    this.health = 10 * this.character;

    // 내부 상태
    this.curiosity = 0;
    this.fear = 0;
    this.color = [255, 255, 255];

    // 주변 정보
    this.isEnemyClose = false;
    this.closeEnemies = [];
    this.closeCells = [];
  }

  draw(p) {
    p.fill(...this.color);
    p.stroke(0);
    p.ellipse(this.x, this.y, this.health);
  }

  update() {
    this.checkEnemyGoaway();
    this.applySpacingForce();
    this.fearAction();
  }

  fearAction() {
    if (this.closeEnemies.length > 0) {
      this.fear += 0.1;
    }

    if (this.fear > 0.1) {
      this.color = [0, 0, 255];
    } else {
      this.color = [255, 255, 255];
    }
  }

  checkCloseEnemy(enemies) {
    enemies.forEach((enemy) => {
      const d = p5.prototype.dist(this.x, this.y, enemy.x, enemy.y);
      if (d < 10) {
        this.closeEnemies.push(enemy);
      }
    });
  }

  checkEnemyGoaway() {
    this.closeEnemies = this.closeEnemies.filter((enemy) => {
      const d = p5.prototype.dist(this.x, this.y, enemy.x, enemy.y);
      return d <= 10;
    });
  }

  checkCloseCell(others, p) {
    this.closeCells = [];
    let mostFar = 0;

    others.forEach((other) => {
      if (this !== other) {
        const d = p.dist(this.x, this.y, other.x, other.y);
        if (d < other.health * 3) {
          this.closeCells.push(other);
          if (d > mostFar) mostFar = d;
        }
      }
    });

    // 연결 선
    p.stroke(0, 0, 255);
    this.closeCells.forEach((other) => {
      //  p.line(this.x, this.y, other.x, other.y);
    });
  }

  applySpacingForce() {
    const strength = 0.1;

    this.closeCells.forEach((other) => {
      const minDist = this.health;
      const maxDist = other.health * 2;
      const dist = this.util.dist(other.x, other.y, this.x, this.y);

      const dx = other.x - this.x;
      const dy = other.y - this.y;

      if (dist === 0) return;

      const offsetX = dx / dist;
      const offsetY = dy / dist;

      if (dist < minDist) {
        const diff = minDist - dist;
        this.x -= offsetX * diff * strength;
        this.y -= offsetY * diff * strength;
      } else if (dist > maxDist) {
        const diff = dist - maxDist;
        this.x += offsetX * diff * strength;
        this.y += offsetY * diff * strength;
      }
    });
  }

  drawLeg(backCircleArray, p) {
    const { closest, secondClosest } = this.util.closestObj(
      backCircleArray,
      this,
    );
    console.log('a: ', closest, 'b: ', secondClosest);
    if (closest) {
      p.stroke(0); // 검은색 선
      p.line(this.x, this.y, closest.x, closest.y);
    }

    if (closest && secondClosest) {
      p.stroke(0, 0, 255); // 파란색 선
      p.line(closest.x, closest.y, secondClosest.x, secondClosest.y);
    }
  }
}
