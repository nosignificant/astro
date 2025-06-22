import p5 from 'p5';
import Utils from './utils';

export default class Cell {
  util = new Utils();

  constructor(x, y) {
    // 위치 및 생명력
    this.x = x;
    this.y = y;
    this.character = 5;
    this.strength = 0.001;
    this.creatureSTR = 0.1;
    //Math.floor(Math.random() * 10);
    this.health = 10 * this.character;
    this.near = 200;
    this.cells = false;
    // 내부 상태

    this.inGroup = false;
    this.groupId = null;

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

  update(allCells) {
    if (!this.inGroup) {
      this.applySpacingForce(allCells, this.strength);
      this.fearAction();
    } else {
      this.applySpacingForce(allCells, this.creatureSTR);
      this.fearAction();
    }
  }

  tryJoinGroup(groupId, allCells) {
    if (this.closeCells.length > 2) {
      this.inGroup = true;
      this.groupId = groupId;
      this.closeCells.forEach((cell) => {
        if (!cell.inGroup) {
          cell.inGroup = true;
          cell.groupId = groupId;
        }
      });
    }
  }
  asOneCreature() {
    if (this.closeCells.length > 2) {
      this.applySpacingForce(0.01);

      console.log('this close', this.closeCells.length);
      this.cells = true;
      this.closeCells.forEach((other) => {
        p.line(this.x, this.y, other.x, other.y);
      });
    }
  }

  checkCloseEnemy(enemies) {
    this.closeEnemies = [];
    this.util.checkNearObj(enemies, this.closeEnemies, this);
  }

  checkCloseCell(others, p) {
    this.closeCells = [];
    this.util.checkNearObj(others, this.closeCells, this);
    p.stroke(0, 255, 255);
  }

  applySpacingForce(allCells, strength) {
    allCells.forEach((other) => {
      if (this === other) return;

      const dist = this.util.dist(this.x, this.y, other.x, other.y);
      if (dist === 0) return;

      const sameGroup =
        this.inGroup && other.inGroup && this.groupId === other.groupId;

      if (!sameGroup) {
        if (dist < this.health * 2) {
          this.util.towards(
            this,
            strength * (this.health * 2 - dist),
            other,
            false,
          );
        }
        return;
      }

      if (dist > this.health) {
        this.util.towards(this, strength * (dist - this.health), other, true);
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

  fearAction() {
    if (this.closeEnemies.length > 0) {
      this.fear += 0.1;
      this.closeEnemies.forEach((enemy) =>
        this.util.towards(this, 1, enemy, false),
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
}
