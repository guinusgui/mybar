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
import ScreenSelector from "./components/Screens/ScreenSelector";

import { Toaster } from "react-hot-toast";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import routes from "./routes";

export default function App2() {
  const [open, setOpen] = useState(false);

  return (
    <ConfirmationProvider>
      <ModalProvider>
        <div className="m-4 p-4 h-[90dvh] overflow-scroll relative">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<ScreenSelector />} />
              {routes.map((endpoint) => {
                return (
                  <Route path={endpoint.route} element={endpoint.element} />
                );
              })}

              <Route path="/a" element={<UserManagingScreen />}></Route>
            </Routes>
          </BrowserRouter>
        </div>
        <Toaster />
      </ModalProvider>
    </ConfirmationProvider>
  );

  //             <Route path="/" element={

  // <>
  //         <div className="m-4 p-4 h-[90dvh] overflow-scroll relative">
  //           {/* <SearchAccounts></SearchAccounts> */}

  //           {/* <PostItemsForms></PostItemsForms> */}
  //           {/* <WaiterAuth></WaiterAuth> */}
  //           {/* <WaiterAuthScreen></WaiterAuthScreen> */}
  //           {/* <AccountClosure /> */}
  //           {/* <PaymentForms /> */}
  //           {/* <WaiterAuth></WaiterAuth> */}

  //           {/* <MenuManagingScreen /> */}
  //           {/* <ItemTypeManagingScreen /> */}
  //           {/* <KitchenControlScreen /> */}
  //           {/* <DeliveryControlScreen /> */}
  //           {/* <SettingsScreen /> */}
  //           {/* <UserManagingScreen /> */}

  //           <ScreenSelector />
  //         </div>
  //         {/* <AccountForms></AccountForms> */}

  // </>
  //         }/>
}
