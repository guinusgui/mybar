import { ArrowUpToLine, Search, Save, ArrowDownToLine } from "lucide-react";
import { useRef } from "react";
import BaseHeader from "../Generics/BaseHeader";

import { useConfirmation } from "@/hooks/useConfirmationDialog";
import useModal from "@/hooks/useModal";
import AccountForms from "../forms/AccountForms";

import PostItemsForms from "./PostItemsForms";
import AccountClosure from "./AccountClosure";

import accountServices from "@/Services/AccountServices";
import ItemTypeForms from "../forms/ItemTypeForms";
import KitchenOrdersTable from "../tables/KitchenOrdersTable";
import DeliveryOrderForms from "../forms/DeliveryOrderForms";

// Ta fora do formato, e por isso ta aparecendo tudo vazio (nao por conta dos null)
const sampleData = [{ accountStatus: "received" }];

export default function DeliveryControlScreen() {
  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const _searchAccount = async () => {
    const searchedAccount = searchData.current.getData();

    const accountsFounded =
      await accountServices.searchAccount(searchedAccount);
    console.log(accountsFounded);
  };

  const createNewType = async () => {
    const newAccountData = await askModal((res, closeModal) => {
      const onSave = () => {
        res(tempData.current.getData());
        closeModal();
      };

      return (
        <>
          <BaseHeader>Tela de Inclusão de Item</BaseHeader>

          <ItemTypeForms editableFields={["*"]} dataRef={tempData} />
          <div className="p-4 px-6 flex flex-row justify-end">
            <button
              className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
              onClick={onSave}
            >
              <Save className="inline" /> Salvar
            </button>
          </div>
        </>
      );
    });
    await accountServices.createAccount(newAccountData);
  };

  // Registered Accounts Commands ----
  const deleteAccount = async (accountData) => {
    // Confirming -
    const ok = await askConfirmation({
      title: "Tem certeza que deseja excluir a conta?",
      description: "",
      confirmText: "Sim!",
      cancelText: "Não.",
    });
    if (!ok) return;

    // Deleting -
    await accountServices.deleteAccount(accountData);
  };

  const _updateAccount = async (accountData) => {
    // Getting all fields from server
    const serverData = await accountServices.searchAccount(accountData);

    // Collecting Edited Version
    let editedData = [serverData];
    const editData = (newData) => {
      editedData = newData;
    };

    openModal(
      <AccountForms
        initialData={editedData}
        updateData={editData}
      ></AccountForms>,
    );

    // Updating -
    accountServices.updateAccount(editedData);
  };

  const viewAccount = async (accountData) => {
    const serverData = await accountServices.searchAccount(accountData);

    openModal(
      <AccountForms
        initialData={[serverData]}
        editableFields={[]}
      ></AccountForms>,
    );
  };

  const postItems = (accountData) => {
    openModal(<PostItemsForms></PostItemsForms>);
  };

  const closeAccount = (accountData) => {
    openModal(<AccountClosure></AccountClosure>);
  };

  // Actions ----
  const actionsDescription = {
    label: "",
    actions: [
      {
        // Receive
        icon: (
          <span>
            <ArrowDownToLine
              strokeWidth={2}
              className="juicyButton hover:text-blue-500"
            />
          </span>
        ),
        onClick: postItems,
        visible: (row) => row.accountStatus == "required" && !row.fromKitchen,
      },
      {
        // Provide
        icon: (
          <span>
            <ArrowUpToLine
              strokeWidth={2}
              className="juicyButton hover:text-orange-500"
            />
          </span>
        ),
        onClick: postItems,
        visible: (row) => row?.accountStatus == "received",
      },
    ],
  };

  // Rendering -----------
  return (
    <>
      <div className="h-full flex flex-col items-stretch">
        <BaseHeader className="mb-4">Tela de Controle de Entregas</BaseHeader>

        {/* First Col */}
        <div className="grow flex flex-row justify-stretch gap-4">
          <div className="basis-1/4 grow h-full flex flex-col">
            <BaseHeader className="mb-4">Pesquisar Pedidos</BaseHeader>

            <DeliveryOrderForms
              dataRef={searchData}
              className="grow flex flex-col items-stretch"
              editableFields={["*"]}
            />

            {/* Buttons */}
            <div className="flex justify-center space-between gap-8 my-5">
              <button
                className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
                onClick={_searchAccount}
              >
                <Search className="inline" /> Pesquisar
              </button>
            </div>
          </div>

          {/* Second Col */}
          <KitchenOrdersTable
            actionsColumn={actionsDescription}
            data={sampleData}

            title="Pedidos"
            className="basis-1/4 grow-2"
          />
        </div>
      </div>
    </>
  );
}
