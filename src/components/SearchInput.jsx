import { Search } from "lucide-react";
import { useEffect, useState } from "react";

// this input only search by id
const SearchInput = ({
  config: { id, register, watch, path, type, placeholder, setResult },
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  console.log(id);

  const fetchResource = async (id) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/api/${path}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch client");
      const data = await res.json();
      setResult(data);
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

  return (
    <div className="flex flex-1 rounded border-l-5 border-b-1 border-w-5e border-gray-300 transition-border duration-300 focus-within:border-blue-500 overflow-hidden relative min-w-[50px]">
      <input
        id={id}
        className="p-2 flex-grow text-gray-800 bg-white text-base outline-none border-none"
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        {...register(id, {
          required: { value: true, message: "Campo obligatorio" },
        })}
      />

      {/* Este boton deberia cambiar por otro que formatee el formulario general */}
      <button
        type="button"
        className="bg-gray-900 text-blue-100 px-3 text-xl border-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 absolute right-0 top-0 h-full"
        onClick={(e) => {
          e.preventDefault();
          handleSearch(watch[id]);
        }}
        disabled={watch[id] < 6}
      >
        <Search
          className={`${
            watch[id] > 5 && "hover:scale-125 hover:text-blue-500"
          }  transition-all duration-300`}
          size={24}
        />
      </button>
    </div>
  );
};

export default SearchInput;
