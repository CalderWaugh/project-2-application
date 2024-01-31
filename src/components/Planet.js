import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Planet() {
  let { id } = useParams();

  const [planet, setPlanet] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);

  async function getPlanetDetails() {
    const planetRes = await fetch(`http://localhost:3001/api/planets/${id}`);
    const planetData = await planetRes.json();
    setPlanet(planetData);
  }

  async function getPlanetCharacters() {
    const res = await fetch(`http://localhost:3001/api/planets/${id}/characters`);
    const item = await res.json();
    setCharacters(item);
  }

  async function getPlanetFilms() {
    const res = await fetch(`http://localhost:3001/api/planets/${id}/films`);
    const item = await res.json();
    setFilms(item);
  }

  useEffect(() => {
    getPlanetDetails();
    getPlanetCharacters();
    getPlanetFilms();
  }, []);

  return (
    <>
      <div>{planet ? <p>{planet.name}</p> : <p>loading</p>}</div>
      <div>
        {characters ? (
          characters.map((character, index) => <p key={index}>{character.name}</p>)
        ) : (
          <p>loading</p>
        )}
      </div>
      <div>
        {films ? (
        films.map((film, index) => <p key={index}>{film.title} </p>)
  ) : (
    <p>loading</p>
  )}
  </div>
  </>
  );
}
      