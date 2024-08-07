import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFavorite } from "../redux/favoritesSlice";
import { Button, message } from "antd";

const MAX_FAVORITES = 10; // Maksimum favori sınırı

const FavoriteButton = ({ character }) => {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.favorites);

  const isFavorite = favoriteCharacters.some((fav) => fav.id === character.id);
  const canAddFavorite = favoriteCharacters.length < MAX_FAVORITES;

  const handleAddFavorite = () => {
    if (isFavorite) {
      // Eğer karakter  favorilerdeyse hiçbir şey yapma
      return;
    }

    if (canAddFavorite) {
      dispatch(addFavorite(character));
    } else {
      message.warning(
        "Favori karakter ekleme sayısını aştınız. Başka bir karakteri favorilerden çıkarmalısınız."
      );
    }
  };

  return (

    <Button type="primary"  
    onClick={handleAddFavorite} disabled={isFavorite}>
      {isFavorite ? "Favorilere Eklendi" : "Favorilere Ekle"}
    </Button>

    /*
    <Button
      type="primary"
      onClick={handleAddFavorite}
      disabled={isFavorite}
      style={{ backgroundColor: isFavorite ? '#52c41a' : '#52c41a', borderColor: isFavorite ? '#52c41a' : '#52c41a' }}
    >
      {isFavorite ? "Favorilere Eklendi" : "Favorilere Ekle"}
    </Button>
    */

    
  );
};

export default FavoriteButton;
