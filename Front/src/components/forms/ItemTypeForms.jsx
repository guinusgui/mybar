import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.itemType(),
  Fields.description(),
  Fields.tipPercentage(),
  Fields.from(),
];

export default function ItemTypeForms({
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
