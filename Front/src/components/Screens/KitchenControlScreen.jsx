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
import KitchenAccountSearchForms from "../forms/KitchenAccountSearchForms";
import KitchenOrdersTable from "../tables/KitchenOrdersTable";
import findBestMatches from "@/utils/findBestMatches";

// Ta fora do formato, e por isso ta aparecendo tudo vazio (nao por conta dos null)
const sampleData = [{ accountStatus: "received" }];

export default function KitchenControlScreen() {
  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const _searchAccount = async () => {
    const searchedRecord = searchData.current.getData()[0];
    const recordsFound = await menuServices.searchAll();
    const recordsToSearch = recordsFound.map((record, idx_) => ({
      ...record,
      idx_,
    }));

    const possibleMatches = findBestMatches(
      recordsToSearch,
      {
        tipo: searchedRecord.itemType,
        desc: searchedRecord.description,
        codigo: searchedRecord.itemCode,
      },
      ["desc"],
      ["tipo", "codigo"],
    );

    const matches = possibleMatches
      .map(({ item, similarity, fieldSimilarity }) => {
        for (similarity of Object.values(fieldSimilarity)) {
          if (similarity > 0.8) return recordsFound[item.idx_];
        }
        return;
      })
      .filter((val) => val);

    console.log(matches);
    setSearchedMenu(
      matches.map((match) => ({
        itemCode: match.codigo,
        description: match.desc,
        itemType: match.tipo,
        unitPrice: match.valor,
      })),
    );
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
        visible: (row) => row?.accountStatus == "required",
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
        <BaseHeader className="mb-4">Tela de Controle da Cozinha</BaseHeader>

        {/* First Col */}
        <div className="grow flex flex-row justify-stretch gap-4">
          <div className="basis-1/4 grow h-full flex flex-col">
            <BaseHeader className="mb-4">Pesquisa por Contas</BaseHeader>

            <KitchenAccountSearchForms
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

            title="Pedidos Para Cozinha"
            className="basis-1/4 grow-2"
          />
        </div>
      </div>
    </>
  );
}
