import BaseTable from "./BaseTable";
import { Fields } from "@/catalog/fields";

const fields = [
  Fields.accountNumber(),
  Fields.userType(),
  Fields.itemDescription(),

  // The actual requirement is to date and time be joined into a single field
  Fields.date(),
  Fields.time(),
  Fields.accountStatus(),
];

export default function KitchenOrdersTable({
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
