import { useState } from "react";
import Start from "./components/Start";
import Game from "./components/Game";

function App() {
  const [isStarted, setIsStarted] = useState(false);

  return (
    <main>
      {isStarted ? <Game /> : <Start handleClick={() => setIsStarted(true)} />}
    </main>
  );
}

export default App;
