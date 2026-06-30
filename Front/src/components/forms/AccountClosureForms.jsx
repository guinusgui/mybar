import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.accountNumber(),
  Fields.cpf(),
  Fields.name(),

  Fields.totalValue(),
  Fields.paymentValue(),
  Fields.paymentMethod(),
  Fields.waiterCode(),
  Fields.waiterPassword(),
];

export default function AccountClosureForms({
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
