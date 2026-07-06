const stringToCanonical = {
  number: (v) => Number(v),
  text: (v) => v,
  boolean: (v) => v === "true",
  decimalPercentage: (v) => Number(v) * 100,
  date: (v) => v,
  time: (v) => v,
};

const canonicalTotext = {
  number: (c) => String(c),
  text: (c) => c,
  boolean: (c) => String(c),

  // TODO: This won't generate a approx error?
  decimalPercentage: (c) => String(Number(c) / 100),
  date: (c) => c,
  time: (c) => c,
};

export const convertValue = (fromType, toType, v) => {
  if (v == null || v === "") return v;
  if (fromType === toType) return v;
  const canonicalize = canonicalTotext[fromType] ?? ((x) => x);
  const reconstruct = stringToCanonical[toType] ?? ((x) => x);
  return reconstruct(canonicalize(v));
};

// ============================================================

export const frontTypeOf = {
  number: "string",
  string: "string",
  boolean: "string",
  decimalPercentage: "string",
  isoDate: "date",
  isoTime: "time",
};

// ============================================================

const invertMap = (map) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));

// ============================================================

export const dtoToLocal = (
  keyMap,
  serverTypeMap,
  dto = {},
  onlyKnownKeys = true,
) => {
  const entries = Object.entries(dto)
    .filter(([dtoKey]) => !onlyKnownKeys || dtoKey in keyMap)
    .map(([dtoKey, dtoValue]) => {
      const localKey = keyMap[dtoKey] ?? dtoKey;
      const serverType = serverTypeMap[dtoKey];
      const localType = frontTypeOf[serverType] ?? serverType;
      return [localKey, convertValue(serverType, localType, dtoValue)];
    });
  return Object.fromEntries(entries);
};

// Acho que vai dar meio errado (era pro tipo ser extraido do Fields não?)
export const localToDto = (
  keyMap,
  serverTypeMap,
  local = {},
  onlyKnownKeys = true,
) => {
  const invertedKeyMap = invertMap(keyMap); // localKey -> dtoKey
  const entries = Object.entries(local)
    .filter(([localKey]) => !onlyKnownKeys || localKey in invertedKeyMap)
    .map(([localKey, localValue]) => {
      const dtoKey = invertedKeyMap[localKey] ?? localKey;
      const serverType = serverTypeMap[dtoKey];
      const localType = frontTypeOf[serverType] ?? serverType;
      return [dtoKey, convertValue(localType, serverType, localValue)];
    });
  return Object.fromEntries(entries);
};

export const createDtoAdapter = (keyMap, serverTypeMap) => ({
  toLocal: (dto) => dtoToLocal(keyMap, serverTypeMap, dto),
  toDto: (local) => localToDto(keyMap, serverTypeMap, local),
});

// ============================================================

// ---- Cliente ----
export const clienteKeyMap = {
  nome: "name",
  cpf: "cpf",
  telefone: "phone",
  sexo: "gender",
};
export const clienteServerTypes = {
  nome: "text",
  cpf: "text",
  telefone: "text",
  sexo: "text",
};

// ---- ItemDoCardapio ----
export const itemDoCardapioKeyMap = {
  codigo: "itemCode",
  desc: "description",
  tipo: "itemType",
  valor: "unitPrice",
};
export const itemDoCardapioServerTypes = {
  codigo: "number",
  desc: "text",
  tipo: "text",
  valor: "number",
};

// ---- Item ----
export const itemKeyMap = {
  codigo: "itemCode",
  descricao: "description",
  gorjeta: "tipPercentage",
  loco: "itemType",
};
export const itemServerTypes = {
  codigo: "number",
  descricao: "text",
  gorjeta: "decimalPercentage",
  loco: "text",
};

// ---- ContaRequest ----
export const contaRequestKeyMap = {
  numero: "accountNumber",
  status: "accountStatus",
  dono: "cpf",
  quem_abriu: "waiterCode",
};
export const contaRequestServerTypes = {
  numero: "number",
  status: "text",
  dono: "text",
  quem_abriu: "number",
};

// ---- ContaResponse ----
// Nested/non-scalar fields (Cliente, Usuario, List<Compra>) aren't
// primitives, so they stay out of these maps.
export const contaResponseKeyMap = {
  numero: "accountNumber",
  status: "accountStatus",
  data: "date",
  hora: "time",
};
export const contaResponseServerTypes = {
  numero: "number",
  status: "text",
  data: "isoDate",
  hora: "isoTime",
};

// ---- UsuarioRequest ----
export const usuarioRequestKeyMap = {
  codigo: "userCode",
  nome: "name",
  email: "email",
  senha: "password",
  tipo: "userType",
};
export const usuarioRequestServerTypes = {
  codigo: "number",
  nome: "text",
  email: "text",
  senha: "text",
  tipo: "text",
};

// ---- UsuarioResponse ----
export const usuarioResponseKeyMap = {
  codigo: "userCode",
  nome: "name",
  email: "email",
  tipo: "userType",
};
export const usuarioResponseServerTypes = {
  codigo: "number",
  nome: "text",
  email: "text",
  tipo: "text",
};

// ---- Compra ----
export const compraKeyMap = {
  codigo: "itemCode",
  tipo: "itemType",
  usuario: "waiterCode",
};
export const compraServerTypes = {
  codigo: "number",
  tipo: "text",
  usuario: "number",
};

// ============================================================

const dtoAdapter = {
  client: createDtoAdapter(clienteKeyMap, clienteServerTypes),
  menuItem: createDtoAdapter(itemDoCardapioKeyMap, itemDoCardapioServerTypes),
  item: createDtoAdapter(itemKeyMap, itemServerTypes),
  contaRequestAdapter: createDtoAdapter(
    contaRequestKeyMap,
    contaRequestServerTypes,
  ),
  contaResponseAdapter: createDtoAdapter(
    contaResponseKeyMap,
    contaResponseServerTypes,
  ),
  usuarioRequestAdapter: createDtoAdapter(
    usuarioRequestKeyMap,
    usuarioRequestServerTypes,
  ),
  usuarioResponseAdapter: createDtoAdapter(
    usuarioResponseKeyMap,
    usuarioResponseServerTypes,
  ),
  compraAdapter: createDtoAdapter(compraKeyMap, compraServerTypes),
};

export default dtoAdapter;

// ============================================================
// Example
// ============================================================
//
const x = dtoAdapter.contaRequestAdapter.toLocal({
  numero: 10,
  status: "ABERTA",
  dono: "12345678909",
  quem_abriu: 1,
});
const y = dtoAdapter.contaRequestAdapter.toDto(x);
console.log(x);
console.log(y);
// => { accountNumber: "10", accountStatus: "ABERTA", cpf: "12345678909", waiterCode: "1" }
//
// dtoAdapter.contaRequestAdapter.toDto({ accountNumber: "10", accountStatus: "ABERTA", cpf: "12345678909", waiterCode: "1" })
// => { numero: 10, status: "ABERTA", dono: "12345678909", quem_abriu: 1 }
//
// dtoAdapter.contaResponseAdapter.toLocal({ numero: 10, status: "ABERTA", data: "2026-06-30", hora: "14:35:00" })
// => { accountNumber: "10", accountStatus: "ABERTA", date: Date(2026-06-30), time: "14:35" }
//
// convertValue("decimalPercentage", "text", 0.1) // "10"
// convertValue("number", "decimalPercentage", 10)   // 0.1
