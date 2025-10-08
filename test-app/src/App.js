import { Palette } from "./palette.js";

function App() {
  const colors = ["#a90b0bff", "#26a026ff", "#2323a0ff", "#f8f848ff"];
  const labels = ["Red", "Green", "Blue", "Yellow"];
  return <Palette colorHexCodeArray={colors} textArray={labels} />;
}

export default App;