import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";
import ResumeCard from "../components/ResumeCard";

export default function EmployeesList() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener clientes desde backend
  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/employees");
      if (!response.ok) throw new Error("Error cargando listado de clientes");
      const data = await response.json();
      setClients(data);
    } catch (err) {
      console.error(err);
      setError("Error cargando listado de clientes");
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
    <ContentLayout title="Listado">
      {clients.length === 0 ? (
        <p>No clients found</p>
      ) : (
        <div className="flex flex-col gap-4">
          {clients.map((client) => {
            return <ResumeCard key={client.id} data={client} />;
          })}
        </div>
      )}
    </ContentLayout>
  );
}
