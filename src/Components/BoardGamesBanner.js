import React from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";

const BoardGamesBanner = (props) => {
  return (
    <CardGroup>
      {props.games.map((item) => (
        <Card style={{ width: "5rem" }}>
          <Card.Img variant="top" src={item.image._text} />
          <Card.Body>
            <Card.Title>{item.name._text}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </CardGroup>
  );
};

export default BoardGamesBanner;
