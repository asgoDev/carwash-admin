import routes from "../routes.jsx";
import { Link } from "react-router-dom";

let menuFx = null;

const NavBar = ({ menuBehavior }) => {
  const { openMenu, closeMenu } = menuBehavior;
  menuFx = { open: openMenu, close: closeMenu };
  return (
    <nav className="select-none w-full py-6">
      <NavUl ulData={routes} />
    </nav>
  );
};

const NavUl = ({ ulData, closeSublist }) => {
  return (
    <ul className="list-none space-y-2">
      {ulData.map((li, index) => (
        <NavLi key={index} liData={li} closeSublist={closeSublist} />
      ))}
    </ul>
  );
};

const NavLi = ({ liData, closeSublist }) => {
  const { name, path = false, sublist = false, icon = false } = liData;
  const id = name.toLowerCase().replace(" ", "-");
  const isActive = location.pathname === path;

  // Función para cerrar el sublist (destildar el checkbox)
  const handleCloseSublist = () => {
    const checkbox = document.getElementById(id);
    if (checkbox) checkbox.checked = false;
    if (closeSublist) closeSublist();
  };

  return (
    <li className="w-full">
      {sublist ? (
        <div>
          {/* checkbox oculto */}
          <input id={id} type="checkbox" className="hidden peer" />

          <label
            htmlFor={id}
            className="flex gap-1 block items-center rounded hover:bg-gray-800 cursor-pointer text-gray-300"
            onClick={() => {
              menuFx.open();
            }}
          >
            <span className="p-2">{icon}</span> <span>{name}</span>
          </label>

          {/* usamos max-h con transición */}
          <ul
            className={`list-none max-h-0 overflow-hidden transition-all duration-500 ease-in-out peer-checked:max-h-96 pl-10`}
          >
            {sublist.map((sub, i) => (
              <NavLi key={i} liData={sub} closeSublist={handleCloseSublist} />
            ))}
          </ul>
        </div>
      ) : (
        <Link
          to={path || "#"}
          className="block w-full"
          onClick={() => {
            menuFx.close();
            if (closeSublist) closeSublist();
          }}
        >
          <label
            className={`flex items-center gap-1 block w-full rounded hover:bg-gray-800 cursor-pointer ${
              isActive
                ? " text-white font-medium"
                : "text-gray-300 hover:text-white"
            }`}
          >
            <span
              className={`p-2 ${isActive ? "text-white" : "text-gray-400"}`}
            >
              {icon}
            </span>{" "}
            <span>{name}</span>
          </label>
        </Link>
      )}
    </li>
  );
};

export default NavBar;
