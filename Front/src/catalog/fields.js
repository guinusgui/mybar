const createField =
  (defaults) =>
  (overrides = {}) => ({
    ...defaults,
    ...overrides,
  });

export const Fields = {
  date: createField({
    key: "date",
    label: "Data",
    inputType: "date",
  }),

  time: createField({
    key: "time",
    label: "Hora",
    inputType: "time",
  }),

  currency: createField({
    inputType: "currency",
    precision: 2,
  }),

  percentage: createField({
    inputType: "percentage",
  }),

  yesNo: createField({
    inputType: "select",
    options: [
      { value: true, label: "Sim" },
      { value: false, label: "Não" },
    ],
  }),

  //--------------------------------------------------------
  // Person
  //--------------------------------------------------------

  cpf: createField({
    key: "cpf",
    label: "CPF",
    inputType: "text",
    mask: "cpf",
    maxLength: 14,
  }),

  name: createField({
    key: "name",
    label: "Nome",
    inputType: "text",
    maxLength: 255,
  }),

  phone: createField({
    key: "phone",
    label: "Celular",
    inputType: "text",
    mask: "phone",
  }),

  gender: createField({
    key: "gender",
    label: "Sexo",
    inputType: "select",
    options: ["MASCULINO", "FEMININO"],
  }),

  email: createField({
    key: "email",
    label: "Email",
    inputType: "email",
  }),

  //--------------------------------------------------------
  // Account
  //--------------------------------------------------------

  accountNumber: createField({
    key: "accountNumber",
    label: "Conta",
    inputType: "number",
    maxLength: 4,
  }),

  accountOpened: createField({
    key: "accountOpened",
    label: "Aberta?",
    inputType: "select",
    options: ["ABERTA", "FECHADA"],
  }),

  accountStatus: createField({
    key: "accountStatus",
    label: "Status",
    inputType: "select",
    options: [
      { value: "required", label: "Solicitado" },
      { value: "received", label: "Recebido" },
      { value: "provided", label: "Entregue" },
    ],
  }),

  //--------------------------------------------------------
  // Waiter
  //--------------------------------------------------------

  waiterCode: createField({
    key: "waiterCode",
    label: "Código do Garçom",
    inputType: "number",
    maxLength: 4,
  }),

  waiterPassword: createField({
    key: "waiterPassword",
    label: "Senha do Garçom",
    inputType: "password",
    maxLength: 4,
  }),

  waiterName: createField({
    key: "waiterName",
    label: "Nome do Garçom",
    inputType: "text",
    readOnly: true,
  }),

  //--------------------------------------------------------
  // Attendant
  //--------------------------------------------------------

  attendantCode: createField({
    key: "attendantCode",
    label: "Código do Atendente",
    inputType: "number",
    maxLength: 4,
  }),

  attendantPassword: createField({
    key: "attendantPassword",
    label: "Senha do Atendente",
    inputType: "password",
    maxLength: 4,
  }),

  //--------------------------------------------------------
  // Menu Item
  //--------------------------------------------------------

  itemCode: createField({
    key: "itemCode",
    label: "Código",
    inputType: "number",
    maxLength: 4,
  }),

  description: createField({
    key: "description",
    label: "Descrição",
    inputType: "text",
    maxLength: 255,
  }),

  itemType: createField({
    key: "itemType",
    label: "Tipo",
    inputType: "number",
    maxLength: 4,
    options: [],
  }),

  quantity: createField({
    key: "quantity",
    label: "Quantidade",
    inputType: "number",
    maxLength: 2,
  }),

  unitPrice: createField({
    key: "unitPrice",
    label: "Valor Unitário",
    inputType: "currency",
  }),

  tipPercentage: createField({
    key: "tipPercentage",
    label: "% Gorjeta",
    inputType: "percentage",
  }),

  from: createField({
    key: "from",
    label: "Origem",
    inputType: "select",
    options: ["BAR", "COZINHA"],
  }),

  //--------------------------------------------------------
  // Payment
  //--------------------------------------------------------

  paymentMethod: createField({
    key: "paymentMethod",
    label: "Forma de Pagamento",
    inputType: "select",
    options: ["Crédito", "Débito", "Pix", "Espécie", "Entrega de Itens"],
  }),

  totalValue: createField({
    key: "totalValue",
    label: "Valor Total",
    inputType: "currency",
  }),

  paymentValue: createField({
    key: "paymentValue",
    label: "Valor Pago",
    inputType: "currency",
  }),

  //--------------------------------------------------------
  // User
  //--------------------------------------------------------

  userCode: createField({
    key: "userCode",
    label: "Código",
    inputType: "number",
    maxLength: 4,
  }),

  username: createField({
    key: "username",
    label: "Usuário",
    inputType: "text",
    maxLength: 100,
  }),

  password: createField({
    key: "password",
    label: "Senha",
    inputType: "password",
    maxLength: 100,
  }),

  userType: createField({
    key: "userType",
    label: "Tipo",
    inputType: "select",
    options: ["ADMIN", "COZINHA", "GARCOM", "ATENDENTE"],
  }),

  //--------------------------------------------------------
  // Configuration
  //--------------------------------------------------------

  maleTicketPrice: createField({
    key: "maleTicketPrice",
    label: "Ingresso Masculino",
    inputType: "currency",
  }),

  femaleTicketPrice: createField({
    key: "femaleTicketPrice",
    label: "Ingresso Feminino",
    inputType: "currency",
  }),
};
