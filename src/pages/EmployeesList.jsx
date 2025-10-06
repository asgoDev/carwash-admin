import ContentLayout from "../components/ContentLayout";
import useAppStore from "../store/appStore.js";
import CardList from "../components/CardList.jsx";

export default function ClientsList() {
  const employees = useAppStore((state) => state.employees);
  const loading = useAppStore((state) => state.loading);

  return (
    <ContentLayout title="Listado">
      {loading ? (
        <p>Cargando empleados...</p>
      ) : (
        <CardList
          entityName="empleados"
          items={employees}
          path={"/employees"}
        />
      )}
    </ContentLayout>
  );
}
