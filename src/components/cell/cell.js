import p5 from 'p5';
import Utils from './utils';

export default class Cell {
  util = new Utils();

  constructor(x, y) {
    // 위치 및 생명력
    this.x = x;
    this.y = y;
    this.character = 10;
    //Math.floor(Math.random() * 10);
    this.health = 10 * this.character;
    this.near = 200;

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
    this.applySpacingForce();
    this.fearAction();
  }

  fearAction() {
    if (this.closeEnemies.length > 0) {
      this.fear += 0.1;
      this.closeEnemies.forEach((enemy) =>
        this.util.towards(this, 0.1, enemy, false),
      );
    } else {
      if (this.fear > 0) {
      }
      this.fear -= 0.1;
    }

    if (this.fear > 0) {
      this.color = [0, 255, 255];
    } else {
      this.color = [255, 255, 255];
    }
  }
  checkEnemyGoaway() {
    this.util.checkObjGoaway(this.closeEnemies);
  }
  checkCellGoaway() {
    this.util.checkObjGoaway(this.closeCells);
  }
  checkCloseEnemy(enemies) {
    this.closeEnemies = [];

    this.util.checkNearObj(enemies, this.closeEnemies, this);
    this.checkEnemyGoaway();
  }

  checkCloseCell(others, p) {
    this.closeCells = [];

    this.util.checkNearObj(others, this.closeCells, this);
    //console.log(this.closeCells);

    // 연결 선
    p.stroke(0, 255, 255);
    this.closeCells.forEach((other) => {
      p.line(this.x, this.y, other.x, other.y);
    });
    this.checkCellGoaway();
  }

  applySpacingForce() {
    const strength = 0.001;

    this.closeCells.forEach((other) => {
      const minDist = this.health * 2;
      const maxDist = other.health;
      const dist = this.util.dist(other.x, other.y, this.x, this.y);

      if (dist === 0) return;

      if (dist < minDist) {
        const diff = minDist - dist;
        this.util.towards(this, strength * diff, other, false); // 밀어냄
      } else if (dist > maxDist) {
        const diff = dist - maxDist;
        this.util.towards(this, strength * diff, other, true); // 끌어당김
      }
    });
  }

  drawLeg(backCircleArray, p) {
    const closeArr = this.util.closestObj(backCircleArray, this);
    //console.log('a: ', closest, 'b: ', secondClosest);

    p.stroke(0); // 검은색 선
    p.line(this.x, this.y, closeArr[1].x, closeArr[1].y);

    p.stroke(0, 0, 255); // 파란색 선
    p.line(closeArr[1].x, closeArr[1].y, closeArr[3].x, closeArr[3].y);
  }
}
