import { Lock } from "lucide-react";
import BaseHeader from "./BaseHeader";

export default function JsonTable({
  data = [],
  editableFields = [],
  fields = null,
  actionsColumn = null,
  title = null,

  className = "",
  style = {},
}) {
  const cols =
    fields ||
    (data.length
      ? Object.keys(data[0]).map((key) => ({
          key,
          label: key,
        }))
      : []);

  const isFieldEditable = (field) =>
    editableFields.includes("*") || editableFields.includes(field.key);

  const createHeaderCell = (field) => (
    <th
      key={field.key}
      className="text-center px-4 py-3 font-medium text-gray-600 whitespace-nowrap"
    >
      <span className="inline-flex items-center gap-1.5">
        {field.label}

        {/* {!isFieldEditable(field) && (
          <Lock size={12} className="text-gray-400" />
        )} */}
      </span>
    </th>
  );

  const createContentCell = (row, field) => {
    const editable = isFieldEditable(field);

    let value = row[field.key];

    if (field.renderTable) {
      value = field.renderTable(value, row);
    }

    return (
      <td key={field.key} className="px-4 py-2.5 align-middle text-center">
        <span className={editable ? "text-gray-900" : "text-gray-500"}>
          {value ?? "—"}
        </span>
      </td>
    );
  };

  const createActionsCell = (row) => (
    <td className="px-4 py-2.5 text-center">
      <div className="flex justify-center gap-2">
        {actionsColumn.actions
          .filter((action) => action.visible?.(row) ?? true)
          .map((action, idx) => (
            <button
              key={idx}
              type="button"
              disabled={action.disabled?.(row)}
              onClick={() => action.onClick(row)}
              className="cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {action.icon}
            </button>
          ))}
      </div>
    </td>
  );

  return (
    <div
      className={`overflow-x-auto rounded-xl border border-gray-200 shadow-sm ${className}`}
      style={style}
    >
      {title && <BaseHeader>{title}</BaseHeader>}

      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            {actionsColumn && (
              <th className="text-center px-4 py-3 font-medium text-gray-600 whitespace-nowrap">
                {actionsColumn.label}
              </th>
            )}

            {cols.map(createHeaderCell)}
          </tr>
        </thead>

        <tbody>
          {data.length ? (
            data.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 last:border-0 hover:bg-gray-50/60 transition-colors"
              >
                {actionsColumn && createActionsCell(row)}

                {cols.map((field) => createContentCell(row, field))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={cols.length + (actionsColumn ? 1 : 0)}
                className="px-6 py-8 text-center text-sm text-gray-500"
              >
                Nenhum dado para exibir.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
