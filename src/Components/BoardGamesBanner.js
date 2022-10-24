import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const BoardGamesBanner = (props) => {
  return (
    <CardGroup style={{ display: "flex", flexWrap: "nowrap", overflowX: "hidden" }}>
      {props.games.map((item) => (
        <Card style={{ width: "20rem", flex: "0 0 auto" }} key={item.name._text} className="movingCards">
          <Card.Img variant="top" src={item.image._text} />
          <Card.Body>
            <Card.Title>
              {item.name._text} ({item.yearpublished._text})
            </Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};

export default BoardGamesBanner;
