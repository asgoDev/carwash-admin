import ContentLayout from "../components/ContentLayout";
import useAppStore from "../store/appStore.js";
import CardList from "../components/CardList.jsx";

export default function ClientsList() {
  const clients = useAppStore((state) => state.clients);
  const loading = useAppStore((state) => state.loading);

  return (
    <ContentLayout title="Listado">
      {loading ? (
        <p>Cargando clientes...</p>
      ) : (
        <CardList entityName="clientes" items={clients} path={"/clients"} />
      )}
    </ContentLayout>
  );
}
