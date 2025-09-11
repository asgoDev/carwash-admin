const newClientFormConfig = {
  submitFx: async (data) => {
    try {
      const response = await fetch("http://localhost:5000/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save client");
      const result = await response.json();
      console.log("Guardado:", result);
      // Puedes mostrar un mensaje de éxito aquí si lo deseas
    } catch (error) {
      console.error(error);
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }
  },
  submitLabel: "Agregar Cliente",
  inputsConfig: [
    {
      label: "C. I.",
      name: "id",
      type: "text",
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
      type: "text",
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
      options: [
        "Automóvil",
        "Motocicleta",
        "Camioneta",
        "Camión",
        "SUV",
        "Pickup",
        "Van",
        "Otro"
      ],
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
        "Otra"
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
