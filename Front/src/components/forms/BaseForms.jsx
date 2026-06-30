import DataForms from "../DataForms";
import { useState, useImperativeHandle, useCallback } from "react";

export default function BaseForms({
  editableFields = [],
  onChange,
  ref,
  dataRef = null,
  fields,
  setData = null,

  className = "",
  style = {},
}) {
  const [_data, _setData] = useState([{}]);

  // const externalSetData = null;
  const externalSetData = useCallback(
    (newData) => {
      setData(newData, _setData);
    },
    [setData, _setData],
  );

  useImperativeHandle(dataRef, () => ({
    getData: () => _data,
  }));

  return (
    <DataForms
      data={_data}
      setData={setData ? externalSetData : _setData}
      fields={fields}

      editableFields={editableFields}
      onChange={onChange}
      ref={ref}
      className={className}
      style={style}
    />
  );
}
