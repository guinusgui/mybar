import JsonTable from "../Generics/JsonTableForm";

export default function BaseTable({
  data = [],
  editableFields = [],
  fields = null,
  actionsColumn = null,
  title = null,

  className = "",
  style = {},
  ...props
}) {
  return (
    <JsonTable
      data={data}
      editableFields={editableFields}
      fields={fields}
      actionsColumn={actionsColumn}
      title={title}
      className={className}
      style={style}
      {...props}
    />
  );
}
