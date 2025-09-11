import { useForm } from "react-hook-form";
import { useState } from "react";
import brands from "../data/brands";
import vehicleTypes from "../data/vehicleTypes";

export default function Clients() {
  const [clients, setClients] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to save client");

      const result = await response.json();
      console.log("Guardado:", result);
      setMessage("Cliente guardado exitosamente.");
      reset();
    } catch (error) {
      console.error(error);
      setMessage("Error al guardar el cliente.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Clients</h1>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 mb-6"
      >
        {/* ID (Required, Numbers Only) */}
        <input
          type="text"
          placeholder="C. I."
          {...register("id", {
            required: "Cédula obligatoria",
            pattern: {
              value: /^[0-9]+$/,
              message: "Solo se permiten números",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.id && <span className="text-red-500">{errors.id.message}</span>}

        {/* First Name */}
        <input
          type="text"
          placeholder="Nombres"
          {...register("firstName", {
            required: "El nombre del cliente es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
              message: "Solo se permiten letras",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.firstName && (
          <span className="text-red-500">{errors.firstName.message}</span>
        )}

        {/* Last Name (Required) */}
        <input
          type="text"
          placeholder="Apellidos"
          {...register("lastName", {
            required: "EL apellido del cliente es obligatorio",
            pattern: {
              value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
              message: "Solo se permiten letras",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.lastName && (
          <span className="text-red-500">{errors.lastName.message}</span>
        )}

        {/* Phone (Required, Numbers Only) */}
        <input
          type="text"
          placeholder="Teléfono"
          {...register("phone", {
            required: "Nro de teléfono obligatorio",
            pattern: {
              value: /^[0-9]+$/,
              message: "solo se permiten números",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.phone && (
          <span className="text-red-500">{errors.phone.message}</span>
        )}

        {/* Email (Optional, Must Be Valid) */}
        <input
          type="email"
          placeholder="Correo electrónico"
          {...register("email", {
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Dirección de correo no válida",
            },
          })}
          className="border p-2 rounded"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        {/* Vehicle Type (Select) */}
        <select
          {...register("vehicleType")}
          className="border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Tipo de vehículo
          </option>
          {vehicleTypes.map((type) => (
            <option key={type} value={type.toLowerCase()}>
              {type}
            </option>
          ))}
        </select>

        {/* Brand (Select) */}
        <select
          {...register("brand")}
          className="border p-2 rounded"
          defaultValue=""
        >
          <option value="" disabled>
            Marca
          </option>
          {brands.map((brand) => (
            <option key={brand} value={brand.toLowerCase()}>
              {brand}
            </option>
          ))}
        </select>

        {/* Model (Text) */}
        <input
          type="text"
          placeholder="Modelo"
          {...register("model")}
          className="border p-2 rounded"
        />

        {/* Plate (Optional) */}
        <input
          type="text"
          placeholder="Placa"
          {...register("plate")}
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="col-span-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Agregar Cliente
        </button>
      </form>

      {/* Lista de clientes */}
      {/* <table className="w-full border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">First Name</th>
            <th className="border px-2 py-1">Last Name</th>
            <th className="border px-2 py-1">ID</th>
            <th className="border px-2 py-1">Phone</th>
            <th className="border px-2 py-1">Email</th>
            <th className="border px-2 py-1">Vehicle Type</th>
            <th className="border px-2 py-1">Brand</th>
            <th className="border px-2 py-1">Model</th>
            <th className="border px-2 py-1">Plate</th>
          </tr>
        </thead>
        <tbody>
          {clients.length === 0 ? (
            <tr>
              <td colSpan="9" className="text-center py-2">
                No clients registered.
              </td>
            </tr>
          ) : (
            clients.map((client, index) => (
              <tr key={index} className="text-center">
                <td className="border px-2 py-1">{client.firstName}</td>
                <td className="border px-2 py-1">{client.lastName}</td>
                <td className="border px-2 py-1">{client.id}</td>
                <td className="border px-2 py-1">{client.phone}</td>
                <td className="border px-2 py-1">{client.email}</td>
                <td className="border px-2 py-1">{client.vehicleType}</td>
                <td className="border px-2 py-1">{client.brand}</td>
                <td className="border px-2 py-1">{client.model}</td>
                <td className="border px-2 py-1">{client.plate}</td>
              </tr>
            ))
          )}
        </tbody>
      </table> */}
    </div>
  );
}
