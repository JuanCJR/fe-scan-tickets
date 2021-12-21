import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Alert } from "react-bootstrap";

//Componente de alerta para creacion de reservas
export const OptionsResponseAlert = (props) => {
  const { code, message, alertType } = props;
  const [show, setShow] = useState(false);
  let history = useHistory();

  useEffect(() => {
    function onLoad() {
      code === 0 ? setShow(false) : setShow(true);
    }
    onLoad();
  }, [setShow, code]);

  if (show && alertType !== "select") {
    if (code === 200) {
      if (alertType === "update" || alertType==="create" || alertType==="delete") {
        return (
          <Alert   variant="primary" onClose={() => setShow(false)} dismissible>
            <Alert.Heading>Ejecución exitosa!</Alert.Heading>
            <p className="text-black">{message}</p>
          </Alert>
        );
      } 
    } else {
      return (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          <Alert.Heading>
            Error! No se ha ejecutado la accion correctamente.
          </Alert.Heading>
          <p className="text-black">{message}</p>
        </Alert>
      );
    }
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
