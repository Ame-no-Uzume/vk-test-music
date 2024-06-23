import React from "react";
import Music from "./components/Music";
import "./style/App.css"
import MusicPlayer from "./store/musicPlayer";

const player = new MusicPlayer()

function App() {
  return (
    <div className="App">
      <Music musicPlayer={player} />
    </div>
  );
}

export default App;
