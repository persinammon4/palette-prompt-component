// To import component keep `import { Palette } from './component.js';


function handleClick(event) {
    const x = event.pageX - event.target.offsetLeft;
    const y = event.pageY - event.target.offsetTop;
}

function Palette(colorHexCodeArray, textArray) {
    return (<div>
        <canvas id="myCanvas" width="200" height="100" style="border:1px solid #000000;" onClick="handleClick"></canvas>
        <script>
            const c = document.getElementById("myCanvas");
            const ctx = c.getContext("2d");
            ctx.moveTo(0,0);

            for (let i = 0; i < colorHexCodeArray.length; i++) {
                ctx.fillStyle = colorHexCodeArray[i];
                ctx.fillRect(i * 20, 0, 20, 20);    
            }

        </script>
    </div>);
}

export default Palette;