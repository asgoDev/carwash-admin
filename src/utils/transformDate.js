export const transformDate = (dateString) => {
  // Si no hay fecha, no retornamos nada para evitar errores.
  if (!dateString) return "";
  const date = new Date(dateString);
  // Usamos los métodos getUTC... para evitar problemas con la zona horaria.
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Los meses son base 0
  const year = date.getUTCFullYear();
  return `${day}/${month}/${year}`;
};
