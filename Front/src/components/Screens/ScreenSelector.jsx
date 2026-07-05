import DeliveryControlScreen from "./DeliveryControlScreen";
import ItemTypeManagingScreen from "./ItemTypeManagingScreen";
import KitchenControlScreen from "./KitchenControlScreen";
import MenuManagingScreen from "./MenuManagingScreen";
import SearchAccounts from "./SearchAccounts";
import UserManagingScreen from "./UserManagingScreen";

import routes from "@/routes";
import { Link } from "react-router-dom";

export default function ScreenSelector() {
  return (
    <div className="border border-gray-400 rounded-xl grid grid-cols-2 gap-2 p-4 gap-x-8 gap-y-4">
      {routes.map((endpoint) => {
        return (
          <Link
            className="juicyButton border p-2 rounded-xl text-center"
            key={endpoint.label}
            to={endpoint.route}
          >
            {endpoint.label}
          </Link>
        );
      })}
    </div>
  );
}
