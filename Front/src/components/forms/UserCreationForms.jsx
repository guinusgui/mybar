import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [
  Fields.userCode(),
  Fields.name(),
  Fields.userType(),
  Fields.email(),
  Fields.password(),
];

export default function UserCreationForms({
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
