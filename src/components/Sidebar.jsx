import { Link, useLocation } from "react-router-dom";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import routes from "../routes.jsx";
import NavBar from "./NavBar.jsx";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`relative px-4 ${
        collapsed ? "w-16" : "w-64"
      } bg-gray-900 text-white flex flex-col transition-all duration-300 overflow-hidden`}
    >
      {/* Header */}
      <header className=" py-4 text-xl font-bold border-b border-gray-700 flex items-center gap-4">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-gray-300 z-10 justify-self-center"
        >
          {/* {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />} */}

          <Menu size={24} />
        </button>
        <div className="">Washify</div>
      </header>

      {/* Menu viejo */}
      {/* <nav className="flex-1 py-6">
        <ul className="space-y-2">
          {routes.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  // Esta funcion debe ejecurtarse solo al hacer click en el link, no necesriamente en un list item, si dentro tiene mas opciones entonces no seria un link
                  // onClick={() => setCollapsed(true)}
                  to={item.path}
                  className={`flex gap-4 items-center  py-2 rounded transition hover:bg-gray-800 ${
                    isActive
                      ? " text-white font-medium"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span
                    className={`p-1 ${
                      isActive ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav> */}

      <NavBar />

      {/* Menu nuevo */}
    </aside>
  );
}
