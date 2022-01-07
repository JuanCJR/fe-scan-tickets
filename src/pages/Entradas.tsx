import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";
import { PageTemplate } from "../components/PageTemplate";
import { getTickets } from "../services/tickets.service";
export const Entradas = () => {
  const [state, setState] = useState({
    entradas: [],
  });
  useEffect(() => {
    async function loadData() {
      const result = await getTickets();
      setState((state) => ({ ...state, entradas: result }));
    }
    loadData();
  }, [setState]);
  return (
    <PageTemplate>
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col>
            <h2>Listado de Entradas</h2>
            <div className="tableScrollbar" style={{ height: "34rem" }}>
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr className="staticTh">
                    <th>ID</th>
                    <th>Cliente</th>
                    <th>Email Cliente</th>
                    <th>Email Vendedor</th>
                    <th>Método de Pago</th>
                    <th>Sector</th>
                    <th>Fecha de Compra</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {state.entradas.length ? (
                    state.entradas.map((item: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>
                            {item.customer.rut} - {item.customer.firstName}
                            {item.customer.lastName}
                          </td>
                          <td>{item.customer.email}</td>
                          <td>{item.user.email}</td>
                          <td>{item.payMethod}</td>
                          <td>{item.sector}</td>
                          <td>{item.purchaseDate}</td>
                          <td>{item.price}CLP</td>
                          <td>{item.quantity}</td>
                          <td>{item.total}CLP</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
