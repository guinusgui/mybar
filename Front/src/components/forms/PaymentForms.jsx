// import { useState } from "react";
// import DataForms from "@/components/DataForms";
// import { CircleCheck } from "lucide-react";

// export default function PaymentForms({ onSubmit }) {
//   const [a, setA] = useState([
//     {
//       Forma: "",
//       Valor: "",
//     },
//   ]);

//   const submit = () => {
//     onSubmit(a);
//   };

//   return (
//     <>
//       <DataForms data={a} setData={setA} editableFields={["*"]} />

//       <div className="p-4 px-6 flex flex-row justify-end">
//         <button
//           className="juicyButton font-medium border-2 border-dashed rounded-xl p-1"
//           onClick={submit}
//         >
//           <CircleCheck className="inline" /> Inserir Pagamento
//         </button>
//       </div>
//     </>
//   );
// }

import BaseForms from "./BaseForms";
import { Fields } from "@/catalog/fields";

export const fields = [Fields.paymentMethod(), Fields.paymentValue()];

export default function PaymentForms({
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
