import { useState, useEffect, useContext } from "react";
import { Container, Col, Row, Card, Table } from "react-bootstrap";
import {
  BarChart,
  Bar,
  Legend,
  YAxis,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import { PageTemplate } from "../components/PageTemplate";
import { getUser } from "../services/user.service";
import { getGroupedBySector } from "../services/tickets.service";
import { RoleContext } from "../common/roleContext";

import { TicketsGroupBySector } from "../interfaces/response/TicketsGroupBySector";
export const Home = () => {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("sub") || 0,
    email: "",
    role: "",
  });

  const [dataGroupedby, setDataGroupedby] = useState<TicketsGroupBySector>();
  const { role, setRole } = useContext(RoleContext);
  useEffect(() => {
    async function loadData() {
      const userData = await getUser(user.id);

      const ticketGroupedBySectorData = await getGroupedBySector();
      setUser((state) => ({
        ...state,
        email: userData.email,
        role: userData.role,
      }));
      setRole(userData.role);

      setDataGroupedby((state) => ({ ...state, ...ticketGroupedBySectorData }));
    }
    loadData();
  }, [getUser, setUser]);
  return (
    <PageTemplate>
      <Container>
        <h3 className="mt-3">
          Bievenido usuario {user.id} - {user.email}
        </h3>
        <hr className="featurette-divider"></hr>

        {role === "seller" ? (
          <></>
        ) : (
          <>
            <h4>Resumen de Ventas</h4>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Table>
                      <thead>
                        <tr>
                          <th>Cantidad</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{dataGroupedby?.quantity}</td>
                          <td>{dataGroupedby?.total}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <hr className="featurette-divider"></hr>
            <h4>Resumen de Ventas por Sector</h4>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <ResponsiveContainer height={230} width="100%">
                      <BarChart data={dataGroupedby?.ticketsForSector}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sector" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar
                          dataKey="quantity"
                          fill="#8884d8"
                          name="Cantidad"
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              <Col>
                <Card className="mt-3">
                  <Card.Body>
                    <ResponsiveContainer height={230} width="100%">
                      <BarChart data={dataGroupedby?.ticketsForSector}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sector" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="total" fill="#82ca9d" name="Total" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </PageTemplate>
  );
};
