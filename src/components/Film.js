import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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
    <>
      <div>Film: {film ? film.title : <></>}</div>
      <div>
        <h3>Characters</h3>
        {characters ? (
          characters.map((char, index) => (
            <p key={index} onClick={() => navigate(`/characters/${char.id}`)}>
              {char.name}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        <h3>Planets</h3>
        {planets ? (
          planets.map((planet, index) => (
            <p key={index} onClick={() => navigate(`/planets/${planet.id}`)}>
              {planet.name}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
