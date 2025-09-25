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
  const [total, setTotal] = useState(0);

  const servicesList = {
    simple: 5,
    motor: 3,
    completo: 10,
    pulitura: 4,
    premium: 15,
  };

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
    if (!id) return;
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

  useEffect(() => {
    if (!watchAll.services) return;
    let total = 0;
    watchAll.services.forEach((service) => {
      total += servicesList[service];
    });
    setTotal(total);
  }, [watchAll.services]);

  return (
    <ContentLayout title="Crear ticket">
      <form>
        <section className="mb-4 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Cliente
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <div className="flex flex-1 rounded border-l-5 border-b-1 border-w-5e border-gray-300 transition-border duration-300 focus-within:border-blue-500 overflow-hidden relative min-w-[50px]">
              <input
                id="ci"
                className="p-2 flex-grow text-gray-800 bg-white text-base outline-none border-none"
                type="number"
                placeholder="C. I. del cliente"
                autoComplete="off"
                {...register("ci", {
                  required: { value: true, message: "Campo obligatorio" },
                })}
              />

              {/* Este boton deberia cambiar por otro que formatee el formulario general */}
              <button
                type="button"
                className="bg-gray-900 text-blue-100 px-3 text-xl border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 absolute right-0 top-0 h-full"
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
                {/* <pre>{JSON.stringify(watchAll, null, 2)}</pre> */}
              </>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Vehiculo
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <select
              className="capitalize w-full p-2 rounded border-l-5 border-b-1 border-gray-300 transition-border duration-300 focus-within:border-blue-500 bg-white text-gray-800 text-base outline-none"
              {...register("vehicle")}
            >
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
              Lavado simple:{" "}
              <input value="simple" type="checkbox" {...register("services")} />
            </label>
            <label>
              Pulitura:{" "}
              <input
                type="checkbox"
                value={"pulitura"}
                {...register("services")}
              />
            </label>
            <label>
              Motor:{" "}
              <input
                type="checkbox"
                value={"motor"}
                {...register("services")}
              />
            </label>
            <label>
              Lavado Completo:{" "}
              <input
                type="checkbox"
                value={"completo"}
                {...register("services")}
              />
            </label>
            <label>
              Lavado Premium:{" "}
              <input
                type="checkbox"
                value={"premium"}
                {...register("services")}
              />
            </label>
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Empleado asignado
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <select
              className="w-full p-2 rounded border-l-5 border-b-1 border-gray-300 transition-border duration-300 focus-within:border-blue-500 bg-white text-gray-800 text-base outline-none capitalize"
              {...register("employee")}
            >
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
              <span>{total} $</span>
            </p>
            <p className="flex justify-between  font-bold">
              <span></span>
              <span>850,00bs</span>
            </p>
          </div>
        </section>
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          value="Crear ticket"
        />
      </form>
    </ContentLayout>
  );
};

export default Payments;
