const dictioanry = {
  clients: "cliente",
  employees: "empleado",
  services: "servicio",
  tickets: "ticket",
};

export const createCrudSlice = (resource) => (set, get) => ({
  [resource]: [],

  // Obtener todos
  [`fetch${capitalize(resource)}`]: async () => {
    const res = await fetch(`http://localhost:5000/api/${resource}`);
    const data = await res.json();
    set({ [resource]: data });
  },

  // Crear nuevo
  [`add${capitalize(resource.slice(0, -1))}`]: async (payload, reset) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${resource}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const newItem = await res.json();
      if (newItem.error) alert(newItem.details[0].message);

      if (!res.ok) throw new Error(`Error guardando ${dictioanry[resource]}`);
      alert(`${capitalize(dictioanry[resource])} guardado satisfactoriamente`);
      set((state) => ({
        [resource]: [...state[resource], newItem],
      }));
      reset();
    } catch (error) {
      console.error(error);
    }
  },

  // Actualizar
  [`update${capitalize(resource.slice(0, -1))}`]: async (id, payload) => {
    const res = await fetch(`http://localhost:5000/api/${resource}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const updatedItem = await res.json();
    set((state) => ({
      [resource]: state[resource].map((item) =>
        item._id === id ? updatedItem : item
      ),
    }));
  },

  // Eliminar
  [`remove${capitalize(resource.slice(0, -1))}`]: async (id, redirect) => {
    try {
      const res = await fetch(`http://localhost:5000/api/${resource}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Error eliminando ${dictioanry[resource]}`);
      alert(`${capitalize(dictioanry[resource])} eliminado satisfactoriamente`);

      set((state) => ({
        [resource]: state[resource].filter((item) => item._id !== id),
      }));
      redirect(`/${resource}`);
    } catch (err) {
      alert(`Error eliminando ${dictioanry[resource]}: ${err.message}`);
    }
  },
});

// helper para capitalizar
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
