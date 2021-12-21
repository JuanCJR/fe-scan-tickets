import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Card } from "react-bootstrap";

//Componente de alerta para creacion de reservas
export const GenTicketAlert = (props) => {
  const { code, data, message } = props.postState;
  const [show, setShow] = useState(false);
  //console.log(props.postState)
  let navigate = useNavigate();

  useEffect(() => {
    function onLoad() {
      code === 0 ? setShow(false) : setShow(true);
    }
    onLoad();
  }, [setShow, code]);

  if (show) {
    if (code === 200) {
      return (
        <Alert
          // className="text-primary"
          variant="success"
          onClose={() => navigate(`/checkout/${data.id}`)}
          dismissible
        >
          <Alert.Heading>Completado!</Alert.Heading>
          <p className="text-black">Ticket {data.id} generado con exito</p>
        </Alert>
      );
    } else {
      return (
        <Alert
          //className="text-primary"
          variant="danger"
          onClose={() => setShow(false)}
          dismissible
        >
          <Alert.Heading>
            Error! el ticket no fue generado con exito.
          </Alert.Heading>
          <p className="text-black">{message}</p>
        </Alert>
      );
    }
  } else {
    return <React.Fragment></React.Fragment>;
  }
};
