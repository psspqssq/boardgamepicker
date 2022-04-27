import "./App.css";
import background from "./images/bg.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import BoardGamesBanner from "Components/BoardGamesBanner";
// @ts-ignore
import { React, useEffect, useState } from "react";
import axios from "axios";
import { BsCircleFill, BsCircle } from "react-icons/bs";

var convert = require("xml-js");

const { rando, randoSequence } = require("@nastyox/rando.js");

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
  const [selectedGame, setSelectedGame] = useState({
    name: { _text: "" },
    image: { _text: "" },
  });

  // Modal Handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

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
    console.log(totalList);
    if (totalList.length > 0) {
      const randomIndex = rando(0, totalList.length - 1);
      const item = totalList[randomIndex];
      setSelectedGame(item);
      setShow(true);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        width: "100vw",
        height: "100vh",
        minHeight: "100%",
        boxSizing: "borderBox",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <div class="row justify-content-center">
        <Button style={{ maxWidth: "300px", height: "100px", marginTop: "100px" }} variant="outline-secondary" onClick={handleRandomizeClick}>
          Randomize!
        </Button>
      </div>
      <div className="boardGamesBannerContainer">
        <BoardGamesBanner games={pabloBoardGames}></BoardGamesBanner>
        <BoardGamesBanner games={feboBoardGames}></BoardGamesBanner>

        <ToggleButtonGroup
          type="checkbox"
          value={checked}
          onChange={handleChecked}
          style={{
            display: "flex",
            alignItems: "center",
            margin: "5px",
          }}
        >
          <ToggleButton id="tbg-btn-pablo" variant="outline-primary" value={"pablo"}>
            {checked.includes("pablo") ? <BsCircleFill style={{ verticalAlign: "middle" }} /> : <BsCircle style={{ verticalAlign: "middle" }} />} Pablo's Games
          </ToggleButton>
          <ToggleButton id="tbg-btn-febo" variant="outline-success" value={"febo"}>
            {checked.includes("febo") ? <BsCircleFill style={{ verticalAlign: "middle" }} /> : <BsCircle style={{ verticalAlign: "middle" }} />} Febo's Games
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
      {selectedGame !== undefined && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {selectedGame.name._text || ""} ({selectedGame.yearpublished._text || ""})
            </Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ textAlign: "center" }}>
            <Image src={selectedGame.image._text || ""} alt="selected board game" rounded={true} fluid={true} style={{ maxHeight: "50vh" }}></Image>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default App;
