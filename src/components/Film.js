import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Films.css";

export default function Film() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [characters, setCharacters] = useState(null);
  const [film, setFilm] = useState([]);
  const [planets, setPlanets] = useState([]);

  async function getFilm() {
    const res = await fetch(`http://localhost:3001/api/films/${id}`);
    const item = await res.json();
    setFilm(item);
  }

  async function getFilmPlanets() {
    const res = await fetch(`http://localhost:3001/api/films/${id}/planets`);
    const item = await res.json();
    setPlanets(item);
  }

  async function getFilmCharacters() {
    const res = await fetch(`http://localhost:3001/api/films/${id}/characters`);
    const item = await res.json();
    setCharacters(item);
  }

  useEffect(() => {
    getFilm();
    getFilmPlanets();
    getFilmCharacters();
  }, []);

  return (
    <div className={"Films container"}>
      <div className={"Films film-name-container"}>
        <p className={"Films film-name"}>Film: {film ? film.title : <></>}</p>
      </div>
      <div>
        <h3>Characters</h3>
        <div className={"Films character-list"}>
          {characters ? (
            characters.map((char, index) => (
              <div
                key={index}
                onClick={() => navigate(`/characters/${char.id}`)}
                className={"Films character-name-container"}
              >
                <p>{char.name}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div>
        <h3>Planets</h3>
        <div className={"Films planet-list"}>
          {planets ? (
            planets.map((planet, index) => (
              <div
                key={index}
                onClick={() => navigate(`/planets/${planet.id}`)}
                className={"Films planet-name-container"}
              >
                <p>{planet.name}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
