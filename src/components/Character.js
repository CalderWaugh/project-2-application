import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Character.css";

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
    <div className={"Character container"}>
      <div className={"Character general-info-container"}>
        <h3>General Info</h3>
        <div className={"Character general-info-content-container"}>
          <div className={"Character general-info-item"}>
            <p>Character: {character ? character.name : <></>}</p>
          </div>
          <div
            onClick={() => navigate(`/planets/${planet.id}`)}
            className={"Character general-info-item"}
          >
            <p>Home Planet: {planet ? planet.name : <></>}</p>
          </div>
        </div>
      </div>
      <div className={"Character films-container"}>
        <h3>Films</h3>
        <div className={"Character film-list"}>
          {films ? (
            films.map((film, index) => (
              <div
                key={index}
                onClick={() => navigate(`/films/${film.id}`)}
                className={"Character film-name-container"}
              >
                <p>{film.title}</p>
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
