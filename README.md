# palette-prompt-component
Creating a React component to make paintboxes render on screen

### Test

```
cd test-app
npm start
Navigate to http://localhost:3000
```

### Modify Behavior of Palette

```
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
```

This is an anonymous function that draws palettes and pairs the color with the same index
text from the two arrays passed in to the component. [Atrament.js](https://github.com/jakubfiala/atrament) can be embedded in a webpage to create a drawing pad whose color switches depending on the given colors.

### Basic Code Usage

```
// Keep this at top of file
import { Palette } from "./palette.js";

function App() {
  const colors = ["#a90b0bff", "#26a026ff", "#2323a0ff", "#c3c33fff"];
  const labels = ["Red", "Green", "Blue", "Yellow"];

  // Pass in props of an array of color hex codes and associated text labels
  return <Palette colorHexCodeArray={colors} textArray={labels} />;
}

export default App;
```

### Node Package

The component is also published as a Node package: https://www.npmjs.com/package/palette-prompt

```
npm i palette-prompt
```

Then import at top of file.

```
import { Palette } from 'palette-prompt';
```

### Future Direction

Also have the onClick function be passed in as an optional prop to the Palette component.