import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function Character() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [character, setCharacter] = useState(null);
  const [films, setFilms] = useState([]);
  const [planet, setPlanet] = useState([]);

  async function getCharacter() {
    const res = await fetch(`http://localhost:3001/api/characters/${id}`);
    const item = await res.json();
    setCharacter(item);
  }

  async function getCharacterPlanet() {
    const res = await fetch(`http://localhost:3001/api/planets/${id}`);
    const item = await res.json();
    setPlanet(item);
  }

  async function getCharacterFilms() {
    const res = await fetch(`http://localhost:3001/api/characters/${id}/films`);
    const item = await res.json();
    setFilms(item);
  }

  useEffect(() => {
    getCharacter();
    getCharacterPlanet();
    getCharacterFilms();
  }, []);

  return (
    <>
      <div>Character: {character ? character.name : <></>}</div>
      <div onClick={() => navigate(`/planets/${planet.id}`)}>Home Planet: {planet ? planet.name : <></>}</div>
      <div>
        <h3>Films</h3>
        {films ? (
          films.map((film, index) => (
            <p key={index} onClick={() => navigate(`/films/${film.id}`)}>
              {film.title}
            </p>
          ))
        ) : (
          <p>loading</p>
        )}
      </div>
    </>
  );
}
