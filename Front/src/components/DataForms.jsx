import { useEffect, useImperativeHandle, useState } from "react";
import { Lock } from "lucide-react";

const DataForms = function DataForms({
  data = [],
  setData,
  fields = [],
  editableFields = [],
  onChange,
  ref,

  className = "",
  style = {},
}) {
  // STATES -------------------------

  const [editing, setEditing] = useState(null);

  const [draft, setDraft] = useState("");
  const [validations, setValidations] = useState({});

  // HELPERS -----------------------

  const isEditable = (key) =>
    editableFields.includes("*") || editableFields.includes(key);

  const getField = (key) => fields.find((f) => f.key === key);

  const resolveInitialValue = (field) => {
    if (field.autoPopulate !== undefined) {
      return typeof field.autoPopulate === "function"
        ? field.autoPopulate()
        : field.autoPopulate;
    }

    if (field.defaultValue !== undefined) {
      return typeof field.defaultValue === "function"
        ? field.defaultValue()
        : field.defaultValue;
    }

    return null;
  };

  // VALIDATION ----------------------
  useImperativeHandle(ref, () => ({
    setFieldValidation({ field, message, severity = "error" }) {
      setValidations((prev) => ({
        ...prev,
        [field]: {
          message,
          severity,
        },
      }));
    },

    clearFieldValidation(field) {
      setValidations((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    },

    clearValidations() {
      setValidations({});
    },

    hasErrors() {
      return Object.values(validations).some((v) => v.severity === "error");
    },

    async validate(validator) {
      setValidations({});

      const result = await validator(data[0]);

      if (result.valid) return true;

      const next = {};

      Object.entries(result.fields ?? {}).forEach(([field, validation]) => {
        next[field] =
          typeof validation === "string"
            ? {
                message: validation,
                severity: "error",
              }
            : {
                severity: "error",
                ...validation,
              };
      });

      setValidations(next);

      return false;
    },
  }));

  // INITIALIZE MISSING VALUES ------------------------

  useEffect(() => {
    if (!fields.length || !data.length) return;

    let changed = false;

    const initialized = data.map((row) => {
      const copy = { ...row };

      fields.forEach((field) => {
        if (copy[field.key] === undefined || copy[field.key] === null) {
          copy[field.key] = resolveInitialValue(field);
          changed = true;
        }
      });

      return copy;
    });

    if (changed) {
      setData(initialized);
    }
  }, [setData]);

  // EDITING ------------------------------

  function beginEdit(rowIndex, key) {
    if (!isEditable(key)) return;

    setValidations((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    setEditing({
      row: rowIndex,
      key,
    });

    setDraft(data[rowIndex][key] ?? "");
  }

  function cancelEdit() {
    setEditing(null);
    setDraft("");
  }

  function saveEdit() {
    if (!editing) return;

    const updated = data.map((row, idx) =>
      idx === editing.row
        ? {
            ...row,
            [editing.key]: draft,
          }
        : row,
    );

    setData(updated);

    setEditing(null);
    setDraft("");

    onChange?.(updated);
  }

  function handleInputKeyDown(e) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") cancelEdit();
  }

  // INPUT RENDERERS -------------------------

  function renderInput(field) {
    switch (field.inputType) {
      case "number":
        return (
          <input
            autoFocus
            type="number"
            value={draft}
            onInput={(e) => {
              const input = e.currentTarget;
              if (input.value.length > field.maxLength) {
                input.value = input.value.slice(0, field.maxLength);
              }
            }}
            pattern="\d*"
            onChange={(e) => setDraft(Number(e.target.value))}
            onBlur={saveEdit}
            onKeyDown={handleInputKeyDown}
            maxLength={field.maxLength}
            className="w-full rounded border border-blue-300 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
          />
        );

      case "date":
        return (
          <input
            autoFocus
            type="date"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleInputKeyDown}
            className="w-full rounded border border-blue-300 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
          />
        );

      case "select":
        return (
          <select
            autoFocus
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            className="w-full rounded border border-blue-300 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
          >
            {field.options?.map((option) => {
              const label = option?.label || option;

              return <option key={label}>{label}</option>;
            })}
          </select>
        );

        case "password":
          return (
            <input
              autoFocus
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onBlur={saveEdit}
              onKeyDown={handleInputKeyDown}
              maxLength={field.maxLength}
              type="password"
              className="w-full rounded border border-blue-300 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
            />
          );

      default:
        return (
          <input
            autoFocus
            type="text"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={handleInputKeyDown}
            maxLength={field.maxLength}
            className="w-full rounded border border-blue-300 px-2 py-1 outline-none focus:ring-2 focus:ring-blue-400"
          />
        );
    }
  }

  // FIELD RENDERER -------------------------

  function renderValue(row, rowIndex, field) {
    const validation = validations[field.key];

    const validationStyle = validation
      ? {
          error: {
            border: "border-red-500",
            bg: "bg-red-50",
            text: "text-red-600",
          },
          warning: {
            border: "border-yellow-500",
            bg: "bg-yellow-50",
            text: "text-yellow-700",
          },
          info: {
            border: "border-blue-500",
            bg: "bg-blue-50",
            text: "text-blue-700",
          },
        }[validation.severity]
      : {};

    const active =
      editing && editing.row === rowIndex && editing.key === field.key;

    return (
      <div
        className={`
          border-b
          px-4
          py-3
          flex
          flex-col
          justify-center

          ${validationStyle?.border ?? ""}
          ${validationStyle?.bg ?? ""}

          ${isEditable(field.key) ? "cursor-text hover:bg-blue-50" : "text-gray-500"}
        `}
        onClick={active ? undefined : () => beginEdit(rowIndex, field.key)}
      >
        {active ? (
          <>
            {renderInput(field)}

            {validation && (
              <div className={`mt-1 text-left text-xs ${validationStyle.text}`}>
                {validation.message}
              </div>
            )}
          </>
        ) : (
          <>
            <div className="rounded px-2 py-1 transition-colors">
              {String(row[field.key] ?? "—")}
            </div>

            {validation && (
              <div className={`mt-1 text-left text-xs ${validationStyle.text}`}>
                {validation.message}
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  // RENDER --------------
  return (
    <div className={className} style={style}>
      {data.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="h-full w-full overflow-hidden rounded-xl border border-gray-200 shadow-sm"
        >
          {/* Show record index if there's more than one */}
          {data.length > 1 && (
            <div className="border-b bg-gray-50 px-4 py-2 font-medium">
              Registro {rowIndex + 1}
            </div>
          )}

          <div className="grid grid-cols-[250px_1fr] w-full h-full">
            {fields.map((field) => (
              <div key={field.key} className="contents">
                {/* Label */}
                <div className="border-b border-r bg-gray-50 px-4 py-3 font-medium text-gray-700 flex items-center gap-2">
                  {!isEditable(field.key) && (
                    <Lock size={14} className="text-gray-400" />
                  )}

                  {field.label ?? field.key}
                </div>

                {/* Value */}
                {renderValue(row, rowIndex, field)}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
export default DataForms;
