import routes from "../routes.jsx";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="select-none bg-gray-800 text-white w-full">
      <NavUl ulData={routes} />
    </nav>
  );
};

const NavUl = ({ ulData }) => {
  return (
    <ul className="list-none">
      {ulData.map((li, index) => (
        <NavLi key={index} liData={li} />
      ))}
    </ul>
  );
};

const NavLi = ({ liData }) => {
  const { name, path = false, sublist = false, icon = false } = liData;
  const id = name.toLowerCase().replace(" ", "-");

  return (
    <li className="w-full">
      {sublist ? (
        <div>
          {/* checkbox oculto */}
          <input id={id} type="checkbox" className="hidden peer" />

          <label
            htmlFor={id}
            className="flex gap-4 block  px-3 py-2 rounded hover:bg-teal-600 cursor-pointer"
          >
            {icon} <span>{name}</span>
          </label>

          {/* usamos max-h con transición */}
          <ul className="list-none max-h-0 overflow-hidden transition-all duration-500 ease-in-out peer-checked:max-h-96 pl-4">
            {sublist.map((sub, i) => (
              <NavLi key={i} liData={sub} />
            ))}
          </ul>
        </div>
      ) : (
        <Link to={path || "#"} className="block w-full">
          <label className="flex gap-4 block w-full px-3 py-2 rounded hover:bg-teal-600 cursor-pointer">
            {icon} <span>{name}</span>
          </label>
        </Link>
      )}
    </li>
  );
};

export default NavBar;
