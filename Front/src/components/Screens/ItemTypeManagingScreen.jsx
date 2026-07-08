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
import ItemTypeSearchForms from "../forms/ItemTypeSearchForms";
import ItemTypesTable from "../tables/ItemTypesTable";
import ItemTypeForms from "../forms/ItemTypeForms";
import toast from "react-hot-toast";
import itemTypeServices from "@/Services/ItemTypeServices";
import findBestMatches from "@/utils/findBestMatches";

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
  const [searchedRecords, setSearchedRecords] = useState([]);
  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const _searchAccount = async () => {
    const searchedRecord = searchData.current.getData()[0];
    const recordsFound = await itemTypeServices.searchAll();

    const recordsToSearch = recordsFound.map((record, idx_) => ({
      ...record,
      idx_,
    }));

    const possibleMatches = findBestMatches(
      recordsToSearch,
      {
        codigo: searchedRecord.itemCode,
        descricao: searchedRecord.description,
        gorjeta: searchedRecord.tipPercentage,
        loco: searchedRecord.from,
      },
      ["descricao"],
      ["codigo", "gorjeta", "loco"],
    );

    const matches = possibleMatches
      .map(({ item, similarity, fieldSimilarity }) => {
        for (similarity of Object.values(fieldSimilarity)) {
          if (similarity > 0.8) return recordsFound[item.idx_];
        }
        return;
      })
      .filter((val) => val);

    setSearchedRecords(
      matches.map((match) => ({
        itemCode: match.codigo,
        description: match.descricao,
        from: match.loco,
        tipPercentage: match.gorjeta,
      })),
    );
  };

  const createNewType = async () => {
    const onSave = async (closeModal) => {
      const recordData = tempData.current.getData()[0];

      // @NotNull Long codigo,
      // @NotBlank String descricao,
      // @NotNull @Positive BigDecimal gorjeta,
      // @NotNull LocalDeProducao loco

      //       Fields.itemCode(),
      // Fields.description(),
      // Fields.tipPercentage(),
      // Fields.from(),

      for (const prop of ["description", "itemType", "from", "tipPercentage"]) {
        if (!recordData[prop]) {
          toast.error(
            "Descrição, Tipo do Item, origem e Gorjeta devem ter um valor não nulo.",
          );
          return;
        }
      }

      let dataToSend = {
        codigo: recordData.itemType,
        descricao: recordData.description,
        gorjeta: recordData.tipPercentage,
        loco: recordData.from,
      };

      const creationRes = await itemTypeServices.create(dataToSend);

      if (creationRes?.descricao) {
        toast.success("O tipo de item foi criado com sucesso!");
        closeModal();
        return;
      }
      toast.error("Houve algum erro ao tentar criar o tipo de item.");
    };

    askModal((res, closeModal) => {
      return (
        <>
          <BaseHeader>Tela de Inclusão de Tipo de Item</BaseHeader>

          <ItemTypeForms editableFields={["*"]} dataRef={tempData} />
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
    const delRes = await itemTypeServices.remove(accountData.itemCode);
    if (delRes.status == 204) {
      setSearchedRecords(
        searchedRecords.toSpliced(searchedRecords.indexOf(accountData), 1),
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
            data={searchedRecords}
            actionsColumn={actionsDescription}

            title="Tabela de Itens do Cardápio"
            className="basis-1/4 grow-2"
          />
        </div>
      </div>
    </>
  );
}
