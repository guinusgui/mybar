import { serverURL } from "./serviceConstants";

export default async function createAccount(accountFields) {
  const res = await fetch(`${serverURL}/accounts/`, {
    method: "POST",
    body: accountFields,
  });

  const accounts = await res.json();
  return accounts;
}
