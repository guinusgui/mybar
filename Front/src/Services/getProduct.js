import { apiURL } from "./serviceConstants";

export default async function getProductById(accountFields) {
  const res = await fetch(`${apiURL}/accounts/`, {
    method: "POST",
    body: accountFields,
  });

  const accounts = await res.json();
  return accounts;
}
