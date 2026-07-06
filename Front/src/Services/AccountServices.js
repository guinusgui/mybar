import { apiURL, jsonHeaders } from "./serviceConstants";

export function AccountServices() {
  async function createAccount(accountFields) {
    const res = await fetch(`${apiURL}/contas`, {
      method: "POST",
      body: JSON.stringify(accountFields),
      headers: { ...jsonHeaders },
    });

    const accounts = await res.json();
    return accounts;
  }

  async function getAllAccount() {
    const res = await fetch(`${apiURL}/contas`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function updateAccount(accountFields) {
    const res = await fetch(`${apiURL}/contas`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function deleteAccount(accountNumber) {
    const res = await fetch(`${apiURL}/contas/${accountNumber}`, {
      method: "DELETE",
    });

    return res;
  }

  return {
    createAccount,
    getAllAccount,
    updateAccount,
    deleteAccount,
  };
}

const accountServices = AccountServices();
export default accountServices;
