import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.accountNumber(),
  Fields.cpf(),
  Fields.name(),

  Fields.itemCode(),
  Fields.description(),
  Fields.unitPrice(),
  Fields.quantity(),
  Fields.waiterCode(),
  Fields.waiterPassword(),
];

export default function ItemRegisterForms({
  editableFields = [],
  onChange,
  ref,
  dataRef = null,
  setData = null,

  className = "",
  style = {},
}) {
  return (
    <BaseForms
      fields={fields}
      ref={ref}
      dataRef={dataRef}
      setData={setData}

      editableFields={editableFields}
      onChange={onChange}
      className={className}
      style={style}
    />
  );
}
