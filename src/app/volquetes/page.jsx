import Link from "next/link";

const VolquetesView = () => {
  return (
    <main className="py-20 min-h-screen bg-slate-800">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        Nuestros volquetes
      </h1>
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 gap-10 text-slate-600">
        <Link
          href={"/volquetes/listar"}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-list-check text-4xl"></i>
          <p className="mt-4">Listar volquetes</p>
        </Link>
        <Link
          href={"/volquetes/insertar"}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-plus text-4xl"></i>
          <p className="mt-4">Insertar nuevo volquete</p>
        </Link>
        {/* <Link
          href={"/"}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-pen-to-square text-4xl"></i>
          <p className="mt-4">Actualizar un volquete</p>
        </Link>
        <Link
          href={"/"}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-minus text-4xl"></i>
          <p className="mt-4">Eliminar un volquete</p>
        </Link> */}
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-20">
        <Link
          href="/"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          ← Regresar a inicio
        </Link>
      </div>
    </main>
  );
};

export default VolquetesView;