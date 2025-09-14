import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";

const Detail = () => {
  const { id } = useParams();
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
  }, []);

  return (
    <ContentLayout title={`${client.firstName} ${client.lastName}`}>
      <p>Detail: {JSON.stringify(client)}</p>
    </ContentLayout>
  );
};

export default Detail;
