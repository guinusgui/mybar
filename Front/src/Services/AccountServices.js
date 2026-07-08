import { apiURL, jsonHeaders } from "./serviceConstants";

const accountsURL = `${apiURL}/contas`;

export function AccountServices() {
  async function createAccount(accountFields) {
    const res = await fetch(`${accountsURL}`, {
      method: "POST",
      body: JSON.stringify(accountFields),
      headers: { ...jsonHeaders },
    });

    const accounts = await res.json();
    return accounts;
  }

  async function search(accountNumber) {
    const res = await fetch(`${accountsURL}/${accountNumber}`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function searchAll() {
    const res = await fetch(`${accountsURL}`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function updateAccount(accountFields) {
    const res = await fetch(`${accountsURL}`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function deleteAccount(accountNumber) {
    const res = await fetch(`${accountsURL}/${accountNumber}`, {
      method: "DELETE",
    });

    return res;
  }

  return {
    createAccount,
    searchAll,
    search,
    updateAccount,
    deleteAccount,
  };
}

const accountServices = AccountServices();
export default accountServices;
