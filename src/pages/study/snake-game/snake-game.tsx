import React, { useEffect, useRef, useState } from 'react';
import './snake-game.css';

export default function SnakeGame() {
  const playBoardRef = useRef<HTMLDivElement>(null);
  const scoreRef = useRef<HTMLSpanElement>(null);
  const highScoreRef = useRef<HTMLSpanElement>(null);

  const [gameOver, setGameOver] = useState(false);
  const [snake, setSnake] = useState<[number, number][]>([[5, 5]]);
  const [velocity, setVelocity] = useState<[number, number]>([0, 0]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState<number>(
    typeof window !== 'undefined'
      ? parseInt(localStorage.getItem('high-score') || '0')
      : 0,
  );

  const [food, setFood] = useState<[number, number]>(generateNewFood([[5, 5]]));

  // ➜ 먹이 생성: snake body 안 겹치게
  function generateNewFood(snakeBody: [number, number][]): [number, number] {
    let newFood: [number, number];
    do {
      newFood = [
        Math.floor(Math.random() * 30) + 1,
        Math.floor(Math.random() * 30) + 1,
      ];
    } while (
      snakeBody.some(
        (segment) => segment[0] === newFood[0] && segment[1] === newFood[1],
      )
    );
    return newFood;
  }

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && velocity[1] !== 1) setVelocity([0, -1]);
      if (e.key === 'ArrowDown' && velocity[1] !== -1) setVelocity([0, 1]);
      if (e.key === 'ArrowLeft' && velocity[0] !== 1) setVelocity([-1, 0]);
      if (e.key === 'ArrowRight' && velocity[0] !== -1) setVelocity([1, 0]);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [velocity]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (gameOver) return;

      setSnake((prevSnake) => {
        const newHead: [number, number] = [
          prevSnake[0][0] + velocity[0],
          prevSnake[0][1] + velocity[1],
        ];

        // 벽 충돌
        if (
          newHead[0] <= 0 ||
          newHead[0] > 30 ||
          newHead[1] <= 0 ||
          newHead[1] > 30
        ) {
          endGame();
          return prevSnake;
        }

        // 자기 몸 충돌
        if (
          prevSnake.some(
            (segment, i) =>
              i !== 0 && segment[0] === newHead[0] && segment[1] === newHead[1],
          )
        ) {
          endGame();
          return prevSnake;
        }

        let newBody = [newHead, ...prevSnake];

        // 먹이 먹음
        if (newHead[0] === food[0] && newHead[1] === food[1]) {
          const newFood = generateNewFood(newBody);
          setFood(newFood);
          setScore((s) => {
            const updated = s + 1;
            if (updated > highScore) {
              setHighScore(updated);
              localStorage.setItem('high-score', updated.toString());
            }
            return updated;
          });
        } else {
          newBody.pop();
        }

        return newBody;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [velocity, food, gameOver, highScore]);

  function endGame() {
    setGameOver(true);
    alert('Game Over!');
    resetGame();
  }

  function resetGame() {
    setSnake([[5, 5]]);
    setVelocity([0, 0]);
    setScore(0);
    setFood(generateNewFood([[5, 5]]));
    setGameOver(false);
  }

  return (
    <div className="wrapper">
      <div className="game-details">
        <span ref={scoreRef} className="score">
          Score: {score}
        </span>
        <span ref={highScoreRef} className="high-score">
          High Score: {highScore}
        </span>
      </div>
      <div ref={playBoardRef} className="play-board aspect-square">
        <div
          className="food"
          style={{ gridColumn: food[0], gridRow: food[1] }}
        />
        {snake.map((segment, idx) => (
          <div
            key={idx}
            className={idx === 0 ? 'head' : 'body'}
            style={{ gridColumn: segment[0], gridRow: segment[1] }}
          />
        ))}
      </div>
      <div>키보드 상하좌우 키를 사용하면 움직입니다.</div>
    </div>
  );
}
