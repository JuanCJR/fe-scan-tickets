import { useState, useEffect } from "react";

import { PageTemplate } from "../components/PageTemplate";
import { getUser } from "../services/user.service";

export const Home = () => {
  const [user, setUser] = useState({
    id: sessionStorage.getItem("sub") || 0,
    email: "",
    role: "",
  });

  useEffect(() => {
    async function loadData() {
      const userData = await getUser(user.id);
      setUser((state) => ({
        ...state,
        email: userData.email,
        role: userData.role,
      }));
    }
    loadData();
  }, [getUser, setUser]);
  return (
    <PageTemplate>
      <h3 className="mt-3">Bievenido usuario {user.id} - {user.email}</h3>
    </PageTemplate>
  );
};
