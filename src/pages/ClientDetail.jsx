import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);

  const editMode = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/clients/${id}`);
        if (!res.ok) throw new Error("Failed to fetch client");
        const data = await res.json();
        setClient(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id]);

  const handleChange = (e) => {
    setClient({ ...client, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(client),
      });
      if (!res.ok) throw new Error("Failed to update client");
      alert("Client updated successfully!");
      navigate("/clients");
    } catch (err) {
      alert("Error actualizando cliente: " + err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5000/api/clients/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Error eliminando cliente");
      alert("Cliente eliminado satisfactoriamente");
      navigate("/clients");
    } catch (err) {
      alert("Error eliminando cliente: " + err.message);
    }
  };

  if (loading) return <p>Loading client...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentLayout title={"Informacion general"}>
      <form className="flex flex-col gap-2 max-w-full">
        <label>
          <span className="font-bold">C. I.: </span>
          <input
            name="id"
            value={client.ci || ""}
            onChange={handleChange}
            disabled={true}
          />
        </label>
        <label>
          <span className="font-bold">Nombre: </span>
          <input
            name="firstName"
            value={client.firstName || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Apellido: </span>
          <input
            name="lastName"
            value={client.lastName || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Teléfono: </span>
          <input
            name="phone"
            value={client.phone || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Correo Electrónico: </span>
          <input
            name="email"
            value={client.email || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <span className="font-bold">Vehículos: </span>

        <div className="max-w-[85%] sm:max-w-full overflow-x-auto">
          <table className=" mt-2 text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 shadow-md sm:rounded-lg sm:rounded-lg overflow-hidden">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-2 py-3 md:px-6">
                  #
                </th>
                <th scope="col" className="px-2 py-3 md:px-6">
                  Tipo
                </th>
                <th scope="col" className="px-2 py-3 md:px-6">
                  Marca
                </th>
                <th scope="col" className="px-2 py-3 md:px-6">
                  Modelo
                </th>
                <th scope="col" className="px-2 py-3 md:px-6">
                  Placa
                </th>
              </tr>
            </thead>
            <tbody>
              {client.vehicles.map((vehicle, i) => (
                <tr
                  key={vehicle.plate}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-2 py-4 md:px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {i + 1}
                  </td>
                  <td className="px-2 py-4 md:px-6">{vehicle.type}</td>
                  <td className="px-2 py-4 md:px-6">{vehicle.brand}</td>
                  <td className="px-2 py-4 md:px-6">{vehicle.model}</td>
                  <td className="px-2 py-4 md:px-6">{vehicle.plate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    </ContentLayout>
  );
}
