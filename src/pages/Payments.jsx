import { useForm } from "react-hook-form";
import ContentLayout from "../components/ContentLayout";
import { useEffect, useState, useMemo } from "react";
import SearchInput from "../components/SearchInput";

const Payments = () => {
  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      ci: "",
      vehicle: "",
      services: [],
      employee: "",
    },
  });
  const [client, setClient] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [availableServices, setAvailableServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  // Observamos campos específicos para un mejor rendimiento
  const selectedVehiclePlate = watch("vehicle");
  const selectedServices = watch("services");
  const actualCi = watch("ci");

  // Función para limpiar el formulario cuando se cambia de cliente
  const handleClientChange = (newClient) => {
    setClient(newClient);
    // Reseteamos los campos dependientes del cliente
    reset({
      vehicle: "",
      services: [],
      employee: "",
    });
    setAvailableServices([]);
  };

  // Efecto para cargar los empleados (solo una vez)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/employees");
        if (!res.ok) throw new Error("Failed to fetch employees");
        const data = await res.json();
        setEmployees(data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  // Efecto para cargar los servicios cuando cambia el vehículo seleccionado
  useEffect(() => {
    // Si no hay cliente o no se ha seleccionado un vehículo, no hacemos nada.

    if (!client || !selectedVehiclePlate) {
      setAvailableServices([]);
      return;
    }

    const selectedVehicle = client.vehicles.find(
      (v) => v.plate === selectedVehiclePlate
    );

    if (selectedVehicle) {
      const fetchServices = async () => {
        setLoadingServices(true);
        // Limpiamos los servicios seleccionados anteriormente
        setValue("services", []);
        try {
          const response = await fetch(
            `http://localhost:5000/api/services?vehicleType=${selectedVehicle.type}`
          );
          if (!response.ok) throw new Error("Error cargando servicios");
          const data = await response.json();
          setAvailableServices(data);
        } catch (err) {
          console.error(err);
          setAvailableServices([]);
        } finally {
          setLoadingServices(false);
        }
      };

      fetchServices();
    }
  }, [selectedVehiclePlate, client, setValue]);

  useEffect(() => {
    if (!watch("ci")) {
      setClient(null);
    }
  }, [watch("ci")]);

  // Calculamos el total usando useMemo para eficiencia
  const total = useMemo(() => {
    if (!selectedServices || selectedServices.length === 0) return 0;

    return selectedServices.reduce((acc, serviceId) => {
      const service = availableServices.find((s) => s._id === serviceId);
      return acc + (service ? service.price : 0);
    }, 0);
  }, [selectedServices, availableServices]);

  return (
    <ContentLayout title="Crear ticket">
      <form>
        <section className="mb-4 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Cliente
          </h2>
          <div className="p-4 flex flex-col gap-2">
            <SearchInput
              config={{
                id: "ci",
                register,
                watch: watch("ci"),
                path: "clients",
                placeholder: "C. I. del cliente",
                type: "number",
                setResult: handleClientChange,
                secondaryFx: reset,
              }}
            />

            {client && (
              <>
                <p className="">
                  Nombre completo:
                  <span className="capitalize font-bold">{` ${client.firstName} ${client.lastName}`}</span>
                </p>
                <p>
                  Fecha de ultimo lavado:<span> 15/05/2025</span>
                </p>
              </>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Vehiculo
          </h2>
          <div className="p-4 flex flex-col gap-2">
            {client ? (
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
            ) : (
              <p className="text-gray-500">
                Selecciona un cliente para ver los vehiculos.
              </p>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Servicio
          </h2>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
            {loadingServices ? (
              <p>Cargando servicios...</p>
            ) : availableServices.length > 0 ? (
              availableServices.map((service) => (
                <label
                  key={service._id}
                  className="flex justify-between capitalize"
                >
                  {`${service.serviceName} (${service.price}$)`}
                  <input
                    type="checkbox"
                    value={service._id}
                    {...register("services")}
                  />
                </label>
              ))
            ) : (
              <p className="text-gray-500">
                Selecciona un vehículo para ver los servicios.
              </p>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
            Empleado asignado
          </h2>
          <div className="p-4 flex flex-col gap-2">
            {employees?.length > 0 ? (
              <select
                className="w-full p-2 rounded border-l-5 border-b-1 border-gray-300 transition-border duration-300 focus-within:border-blue-500 bg-white text-gray-800 text-base outline-none capitalize"
                {...register("employee")}
              >
                <option className="" value="">
                  Seleccione un empleado
                </option>
                {employees.map((e) => (
                  <option key={e._id} value={e._id}>
                    {`${e.firstName} ${e.lastName}`}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-gray-500">
                No hay empleados disponibles. Dirigete al modulo de
                <span className="font-bold"> Regitro de Empleados</span>
              </p>
            )}
          </div>
        </section>
        <section className="mb-4 flex flex-col gap-2 px-4">
          <h2 className="text-2xl border-b py-2 px-4 border-gray-300">Total</h2>
          <div className="p-4 flex flex-col gap-2 max-w-sm">
            {selectedServices?.length > 0 ? (
              selectedServices.map((serviceId) => {
                const service = availableServices.find(
                  (s) => s._id === serviceId
                );
                return service ? (
                  <p
                    key={serviceId}
                    className="flex justify-between capitalize"
                  >
                    <span>{service.serviceName}:</span>
                    <span>{service.price}$</span>
                  </p>
                ) : null;
              })
            ) : (
              <p className="text-gray-500">No hay servicios seleccionados.</p>
            )}
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
