import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Film() {
  let { id } = useParams();

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
    const res = await fetch(`http://localhost:3001/api/characters/${id}/films`);
    const item = await res.json();
    console.log(item);
    setCharacters(item);
  }

  useEffect(() => {
    getFilm();
    getFilmPlanets();
    getFilmCharacters();
  }, []);

  return (
    <>
      <div>{film ? <p>{film.title}</p> : <p>loading</p>}</div>
      <div>
        {characters ? (
          characters.map((char, index) => <p key={index}>{char.name}</p>)
        ) : (
          <p>loading</p>
        )}
      </div>
      <div>
        {planets ? (
          planets.map((planet, index) => <p key={index}>{planet.name}</p>)
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
}
