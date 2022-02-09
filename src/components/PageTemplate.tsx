import React, { useEffect, useState, useContext } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import ms from "ms";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../services/auth.service";
import { RefreshModal } from "./modal/RefreshModal";
import { RoleContext } from "../common/roleContext";
export const PageTemplate = (props: any) => {
  const [state, changeState] = useState({
    userId: 0,
    isLoggedIn: false,
    sessionExpired: false,
  });
  let navigate = useNavigate();
  const { role } = useContext(RoleContext);
  const [linksArray, setLinkArray] = useState([
    { name: "Inicio", route: "/", permissionToSeller: true },
    { name: "Entradas", route: "/entradas", permissionToSeller: false },
    { name: "Venta", route: "/venta", permissionToSeller: true },
    { name: "Usuarios", route: "/usuarios", permissionToSeller: false },
    { name: "Check", route: "/check", permissionToSeller: true },
  ]);

  const countRemainingTime = () => {
    setInterval(() => {
      const expiresIn = sessionStorage.getItem("expiresIn");
      let timeRemaining: number = Number(expiresIn) - ms("5s");
      if (timeRemaining < 1) {
        changeState((state) => ({ ...state, sessionExpired: true }));
        sessionStorage.setItem("expiresIn", "0");
      } else {
        sessionStorage.setItem("expiresIn", timeRemaining.toString());
      }
    }, ms("20s"));
  };

  const setSessionExpired = () => {
    changeState((state) => ({
      ...state,
      sessionExpired: false,
    }));
  };
  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
      } else {
        const user = await validateUser();

        if (user.status !== 201) {
          navigate("/login");
          sessionStorage.clear();
        } else {
          if (role === "seller") {
            const newLinksArray = linksArray.filter(
              (item) => item.permissionToSeller === true
            );
            setLinkArray(newLinksArray);
          }

          changeState((state: any) => ({
            ...state,
            userId: user.data.sub,
            isLoggedIn: true,
          }));

          countRemainingTime();
        }
      }
    }
    loadData();
  }, [changeState, setLinkArray, role]);

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <React.Fragment>
      <header>
        <Container fluid>
          <Navbar></Navbar>
          <Navbar
            collapseOnSelect
            expand="lg"
            className="text-white shadowCard"
          >
            {/* <Navbar.Brand href="/">Tickets Sale</Navbar.Brand> */}
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mx-auto media-item">
                {state.isLoggedIn ? (
                  <React.Fragment>
                    {linksArray.map((item) => {
                      return (
                        <Nav.Link
                          className="text-dark"
                          key={item.name}
                          onClick={() => handleClick(item.route)}
                        >
                          {item.name}
                        </Nav.Link>
                      );
                    })}
                    <Nav.Link
                      className="text-danger"
                      onClick={() => {
                        sessionStorage.clear();
                        handleClick("/login");
                      }}
                    >
                      Cerrar Sesion
                    </Nav.Link>
                  </React.Fragment>
                ) : (
                  <Nav.Link
                    className="text-dark"
                    onClick={() => handleClick("/")}
                  >
                    Login
                  </Nav.Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>
      <main>{props.children}</main>
      <RefreshModal
        sessionExpired={state.sessionExpired}
        setSessionExpired={setSessionExpired}
      />
    </React.Fragment>
  );
};
