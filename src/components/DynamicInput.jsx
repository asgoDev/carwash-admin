import { useState } from "react";

const DynamicInput = ({ config, register, errors, setValue }) => {
  const {
    label,
    type = "text",
    name,
    defaultValue,
    params,
    inputFx,
    options,
  } = config;
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async (fx) => {
    setIsLoading(true);
    try {
      const fetchData = await fx();
      setValue(name, fetchData);
    } catch (error) {
      console.error("Error obteniendo datos", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full mb-2">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      {type === "select" ? (
        <div className="relative">
          <select
            id={name}
            className="w-full p-2 rounded border border-gray-300 bg-white text-gray-800 text-base outline-none"
            name={name}
            defaultValue=""
            {...register(name, {
              required: { value: true, message: "Campo obligatorio" },
              ...params,
            })}
          >
            <option value="" disabled>
              Selecciona una opción
            </option>
            {options &&
              options.map((opt, idx) => (
                <option key={idx} value={opt.toLowerCase()}>
                  {opt}
                </option>
              ))}
          </select>
        </div>
      ) : (
        <div className="flex rounded border border-gray-300 focus-within:ring-2 focus-within:ring-blue-400 overflow-hidden relative">
          <input
            id={name}
            defaultValue={defaultValue}
            className="flex-grow p-2 text-gray-800 bg-white text-base outline-none border-none"
            name={name}
            type={type}
            placeholder={label}
            {...register(name, {
              required: { value: true, message: "Campo obligatorio" },
              ...params,
            })}
          />
          {inputFx && (
            <button
              type="button"
              className="bg-transparent text-blue-600 px-3 text-xl border-none cursor-pointer disabled:opacity-50"
              onClick={(e) => {
                e.preventDefault();
                handleClick(inputFx.fx);
              }}
              disabled={isLoading}
            >
              {inputFx.ico}
            </button>
          )}
        </div>
      )}
      {errors[name] && (
        <span className="text-gray-100 bg-red-500 text-sm px-2">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default DynamicInput;
