import { useState } from "react";
import DataForms from "../DataForms";
import BaseHeader from "../Generics/BaseHeader";

import getProductById from "@/Services/getProduct";
import { CirclePlus, Save, Trash2 } from "lucide-react";
import JsonTableForm from "../Generics/JsonTableForm";
import useModal from "@/hooks/useModal";
import WaiterAuthScreen from "../formsScreens/waiterAuthScreen";
import AccountItems from "../AccountItems";
import ItemRegisterForms from "../forms/ItemRegisterForms";

export default function PostItemsForms({ accountData }) {
  const changeData = async (newData, setData) => {
    console.log("aA");
    let productData;
    try {
      // productData = await getProductById(newData[0]?.codigoProduto);
      if (newData[0]?.itemCode == "1234") {
        productData = {
          itemDescription: "CHOCOLATE",
          unitPrice: "R$ 12,50",
        };
      }
    } catch {
      productData = null;
    }

    newData[0].itemDescription = productData?.itemDescription;
    newData[0].unitPrice = productData?.unitPrice;

    setData(newData);
  };

  // ------
  const { askModal } = useModal();

  const insertItem = async () => {
    const credentials = await askModal((res, closeModal) => {
      return (
        <WaiterAuthScreen
          onSubmit={(data) => {
            closeModal();
            res(data);
          }}
        />
      );
    });

    console.log(`>> Crendicias: `, credentials);
    // Insertir Itens ...
  };

  //  Render ----
  return (
    <>
      <BaseHeader>Registro de itens em conta</BaseHeader>

      <div className="mt-3 grow flex flex-row justify-stretch gap-4">
        <div className="basis-1/4 grow h-full">
          <ItemRegisterForms
            editableFields={["itemCode", "quantity"]}
            setData={changeData}
          />

          <div className="p-4 px-6 flex flex-row justify-end">
            <button
              className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
              onClick={insertItem}
            >
              <CirclePlus className="inline" /> Inserir
            </button>
          </div>
        </div>

        <div className="basis-1/4 grow flex flex-col justify-stretch ">
          <AccountItems />
          <div className="p-4 px-6 flex flex-row justify-end">
            <button className="juicyButton font-medium border-2 border-dashed rounded-xl p-1">
              <Save className="inline" /> Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
