import { apiURL } from "./serviceConstants";

export function AccountServices() {
  async function createAccount(accountFields) {
    const res = await fetch(`${apiURL}/contas`, {
      method: "POST",
      body: accountFields,
      headers: {
        "Content-Type": "application/json",
      },
    });

    const accounts = await res.json();
    return accounts;
  }

  async function searchAccount(accountFields) {
    const res = await fetch(`${apiURL}/contas`, {
      method: "POST",
      body: accountFields,
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

  async function deleteAccount(accountFields) {
    const res = await fetch(`${apiURL}/contas/`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  return {
    createAccount,
    searchAccount,
    updateAccount,
    deleteAccount,
  };
}

const accountServices = AccountServices();
export default accountServices;
