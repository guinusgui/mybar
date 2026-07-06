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
import { useRef, useState } from "react";
import BaseHeader from "../Generics/BaseHeader";

import { useConfirmation } from "@/hooks/useConfirmationDialog";
import useModal from "@/hooks/useModal";
import AccountForms from "../forms/AccountForms";

import PostItemsForms from "./PostItemsForms";
import AccountClosure from "./AccountClosure";

import SearchItemForms from "../forms/SearchItemForms";
import MenuItemsTable from "../tables/MenuItemsTable";
import accountServices from "@/Services/AccountServices";
import findBestMatches from "@/utils/findBestMatches";
import menuServices from "@/Services/MenuServices";
import ItemForms from "../forms/ItemForms";
import toast from "react-hot-toast";
import itemTypeServices from "@/Services/ItemTypeServices";

// Ta fora do formato, e por isso ta aparecendo tudo vazio (nao por conta dos null)
// const queriedData = [
//   {
//     Código: null,
//     Descriçao: null,
//     Tipo: null,
//     Valor_Unitário: null,
//     Gorjeta: null,
//   },
// ];

export default function MenuManagingScreen() {
  const [searchedMenu, setSearchedMenu] = useState([]);

  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const searchMenuItem = async () => {
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

    const uniqueTypes = [... new Set(matches.map(match => match.tipo))]
    const typesData = await uniqueTypes.reduce(async (acum, typeCode) => {
      return {...acum, [typeCode]: await itemTypeServices.search(typeCode)}
    }, {})

    setSearchedMenu(
      matches.map((match) => ({
        itemCode: match.codigo,
        description: match.desc,
        itemType: match.tipo,
        unitPrice: match.valor,
        tipPercentage: typesData[match.tipo].gorjeta
      })),
    );
  };

  const createNewItem = async () => {
    const onSave = async (closeModal) => {
      const recordData = tempData.current.getData()[0];

      for (const prop of [
        "itemCode",
        "description",
        "itemType",
        "unitPrice",
        "tipPercentage",
      ]) {
        if (!recordData[prop]) {
          toast.error(
            "Código do item, descrição, tipo do item, preço unitário e Gorjeta devem ter um valor não nulo.",
          );
          return;
        }
      }

      let dataToSend = {
        codigo: recordData.itemCode,
        desc: recordData.description,
        tipo: recordData.itemType,
        valor: recordData.unitPrice,
      };

      const creationRes = await menuServices.create(dataToSend);
      if (creationRes?.desc) {
        toast.success("O item do menu foi criada com sucesso!");
        closeModal();
        return;
      }
      if (
        creationRes.message == "O id fornecido não corresponde a nenhum cliente"
      ) {
        toast.error("O tipo de item fornecido é invalido.");
        return;
      }
      toast.error("Houve algum erro ao tentar criar o item.");
    };

    askModal((res, closeModal) => {
      return (
        <>
          <BaseHeader>Tela de Inclusão de Item</BaseHeader>

          <ItemForms editableFields={["*"]} dataRef={tempData} />
          <div className="p-4 px-6 flex flex-row justify-end">
            <button
              className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
              onClick={() => onSave(closeModal)}
            >
              <Save className="inline" /> Salvar
            </button>
          </div>
        </>
      );
    });
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
    console.log(accountData.itemCode)
    const delRes = await menuServices.remove(
      accountData.itemCode,
    );
    if (delRes.status == 204) {
      setSearchedMenu(
        searchedMenu.toSpliced(searchedMenu.indexOf(accountData), 1),
      );
    }
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
        <BaseHeader className="mb-4">Registro de Conta</BaseHeader>

        {/* First Col */}
        <div className="grow flex flex-row justify-stretch gap-4">
          <div className="basis-1/4 grow h-full flex flex-col">
            <BaseHeader className="mb-4">Pesquisa por Itens</BaseHeader>

            <SearchItemForms
              dataRef={searchData}
              className="grow flex flex-col items-stretch"
              editableFields={["*"]}
            />

            {/* Buttons */}
            <div className="flex justify-center space-between gap-8 my-5">
              <button
                className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
                onClick={searchMenuItem}
              >
                <Search className="inline" /> Pesquisar
              </button>

              <button
                className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
                onClick={createNewItem}
              >
                <CirclePlus className="inline" /> Novo Item
              </button>
            </div>
          </div>

          {/* Second Col */}
          <MenuItemsTable
            data={searchedMenu}
            actionsColumn={actionsDescription}

            title="Tabela de Itens do Cardápio"
            className="basis-1/4 grow-2"
          />
        </div>
      </div>
    </>
  );
}
