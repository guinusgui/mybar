import { Save, Trash2 } from "lucide-react";
import BaseHeader from "./Generics/BaseHeader";
import JsonTableForm from "./Generics/JsonTableForm";
import { useState } from "react";
import { Fields } from "@/catalog/fields";

const fields = [
  Fields.itemCode(),
  Fields.description(),
  Fields.quantity(),
  Fields.totalValue(),
];

export default function AccountItems({ data = null, actionsActive = true }) {
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

        data={data}
        actionsColumn={actionsCol}
      />
    </>
  );
}
