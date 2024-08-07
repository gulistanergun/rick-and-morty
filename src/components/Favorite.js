import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { List } from "antd";
import Header from "./Header";
import CharacterCard from "./CharacterCard";
import { useNavigate } from "react-router-dom";

const Favorite = () => {
  const favoriteCharacters = useSelector((state) => state.favorites);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleDetailsClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div>
      <Header
        setSearchTerm={setSearchTerm}
        favoriteCount={favoriteCharacters.length}
      />
      <div className="favorites-container">
        <h2>Favorites</h2>
        <List
          grid={{ gutter: 24, column: 6 }}
          dataSource={favoriteCharacters}
          renderItem={(item) => (
            <List.Item>
              <CharacterCard
                character={item}
                isFavorite={true}
                onDetailsClick={handleDetailsClick}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
};

export default Favorite;
