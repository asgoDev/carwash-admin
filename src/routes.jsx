import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Employees from "./pages/Employees";
import Services from "./pages/Services";
import Payments from "./pages/Payments";
import ClientsList from "./pages/ClientsList.jsx";
import ClientDetail from "./pages/ClientDetail.jsx";
import { LayoutDashboard, Users, UserCog, Car, CreditCard } from "lucide-react";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <LayoutDashboard size={24} />,
  },
  {
    // path: "/clients",
    name: "Clientes",
    icon: <Users size={24} />,
    sublist: [
      { path: "/clients/new", name: "Registrar", element: <ClientDetail /> },
      { path: "/clients/list", name: "Listado", element: <ClientsList /> },
    ],
  },

  // { path: "/clients/:id", name: "Client Detail", element: <ClientDetail /> },
  {
    path: "/employees",
    name: "Empleados",
    element: <Employees />,
    icon: <UserCog size={24} />,
  },
  {
    path: "/services",
    name: "Servicios",
    element: <Services />,
    icon: <Car size={24} />,
  },
  {
    path: "/payments",
    name: "Tickets",
    element: <Payments />,
    icon: <CreditCard size={24} />,
  },
];

export default routes;
