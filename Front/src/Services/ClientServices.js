import { apiURL, jsonHeaders } from "./serviceConstants";

const clientURL = `${apiURL}/clientes`;

export function ClientServices() {
  async function create(data) {
    const res = await fetch(clientURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { ...jsonHeaders },
    });

    const accounts = await res.json();
    return accounts;
  }

  async function search(CPF) {
    const res = await fetch(`${clientURL}/${CPF}`, {
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
    search,
    update,
    remove,
  };
}

const clientServices = ClientServices();
export default clientServices;
