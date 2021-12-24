import { Container, Row, Col, Table } from "react-bootstrap";
import { useState, useEffect } from "react";

//Components
import { PageTemplate } from "../components/PageTemplate";

//Functions
import { getUsers } from "../services/user.service";
import { CreateUserOffCanvas } from "../components/formTemplate/CreateUserOffCanvas";

export const Usuarios = () => {
  const [state, setState] = useState({
    usuarios: [],
  });


  const loadUsers = async ()=>{
    const result = await getUsers();
    setState((state) => ({ ...state, usuarios: result }));
  }

  useEffect(() => {
    async function loadData() {
      const result = await getUsers();
      setState((state) => ({ ...state, usuarios: result }));
    }
    loadData();
  }, [setState]);



  return (
    <PageTemplate>
      <Container className="mt-3">
        <Row className="justify-content-md-center">
          <Col>
            <h2>Listado de Usuarios</h2>
            <div
              className="tableScrollbar shadowCard"
              style={{ height: "34rem" }}
            >
              <Table size="sm" striped bordered hover>
                <thead>
                  <tr className="staticTh">
                    <th>ID</th>
                    <th>Email</th>
                    <th>Rol</th>
                    <th>Tickets Vendidos</th>
                    <th>Total Vendido</th>
                  </tr>
                </thead>
                <tbody>
                  {state.usuarios.length ? (
                    state.usuarios.map((item: any) => {
                      return (
                        <tr key={item.id}>
                          <td>{item.id}</td>
                          <td>{item.email}</td>
                          <td>{item.role}</td>
                          <td>{item.ticketsSolds}</td>
                          <td>{item.profit}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr></tr>
                  )}
                </tbody>
              </Table>
            </div>
            <CreateUserOffCanvas loadUsers={loadUsers} />
          </Col>
        </Row>
      </Container>
    </PageTemplate>
  );
};
