import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  FloatingLabel,
  Button,
  Modal,
  Spinner,
} from "react-bootstrap";
//Components
import { PageTemplate } from "../components/PageTemplate";
import { GenTicketAlert } from "../components/alert/CustomAlert";

//Funtions
import { onChangeDefaultValue } from "../common/onChangeValue";
import { createCostumer } from "../services/customer.service";
import { createTicket } from "../services/tickets.service";

export const Venta = () => {
  const sectorArray = [
    { name: "Platea", price: 45000 },
    { name: "Palco", price: 95000 },
    { name: "VIP", price: 140000 },
  ];

  const cantidadArray = [1, 2, 3, 4, 5];
  const metodoPagoArray = ["Transferencia", "Debito", "Credito", "Efectivo"];

  const [validated, setValidated] = useState(false);

  const [ticket, changeTicketState] = useState({
    state: "not marked",
    payMethod: "",
    sector: "",
    date: new Date("2022-03-12 19:00:00"),
    purchaseDate: new Date(),
    price: 0,
    quantity: 0,
    userId: 0,
    customerId: 0,
  });

  const [customer, changeCustomerState] = useState({
    email: "",
    firstName: "",
    lastName: "",
    rut: "",
    phone: "",
    birthday: new Date(),
    exist: false,
  });

  const [postState, setPostState] = useState({
    data: {},
    code: 0,
    message: "",
  });

  const [onLoad, setOnload] = useState(false);

  const [submitButtonState, setSubmitBottonState] = useState(false);

  const scrollTop = () => {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  };

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
      const newCustomer = await createCostumer(customer);
      if (newCustomer.statusCode === 500) {
        setOnload(false);
        setSubmitBottonState(false);
        setPostState((state) => ({
          ...state,
          data: {},
          message: newCustomer.message,
          code: newCustomer.statusCode,
        }));

        scrollTop();
      } else {
        const price: number = sectorArray.filter(
          (item) => item.name === ticket.sector
        )[0].price;

        const ticketPayload = {
          ...ticket,
          customerId: newCustomer.id,
          purchaseDate: new Date(),
          price: price,
        };

        //Crea Ticket Detail
        const newTicket = await createTicket(ticketPayload);
        console.log(ticketPayload);
        setPostState((state) => ({
          ...state,
          data: newTicket,
          code: 200,
        }));
        setOnload(false);
        scrollTop();
      }
    }
  };

  return (
    <PageTemplate>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <GenTicketAlert postState={postState} />
              </Card.Header>
              <Card.Body>
                {/** Nombre Cliente Rut Correo Sector(General,palco,vip) Cantidad
                Forma de pago */}
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                  <h4>Nueva Venta</h4>
                  <p>Ingrese los siguientes datos para completar la venta</p>

                  {/**Rut del cliente */}
                  <FloatingLabel
                    label="Rut"
                    placeholder="Rut"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "rut", changeCustomerState)
                    }
                  >
                    <Form.Control type="text" placeholder="Rut" required />
                    <Form.Control.Feedback type="invalid">
                      Ingrese el Rut del cliente
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/**Nombre del cliente */}
                  <FloatingLabel
                    className="mt-3"
                    label="Nombre Cliente"
                    //placeholder="Nombre Cliente"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "firstName", changeCustomerState)
                    }
                  >
                    <Form.Control
                      type="text"
                      placeholder="Nombre Cliente"
                      required
                    />

                    <Form.Control.Feedback type="invalid">
                      Ingrese el nombre del cliente
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/**Apellido del cliente */}
                  <FloatingLabel
                    onChange={(e) =>
                      onChangeDefaultValue(e, "lastName", changeCustomerState)
                    }
                    label="Apellido Cliente"
                    className="mt-3"
                    placeholder="Apellido Cliente"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Apellido Cliente"
                      required
                    />
                    <Form.Control.Feedback type="invalid">
                      Ingrese el apellido del cliente
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  <FloatingLabel
                    label="Fecha de Nacimiento"
                    className="mt-3"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "birthday", changeCustomerState)
                    }
                  >
                    <Form.Control type="date" required />
                    <Form.Control.Feedback type="invalid">
                      Seleccione una fecha
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/**Telefono del cliente */}
                  <FloatingLabel
                    label="Telefono"
                    className="mt-3"
                    placeholder="Telefono"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "phone", changeCustomerState)
                    }
                  >
                    <Form.Control type="text" placeholder="Telefono" required />
                    <Form.Control.Feedback type="invalid">
                      Ingrese el Telefono del cliente
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/**Correo del cliente */}
                  <FloatingLabel
                    label="Correo"
                    className="mt-3"
                    placeholder="Correo"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "email", changeCustomerState)
                    }
                  >
                    <Form.Control type="email" placeholder="Correo" required />
                    <Form.Control.Feedback type="invalid">
                      Ingrese el correo del cliente
                    </Form.Control.Feedback>
                  </FloatingLabel>

                  {/**Sector de la entrada */}
                  <FloatingLabel
                    label="Sector"
                    className="mt-3"
                    onChange={(e) => {
                      onChangeDefaultValue(e, "sector", changeTicketState);
                    }}
                  >
                    <Form.Control as="select" required={true}>
                      <option value="">
                        Seleccione el Sector de la Entrada
                      </option>
                      {sectorArray.map((item) => {
                        return (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </FloatingLabel>

                  {/**Cantidad de entradas */}
                  <FloatingLabel
                    label="Cantidad"
                    className="mt-3"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "quantity", changeTicketState)
                    }
                  >
                    <Form.Control as="select" required={true}>
                      <option value="">
                        Seleccione la cantidad de Entradas
                      </option>
                      {cantidadArray.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </FloatingLabel>

                  {/**Metodo de pago */}
                  <FloatingLabel
                    label="Metodo de Pago"
                    className="mt-3"
                    onChange={(e) =>
                      onChangeDefaultValue(e, "payMethod", changeTicketState)
                    }
                  >
                    <Form.Control as="select" required={true}>
                      <option value="">Seleccione el metodo de pago</option>
                      {metodoPagoArray.map((item) => {
                        return (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        );
                      })}
                    </Form.Control>
                  </FloatingLabel>

                  {ticket.payMethod === "Transferencia" ? (
                    <React.Fragment>
                      <Card className="mt-3">
                        <Card.Header>Datos de Transferencia</Card.Header>
                        <Card.Body style={{ textAlign: "left" }}>
                          <p>Banco de Chile</p>
                          <p>Cuenta Corriente: 1642464502</p>
                          <p>RUT: 25459552-7</p>
                          <p>Marlin Abreu abreumarlin@gmail.com</p>
                        </Card.Body>
                      </Card>
                    </React.Fragment>
                  ) : (
                    <React.Fragment></React.Fragment>
                  )}

                  {onLoad ? (
                    <Spinner
                      animation="grow"
                      variant="success"
                      className="mt-3"
                    />
                  ) : (
                    <Button
                      className="mt-3"
                      disabled={submitButtonState}
                      type="submit"
                    >
                      Realizar Venta
                    </Button>
                  )}

                  {/* <VentaModal
                    handleSubmit={handleSubmit}
                    ticket={ticket}
                    customer={customer}
                    sectorArray={sectorArray}
                  /> */}
                </Form>
              </Card.Body>
              <Card.Footer></Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};

const VentaModal = (props: any) => {
  const { handleSubmit, customer, ticket, sectorArray } = props;
  const [show, setShow] = useState(false);

  const price: number = ticket.sector
    ? sectorArray.filter((item: any) => item.name === ticket.sector)[0].price
    : 0;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" className="mt-3" onClick={handleShow}>
        Realizar Venta
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Resumen de Venta</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h3>Cliente</h3>
          <ul>
            <li>
              {customer.firstName} {customer.lastName}
            </li>
            <li>{customer.rut}</li>
            <li>{customer.email}</li>
            <li>{customer.phone}</li>
          </ul>

          <h3>Tickets</h3>
          <ul>
            <li>Sector: {ticket.sector}</li>
            <li>Cantidad: {ticket.quantity}</li>
            <li>Valor Unitario: {ticket.quantity}</li>
            <li>Total: {ticket.quantity * price}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await handleSubmit();
              handleClose();
            }}
          >
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
