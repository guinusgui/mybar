import { apiURL } from "./serviceConstants";

export default async function updateAccount(accountFields) {
  const res = await fetch(`${apiURL}/accounts/`, {
    method: "POST",
    body: accountFields,
  });

  const accounts = await res.json();
  return accounts;
}
