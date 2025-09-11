import { useForm } from "react-hook-form";
import DynamicInput from "./DynamicInput";
import DynamicSubmitButton from "./DynamicSubmitButton";

const DynamicForm = ({ config }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  const { submitFx, inputsConfig, submitLabel = "Enviar" } = config;
  const onSubmit = handleSubmit((data) => {
    submitFx(data);
  });

  return (
    <form className="flex flex-col gap-1" onSubmit={onSubmit}>
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
