import ContentLayout from "../components/ContentLayout";
import DynamicForm from "../components/DynamicForm";
import createEmployeeFormConfig from "../data/createEmployeeFormConfig";
import useAppStore from "../store/appStore";

const CreateEmployee = () => {
  const addEmployee = useAppStore((s) => s.addEmployee);
  return (
    <ContentLayout title="Registro">
      <DynamicForm config={createEmployeeFormConfig} req={addEmployee} />
    </ContentLayout>
  );
};

export default CreateEmployee;
