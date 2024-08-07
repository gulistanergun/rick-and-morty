import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFavorite } from "../redux/favoritesSlice";
import { Button, Modal } from "antd";

const RemoveButton = ({ character }) => {
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.favorites);

  const isFavorite = favoriteCharacters.some((fav) => fav.id === character.id);

  const handleRemove = () => {
    if (isFavorite) {
      // Kullanıcıya onay modal'ını göster
      Modal.confirm({
        title: "Favorilerden Kaldır",
        content: `“${character.name}” isimli karakteri favorilerden kaldırmak istediğinize emin misiniz?`,
        okText: "Evet",
        cancelText: "Hayır",
        onOk: () => {
          // "Evet" seçeneği seçildiğinde favorilerden kaldır
          dispatch(removeFavorite(character.id));
        },
        onCancel: () => {
          // "Hayır" seçeneği seçildiğinde hiçbir işlem yapılmaz
          console.log("Kaldırma işlemi iptal edildi.");
        },
      });
    }
  };

  return (
    <div className="">
       <Button type ="primary" danger onClick={handleRemove} disabled={!isFavorite}>
      Favorilerden Kaldır
    </Button>
    </div>
   
  );
};

export default RemoveButton;
