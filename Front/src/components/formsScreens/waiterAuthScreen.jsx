import { CircleCheck } from "lucide-react";
import WaiterAuthForms from "../forms/WaiterAuthForms";

export default function WaiterAuthScreen({
  onSubmit,
  onChange,
  editableFields = ["*"],
  ref,
  dataRef = null,

  className = "",
  style = {},
}) {
  return (
    <>
      <WaiterAuthForms
        editableFields={editableFields}
        onChange={onChange}
        ref={ref}
        dataRef={dataRef}
        className={className}
        style={style}
      />

      <div className="p-4 px-6 flex flex-row justify-end">
        <button
          className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
          onClick={onSubmit}
        >
          <CircleCheck className="inline" /> Autorizar
        </button>
      </div>
    </>
  );
}
