const newClientFormConfig = {
  submitFx: async (data, req, reset) => {
    const { brand, model, plate, vehicleType, ...clientData } = data;
    const transformedData = {
      ...clientData,
      vehicles: [
        {
          type: vehicleType,
          brand,
          model,
          plate,
        },
      ],
    };

    req(transformedData, reset);
  },
  submitLabel: "Agregar Cliente",
  inputsConfig: [
    {
      label: "C. I.",
      name: "ci",
      type: "number",
      params: {
        required: "Cédula obligatoria",
        pattern: {
          value: /^[0-9]+$/,
          message: "Solo se permiten números",
        },
      },
    },
    {
      label: "Nombres",
      name: "firstName",
      type: "text",
      params: {
        required: "El nombre del cliente es obligatorio",
        pattern: {
          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
          message: "Solo se permiten letras",
        },
      },
    },
    {
      label: "Apellidos",
      name: "lastName",
      type: "text",
      params: {
        required: "EL apellido del cliente es obligatorio",
        pattern: {
          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
          message: "Solo se permiten letras",
        },
      },
    },
    {
      label: "Teléfono",
      name: "phone",
      type: "number",
      params: {
        required: "Nro de teléfono obligatorio",
        pattern: {
          value: /^[0-9]+$/,
          message: "solo se permiten números",
        },
      },
    },
    {
      label: "Correo electrónico",
      name: "email",
      type: "email",
      params: {
        pattern: {
          value: /^\S+@\S+$/i,
          message: "Dirección de correo no válida",
        },
      },
    },
    {
      label: "Tipo de vehículo",
      name: "vehicleType",
      type: "select",
      options: ["moto", "carro", "camioneta", "camión"],
    },
    {
      label: "Marca",
      name: "brand",
      type: "select",
      options: [
        "Toyota",
        "Honda",
        "Ford",
        "Chevrolet",
        "Volkswagen",
        "Nissan",
        "Hyundai",
        "Kia",
        "Mazda",
        "Renault",
        "Peugeot",
        "BMW",
        "Mercedes-Benz",
        "Audi",
        "Fiat",
        "Suzuki",
        "Jeep",
        "Subaru",
        "Mitsubishi",
        "Volvo",
        "Chery",
        "Venirauto",
        "Arauca",
        "Turpial",
        "Encava",
        "Empire Keeway",
        "Bera",
        "Skygo",
        "MD",
        "Arsen",
        "Supra",
        "Horse",
        "UM Venezuela",
        "Otra",
      ],
    },
    {
      label: "Modelo",
      name: "model",
      type: "text",
    },
    {
      label: "Placa",
      name: "plate",
      type: "text",
    },
  ],
};

export default newClientFormConfig;
