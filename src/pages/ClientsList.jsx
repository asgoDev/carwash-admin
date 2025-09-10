import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function ClientsList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener clientes desde backend
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/clients");
      if (!response.ok) throw new Error("Failed to fetch clients");
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error(err);
      setError("Error fetching clients");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Clients List</h2>
      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>ID</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Vehicle Type</th>
              <th>Brand</th>
              <th>Model</th>
              <th>Plate</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.firstName}</td>
                <td>{client.lastName}</td>
                <td>{client.id}</td>
                <td>{client.phone}</td>
                <td>{client.email}</td>
                <td>{client.vehicleType}</td>
                <td>{client.brand}</td>
                <td>{client.model}</td>
                <td>{client.plate}</td>
                <td>
                  <Link to={`/clients/${client.id}`}>View / Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
