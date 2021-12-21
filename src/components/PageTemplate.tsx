import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PageTemplate = (props: any) => {
  const [state, changeState] = useState({
    userId: "",
    isLoggedIn: false,
  });

  let navigate = useNavigate();
  const linksArray = [
    { name: "Inicio", route: "/" },
    { name: "Entradas", route: "/entradas" },
    { name: "Venta", route: "/venta" },
    { name: "Usuarios", route: "/usuarios" },
    { name: "Check", route: "/check" },
  ];

  useEffect(() => {
    async function loadData() {
      const token = sessionStorage.getItem("access_token");

      if (!token) {
        navigate("/login");
      } else {
        // const usuario = await validaSesion(token);
        changeState((state: any) => ({
          ...state,
          userId: 1,
          isLoggedIn: true,
        }));
      }
    }
    loadData();
  }, [changeState]);

  const handleClick = (route: string) => {
    navigate(route);
  };

  return (
    <React.Fragment>
      <header>
        <Container fluid>
          <Navbar></Navbar>
          <Navbar  collapseOnSelect expand="lg"  className="text-white shadowCard">
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
    </React.Fragment>
  );
};
