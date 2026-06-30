import { serverURL } from "./serviceConstants";

export function AccountServices() {
  async function createAccount(accountFields) {
    const res = await fetch(`${serverURL}/accounts/`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function searchAccount(accountFields) {
    const res = await fetch(`${serverURL}/accounts/`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function updateAccount(accountFields) {
    const res = await fetch(`${serverURL}/accounts/`, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function deleteAccount(accountFields) {
    const res = await fetch(`${serverURL}/accounts/`, {
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
