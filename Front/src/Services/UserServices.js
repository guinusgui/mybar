import { apiURL, jsonHeaders } from "./serviceConstants";

const clientURL = `${apiURL}/usuarios`;

export function UserServices() {
  async function create(data) {
    const res = await fetch(clientURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { ...jsonHeaders },
    });

    const accounts = await res.json();
    return accounts;
  }

  async function searchAll() {
    const res = await fetch(`${clientURL}`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function update(accountFields) {
    const res = await fetch(clientURL, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function remove(accountFields) {
    const res = await fetch(clientURL, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  return {
    create,
    searchAll,
    update,
    remove,
  };
}

const userServices = UserServices();
export default userServices;
