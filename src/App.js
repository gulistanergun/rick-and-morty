import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Characters from "./components/Characters";
import React , {useState} from "react";
import TumCharacters from "./components/TumCharacters";
import Favorite from "./components/Favorite";
import CharacterDetail from "./components/CharacterDetail";

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home searchTerm={searchTerm} />} />
      <Route path="/episode/:episodeId/characters" element={<Characters searchTerm={searchTerm}/>} />
      <Route path="/character/:characterId" element={<CharacterDetail />} />
      <Route path="/all-characters" element={<TumCharacters />}/>
      <Route path="/favorite"  element={<Favorite />}/>
      </Routes>
    </div>
  );
}

export default App;
