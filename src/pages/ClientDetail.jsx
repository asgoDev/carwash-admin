import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

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
      navigate("/clients/list");
    } catch (err) {
      alert("Error updating client: " + err.message);
    }
  };

  if (loading) return <p>Loading client...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentLayout title={"Informacion general"}>
      <form className="flex flex-col gap-2">
        <label>
          <span className="font-bold">C. I.: </span>
          <input
            name="id"
            value={client.id || ""}
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

        <label>
          <span className="font-bold">Tipo de vehículo: </span>
          <input
            name="vehicleType"
            value={client.vehicleType || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Marca: </span>
          <input
            name="brand"
            value={client.brand || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Modelo: </span>
          <input
            name="model"
            value={client.model || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        <label>
          <span className="font-bold">Placa: </span>
          <input
            name="plate"
            value={client.plate || ""}
            onChange={handleChange}
            disabled={isDisabled}
          />
        </label>

        {/* <button type="button" onClick={handleSave}>
          Save
        </button> */}
      </form>
    </ContentLayout>
  );
}
