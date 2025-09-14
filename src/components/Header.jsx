import { useLocation } from "react-router-dom";
import routes from "../routes.jsx";

export default function Header() {
  const location = useLocation();
  const currentPath = `/${location.pathname.split("/")[1]}`;
  const current = routes.find((r) =>
    r.path
      ? r.path === currentPath
      : r.sublist?.some((s) => s.path === currentPath)
      ? r.sublist.find((s) => s.path === currentPath)
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
