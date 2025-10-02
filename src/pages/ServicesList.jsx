import { useEffect, useState, useMemo } from "react";
import ContentLayout from "../components/ContentLayout";
import ResumeCard from "../components/ResumeCard";

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener servicios desde el backend
  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/services");
      if (!response.ok) throw new Error("Error cargando listado de servicios");
      const data = await response.json();
      setServices(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando listado de servicios");
    } finally {
      setLoading(false);
    }
  };

  // Agrupamos los servicios por tipo de vehículo de forma dinámica
  const groupedServices = useMemo(() => {
    return services.reduce((acc, service) => {
      const { vehicleType } = service;
      if (!acc[vehicleType]) {
        acc[vehicleType] = [];
      }
      acc[vehicleType].push(service);
      return acc;
    }, {});
  }, [services]);

  useEffect(() => {
    fetchServices();
  }, []);

  if (loading) return <p>Cargando servicios...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentLayout title="Listado">
      {services.length === 0 ? (
        <p>No services found</p>
      ) : (
        <>
          {Object.entries(groupedServices).map(([type, serviceList]) => (
            <section key={type} className="mb-4 px-4">
              <h2 className="text-2xl border-b py-2 px-4 border-gray-300 capitalize">
                {type}
              </h2>
              <div className="p-4 flex flex-col gap-2">
                <ul className="flex flex-col gap-4">
                  {serviceList.map((service) => {
                    return (
                      <ResumeCard
                        key={service._id}
                        data={service}
                        path="/services"
                      />
                    );
                  })}
                </ul>
              </div>
            </section>
          ))}
        </>
      )}
    </ContentLayout>
  );
}
