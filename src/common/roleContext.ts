import React from "react";

export type loginContext = {
  role: string;
  setRole: (role: string) => void;
};

export const RoleContext = React.createContext<loginContext>({
  role: "",
  setRole: () => {
    console.log("no role context provider");
  },
});
