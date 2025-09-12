import { useLocation } from "react-router-dom";
import routes from "../routes.jsx";

export default function Header() {
  const location = useLocation();
  const current = routes.find((r) =>
    r.path
      ? r.path === location.pathname
      : r.sublist?.some((s) => s.path === location.pathname)
      ? r.sublist.find((s) => s.path === location.pathname)
      : null
  );

  return (
    <header className="h-19 bg-white border-b border-gray-200 flex items-center p-6 gap-2 md:px-8">
      {current?.icon && <span className="text-gray-600">{current.icon}</span>}
      <div className="text-lg font-semibold">
        {current ? current.name : "Page"}
      </div>
    </header>
  );
}
