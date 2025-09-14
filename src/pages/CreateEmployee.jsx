import ContentLayout from "../components/ContentLayout";
import DynamicForm from "../components/DynamicForm";
import createEmployeeFormConfig from "../data/createEmployeeFormConfig";

const CreateEmployee = () => {
  return (
    <ContentLayout title="Registro">
      <DynamicForm config={createEmployeeFormConfig} />
    </ContentLayout>
  );
};

export default CreateEmployee;
