import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";
import { transformDate } from "../utils/transformDate";
import useAppStore from "../store/appStore.js";

export default function serviceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isDisabled, setIsDisabled] = useState(true);
  const [service, setService] = useState(null);
  const { services, loading, error } = useAppStore();
  const removeService = useAppStore((state) => state.removeService);

  const editMode = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    setService(services.find((c) => c._id === id));
  }, [services]);

  const handleChange = (e) => {
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/services/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(service),
      });
      if (!res.ok) throw new Error("Failed to update service");
      alert("service updated successfully!");
      navigate("/services");
    } catch (err) {
      alert("Error actualizando empleado: " + err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    removeService(id, navigate);
  };

  if (loading) return <p>Loading service...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentLayout title={"Informacion general"}>
      {service && (
        <form className="flex flex-col gap-2 max-w-full">
          <label>
            <span className="font-bold">Tipo de vehículo: </span>
            <input
              name="vehicleType"
              value={service.vehicleType || ""}
              onChange={handleChange}
              disabled={true}
            />
          </label>
          <label>
            <span className="font-bold">Nombre del servicio: </span>
            <input
              name="firstName"
              value={service.serviceName || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>
          <label>
            <span className="font-bold">Precio: </span>
            <input
              name="lastName"
              value={service.price || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>
          <label>
            <span className="font-bold">Descripción: </span>
            <input
              name="phone"
              value={service?.description || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-32"
              onClick={editMode}
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-32"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </form>
      )}
    </ContentLayout>
  );
}
