import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export const PageTemplate = (props: any) => {
  let navigate = useNavigate();
  const linksArray = [
    { name: "Inicio", route: "/" },
    { name: "Entradas", route: "/entradas" },
    { name: "Venta", route: "/venta" },
    { name: "Usuarios", route: "/usuarios" },
    { name: "Check", route: "/check" },
  ];

  const handleClick = (route: string) => {
    navigate(route);
  };
  return (
    <React.Fragment>
      <header>
        <Container>
          <Navbar></Navbar>
          <Navbar>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse>
              <Nav className="mx-auto media-item">
                {linksArray.map((item) => {
                  return (
                    <Nav.Link key={item.name} onClick={() => handleClick(item.route)}>
                      {item.name}
                    </Nav.Link>
                  );
                })}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </header>
      <main>{props.children}</main>
    </React.Fragment>
  );
};
