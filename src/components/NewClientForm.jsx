import DynamicForm from "./DynamicForm";
import createClientFormConfig from "../data/createClientFormConfig";

const NewClientForm = () => {
  return <DynamicForm config={createClientFormConfig} />;
};

export default NewClientForm;
