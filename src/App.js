import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Modal from "react-bootstrap/Modal";
import BoardGamesBanner from "Components/BoardGamesBanner";
// @ts-ignore
import { React, useEffect, useState } from "react";
import axios from "axios";

var convert = require("xml-js");

const api = "https://boardgamegeek.com/xmlapi2/collection?username=";

// Internet cheats
const memo = (callback) => {
  const cache = new Map();
  return (...args) => {
    const selector = JSON.stringify(args);
    if (cache.has(selector)) return cache.get(selector);
    const value = callback(...args);
    cache.set(selector, value);
    return value;
  };
};

// Internet cheats
const memoizedAxiosGet = memo(axios.get);

function App() {
  const [checked, setChecked] = useState([]);
  const [pabloBoardGames, setPabloBoardGames] = useState([]);
  const [feboBoardGames, setFeboBoardGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");

  useEffect(() => {
    if (checked.includes("pablo")) {
      memoizedAxiosGet(api + "psspqssq").then((res) => {
        const jsonData = convert.xml2js(res.data, { compact: true });
        setPabloBoardGames(jsonData.items.item);
      });
    } else {
      setPabloBoardGames([]);
    }
    if (checked.includes("febo")) {
      memoizedAxiosGet(api + "febo_apolo").then((res) => {
        const jsonData = convert.xml2js(res.data, { compact: true });
        setFeboBoardGames(jsonData.items.item);
      });
    } else {
      setFeboBoardGames([]);
    }
  }, [checked]);

  const handleChecked = (value) => {
    setChecked(value);
  };

  const handleRandomizeClick = (value) => {
    const totalList = [...pabloBoardGames, ...feboBoardGames];
    const randomIndex = Math.floor(Math.random() * totalList.length);
    const item = totalList[randomIndex];
    setSelectedGame(item);
  };

  return (
    <>
      <ToggleButtonGroup
        type="checkbox"
        value={checked}
        onChange={handleChecked}
      >
        <ToggleButton id="tbg-btn-pablo" value={"pablo"}>
          Pablo
        </ToggleButton>
        <ToggleButton id="tbg-btn-febo" value={"febo"}>
          Febo
        </ToggleButton>
      </ToggleButtonGroup>
      <Button onClick={handleRandomizeClick}>Randomize!</Button>
      <BoardGamesBanner games={pabloBoardGames}></BoardGamesBanner>
      <BoardGamesBanner games={feboBoardGames}></BoardGamesBanner>
      {selectedGame != "" && (
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>{selectedGame.name._text}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <img src={selectedGame.image._text}></img>
          </Modal.Body>
        </Modal.Dialog>
      )}
    </>
  );
}

export default App;
