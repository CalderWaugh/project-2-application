import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CharacterList.css";

export default function CharacterList() {
  const [characters, setCharacters] = useState([]);
  let navigate = useNavigate();

  async function getCharacters() {
    const res = await fetch("http://localhost:3001/api/characters");
    const item = await res.json();
    setCharacters(item);
  }

  useEffect(() => {
    getCharacters();
  }, []);

  const handleCharacterClick = (characterID) => {
    return navigate(`/characters/${characterID}`);
  };

  return (
    <div className={"CharacterList container"}>
      {characters.map((char, index) => (
        <div
          key={index}
          onClick={() => handleCharacterClick(char.id)}
          className={"CharacterList character-box"}
        >
          <p>{char.name}</p>
        </div>
      ))}
    </div>
  );
}
