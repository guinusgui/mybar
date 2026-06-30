import BaseTable from "./BaseTable";
import { Fields } from "@/catalog/fields";

const fields = [
  Fields.itemCode(),
  Fields.itemDescription(),
  Fields.fromKitchen(),
  Fields.tipPercentage(),
];

export default function ItemTypesTable({
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
