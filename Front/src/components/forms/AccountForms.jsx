import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.cpf(),
  Fields.name(),
  Fields.phone(),
  Fields.gender(),
  Fields.date(),
  Fields.time(),
  Fields.accountNumber(),
  Fields.waiterCode(),
  Fields.waiterPassword(),
];

export default function AccountForms({
  editableFields = [],
  onChange,
  ref,
  dataRef = null,

  className = "",
  style = {},
}) {
  return (
    <BaseForms
      fields={fields}
      ref={ref}
      dataRef={dataRef}

      editableFields={editableFields}
      onChange={onChange}
      className={className}
      style={style}
    />
  );
}
