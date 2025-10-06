/**
 * Formatea un número a un string con formato de moneda (ej: 1.000,00).
 * Usa el punto como separador de miles y la coma como separador decimal.
 * @param {number} amount - La cantidad a formatear.
 * @returns {string} El número formateado como string.
 */
export const formatCurrency = (amount) => {
  if (typeof amount !== "number") {
    return "0,00";
  }

  // El locale 'de-DE' (Alemán) usa el formato 1.234,56 que es el que buscas.
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
