import React, { useEffect, useRef } from "react";
import Atrament from 'atrament';

export function Palette({ colorHexCodeArray, textArray }) {
  const canvasRef = useRef(null);

  const drawingPadRef = useRef(null);

  function largestFactor(value) {
			//so more row based
			//taking largest factor so more squares per row - horizontal looking
	    for(let i = value-1; i >= 1; i--) {
	        if(value % i === 0) {
	            return i;
	        }
	    }
			return value;
	}

  const rowLength = largestFactor(colorHexCodeArray.length);
  const colLength = Math.ceil(colorHexCodeArray.length / rowLength);
  const blockWidth = 40;
      
  useEffect(() => {
    const rowLength = largestFactor(colorHexCodeArray.length);
    const colLength = Math.ceil(colorHexCodeArray.length / rowLength);
    const blockWidth = 40;
    const canvas = canvasRef.current;
    const drawingPadGrabbed = new Atrament(drawingPadRef.current, {
      width: 200,
      height: 200,
      color: '#ffbf47',
      weight: 5
    })
    if (!canvas) return;
    if (!drawingPadGrabbed) return;
    if (colorHexCodeArray.length !== textArray.length) return;
    const ctx = canvas.getContext("2d");

    for (let row = 0; row < rowLength; row++) {
      for (let col = 0; col < colLength; col++) {
        const index = row * colLength + col;
        if (index >= colorHexCodeArray.length) break;
        ctx.fillStyle = colorHexCodeArray[index];
        ctx.fillRect(col * blockWidth, row * blockWidth, blockWidth, blockWidth);
      }
    }

    // Click handler to update text based on clicked color
    const handleClick = (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const col = Math.floor(x / blockWidth);
      const row = Math.floor(y / blockWidth);
      const index = row * colLength + col;

      if (textArray[index]) {
        document.getElementById("palette-text").innerText = textArray[index];
      }
      if (colorHexCodeArray[index]) {
        drawingPadGrabbed.color = colorHexCodeArray[index];
      }
    };

    canvas.addEventListener("click", handleClick);

    // Callback function removes the listener to prevent multiple event listeners from rerun of script
    return () => {
      canvas.removeEventListener("click", handleClick);
    }
  }, [colorHexCodeArray, textArray]);

  return (
    <div id="palette-container">
      <canvas
        ref={canvasRef}
        width={blockWidth*colLength}
        height={blockWidth*rowLength}
        style={{ border: "1px solid #000", cursor: "pointer" }}
      />
    <div id="palette-text" style={{ fontFamily: "Roboto", fontSize: "16px" }}
></div>
    <div id ="canvas">
      <canvas ref={drawingPadRef} width={200} height={200}
      style={{ border: "1px solid #000"}}/>
    </div>
    </div>
  );
}
