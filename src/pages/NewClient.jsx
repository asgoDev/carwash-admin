import ContentLayaout from "../components/ContentLayout";
import DynamicForm from "../components/DynamicForm";
import newClientFormConfig from "./newClientFormConfig";

const NewClient = () => {
  return (
    <ContentLayaout title="Registro">
      <DynamicForm config={newClientFormConfig} />
    </ContentLayaout>
  );
};

export default NewClient;
