const DynamicSubmitButton = ({
  label = "Enviar",
  disabled = false,
  onClick,
}) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={(e) => {
        // e.preventDefault();
        // e.target.parentElement.reset();
        // onClick && onClick();
      }}
      className="rounded px-4 py-2 bg-blue-600 border-none text-white text-base cursor-pointer mt-4 hover:bg-white hover:text-blue-600 transition-colors disabled:opacity-50"
    >
      {label}
    </button>
  );
};

export default DynamicSubmitButton;
