import useAppStore from "../store/appStore";

const DashboardLayout = () => {
  const clients = useAppStore((state) => state.clients);
  const employees = useAppStore((state) => state.employees);
  const rate = useAppStore((state) => state.rate?.today?.value ?? "...");

  return (
    <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_2fr] gap-4">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-4 ">
        <article className="aspect-[1.6/1] bg-white border-b-5 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md overflow-hidden flex flex-col ">
          <header className="bg-gray-300 px-4 py-3">Tasa BCV</header>
          <div className="flex-grow-1 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">{rate}</span>
          </div>
        </article>
        <article className="aspect-[1.6/1] bg-white border-b-5 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md overflow-hidden flex flex-col ">
          <header className="bg-gray-300 px-4 py-3">Clientes</header>
          <div className="flex-grow-1 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">{clients.length}</span>
          </div>
        </article>
        <article className="aspect-[1.6/1] bg-white border-b-5 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md overflow-hidden flex flex-col ">
          <header className="bg-gray-300 px-4 py-3">Empleados</header>
          <div className="flex-grow-1 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">{employees.length}</span>
          </div>
        </article>
        <article className="aspect-[1.6/1] bg-white border-b-5 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md overflow-hidden flex flex-col ">
          <header className="bg-gray-300 px-4 py-3">Clientes</header>
          <div className="flex-grow-1 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">{clients.length}</span>
          </div>
        </article>
        <article className="aspect-[1.6/1] bg-white border-b-5 border-gray-300 rounded-lg hover:border-blue-500 hover:scale-[1.01] transition-all duration-100 cursor-pointer shadow-md overflow-hidden flex flex-col ">
          <header className="bg-gray-300 px-4 py-3">Clientes</header>
          <div className="flex-grow-1 flex flex-col justify-center items-center">
            <span className="font-bold text-2xl">{clients.length}</span>
          </div>
        </article>
      </div>
      <div className="bg-red-300">Segunda Columna</div>
    </div>
  );
};

export default DashboardLayout;
