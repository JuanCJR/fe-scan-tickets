import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

//Componente de alerta para creacion de reservas
export const LoginAlert = (props: any) => {
  const { loginStatus } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onLoad() {
      loginStatus === 0 ? setShow(false) : setShow(true);
    }
    onLoad();
  }, [setShow, loginStatus]);

  if (show) {
    if (loginStatus === 401) {
      return (
        <Alert variant="danger" onClose={() => setShow(false)}>
          <Alert.Heading>Credenciales Incorrectas</Alert.Heading>
          <p className="text-black">
            Las credenciales ingresadas no son correctas
          </p>
        </Alert>
      );
    } else {
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Error interno del servidor</Alert.Heading>
      </Alert>;
    }
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
