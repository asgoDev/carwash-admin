// store/appStore.js
import { create } from "zustand";
import { createCrudSlice } from "./createCrudSlice.js";

const useAppStore = create((set, get) => ({
  ...createCrudSlice("clients")(set, get),
  ...createCrudSlice("employees")(set, get),
  ...createCrudSlice("services")(set, get),
  ...createCrudSlice("rate")(set, get),
  //   ...createCrudSlice("tickets")(set, get),

  // acción global para cargar todo de una vez
  fetchGlobalState: async () => {
    await Promise.all([
      get().fetchClients(),
      get().fetchEmployees(),
      get().fetchServices(),
      get().fetchRate(),
      //   get().fetchTickets(),
    ]);
  },
}));

export default useAppStore;
