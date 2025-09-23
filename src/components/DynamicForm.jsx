import { useForm } from "react-hook-form";
import DynamicInput from "./DynamicInput";
import DynamicSubmitButton from "./DynamicSubmitButton";

const DynamicForm = ({ config }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const { submitFx, inputsConfig, submitLabel = "Enviar" } = config;

  const onValidSubmit = async (data) => {
    const resp = await submitFx(data);
    if (resp) {
      alert("Cliente guardado correctamente");
      console.log(resp);
      reset();
    } else {
      alert("Error al guardar cliente");
    }
  };

  return (
    <form
      className="flex flex-col gap-1"
      onSubmit={handleSubmit(onValidSubmit)}
    >
      {inputsConfig.map((inputConfig, i) => (
        <DynamicInput
          key={i}
          config={inputConfig}
          register={register}
          errors={errors}
          setValue={setValue}
        />
      ))}
      <DynamicSubmitButton label={submitLabel} />
    </form>
  );
};

export default DynamicForm;
