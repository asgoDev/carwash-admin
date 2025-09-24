const newClientFormConfig = {
  submitFx: async (data) => {
    try {
      console.log(data);

      const response = await fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Error guardando empleado");
      const result = await response.json();
      return result;
      // Puedes mostrar un mensaje de éxito aquí si lo deseas
    } catch (error) {
      console.error(error);
      // Puedes mostrar un mensaje de error aquí si lo deseas
    }
  },
  submitLabel: "Registrar Empleado",
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
