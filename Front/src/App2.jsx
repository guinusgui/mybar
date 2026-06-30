// import JsonTableForm from "./Components/Generics/JsonTableForm";
import JsonTableForm from "./components/Generics/JsonTableForm";
import Modal from "./components/Generics/Modal";
import { useState } from "react";
import {
  Eye,
  Trash2,
  SquarePen,
  ArrowUpToLine,
  CircleX,
  Search,
  CirclePlus,
} from "lucide-react";
import DataForms from "./components/DataForms";
import BaseHeader from "./components/Generics/BaseHeader";

import SearchAccounts from "./components/Screens/SearchAccounts";
import "./tail.css";
import "@/styles/core.css";
import { ConfirmationProvider } from "./components/ConfirmationProvider";
import ModalProvider from "./components/ModalProvider";
import AccountClosure from "./components/Screens/AccountClosure";
import PaymentForms from "./components/forms/PaymentForms";
import WaiterAuth from "./components/forms/WaiterAuthForms";
import WaiterAuthScreen from "./components/formsScreens/waiterAuthScreen";
import PostItemsForms from "./components/Screens/PostItemsForms";
import MenuManagingScreen from "./components/Screens/MenuManagingScreen";
import ItemTypeManagingScreen from "./components/Screens/ItemTypeManagingScreen";
import KitchenControlScreen from "./components/Screens/KitchenControlScreen";
import DeliveryControlScreen from "./components/Screens/DeliveryControlScreen";
import SettingsScreen from "./components/Screens/SettingsScreen";
import UserManagingScreen from "./components/Screens/UserManagingScreen";

export default function App2() {
  const [open, setOpen] = useState(false);

  return (
    <ConfirmationProvider>
      <ModalProvider>
        <div className="m-4 p-4 h-[90dvh] overflow-scroll relative">
          {/* <SearchAccounts></SearchAccounts> */}

          {/* <PostItemsForms></PostItemsForms> */}
          {/* <WaiterAuth></WaiterAuth> */}
          {/* <WaiterAuthScreen></WaiterAuthScreen> */}
          {/* <AccountClosure /> */}
          {/* <PaymentForms /> */}
          {/* <WaiterAuth></WaiterAuth> */}

          {/* <MenuManagingScreen /> */}
          {/* <ItemTypeManagingScreen /> */}
          {/* <KitchenControlScreen /> */}
          {/* <DeliveryControlScreen /> */}
          {/* <SettingsScreen /> */}
          <UserManagingScreen />
        </div>
        {/* <AccountForms></AccountForms> */}
      </ModalProvider>
    </ConfirmationProvider>
  );

  // return (
  //   <>
  //     <button onClick={() => setOpen(true)}>Abrir modal</button>

  //     <Modal
  //       isOpen={open}
  //       onClose={() => setOpen(false)}
  //       title="Detalhes"
  //       style={{
  //         width: "90dvw",
  //         height: "90dvh",
  //       }}
  //     >
  //       <JsonTableForm
  //         data={data}
  //         editableFields={["*"]} // id e email ficam read-only
  //         onChange={setData}
  //       />
  //     </Modal>
  //   </>
  // );
}
