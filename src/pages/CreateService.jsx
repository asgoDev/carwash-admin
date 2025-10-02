import ContentLayout from "../components/ContentLayout";
import DynamicForm from "../components/DynamicForm";
import createServiceFormConfig from "../data/createServiceFormConfig.js";

const CreateService = () => {
  return (
    <ContentLayout title="Registro">
      <DynamicForm config={createServiceFormConfig} />
    </ContentLayout>
  );
};

export default CreateService;
