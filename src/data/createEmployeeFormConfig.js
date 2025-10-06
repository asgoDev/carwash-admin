const newClientFormConfig = {
  submitFx: async (data, req, reset) => {
    req(data, reset);
  },
  submitLabel: "Registrar Empleado",
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
        required: "El apellido del cliente es obligatorio",
        pattern: {
          value: /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/,
          message: "Solo se permiten letras",
        },
      },
    },
    {
      label: "Fecha de nacimiento",
      name: "birthDate",
      type: "date",
      params: {
        required: "Fecha de nacimiento obligatoria",
        // pattern: {
        //   value: /^\S+@\S+$/i,
        //   message: "Dirección de correo no válida",
        // },
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
      label: "Direccion de residencia",
      name: "address",
      type: "text",
      params: {
        required: "Debe ingresar una dirección",
      },
    },
  ],
};

export default newClientFormConfig;
