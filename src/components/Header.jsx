import { useLocation } from "react-router-dom";
import routes from "../routes.jsx";

export default function Header() {
  const location = useLocation();
  const current = routes.find((r) => r.path === location.pathname);

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6">
      {current?.icon && (
        <span className="text-gray-600 mr-2">{current.icon}</span>
      )}
      <h1 className="text-lg font-semibold">
        {current ? current.name : "Page"}
      </h1>
    </header>
  );
}
