import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.itemCode(),
  Fields.itemDescription(),
  Fields.itemType(),
  Fields.unitPrice(),
  Fields.tipPercentage(),
];

export default function ItemForms({
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
