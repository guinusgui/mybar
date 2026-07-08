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

import PostItemsForms from "./PostItemsForms";
import AccountClosure from "./AccountClosure";

import SearchAccountForms from "../forms/SearchAccountForms";
import RegisteredAccountsTable from "../tables/RegisteredAccountsTable";
import clientServices from "@/Services/ClientServices";
import toast from "react-hot-toast";

import findBestMatches from "@/utils/findBestMatches";

// Ta fora do formato, e por isso ta aparecendo tudo vazio
const queriedData = [
  {
    name: "Kelson Aires",
    cpf: "123.456.789-10",
    phone: "8698888-8888",
    accountNumber: "108",
    status: "ABERTO",
  },
];
export default function SearchAccounts() {
  const [searchedAccounts, setSearchedAccounts] = useState([]);

  const searchData = useRef();
  const tempData = useRef();

  const { confirm: askConfirmation } = useConfirmation();
  const { openModal, askModal } = useModal();

  // Search & Create Buttons ----
  const _searchAccount = async () => {
    const searchedAccount = searchData.current.getData()[0];
    searchedAccount.cpf = searchedAccount?.cpf?.replaceAll(/(\.|-)/g, "");

    const accountsFound = await accountServices.getAllAccount();
    const accountsToSearch = accountsFound.map((acc) => ({
      nome: acc.dono.nome,
      cpf: acc.dono.cpf,
      telefone: acc.dono.telefone,
      status: acc.status,
      numero: acc.numero,
    }));

    const possibleMatches = findBestMatches(
      accountsToSearch,
      {
        nome: searchedAccount.name,
        cpf: searchedAccount.cpf,
        telefone: searchedAccount.phone,
        status: searchedAccount.status,
        numero: searchedAccount.accountNumber,
      },
      ["nome", "cpf", "telefone"],
      ["status", "numero"],
    );

    const matches = possibleMatches
      .map(({ item, similarity, fieldSimilarity }) => {
        for (similarity of Object.values(fieldSimilarity)) {
          if (similarity > 0.8) return item;
        }
        return;
      })
      .filter((val) => val);

    console.log(possibleMatches);
    setSearchedAccounts(
      matches.map((match) => ({
        name: match.nome,
        cpf: match.cpf,
        phone: match.telefone,
        status: match.status,
        accountNumber: match.numero,
      })),
    );
  };

  const createNewAccount = async () => {
    const onSave = async (closeModal) => {
      const accData = tempData.current.getData()[0];
      console.log(accData);

      for (const prop of ["cpf", "gender", "waiterCode", "accountNumber"]) {
        if (!accData[prop]) {
          toast.error(
            "CPF, sexo, código de garçom e número da conta devem ter um valor não nulo.",
          );
          return;
        }
      }

      accData.cpf = accData.cpf.replaceAll(/(\.|-)/g, "");

      const clientData = await clientServices.search(accData.cpf);
      if (clientData?.status) {
        if (clientData.status == 404) {
          const createClientRes = await clientServices.create({
            nome: accData.name,
            cpf: accData.cpf,
            telefone: accData.phone,
            sexo: accData.gender,
          });

          if (createClientRes.status != 201) {
            toast.error(
              "Existe algum problema com os dados de (nome, cpf, telefone ou sexo) que tornam inviável criar um cliente para essa conta.",
            );
            return;
          }
        } else {
          toast.error(
            "Houve algum erro ao tentar recuperar o cliente da conta.",
          );
          return;
        }
      }

      let dataToSend = {
        numero:
          accData.accountNumber == null ? null : Number(accData.accountNumber),
        status: "ABERTA",
        dono: accData.cpf,
        quem_abriu:
          accData.waiterCode == null ? null : Number(accData.waiterCode),
      };

      const accCreationRes = await accountServices.createAccount(dataToSend);
      if (accCreationRes?.dono) {
        toast.success("A conta foi criada com sucesso!");
        closeModal();
        return;
      }
      if (
        accCreationRes?.message ==
        "Tentativa de criar conta com número já registrado"
      ) {
        toast.error(
          "O valor de conta é invalido. Talvez já exista uma conta com esse número. Tente outro.",
        );
        return;
      }
      if (
        [
          "O codigo de 'quem_abriu' fornecido não corresponde a nenhum usuário",
          "O codigo de 'quem_abriu' não corresponde a nenhum usuário",
        ].includes(accCreationRes?.message)
      ) {
        toast.error("O Código do Garçom não corresponde a nenhum garçom");
        return;
      }
      toast.error("Houve algum erro ao tentar criar a conta.");
    };

    askModal((res, closeModal) => {
      return (
        <>
          <BaseHeader>Dados do Usuário</BaseHeader>

          <AccountForms
            editableFields={["*"]}
            dataRef={tempData}
          ></AccountForms>
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
    const delRes = await accountServices.deleteAccount(
      accountData.accountNumber,
    );
    if (delRes.status == 204) {
      setSearchedAccounts(
        searchedAccounts.toSpliced(searchedAccounts.indexOf(accountData), 1),
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
      {
        icon: (
          <span>
            <ArrowUpToLine
              strokeWidth={2}
              className="juicyButton hover:text-blue-500"
            />
          </span>
        ),
        onClick: postItems,
      },
      {
        icon: (
          <span>
            <CircleX
              strokeWidth={2}
              className="juicyButton hover:text-orange-500"
            />
          </span>
        ),
        onClick: closeAccount,
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
            <BaseHeader className="mb-4">Pesquisa por Contas</BaseHeader>

            <SearchAccountForms
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
                onClick={createNewAccount}
              >
                <CirclePlus className="inline" /> Nova Conta
              </button>
            </div>
          </div>

          {/* Second Col */}
          <RegisteredAccountsTable
            title="Tabela de Contas Registradas"
            className="basis-1/4 grow-2"
            actionsColumn={actionsDescription}

            data={searchedAccounts}
          />
        </div>
      </div>
    </>
  );
}
