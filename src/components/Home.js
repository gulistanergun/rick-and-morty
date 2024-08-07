import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

const Home = () => {
  const [episodes, setEpisodes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const fetchEpisodes = async () => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/episode`
      );
      setEpisodes(response.data.results);
    } catch (error) {
      console.log("Error fetching episodes", error);
    }
  };

  const handleEpisodeClick = (episodeId) => {
    navigate(`/episode/${episodeId}/characters`);
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  const filteredEpisodes = episodes.filter(
    (episode) =>
      episode.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <Header setSearchTerm={setSearchTerm} />
      <div>
        <h2>Episodes</h2>
        <Table
          className="tablo-class"
          dataSource={filteredEpisodes}
          columns={[
            {
              title: "Episode",
              dataIndex: "id",
              key: "id",
            },
            {
              title: "Episode Name",
              dataIndex: "name",
              render: (text, record) => (
                <a onClick={() => handleEpisodeClick(record.id)}>{text}</a>
              ),
            },
            {
              title: " Episode Date",
              dataIndex: "air_date",
            },
          ]}
        />
      </div>
    </div>
  );
};

export default Home;
