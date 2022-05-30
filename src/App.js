import "./App.css";
import background from "./images/bg.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import UserBoardGames from "Components/UserBoardGames";
// @ts-ignore
import { React, useEffect, useState } from "react";
import { BsCircleFill, BsCircle } from "react-icons/bs";
import ModalSpectacle from "Components/ModalSpectacle";

const { rando, randoSequence } = require("@nastyox/rando.js");

function App() {
  const [checked, setChecked] = useState([]);
  const [selectedGame, setSelectedGame] = useState({
    name: { _text: "" },
    image: { _text: "" },
    yearpublished: { _text: "" },
  });
  const handleChecked = (value) => {
    setChecked(value);
  };
  const handleRandomizeClick = (value) => {
    const totalGamesList = [];
    if (totalGamesList.length > 0) {
      const randomIndex = rando(0, totalGamesList.length - 1);
      const item = totalGamesList[randomIndex];
      setSelectedGame(item);
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
        {checked.includes("pablo") && <UserBoardGames username="psspqssq"></UserBoardGames>}
        {checked.includes("febo") && <UserBoardGames username="Febo_Apolo"></UserBoardGames>}

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
      <ModalSpectacle selectedGame={selectedGame}></ModalSpectacle>)
    </div>
  );
}

export default App;
