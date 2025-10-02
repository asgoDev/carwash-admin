import Dashboard from "./pages/Dashboard";
import Payments from "./pages/Payments";
import ClientsList from "./pages/ClientsList.jsx";
import EmployeesList from "./pages/EmployeesList.jsx";
import ServicesList from "./pages/ServicesList.jsx";
import CreateClient from "./pages/CreateClient.jsx";
import CreateEmployee from "./pages/CreateEmployee.jsx";
import CreateService from "./pages/CreateService.jsx";
import { LayoutDashboard, Users, UserCog, Car, CreditCard } from "lucide-react";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    element: <Dashboard />,
    icon: <LayoutDashboard size={24} />,
  },
  {
    name: "Clientes",
    icon: <Users size={24} />,
    sublist: [
      { path: "/clients/create", name: "Registrar", element: <CreateClient /> },
      { path: "/clients", name: "Listado", element: <ClientsList /> },
    ],
  },

  {
    name: "Empleados",
    icon: <UserCog size={24} />,
    sublist: [
      {
        path: "/employees/create",
        name: "Registrar",
        element: <CreateEmployee />,
      },
      { path: "/employees", name: "Listado", element: <EmployeesList /> },
    ],
  },
  {
    name: "Servicios",
    icon: <Car size={24} />,
    sublist: [
      {
        path: "/services/create",
        name: "Registrar",
        element: <CreateService />,
      },
      { path: "/services", name: "Listado", element: <ServicesList /> },
    ],
  },
  {
    path: "/payments",
    name: "Facturación",
    element: <Payments />,
    icon: <CreditCard size={24} />,
  },
];

export default routes;
