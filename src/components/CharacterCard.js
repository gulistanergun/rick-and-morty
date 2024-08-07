import React from "react";
import { Card, Button } from "antd";
import FavoriteButton from "./FavoriteButton";
import RemoveButton from "./RemoveButton";
import './CharacterCard.css';

const CharacterCard = ({ character, isFavorite, onDetailsClick }) => (
 
     <Card      
    title={
      <div className="character-card-title">
        <div className="character-name">{character.name}</div>
        <div className="character-id">ID: {character.id}</div>
      </div>
    }  
    className="character-card"
  >
    <div className="character-card-contect">
    <img src={character.image} alt={character.name} style={{ width: "100%" }} />
    <p>Status : {character.status}</p>
    <p>Species: {character.species}</p>
    <div className="character-card-content"> 
    <div className="character-card-buttons">
        {isFavorite ? (
      <RemoveButton character={character} />
    ) : (
      <FavoriteButton character={character} />
    )}</div>
    <div className="character-card-buttons">
        {onDetailsClick && (
      <Button type="primary" /*style={{ backgroundColor: '#52c41a', Color: '#fff' }} */
      onClick={() => onDetailsClick(character.id)}>
        Detayları Gör
      </Button>
    )}
    </div>
    </div>        
    </div>
  </Card>
);

export default CharacterCard;
