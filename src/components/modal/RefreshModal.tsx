import { FloatingLabel, Button, Modal, Spinner } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import ms from "ms";

import { useNavigate } from "react-router-dom";
import { refreshToken } from "../../services/auth.service";

export const RefreshModal = (props: any) => {
  const { sessionExpired,setSessionExpired } = props;
  const token = sessionStorage.getItem("access_token");
  const expiresIn = sessionStorage.getItem("expiresIn");

  const [show, setShow] = useState(false);
  let timer: any;
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    clearTimeout(timer);
  };
  let navigate = useNavigate();

  const handleRefresh = async () => {
    const user = await refreshToken();
  
    sessionStorage.setItem("access_token", user.data.access_token);
    sessionStorage.setItem("sub", user.data.user.id);
    sessionStorage.setItem("expiresIn", ms(user.data.expiresIn));
    setSessionExpired();
    handleClose();
  };

  return (
    <>
      {token ? (
        <Modal show={sessionExpired ? true : false}>
          <Modal.Header>
            <Modal.Title>Reconexión</Modal.Title>
          </Modal.Header>
          <Modal.Body>Desea reconectar la sesión?</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                sessionStorage.clear();
                clearTimeout(timer);
                handleClose();
                navigate("/login");
              }}
            >
              Salir
            </Button>
            <Button
              variant="primary"
              onClick={async () => {
                handleRefresh();
                handleClose();
              }}
            >
              Reconectar
            </Button>
          </Modal.Footer>
        </Modal>
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </>
  );
};
