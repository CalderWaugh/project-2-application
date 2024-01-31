import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";

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
    <>
      {characters.map((char, index) => (
        <div key={index} onClick={() => handleCharacterClick(char.id)}>
          {char.name}
        </div>
      ))}
    </>
  );
}
