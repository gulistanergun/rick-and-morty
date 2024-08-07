import React, { useState, useEffect } from "react";
import axios from "axios";
import { List, Pagination, Select, } from "antd";
import Header from "./Header";
import { useDispatch, useSelector } from "react-redux";
import CharacterCard from "./CharacterCard";
import { useNavigate } from "react-router-dom";

const {Option} = Select;

const TumCharacters = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(12);
  const dispatch = useDispatch();
  const favoriteCharacters = useSelector((state) => state.favorites);
  const navigate = useNavigate();
  const [statusFilter , setStatusFilter] =useState("");
  const [statusCount, setStatusCount] = useState(0);


  const fetchTumCharacters = async () => {
    try {
      let allCharacterUrls = [];
      let nextUrl = "https://rickandmortyapi.com/api/episode";
      while (nextUrl) {
        const response = await axios.get(nextUrl);
        const episodes = response.data.results;
        allCharacterUrls = allCharacterUrls.concat(
          ...episodes.map((episode) => episode.characters)
        );
        nextUrl = response.data.info.next;
      }

      const uniqueCharacterUrls = [...new Set(allCharacterUrls)];
      const characterPromises = uniqueCharacterUrls.map((url) =>
        axios.get(url)
      );
      const characterResponses = await Promise.all(characterPromises);
      const charactersData = characterResponses.map((res) => res.data);
      localStorage.setItem("allCharacters", JSON.stringify(charactersData));
      setCharacters(charactersData);
    } catch (error) {
      console.log("Error fetching characters", error);
    }
  };

  useEffect(() => {
    const savedCharacters = localStorage.getItem("allCharacters");
    if (savedCharacters) {
      setCharacters(JSON.parse(savedCharacters));
    } else {
      fetchTumCharacters();
    }
  }, []);

  const isNumber = (value) =>
    !isNaN(value) && Number.isFinite(parseFloat(value));

  const filteredCharacters = characters.filter((character) => {
    const idMatch =
      isNumber(searchTerm) && character.id.toString() === searchTerm;
    const nameMatch =
      !isNumber(searchTerm) &&
      character.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statusMatch =
      statusFilter === "" || character.status.toLowerCase() === statusFilter.toLowerCase(); // özelliğe göre fitreleme
    return (idMatch || nameMatch) && statusMatch;
  });

  //karakter durum count
  useEffect(() => {
    const count = characters.filter((character) => 
      statusFilter === "" || character.status.toLowerCase() === statusFilter.toLowerCase()
    ).length;
    setStatusCount(count);
  }, [statusFilter, characters]);



  const paginatedCharacters = filteredCharacters.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDetailsClick = (characterId) => {
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="characters-container">
      <Header setSearchTerm={setSearchTerm} />
      <h2>All Characters</h2>
      
      
      <Select
       placeholder = "Status Seçin"
       onChange={(value) => setStatusFilter(value)}
       style={{width: 200,marginBottom: 16}}
       >
        <Option value="">Tüm Statuslar</Option>
        <Option value="alive">Alive</Option>
        <Option value="dead">Dead</Option>
        <Option value="unknown">Unknown</Option>      

       </Select>

       <div>
        {statusFilter && (
          <p>
            {statusFilter.charAt(0).toUpperCase() + statusFilter.slice(1)} - {statusCount} characters found
          </p>
        )}
      </div>

      <List
        grid={{ gutter: 24, column: 6 }}
        dataSource={paginatedCharacters}
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
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={filteredCharacters.length}
        onChange={onPageChange}
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default TumCharacters;
