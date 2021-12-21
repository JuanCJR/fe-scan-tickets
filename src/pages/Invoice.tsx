import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row } from "react-bootstrap";

import { PageTemplate } from "../components/PageTemplate";
import { getTicket } from "../services/tickets.service";
export const Invoice = () => {
  const { id } = useParams();
  const [state, setState] = useState({
    ticket: {
      customer: {
        id: 0,
        firstName: "",
        lastName: "",
        email: "",
        rut: "",
      },
      date: "",
      id: 0,
      payMethod: "",
      price: 0,
      purchaseDate: "",
      quantity: 0,
      sector: "",
      state: "",
      total: 0,
      user: {
        id: 0,
        email: "",
        role: "",
        createdAt: "",
        updateAt: "",
      },
    },
  });

  useEffect(() => {
    async function loadData() {
      const ticket = await getTicket(id);
      setState((state) => ({
        ...state,
        ticket: ticket,
      }));
    }

    loadData();
  }, [setState, id]);

  return (
    <PageTemplate>
      <Container className="mt-3">
        <Row>
          <Col>
            {state.ticket.id !== 0 ? (
              <div style={{textAlign:"left"}}>
                <h3>Detalle de Compra</h3>
                <hr className="featurette-divider"></hr>
                <p>Ticket #{state.ticket.id}</p>
                <p>Sector: {state.ticket.sector}</p>
                <p>Metodo de Pago: {state.ticket.payMethod}</p>
                <p>Cliente: {state.ticket.customer.rut} {state.ticket.customer.firstName} {state.ticket.customer.lastName}</p>
                <p>Email: {state.ticket.customer.email}</p>
               
                <p>Fecha de Compra: {state.ticket.purchaseDate}</p>
                <p>Fecha de Evento: {state.ticket.date}</p>
                <hr className="featurette-divider"></hr>
                <p>Nro Tickets: {state.ticket.quantity}</p>
                <p>Valor Unitario: {state.ticket.price}CLP</p>
                <hr className="featurette-divider"></hr>
                <h5>Total: {state.ticket.total}CLP</h5>
              </div>
            ) : (
              <div>Cargando...</div>
            )}
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
