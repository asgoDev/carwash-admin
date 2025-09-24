import ContentLayaout from "../components/ContentLayout";

const Payments = () => {
  return (
    <ContentLayaout title="Registrar pago">
      <section className="mb-4  px-4">
        <h2 className="text-2xl border-b py-2 px-4 border-gray-300">Cliente</h2>
        <div className="p-4 flex flex-col gap-2">
          <input
            type="text"
            name=""
            id=""
            className="bg-white p-2 rounded w-full"
            placeholder="C. I. del cliente"
          />

          <span>Nombre completo: Aquiles Gonzalez</span>
          <span>Fecha de ultimo lavado: 15/05/2025</span>
        </div>
      </section>
      <section className="mb-4 flex flex-col gap-2 px-4">
        <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
          Vehiculo
        </h2>
        <div className="p-4 flex flex-col gap-2">
          <select className="bg-white p-2 rounded w-full">
            <option value="">Chevrolet, Corsa - GEF88E</option>
          </select>
        </div>
      </section>
      <section className="mb-4 flex flex-col gap-2 px-4">
        <h2 className="text-2xl border-b py-2 px-4 border-gray-300">
          Servicio
        </h2>
        <div className="p-4 flex flex-col gap-2">
          <label>
            Lavado simple: <input type="checkbox" />
          </label>
          <label>
            Pulitura: <input type="checkbox" />
          </label>
          <label>
            Motor: <input type="checkbox" />
          </label>
          <label>
            Lavado Premium: <input type="checkbox" />
          </label>
        </div>
      </section>
      <section className="mb-4 flex flex-col gap-2 px-4">
        <h2 className="text-2xl border-b py-2 px-4 border-gray-300">Total</h2>
        <div className="p-4 flex flex-col gap-2 max-w-sm">
          <p className="flex justify-between">
            <span>Lavado simple: </span>
            <span>3$</span>
          </p>
          <p className="flex justify-between">
            <span>Pulitura: </span>
            <span>2$</span>
          </p>
          <p className="flex justify-between text-lg font-bold">
            <span>TOTAL: </span>
            <span>5$</span>
          </p>
          <p className="flex justify-between  font-bold">
            <span></span>
            <span>850,00bs</span>
          </p>
        </div>
      </section>
    </ContentLayaout>
  );
};

export default Payments;
