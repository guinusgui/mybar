import BaseTable from "./BaseTable";
import { Fields } from "@/catalog/fields";

const fields = [Fields.userCode(), Fields.name(), Fields.userType()];

export default function UserTable({
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
