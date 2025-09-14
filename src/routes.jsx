import Dashboard from "./pages/Dashboard";
import Services from "./pages/Services";
import Payments from "./pages/Payments";
import ClientsList from "./pages/ClientsList.jsx";
import ClientDetail from "./pages/ClientDetail.jsx";
import CreateClient from "./pages/CreateClient.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
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
      { path: "/clients/new", name: "Registrar", element: <CreateClient /> },
      { path: "/clients", name: "Listado", element: <ClientsList /> },
    ],
  },

  // { path: "/clients/:id", name: "Client Detail", element: <ClientDetail /> },
  {
    name: "Empleados",
    icon: <UserCog size={24} />,
    sublist: [
      {
        path: "/employees/new",
        name: "Registrar",
        element: <CreateEmployee />,
      },
      { path: "/employees", name: "Listado", element: <CreateEmployee /> },
    ],
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
