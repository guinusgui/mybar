import { useState } from "react";
import DataForms from "../DataForms";
import BaseHeader from "../Generics/BaseHeader";
import { Save } from "lucide-react";

export default function AccountForms({
  initialData = [
    {
      cpf: "",
      nome: "",
      celular: "",
      sexo: "",
      data: "",
      hora: "",
      numeroConta: "9999",
      codigo: "9999",
      garcom: "",
      senha: "9999",
    },
  ],
  updateData,
  editableFields = ["*"],
}) {
  const [accountData, setAccountData] = useState(initialData);

  const saveData = () => {
    updateData?.(accountData);
  };

  return (
    <>
      <BaseHeader>Dados do Usuário</BaseHeader>
      <DataForms
        data={accountData}
        setData={setAccountData}
        editableFields={editableFields}
      />
      <div className="p-4 px-6 flex flex-row justify-end">
        <button
          className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
          onClick={saveData}
        >
          <Save className="inline" /> Salvar
        </button>
      </div>
    </>
  );
}
