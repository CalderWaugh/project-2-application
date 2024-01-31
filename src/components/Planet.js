import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Planet() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [planet, setPlanet] = useState(null);
  const [characters, setCharacters] = useState([]);
  const [films, setFilms] = useState([]);

  async function getPlanetDetails() {
    const planetRes = await fetch(`http://localhost:3001/api/planets/${id}`);
    const planetData = await planetRes.json();
    setPlanet(planetData);
  }

  async function getPlanetCharacters() {
    const res = await fetch(
      `http://localhost:3001/api/planets/${id}/characters`
    );
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
      <div>Planet: {planet ? planet.name : <></>}</div>
      <div>
        <h3>Characters</h3>
        {characters ? (
          characters.map((character, index) => (
            <p
              key={index}
              onClick={() => navigate(`/characters/${character.id}`)}
            >
              {character.name}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        <h3>Films</h3>
        {films ? (
          films.map((film, index) => (
            <p key={index} onClick={() => navigate(`/films/${film.id}`)}>
              {film.title}{" "}
            </p>
          ))
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
