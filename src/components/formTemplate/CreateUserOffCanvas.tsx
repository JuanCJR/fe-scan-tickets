import React, { useState } from "react";
import {
  Button,
  Offcanvas,
  Form,
  FloatingLabel,
  Modal,
  Spinner,
} from "react-bootstrap";
import { Alert } from "react-bootstrap";

import { onChangeDefaultValue } from "../../common/onChangeValue";
import { createUser } from "../../services/user.service";

export const CreateUserOffCanvas = (props: any) => {
  const { loadUsers } = props;
  const rolArray = [
    { name: "Administrador", value: "admin" },
    { name: "Vendedor", value: "seller" },
  ];

  const [showAlert, setShowAlert] = useState(false);

  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShowAlert(false);
    setValidated(false);
    setOnload(false);
    setSubmitBottonState(false);
    setShow(false);
    setUser((state) => ({ ...state, email: "", password: "", role: "" }));
  };
  const toggleShow = () => setShow((s) => !s);

  const [user, setUser] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [postState, setPostState] = useState({
    data: {},
    code: 0,
    message: "",
  });
  const [onLoad, setOnload] = useState(false);
  const [submitButtonState, setSubmitBottonState] = useState(false);

  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();
      setValidated(true);
      setOnload(true);
      setSubmitBottonState(true);

      //Crea Customer
      const newUser = await createUser(user);
      console.log(newUser);
      if (newUser.statusCode === 500) {
        setShowAlert(true);
        setOnload(false);
        setSubmitBottonState(false);
        setPostState((state) => ({
          ...state,
          data: {},
          message: newUser.message,
          code: newUser.statusCode,
        }));
      } else {
        setPostState((state) => ({
          ...state,
          data: newUser,
          code: 200,
        }));
        setOnload(false);
        handleClose();
        await loadUsers();
      }
    }
  };
  return (
    <React.Fragment>
      <Button className="mt-3 w-100" variant="primary" onClick={toggleShow}>
        Crear Usuario
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="start"
        scroll={true}
        backdrop={false}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            Creacion de Usuario
            <h6 className="mt-2">
              Ingresar los datos para completar el registro
            </h6>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <hr className="featurette-divider"></hr>
        <Offcanvas.Body>
          {showAlert ? (
            <Alert
              // className="text-primary"
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              <Alert.Heading>Error!</Alert.Heading>
              <p className="text-black">El email ingresado ya existe</p>
            </Alert>
          ) : (
            <></>
          )}
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            {/**Email del usuario */}
            <FloatingLabel
              label="Email"
              placeholder="Email"
              onChange={(e) => {
                onChangeDefaultValue(e, "email", setUser);
              }}
            >
              <Form.Control type="email" placeholder="email" required />
              <Form.Control.Feedback type="invalid">
                Ingrese el email del usuario
              </Form.Control.Feedback>
            </FloatingLabel>

            {/**Contraseña del usuario */}
            <FloatingLabel
              className="mt-3"
              label="Contraseña"
              placeholder="Contraseña"
              onChange={(e) => {
                onChangeDefaultValue(e, "password", setUser);
              }}
            >
              <Form.Control type="password" placeholder="Contraseña" required />
              <Form.Control.Feedback type="invalid">
                Ingrese la contraseña del usuario
              </Form.Control.Feedback>
            </FloatingLabel>

            {/**Rol del usuario */}
            <FloatingLabel
              label="Rol"
              className="mt-3"
              onChange={(e) => {
                onChangeDefaultValue(e, "role", setUser);
              }}
            >
              <Form.Control as="select" required={true}>
                <option value="">Seleccione el Rol del Usuario</option>
                {rolArray.map((item: any) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  );
                })}
              </Form.Control>
            </FloatingLabel>
            {onLoad ? (
              <Spinner animation="grow" variant="success" className="mt-3" />
            ) : (
              <Button
                className="mt-3"
                disabled={submitButtonState}
                type="submit"
              >
                Guardar
              </Button>
            )}
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </React.Fragment>
  );
};

const BtnSaveUser = (props: any) => {
  const { onLoad, submitButtonState, handleSubmit } = props;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <React.Fragment>
      <Button onClick={handleShow} className="w-100 mt-4">
        Guardar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h4>Confirmar creación de usuario</h4>
        </Modal.Header>
        <Modal.Body></Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            onClick={async () => {
              handleClose();
            }}
          >
            Cancelar
          </Button>
          {onLoad ? (
            <Spinner animation="grow" variant="success" className="mt-3" />
          ) : (
            <Button
              className="mt-3"
              disabled={submitButtonState}
              type="submit"
              onClick={async () => {
                await handleSubmit();
                handleClose();
              }}
            >
              Confirmar
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
};
