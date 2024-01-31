import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import CharacterList from './components/CharacterList';
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from "./components/Planet";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"  element={<CharacterList />} />
        <Route path="/characters"  element={<CharacterList />} />
        <Route path="/characters/:id"  element={<Character />} />
        <Route path="/films/:id"  element={<Film />} />
        <Route path="/planets/:id"  element={<Planet />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
