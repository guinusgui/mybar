import { useState } from "react";
import DataForms from "@/components/DataForms";

import { Fields } from "@/catalog/fields";
import BaseForms from "./BaseForms";

export const fields = [Fields.username(), Fields.password()];

export default function WaiterAuthForms({
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
