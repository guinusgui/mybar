import { useContext } from "react";
import { modalContext } from "@/components/ModalProvider";

export default function useModal() {
  const context = useContext(modalContext);

  if (!context) {
    throw new Error("useModal must be used inside ModalProvider.");
  }

  return context;
}
