import { createContext, useState } from "react";
import Modal from "./Generics/Modal";

export const appContext = createContext(null);

export default function ModalProvider({ children }) {
  const [data, setData] = useState(null);

  return (
    <appContext.Provider value={[data, setData]}>
      {children}
    </appContext.Provider>
  );
}
