import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Table} from "antd";
import axios from "axios";
import Header from "./Header";
import './CharacterDetail.css';

const CharacterDetail = () => {
  const { characterId } = useParams();
  const navigate = useNavigate(); 
  const [character, setCharacter] = useState(null);
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    const fetchCharacterAndEpisodes = async () => {
      try {
        const characterResponse = await axios.get(
          `https://rickandmortyapi.com/api/character/${characterId}`
        );
        setCharacter(characterResponse.data);

        const episodeUrls = characterResponse.data.episode;
        const episodePromises = episodeUrls.map((url) => axios.get(url));
        const episodeResponses = await Promise.all(episodePromises);
        setEpisodes(episodeResponses.map((res) => res.data));
      } catch (error) {
        console.log("Error fetching character or episodes", error);
      }
    };

   

    fetchCharacterAndEpisodes();
  }, [characterId]);

  if (!character) {
    return <div>Yükleniyor...</div>;
  }

  const columns = [
    {
      title: "Episode ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Episode Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a onClick={() => navigate(`/episode/${record.id}/characters`)}>
          {text}
        </a> 
      ),
    },
    {
      title: "Air Date",
      dataIndex: "air_date",
      key: "air_date",
    },
  ];

  return (
    <div>
      <Header />
      <div  className="detay-container">
      <h2>{character.name}</h2>
      <div>
      <img
        src={character.image}
        alt={character.name}
        style={{ width: "200px" }}
      />
      </div>
      
      <div>
      <p>Status: {character.status}</p>
      <p>Species: {character.species}</p>
      <p>Gender: {character.gender}</p>
      <p>Origin: {character.origin.name}</p>
      <p>Location: {character.location.name}</p>
      </div>
      

      <h3>Yer Aldığı Bölümler</h3>
      <Table className="detail-table" dataSource={episodes} columns={columns} rowKey="id" />
      </div>
    </div>
  );
};

export default CharacterDetail;
