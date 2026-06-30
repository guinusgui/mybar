import BaseTable from "./BaseTable";
import { Fields } from "@/catalog/fields";

const fields = [
  Fields.cpf(),
  Fields.name(),
  Fields.phone(),
  Fields.accountNumber(),
  Fields.accountOpened(),
];

export default function RegisteredAccountsTable({
  data = [],
  editableFields = [],
  actionsColumn = null,
  title = null,

  className = "",
  style = {},
  ...props
}) {
  return (
    <BaseTable
      data={data}
      fields={fields}
      editableFields={editableFields}
      actionsColumn={actionsColumn}
      title={title}
      className={className}
      style={style}
      {...props}
    />
  );
}
