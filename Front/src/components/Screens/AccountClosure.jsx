import { CircleCheck, CirclePlus } from "lucide-react";
import AccountItems from "../AccountItems";
import BaseHeader from "../Generics/BaseHeader";
import { useRef, useState } from "react";
import Payments from "../Payments";
import useModal from "@/hooks/useModal";
import PaymentForms from "../forms/PaymentForms";

import askWaiterAuth from "../dialogs/askWaiterAuth";

import AccountClosureForms from "../forms/AccountClosureForms";

export default function AccountClosure() {
  //   const changeData = async (newData) => {
  //     let productData;
  //     try {
  //       productData = await getProductById(newData[0]?.codigoProduto);
  //     } catch {
  //       productData = null;
  //     }

  //     newData[0].descricaoProduto = productData?.descricaoProduto;
  //     newData[0].valorUnitario = productData?.valorUnitario;

  //     upd(newData);
  //   };

  // const [newPayment, setNewPayment] = useState([{}]);
  const dataRef = useRef();

  const { askModal } = useModal();

  const insertPayment = async () => {
    const paymentData = await askModal((res, closeModal) => {
      const submit = async () => {
        closeModal();
        res(dataRef?.current?.getData());
      };

      return (
        <>
          <PaymentForms editableFields={["*"]} dataRef={dataRef} />

          <div className="p-4 px-6 flex flex-row justify-end">
            <button
              className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
              onClick={submit}
            >
              <CircleCheck className="inline" /> Inserir Pagamento
            </button>
          </div>
        </>
      );
    });
    const credentials = await askWaiterAuth(askModal, dataRef);

    console.log(">> Payment: ", paymentData, " - ", credentials);
  };

  //  Render ----
  return (
    <>
      <BaseHeader>Fechamento de conta</BaseHeader>

      <div className="mt-3 grow flex flex-row items-stretch gap-4">
        <div className="basis-1 grow h-full">
          <AccountClosureForms editableFields={[]} />
        </div>

        <div className="basis-1 grow flex flex-col">
          <AccountItems actionsActive={false} />
        </div>

        <div className="basis-1 grow flex flex-col">
          <Payments />
        </div>
      </div>

      <div className="p-4 px-6 flex flex-row justify-center gap-4">
        <button
          className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
          onClick={insertPayment}
        >
          <CirclePlus className="inline" /> Inserir Pagamento
        </button>

        <button className="juicyButton font-medium border-2 border-dashed rounded-xl p-1">
          <CircleCheck className="inline" /> Concluir Fechamento
        </button>
      </div>
    </>
  );
}
