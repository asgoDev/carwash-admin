import ContentLayout from "../components/ContentLayout";
import DynamicForm from "../components/DynamicForm";
import createServiceFormConfig from "../data/createServiceFormConfig.js";
import useAppStore from "../store/appStore";

const CreateService = () => {
  const addService = useAppStore((s) => s.addService);
  return (
    <ContentLayout title="Registro">
      <DynamicForm config={createServiceFormConfig} req={addService} />
    </ContentLayout>
  );
};

export default CreateService;
