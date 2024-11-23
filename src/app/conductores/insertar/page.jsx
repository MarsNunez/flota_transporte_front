"use client";

import { useState } from "react";

const Listar = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    codigo_antecedente_policial: "",
    codigo_antecedente_penal: "",
    nro_licencia_conducir: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Objeto final del formulario:", formData);
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-plus text-5xl mb-7"></i> <br />
        Insertar nuevo conductor
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              value={formData.dni}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Código antecedente policial (APOL123456788812)
            </label>
            <input
              type="text"
              id="codigo_antecedente_policial"
              value={formData.codigo_antecedente_policial}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Código antecedente penal (PEN3245)
            </label>
            <input
              type="text"
              id="codigo_antecedente_penal"
              value={formData.codigo_antecedente_penal}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Número de licencia de conducir (LIC112090)
            </label>
            <input
              type="text"
              id="nro_licencia_conducir"
              value={formData.nro_licencia_conducir}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Listo
          </button>
        </form>
      </div>
    </section>
  );
};

export default Listar;
