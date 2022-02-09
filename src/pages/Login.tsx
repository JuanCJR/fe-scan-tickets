import {
  Container,
  Card,
  Row,
  Col,
  FloatingLabel,
  Form,
  Button,
} from "react-bootstrap";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ms from "ms";

import { PageTemplate } from "../components/PageTemplate";
import { LoginAlert } from "../components/alert/LoginAlert";
import { onChangeDefaultValue } from "../common/onChangeValue";
import { doLogin } from "../services/auth.service";
import { RoleContext } from "../common/roleContext";
export const Login = (props: any) => {
  const [validated, setValidated] = useState(false);
  const [state, changeState] = useState({
    email: "",
    password: "",
  });
  const [loginStatus, setLoginStatus] = useState(0);
  let navigate = useNavigate();
  const { role, setRole } = useContext(RoleContext);

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("token");
      if (token) {
        navigate("/");
      }
    }
    loadData();
  }, [navigate]);

  //Handler para submit
  const handleSubmit = async (event: any) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    } else {
      event.preventDefault();

      const userPayload = {
        email: state.email.toLowerCase(),
        password: state.password,
      };

      const user = await doLogin(userPayload);

      if (user.status !== 201) {
        setLoginStatus(user.status);
        alert("Credenciales Incorrectas");
      } else {
        setLoginStatus(user.status);
        sessionStorage.setItem("access_token", user.data.access_token);
        sessionStorage.setItem("sub", user.data.user.id);
        sessionStorage.setItem("expiresIn", ms(user.data.expiresIn));
        setRole(user.data.role);

        navigate("/");
      }
    }
  };

  return (
    <PageTemplate>
      <Container>
        <Row className="justify-content-md-center">
          <Col md="auto">
            <Card className="w-100 mw-100 mt-5 shadowCard">
              <Card.Header></Card.Header>

              <Card.Body>
                <Form
                  noValidate
                  validated={validated}
                  onSubmit={async (e) => {
                    handleSubmit(e);
                  }}
                >
                  <h4>Menu de Ventas</h4>
                  <h6>Inicio de sesion</h6>
                  <FloatingLabel
                    label="Email"
                    className="mt-3"
                    onChange={(e) => {
                      onChangeDefaultValue(e, "email", changeState);
                    }}
                  >
                    <Form.Control type="text" placeholder="email" required />
                    <Form.Control.Feedback type="invalid">
                      Ingresar Email
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <FloatingLabel
                    label="Contraseña"
                    className="mt-3"
                    onChange={(e) => {
                      onChangeDefaultValue(e, "password", changeState);
                    }}
                  >
                    <Form.Control
                      type="password"
                      placeholder="Contraseña"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingresar contraseña
                    </Form.Control.Feedback>
                  </FloatingLabel>
                  <Button type="submit" className="mt-3 w-100">
                    Ingresar
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* <hr className="featurette-divider"></hr> */}
      </Container>
    </PageTemplate>
  );
};
