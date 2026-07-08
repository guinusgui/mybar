import { useEffect, useRef, useState } from "react";
import DataForms from "../DataForms";
import BaseHeader from "../Generics/BaseHeader";

import { CirclePlus, Save, Trash2 } from "lucide-react";
import JsonTableForm from "../Generics/JsonTableForm";
import useModal from "@/hooks/useModal";
import WaiterAuthScreen from "../formsScreens/waiterAuthScreen";
import AccountItems from "../AccountItems";
import ItemRegisterForms from "../forms/ItemRegisterForms";
import accountServices from "@/Services/AccountServices";
import toast from "react-hot-toast";
import itemTypeServices from "@/Services/ItemTypeServices";
import menuServices from "@/Services/MenuServices";
import shoppingServices from "@/Services/ShoppingServices";

export default function PostItemsForms({ accountSummary }) {
  const formsData = useRef();
  const [itemsData, setItemsData] = useState([]);

  useEffect(() => {
    console.log(accountSummary);
    const setInitialData = async () => {
      const accData = await accountServices.search(
        accountSummary.accountNumber,
      );
      console.log(accData);

      if (!accData?.hora) {
        toast(
          "Não foi possível recuperar todos os dados da conta. Utilizando os dados locais.",
          {
            icon: "🔔",
            style: {
              background: "#fff1a9",
            },
          },
        );
        formsData.current.setData([accountSummary]);
        return;
      }

      // Preenchendo Forms ---
      formsData.current.setData([
        {
          name: accountSummary.name,
          cpf: accountSummary.cpf,
          accountNumber: accountSummary.accountNumber,
          waiterCode: accData.quem_abriu.codigo,
        },
      ]);

      // Preenchendo Tabelas ---
      const tableData = await Promise.all(
        accData.itens.map(async (item) => {
          const itemData = await menuServices.search(item.item.codigo);
          console.log(">> ", itemData);

          return {
            itemCode: itemData.codigo,
            description: itemData?.desc || "Indisponível",
            quantity: itemData.quantidade,
            unitPrice: itemData.valor ? `R$ ${itemData.valor}` : "Indisponível",
          };
        }),
      );

      console.log(tableData);

      setItemsData(tableData);
    };
    // if (formsData.current) formsData.current.setData([accountData]);
    setInitialData();
  }, []);

  const changeData = async (newData, setData) => {
    const itemsAvailable = await menuServices.searchAll();
    let itemWithCode = itemsAvailable.filter(
      (item) => item.codigo == newData[0]?.itemCode,
    )?.[0];

    if (itemWithCode) {
      itemWithCode = {
        description: itemWithCode.desc,
        unitPrice: itemWithCode.valor,
      };
    }

    newData[0].description = itemWithCode?.description;
    newData[0].unitPrice = itemWithCode?.unitPrice;

    setData(newData);
  };

  // ------
  const { askModal } = useModal();

  const insertItem = async () => {
    // const credentials = await askModal((res, closeModal) => {
    //   return (
    //     <WaiterAuthScreen
    //       onSubmit={(data) => {
    //         closeModal();
    //         res(data);
    //       }}
    //     />
    //   );
    // });
    // console.log(`>> Crendicias: `, credentials);
    // Insertir Itens ...
    const data = formsData.current.getData()[0];
    console.log(data);

    if (!data?.description) {
      toast.error(
        "Escolha um código de item válido. Quando o fizer, a descrição do item estará disponível!",
      );
      return;
    }

    if (!data?.quantity) {
      toast.error("Escolha uma quantidade não nula de itens!");
      return;
    }

    const res = await shoppingServices.create(data.accountNumber, {
      codigo: Number(data?.itemCode) || null,
      usuario: Number(data?.waiterCode) || null,
    });

    if (res.status == 201) {
      toast.success("O item foi registrado na conta!");
    } else {
      toast.error(
        "Aconteceu algum problema! Espere um pouco ou re-verifique os campos.",
      );
    }
  };

  //  Render ----
  return (
    <>
      <BaseHeader>Registro de itens em conta</BaseHeader>

      <div className="mt-3 grow flex flex-row justify-stretch gap-4">
        <div className="basis-1/4 grow h-full">
          <ItemRegisterForms
            dataRef={formsData}
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
          <AccountItems data={itemsData} />
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
