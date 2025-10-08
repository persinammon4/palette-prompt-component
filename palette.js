import React, { useEffect, useRef } from "react";

export function Palette({ colorHexCodeArray, textArray }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const blockWidth = 40; // width of each color block

    // Draw the palette colors
    for (let i = 0; i < colorHexCodeArray.length; i++) {
      ctx.fillStyle = colorHexCodeArray[i];
      ctx.fillRect(i * blockWidth, 0, blockWidth, 40);
    }

    // Click handler to update text based on clicked color
    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const index = Math.floor(x / blockWidth);

      if (textArray && textArray[index]) {
        document.getElementById("palette-text").innerText = textArray[index];
      }
    };

    canvas.addEventListener("click", handleClick);

    // Callback function removes the listener to prevent multiple event listeners from rerun of script
    return () => canvas.removeEventListener("click", handleClick);
  }, [colorHexCodeArray, textArray]);

  return (
    <div id="palette-container">
      <canvas
        ref={canvasRef}
        width={colorHexCodeArray.length * 40}
        height={40}
        style={{ border: "1px solid #000", cursor: "pointer" }}
      />
    <div id="palette-text" style={{ fontFamily: "Roboto", fontSize: "16px" }}
></div>
    </div>
  );
}
