import { apiURL, jsonHeaders } from "./serviceConstants";

const menuURL = `${apiURL}/cardapio`;

export function MenuServices() {
  async function create(data) {
    const res = await fetch(menuURL, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { ...jsonHeaders },
    });

    const accounts = await res.json();
    return accounts;
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

  async function remove(itemCode) {
    const res = await fetch(`${menuURL}/${itemCode}`, {
      method: "DELETE",
    });

    return res;
  }

  return {
    create,
    search,
    searchAll,
    update,
    remove,
  };
}

const menuServices = MenuServices();
export default menuServices;
