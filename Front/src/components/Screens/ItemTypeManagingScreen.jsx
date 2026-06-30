import {
  ArrowUpToLine,
  CirclePlus,
  CircleX,
  Eye,
  SquarePen,
  Trash2,
  Search,
  Save,
} from "lucide-react";
import { useRef } from "react";
import BaseHeader from "../Generics/BaseHeader";

import { useConfirmation } from "@/hooks/useConfirmationDialog";
import useModal from "@/hooks/useModal";
import AccountForms from "../forms/AccountForms";

import createAccount from "@/Services/createAccount";
import PostItemsForms from "./PostItemsForms";
import AccountClosure from "./AccountClosure";

import SearchItemForms from "../forms/SearchItemForms";
import MenuItemsTable from "../tables/MenuItemsTable";
import accountServices from "@/Services/AccountServices";
import ItemTypeSearchForms from "../forms/ItemTypeSearchForms";
import ItemTypesTable from "../tables/ItemTypesTable";
import ItemTypeForms from "../forms/ItemTypeForms";

// Ta fora do formato, e por isso ta aparecendo tudo vazio (nao por conta dos null)
const queriedData = [
  {
    Código: null,
    Descriçao: null,
    Tipo: null,
    Valor_Unitário: null,
    Gorjeta: null,
  },
];

export default function ItemTypeManagingScreen() {
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
        icon: (
          <span>
            <Eye strokeWidth={2} className="juicyButton hover:text-green-500" />
          </span>
        ),
        onClick: viewAccount,
      },
      {
        icon: (
          <span>
            <SquarePen
              strokeWidth={2}
              className="juicyButton hover:text-purple-500"
            />
          </span>
        ),
        onClick: _updateAccount,
      },
      {
        icon: (
          <span>
            <Trash2
              strokeWidth={2}
              className="juicyButton  hover:text-red-500"
            />
          </span>
        ),
        onClick: deleteAccount,
      },
    ],
  };

  // Rendering -----------
  return (
    <>
      <div className="h-full flex flex-col items-stretch">
        <BaseHeader className="mb-4">
          Tela de Gestão de Tipos de Itens
        </BaseHeader>

        {/* First Col */}
        <div className="grow flex flex-row justify-stretch gap-4">
          <div className="basis-1/4 grow h-full flex flex-col">
            <BaseHeader className="mb-4">Pesquisa por Itens</BaseHeader>

            <ItemTypeSearchForms
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

              <button
                className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
                onClick={createNewType}
              >
                <CirclePlus className="inline" /> Novo Tipo
              </button>
            </div>
          </div>

          {/* Second Col */}
          <ItemTypesTable
            actionsColumn={actionsDescription}

            title="Tabela de Itens do Cardápio"
            className="basis-1/4 grow-2"
          />
        </div>
      </div>
    </>
  );
}
