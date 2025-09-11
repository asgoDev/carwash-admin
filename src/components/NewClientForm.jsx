import DynamicForm from "./DynamicForm";
import newClientFormConfig from "../data/newClientFormConfig";

const NewClientForm = () => {
  return <DynamicForm config={newClientFormConfig} />;
};

export default NewClientForm;
