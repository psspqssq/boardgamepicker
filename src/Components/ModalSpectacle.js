import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";

const ModalSpectacle = (props) => {
  // Modal Handling
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (props.selectedGame.name._text !== "") {
      setShow(true);
    }
  }, [props.selectedGame]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {props.selectedGame.name._text} ({props.selectedGame.yearpublished._text})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ textAlign: "center" }}>
        <Image src={props.selectedGame.image._text} alt="selected board game" rounded={true} fluid={true} style={{ maxHeight: "50vh" }}></Image>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalSpectacle;
