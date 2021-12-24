import { Routes, Route } from "react-router";
import React, { Component } from "react";
import ms from "ms";
import { Home } from "./pages/Home";

import "./App.css";
import { Entradas } from "./pages/Entradas";
import { Venta } from "./pages/Venta";
import { Usuarios } from "./pages/Usuarios";
import { Check } from "./pages/Check";
import { Login } from "./pages/Login";
import { Invoice } from "./pages/Invoice";
import { RefreshModal } from "./components/modal/RefreshModal";
import { PageTemplate } from "./components/PageTemplate";

export default class App extends Component {
  state = {
    expiresIn: 0,
  };

  render() {
    return (
      <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/entradas" element={<Entradas />} />
            <Route path="/venta" element={<Venta />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route
              path="/login"
              element={<Login/>}
            />
            <Route path="/check" element={<Check />} />
            <Route path="/invoice/:id" element={<Invoice />} />
          </Routes>
      </div>
    );
  }

  getExpiresIn = (expiresIn: string) => {
    this.setState({
      expiresIn: ms(expiresIn),
    });
  };
}
