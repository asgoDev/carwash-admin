import DynamicForm from "./DynamicForm";
import createClientFormConfig from "../data/createClientFormConfig";
import useAppStore from "../store/appStore";

const NewClientForm = () => {
  const addClient = useAppStore((s) => s.addClient);
  return <DynamicForm config={createClientFormConfig} req={addClient} />;
};

export default NewClientForm;
