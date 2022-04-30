import { useState } from "react";

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Table,
} from "react-bootstrap";
import { onChangeDefaultValue } from "../common/onChangeValue";

import { PageTemplate } from "../components/PageTemplate";
import { Customer } from "../interfaces/Customer";

import { getCostumerTicketByRut } from "../services/customer.service";

export const Check = () => {
  const [state, setState] = useState({
    tipoBusqueda: "",
    rut: "",
    id: "",
    message: "",
  });

  const [customer, setCustomer] = useState({
    id: "",
    rut: "",
    firstName: "",
    lastName: "",
    email: "",
    tickets: [],
  });

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setState((state) => ({ ...state, message: "" }));

    try {
      const customer = await getCostumerTicketByRut(state.rut);
      console.log(customer);
      setCustomer((state) => ({
        ...state,
        id: customer.id,
        firstName: customer.firstName,
        lastName: customer.lastName,
        email: customer.email,
        rut: customer.rut,
        tickets: customer.tickets,
      }));
    } catch (e: any) {
      console.log(e.response.data.message);
      setState((state) => ({ ...state, message: e.response.data.message }));
    }
  };

  return (
    <PageTemplate>
      <Container className="mt-3 text-">
        <Row className="justify-content-md-center">
          <Col>
            <h2>Chequeo de entradas</h2>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form onSubmit={handleSubmit}>
              <Form.Select
                className="mb-3"
                required={true}
                aria-label="Tipo de Búsqueda"
                onChange={(e) => {
                  onChangeDefaultValue(e, "tipoBusqueda", setState);
                }}
              >
                <option value="Rut">Rut</option>
                {/* <option value="ID">ID Entrada</option> */}
              </Form.Select>

              <Form.Group
                className="mb-3"
                onChange={(e) => {
                  onChangeDefaultValue(e, "rut", setState);
                }}
              >
                <Form.Control
                  required={true}
                  type="text"
                  placeholder={`Ingresar ${state.tipoBusqueda}`}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Buscar
              </Button>
            </Form>
          </Col>
        </Row>

        <Row className="mt-4">
          <Col>
            <h5>Informacion del cliente</h5>

            <Card className="w-100 mw-100 shadowCard">
              <Card.Body>
                {state.message ? (
                  <h6>{state.message}</h6>
                ) : (
                  <div>
                    <Table className="mb-4">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Rut</th>
                          <th>Nombre</th>
                          <th>Apellido</th>
                          <th>Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{customer.id}</td>
                          <td>{customer.rut}</td>
                          <td>{customer.firstName}</td>
                          <td>{customer.lastName}</td>
                          <td>{customer.email}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <h6>Entradas</h6>
                    <Table>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Metodo de pago</th>
                          <th>Cantidad</th>
                          <th>Sector</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customer.tickets.map((item: any) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.payMethod}</td>
                            <td>{item.quantity}</td>
                            <td>{item.sector}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
