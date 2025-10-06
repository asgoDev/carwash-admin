const createServiceFormConfig = {
  submitFx: async (data, req, reset) => {
    req(data, reset);
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
