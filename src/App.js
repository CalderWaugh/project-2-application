import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import CharacterList from "./components/CharacterList";
import Character from "./components/Character";
import Film from "./components/Film";
import Planet from "./components/Planet";

function App() {
  return (
    <section className={"App container"}>
      <div className={"App header"}>
        <a href="/" className={"App header-title"}>SWAPI</a>
      </div>
      <div className={"App app-body"}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CharacterList />} />
            <Route path="/characters" element={<CharacterList />} />
            <Route path="/characters/:id" element={<Character />} />
            <Route path="/films/:id" element={<Film />} />
            <Route path="/planets/:id" element={<Planet />} />
          </Routes>
        </BrowserRouter>
      </div>
    </section>
  );
}

export default App;
