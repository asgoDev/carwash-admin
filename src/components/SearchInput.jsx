import { Search, X } from "lucide-react";
import { useEffect, useState } from "react";

// this input only search by id
const SearchInput = ({
  config: {
    id,
    register,
    watch,
    path,
    type,
    placeholder,
    setResult,
    secondaryFx,
  },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [secondaryFxMode, setSecondaryFxMode] = useState(false);

  const fetchResource = async (id) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`http://localhost:5000/api/${path}/${id}`);
      if (!res.ok) {
        throw new Error("Error solicitando recurso");
      }
      const data = await res.json();
      setResult(data);
      if (secondaryFx) setSecondaryFxMode(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (id) => {
    // first it needs to validate (regEx)
    if (!id) return;
    if (!path) return console.log("path is required");
    fetchResource(id);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(watch);
    }
  };

  return (
    <div className="flex flex-1 rounded border-l-5 border-b-1 border-w-5e border-gray-300 transition-border duration-300 focus-within:border-blue-500 overflow-hidden relative min-w-[50px]">
      <input
        id={id}
        className={`p-2 flex-grow text-gray-800 bg-white text-base outline-none border-none ${
          secondaryFxMode && "text-gray-200"
        }`}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        onKeyDown={handleKeyDown}
        disabled={secondaryFxMode}
        {...register(id, {
          required: { value: true, message: "Campo obligatorio" },
        })}
      />

      <button
        type="button"
        className={`bg-gray-900 text-blue-100 ${
          secondaryFxMode && "bg-red-300 text-red-100 hover:bg-red-500"
        } px-3 text-xl border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 absolute right-0 top-0 h-full`}
        onClick={(e) => {
          e.preventDefault();
          if (secondaryFxMode) {
            secondaryFx();
            setSecondaryFxMode(false);
            return;
          }
          watch && handleSearch(watch);
        }}
        disabled={watch?.length < 6}
      >
        {secondaryFxMode ? (
          <X size={24} />
        ) : (
          <Search
            className={`${
              watch?.length > 5 && "hover:scale-125 hover:text-blue-500"
            }  transition-all duration-300`}
            size={24}
          />
        )}
      </button>
    </div>
  );
};

export default SearchInput;
