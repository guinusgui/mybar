import { apiURL, jsonHeaders } from "./serviceConstants";

const menuURL = `${apiURL}/pedidos`;

export function ShoppingServices() {
  async function create(accountNumber, data) {
    const res = await fetch(`${menuURL}/${accountNumber}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { ...jsonHeaders },
    });

    return res;
  }

  async function search(codigo) {
    const res = await fetch(`${menuURL}/${codigo}`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function searchAll() {
    const res = await fetch(`${menuURL}`, {
      method: "GET",
    });

    const accounts = await res.json();
    return accounts;
  }

  async function update(accountFields) {
    const res = await fetch(menuURL, {
      method: "POST",
      body: accountFields,
    });

    const accounts = await res.json();
    return accounts;
  }

  async function remove(codigo) {
    const res = await fetch(`${menuURL}/${codigo}`, {
      method: "DELETE",
    });

    return res;
  }

  return {
    create,
    searchAll,
    search,
    update,
    remove,
  };
}

const shoppingServices = ShoppingServices();
export default shoppingServices;
