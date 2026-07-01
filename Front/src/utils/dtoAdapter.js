// Utils -----
const invertMap = (map) =>
  Object.fromEntries(Object.entries(map).map(([k, v]) => [v, k]));

const renameKeys = (map, obj = {}) =>
  Object.fromEntries(
    Object.entries(obj).map(([key, value]) => [map[key] ?? key, value]),
  );

export const dtoToLocal = (map, dto = {}) => renameKeys(map, dto);

export const localToDto = (map, local = {}) =>
  renameKeys(invertMap(map), local);

export const createKeyAdapter = (map) => ({
  toLocal: (dto) => dtoToLocal(map, dto),
  toDto: (local) => localToDto(map, local),
});

// Key Maps (DTO -> Local) -------------
export const clienteKeyMap = {
  nome: "name",
  cpf: "cpf",
  telefone: "phone",
  sexo: "gender",
};

export const itemDoCardapioKeyMap = {
  codigo: "itemCode",
  desc: "itemDescription",
  tipo: "itemType",
  valor: "unitPrice",
};

export const itemKeyMap = {
  codigo: "itemCode",
  descricao: "itemDescription",
  gorjeta: "tipPercentage",
  loco: "itemType",
};

export const contaRequestKeyMap = {
  numero: "accountNumber",
  status: "accountStatus",
  dono: "cpf",
  quem_abriu: "waiterCode",
};

// Fields that are not scalars / primitive, but are collections or classes (Cliente)
// Are not described at Fields, so they are out of this dtoMapping
export const contaResponseKeyMap = {
  numero: "accountNumber",
  status: "accountStatus",
  data: "date",
  hora: "time",
};

export const usuarioRequestKeyMap = {
  codigo: "userCode",
  nome: "name",
  email: "email",
  senha: "password",
  tipo: "userType",
};

export const usuarioResponseKeyMap = {
  codigo: "userCode",
  nome: "name",
  email: "email",
  tipo: "userType",
};

export const compraKeyMap = {
  codigo: "itemCode",
  tipo: "itemType",
  usuario: "waiterCode",
};

// ============================================================
const dtoAdapter = {
  client: createKeyAdapter(clienteKeyMap),
  menuItem: createKeyAdapter(itemDoCardapioKeyMap),
  item: createKeyAdapter(itemKeyMap),
  contaRequestAdapter: createKeyAdapter(contaRequestKeyMap),
  contaResponseAdapter: createKeyAdapter(contaResponseKeyMap),
  usuarioRequestAdapter: createKeyAdapter(usuarioRequestKeyMap),
  usuarioResponseAdapter: createKeyAdapter(usuarioResponseKeyMap),
  compraAdapter: createKeyAdapter(compraKeyMap),
};

export default dtoAdapter;
