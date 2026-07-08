import clientServices from "@/Services/ClientServices";
import accountServices from "./Services/AccountServices";

const accData = {
  cpf: "04281554645",
  name: "JESSICA",
  phone: "99999999991",
  gender: "MASCULINO",
  date: null,
  time: null,
  accountNumber: 12,
  waiterCode: 1232,
  waiterPassword: null,
};

const clientData = await clientServices.search(accData.cpf);
if (clientData.status == 404) {
  await clientServices.create({
    nome: accData.name,
    cpf: accData.cpf,
    telefone: accData.phone,
    sexo: accData.gender,
  });
}

let dataToSend = {
  numero: Number(accData.accountNumber),
  status: "ABERTA",
  dono: accData.cpf,
  quem_abriu: Number(accData.waiterCode),
};

const res = await accountServices.createAccount(dataToSend);
console.log(res);
