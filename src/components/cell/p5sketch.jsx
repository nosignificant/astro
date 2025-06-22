import { useEffect, useRef } from 'react';
import p5 from 'p5';

import Cell from './cell.js';
import Enemy from './\benemy.js';
import BackCircle from './BackCircle.js';
import Food from './food.js';

export default function P5Sketch() {
  const sketchRef = useRef(null);

  useEffect(() => {
    const allCells = [];
    const allEnemies = [];
    let currentGroupId = 0;

    const sketch = (p) => {
      const enemy = new Enemy(p.mouseX, p.mouseY);
      const b = new BackCircle();
      const foods = new Food();

      for (let i = 0; i < 10; i++) {
        const offsetX = Math.floor(Math.random() * 100);
        const offsetY = Math.floor(Math.random() * 100);
        allCells.push(new Cell(100 + i * 50 - offsetX, 100 + i * 50 - offsetY));
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.clear();
        allEnemies.push(enemy);
      };
      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
      };
      p.mousePressed = () => {
        foods.clicked(p, p.mouseX, p.mouseY);
      };

      p.draw = () => {
        p.clear();
        b.drawBackCircle(p.windowWidth, 20, p);
        enemy.draw(p, p.mouseX, p.mouseY);
        foods.drawFood(p, 7);

        allCells.forEach((cell) => {
          cell.checkCloseEnemy(allEnemies);
          cell.checkCloseCell(allCells, p);
          if (!cell.inGroup && cell.closeCells.length > 2) {
            currentGroupId += 1;
            cell.tryJoinGroup(currentGroupId, allCells);
          }
          cell.update(allCells);
          cell.draw(p);
          cell.drawLeg(b.backCircle, p);
        });
      };
    };

    const instance = new p5(sketch, sketchRef.current);

    return () => {
      instance.remove(); // cleanup
    };
  }, []);

  return <div ref={sketchRef}></div>;
}
