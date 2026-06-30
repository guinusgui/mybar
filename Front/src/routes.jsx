import DeliveryControlScreen from "./components/Screens/DeliveryControlScreen";
import ItemTypeManagingScreen from "./components/Screens/ItemTypeManagingScreen";
import KitchenControlScreen from "./components/Screens/KitchenControlScreen";
import MenuManagingScreen from "./components/Screens/MenuManagingScreen";
import SearchAccounts from "./components/Screens/SearchAccounts";
import UserManagingScreen from "./components/Screens/UserManagingScreen";

const routes = [
    {
        label: "Registro de Contas",
        route: "/gerenciar/contas",
        element: <SearchAccounts/>
    },
        {
        label: "Gestão de Itens do Cardápio",
        route: "/gerenciar/itensMenu",
        element: <MenuManagingScreen/>
    },
        {
        label: "Gestão de Tipos de Itens",
        route: "/gerenciar/tiposItens",
        element: <ItemTypeManagingScreen/>
    },
        {
        label: "Controle da Cozinha",
        route: "/gerenciar/cozinha",
        element: <KitchenControlScreen/>
    },
    {
        label: "Controle de Entregas",
        route: "/gerenciar/cozinha",
        element: <DeliveryControlScreen/>
    },
    {
        label: "Configuração do Sistema",
        route: "/gerenciar/configuracoes",
        element: <DeliveryControlScreen/>
    },
    {
        label: "Gestão de Usuários",
        route: "/gerenciar/usuario",
        element: <UserManagingScreen/>
    },
]
export default routes;