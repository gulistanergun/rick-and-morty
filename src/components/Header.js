import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Header({ setSearchTerm }) {
  const favoriteCharacters = useSelector((state) => state.favorites);
  return (
    <div className="header">
      <Link className="link" to="/">Anasayfa</Link>
      <Link  className="link" to="/all-characters">Tüm Karakterleri Gör</Link>     
      <Link className="link" to="/favorite"> Favori Karakterler</Link>     
       <div className="favorites-count">
        {favoriteCharacters.length  } favori karakteriniz var
      </div>
      <input
        type="text"
        placeholder="Episode veya Character Arayın..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
    </div>
  );
}

export default Header;
