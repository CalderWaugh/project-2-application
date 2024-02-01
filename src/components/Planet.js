import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Planet.css";

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
    <div className={"Planet container"}>
      <div className={"Planet planet-name-container"}>
        <p>Planet: {planet ? planet.name : <></>}</p>
      </div>
      <div>
        <h3>Characters</h3>
        <div className={"Planet character-list"}>
          {characters ? (
            characters.map((char, index) => (
              <div
                key={index}
                onClick={() => navigate(`/characters/${char.id}`)}
                className={"Planet character-name-container"}
              >
                <p>{char.name}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className={"Planet film-section"}>
        <h3>Films</h3>
        <div className={"Planet film-list"}>
          {films ? (
            films.map((film, index) => (
              <div
                key={index}
                onClick={() => navigate(`/films/${film.id}`)}
                className={"Planet film-name-container"}
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
