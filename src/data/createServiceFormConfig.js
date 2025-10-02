const createServiceFormConfig = {
  submitFx: async (data) => {
    try {
      console.log("enviando: ", data);
      const response = await fetch("http://localhost:5000/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error guardando servicio");
      const result = await response.json();
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  submitLabel: "Guardar servicio",
  inputsConfig: [
    {
      label: "Tipo de vehículo",
      name: "vehicleType",
      type: "select",
      options: ["moto", "carro", "camioneta", "camión", "buggy"],
    },
    {
      label: "Nombre del servicio",
      name: "serviceName",
      type: "text",
      params: {
        required: "Debe ingresar el nombre del servicio.",
      },
    },
    {
      label: "Precio",
      name: "price",
      type: "number",
      decimal: true,
      params: {
        required: "Debe ingresar el precio del servicio.",
      },
    },
    {
      label: "Descripción del servicio",
      name: "description",
      type: "text",
    },
  ],
};

export default createServiceFormConfig;
