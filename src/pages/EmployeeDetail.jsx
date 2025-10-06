import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ContentLayout from "../components/ContentLayout";
import { transformDate } from "../utils/transformDate";
import useAppStore from "../store/appStore.js";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [isDisabled, setIsDisabled] = useState(true);
  const { employees, loading, error } = useAppStore();
  const removeEmployee = useAppStore((state) => state.removeEmployee);

  const editMode = (e) => {
    e.preventDefault();
    setIsDisabled(!isDisabled);
  };

  useEffect(() => {
    setEmployee(employees.find((c) => c._id === id));
  }, [employees]);

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(employee),
      });
      if (!res.ok) throw new Error("Failed to update employee");
      alert("Employee updated successfully!");
      navigate("/employees");
    } catch (err) {
      alert("Error actualizando empleado: " + err.message);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    removeEmployee(id, navigate);
  };

  if (loading) return <p>Loading employee...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ContentLayout title={"Informacion general"}>
      {employee && (
        <form className="flex flex-col gap-2 max-w-full">
          <label>
            <span className="font-bold">C. I.: </span>
            <input
              name="id"
              value={employee.ci || ""}
              onChange={handleChange}
              disabled={true}
            />
          </label>
          <label>
            <span className="font-bold">Nombre: </span>
            <input
              name="firstName"
              value={employee.firstName || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>

          <label>
            <span className="font-bold">Apellido: </span>
            <input
              name="lastName"
              value={employee.lastName || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>

          <label>
            <span className="font-bold">Teléfono: </span>
            <input
              name="phone"
              value={employee.phone || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>

          <label>
            <span className="font-bold">Correo Electrónico: </span>
            <input
              name="email"
              value={employee.email || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>
          <label>
            <span className="font-bold">Dirección de residencia: </span>
            <input
              name="email"
              value={employee.address || ""}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>
          <label>
            <span className="font-bold">Fecha de nacimiento: </span>
            <input
              name="email"
              value={transformDate(employee.birthDate)}
              onChange={handleChange}
              disabled={isDisabled}
            />
          </label>

          <div className="flex gap-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-32"
              onClick={editMode}
            >
              Editar
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg mt-2 w-32"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </form>
      )}
    </ContentLayout>
  );
}
