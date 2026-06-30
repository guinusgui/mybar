import { Save, Trash2 } from "lucide-react";
import BaseHeader from "./Generics/BaseHeader";
import JsonTableForm from "./Generics/JsonTableForm";
import { useState } from "react";

export default function AccountItems({ actionsActive = true }) {
  const [x, updX] = useState([
    {
      Código: "1234",
      Descrição: "Lorem Ipsum",
      Quantidade: 3,
      Valor: "R$ 12,50",
    },
  ]);

  const actionsCol = actionsActive
    ? {
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
      }
    : null;

  return (
    <>
      <BaseHeader>Itens em conta</BaseHeader>
      <JsonTableForm
        className="basis-2 grow"

        data={x}
        actionsColumn={actionsCol}
      />
    </>
  );
}
