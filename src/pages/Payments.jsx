import { useForm } from "react-hook-form";
import ContentLayout from "../components/ContentLayout";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

const Payments = () => {
  const { register, handleSubmit, watch } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [client, setClient] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [error, setError] = useState(null);

  const watchAll = watch();

  const fetchClient = async (id) => {
    if (!id) return;
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${id}`);
      if (!res.ok) throw new Error("Failed to fetch client");
      const data = await res.json();
      setClient(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (id) => {
    // const idWhitoutLetters = id.replace(/[a-zA-Z]/g, '');
    // if (isNaN(idWhitoutLetters)) return alert('Dato inválido');

    fetchClient(id);
  };

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employees");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <ContentLayout title="Registrar pago">
      <form>
        <section className="mb-4  px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Cliente
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex rounded border-l-5 border-b-1 border-w-5e border-gray-300 transition-border duration-300 focus-within:border-blue-500 overflow-hidden relative ">
              <input
                id="ci"
                className="flex-grow p-2 text-gray-800 bg-white text-base outline-none border-none"
                type="number"
                placeholder="C. I. del cliente"
                autoComplete="off"
                {...register("ci", {
                  required: { value: true, message: "Campo obligatorio" },
                })}
              />
              <button
                type="button"
                className="bg-gray-900 text-blue-100  px-3 text-xl border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                onClick={(e) => {
                  e.preventDefault();
                  handleSearch(watchAll.ci);
                }}
                disabled={watchAll.ci?.length < 6}
              >
                <Search
                  className={`${
                    watchAll.ci?.length > 5 &&
                    "hover:scale-125 hover:text-blue-500"
                  }  transition-all duration-300`}
                  size={24}
                />
              </button>
            </div>
            {client && (
              <>
                <span>
                  Nombre completo: {`${client.firstName} ${client.lastName}`}
                </span>
                <span>Fecha de ultimo lavado: 15/05/2025</span>
                <pre>{JSON.stringify(client, null, 2)}</pre>
              </>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Vehiculo
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <select className="bg-white p-2 rounded w-full capitalize">
              <option className="" value="">
                Selecciona un vehiculo
              </option>
              {client?.vehicles.map((v) => (
                <option key={v.plate} value={v.plate}>
                  {`${v.brand}, ${v.model} - ${v.plate.toUpperCase()} / ${
                    v.type
                  }`}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Servicio
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <label>
              Lavado simple: <input type="checkbox" />
            </label>
            <label>
              Pulitura: <input type="checkbox" />
            </label>
            <label>
              Motor: <input type="checkbox" />
            </label>
            <label>
              Lavado Premium: <input type="checkbox" />
            </label>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Empleado asignado
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <select className="bg-white p-2 rounded w-full capitalize">
              <option className="" value="">
                Seleccione un empleado
              </option>
              {employees.map((e) => (
                <option key={e.id} value={e.id}>
                  {`${e.firstName} ${e.lastName}`}
                </option>
              ))}
            </select>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">Total</h2>
          <div className="p-4 flex flex-col gap-2 max-w-sm">
            <p className="flex justify-between">
              <span>Lavado simple: </span>
              <span>3$</span>
            </p>
            <p className="flex justify-between">
              <span>Pulitura: </span>
              <span>2$</span>
            </p>
            <p className="flex justify-between text-lg font-bold">
              <span>TOTAL: </span>
              <span>5$</span>
            </p>
            <p className="flex justify-between  font-bold">
              <span></span>
              <span>850,00bs</span>
            </p>
          </div>
        </section>
      </form>
    </ContentLayout>
  );
};

export default Payments;
