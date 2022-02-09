import { Routes, Route } from "react-router";
import React, { Component, useEffect, useState } from "react";
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
import { RoleContext } from "./common/roleContext";

const App = () => {
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    function load() {
      const roleInStorage = localStorage.getItem("role");
      if (roleInStorage) {
        setRoleStorage(roleInStorage);
      }
    }
    load();
  });

  const setRoleStorage = (role: string) => {
    localStorage.setItem("role", role);
    setRole(role);
  };

  return (
    <RoleContext.Provider value={{ role: role, setRole: setRoleStorage }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/entradas" element={<Entradas />} />
          <Route path="/venta" element={<Venta />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/login" element={<Login />} />
          <Route path="/check" element={<Check />} />
          <Route path="/invoice/:id" element={<Invoice />} />
        </Routes>
      </div>
    </RoleContext.Provider>
  );
};

export default App;
