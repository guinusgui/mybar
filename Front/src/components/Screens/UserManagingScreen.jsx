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

import accountServices from "@/Services/AccountServices";
import userServices, { UserServices } from "@/Services/UserServices";

import PostItemsForms from "./PostItemsForms";
import AccountClosure from "./AccountClosure";

import UserForms from "../forms/UserForms";
import UserTable from "../tables/UserTable";
import UserCreationForms from "../forms/UserCreationForms";
import findBestMatches from "@/utils/findBestMatches";
import toast from "react-hot-toast";

// Ta fora do formato, e por isso ta aparecendo tudo vazio
const queriedData = [
  {
    CPF: "123.456.789-10",
    Nome: "Kelson Aires",
    Celular: "8698888-8888",
    Número: "108",
    Aberta: "Sim",
  },
];
export default function UserManagingScreen() {
  const [usersSearched, setUsersSearched] = useState([]);

  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const _searchAccount = async () => {
    const searchedRecord = searchData.current.getData()[0];
    const recordsFound = await userServices.searchAll();
    const recordsToSearch = recordsFound.map((record, idx_) => ({
      ...record,
      idx_,
    }));

    const possibleMatches = findBestMatches(
      recordsToSearch,
      {
        nome: searchedRecord.name,
      },
      ["nome"],
      [],
    );

    const matches = possibleMatches
      .map(({ item, similarity, fieldSimilarity }) => {
        for (similarity of Object.values(fieldSimilarity)) {
          if (similarity > 0.8) return recordsFound[item.idx_];
        }
        return;
      })
      .filter((val) => val);

    setUsersSearched(
      matches.map((match) => ({
        name: match.nome,
        email: match.email,
        userType: match.tipo,
        userCode: match.codigo,
      })),
    );
  };

  const createNewUser = async () => {
    const onSave = async (closeModal) => {
      const recordData = tempData.current.getData()[0];

      for (const prop of [
        "userCode",
        "name",
        "email",
        "password",
        "userType",
      ]) {
        if (!recordData[prop]) {
          toast.error(
            "Código, nome, email, senha e tipo de usuário devem ter um valor não nulo.",
          );
          return;
        }
      }

      //     Long codigo,
      //     String nome,
      //     String email,
      //     String senha,
      //     TipoDeUsuario tipo

      // "userCode",
      // "name",
      // "email",
      // "password",
      // "userType",

      let dataToSend = {
        codigo: recordData.userCode,
        nome: recordData.name,
        email: recordData.email,
        senha: recordData.password,
        tipo: recordData.userType,
      };

      const creationRes = await userServices.create(dataToSend);
      console.log(creationRes);
      if (creationRes?.email) {
        toast.success("O usuário foi criada com sucesso!");
        closeModal();
        return;
      }
      toast.error("Houve algum erro ao tentar criar o item.");
    };

    askModal((res, closeModal) => {
      return (
        <>
          <BaseHeader>Tela de Inclusão de Usuário</BaseHeader>

          <UserCreationForms editableFields={["*"]} dataRef={tempData} />
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
        <BaseHeader className="mb-4">Tela de Gestão de Usuários</BaseHeader>

        {/* First Col */}
        <div className="grow flex flex-row justify-stretch gap-4">
          <div className="basis-1/4 grow h-full flex flex-col">
            <BaseHeader className="mb-4">Pesquisa por Tipo</BaseHeader>

            <UserForms
              className="grow flex flex-col items-stretch"
              dataRef={searchData}
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
                onClick={createNewUser}
              >
                <CirclePlus className="inline" /> Novo Usuário
              </button>
            </div>
          </div>

          {/* Second Col */}
          <UserTable
            title="Tabela de Contas Registradas"
            className="basis-1/4 grow-2"
            actionsColumn={actionsDescription}

            data={usersSearched}
          />
        </div>
      </div>
    </>
  );
}
