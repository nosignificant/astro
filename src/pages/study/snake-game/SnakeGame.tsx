import React from "react";

export default function SnakeGame() {
  return (
    <div className="relative h-full overflow-hidden">
      <iframe
        src="/snake-game/embed.html"
        scrolling="no"
        style={{
          height: "100%",
          width: "auto",
          border: "none",
          display: "block",
        }}
      />
    </div>
  );
}
