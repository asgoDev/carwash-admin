import { useEffect, useState, useMemo } from "react";
import ContentLayout from "../components/ContentLayout";
import useAppStore from "../store/appStore.js";
import CardList from "../components/CardList.jsx";

export default function ServicesList() {
  const services = useAppStore((state) => state.services);
  const loading = useAppStore((state) => state.loading);

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
                <CardList
                  entityName="servicios"
                  items={serviceList}
                  path={"/services"}
                />
              </div>
            </section>
          ))}
        </>
      )}
    </ContentLayout>
  );
}
