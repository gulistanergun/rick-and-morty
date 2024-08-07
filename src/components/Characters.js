import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, Card, Button } from "antd";
import axios from "axios";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "./CharacterCard";

export default function Characters() {
  const { episodeId } = useParams();
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.favorites);
  const navigate = useNavigate();

  const handleDetailsClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/episode/${episodeId}`
        );
        const characterUrls = response.data.characters;
        const characterPromises = characterUrls.map((url) => axios.get(url));
        const characterResponses = await Promise.all(characterPromises); 
        const charactersData = (characterResponses.map((res) => res.data));
        localStorage.setItem(`characters_${episodeId}`, JSON.stringify(charactersData));
        setCharacters(charactersData);
      } catch (error) {
        console.log("Error fetching characters", error);
      }
    };

    const getCharactersFromLocalStorage = () => {
      const savedCharacters = localStorage.getItem(`characters_${episodeId}`);
      if (savedCharacters) {
        setCharacters(JSON.parse(savedCharacters));
      } else {
        fetchCharacters();
      }
    };

    getCharactersFromLocalStorage();
  }, [episodeId]);

  const filteredCharacters = characters.filter(
    (character) =>
      character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      character.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />
      <div className="characters-container">
        <h2>Characters</h2>
        <input
          type="text"
          placeholder="Karakter arayın..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <List
          grid={{ gutter: 24, column: 6 }}
          dataSource={filteredCharacters}
          renderItem={(item) => (
            <List.Item>
              <CharacterCard
                character={item}
                isFavorite={false}
                onDetailsClick={handleDetailsClick}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}
