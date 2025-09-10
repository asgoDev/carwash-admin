import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function ClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div>
      <h2>Client Detail</h2>
      <form>
        <label>
          First Name:
          <input
            name="firstName"
            value={client.firstName || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Last Name:
          <input
            name="lastName"
            value={client.lastName || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            name="phone"
            value={client.phone || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            name="email"
            value={client.email || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Vehicle Type:
          <input
            name="vehicleType"
            value={client.vehicleType || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Brand:
          <input
            name="brand"
            value={client.brand || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Model:
          <input
            name="model"
            value={client.model || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Plate:
          <input
            name="plate"
            value={client.plate || ""}
            onChange={handleChange}
          />
        </label>
        <br />
        <button type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
}
