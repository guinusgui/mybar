import { Trash2 } from "lucide-react";
import BaseHeader from "./Generics/BaseHeader";
import JsonTableForm from "./Generics/JsonTableForm";
import { useState } from "react";

export default function Payments() {
  const [x, updX] = useState([
    {
      forma: "Espécie",
      valor: "R$ 50,00",
    },
    {
      forma: "Pix",
      valor: "R$ 20,00",
    },
    {
      forma: "Credito",
      valor: "R$ 10,00",
    },
  ]);

  return (
    <>
      <BaseHeader>Pagamento</BaseHeader>
      <JsonTableForm
        className="basis-2 grow"

        data={x}
        actionsColumn={{
          label: "",
          actions: [
            {
              icon: (
                <span>
                  <Trash2
                    strokeWidth={2}
                    className="juicyButton  hover:text-red-500"
                  />
                </span>
              ),
              onClick: () => {
                console.log("CLICK");
              },
            },
          ],
        }}
      />
    </>
  );
}
