"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const Actualizar = () => {
  const params = useParams();
  const [conductor, setConductor] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    dni: "",
    codigo_antecedente_policial: "",
    codigo_antecedente_penal: "",
    nro_licencia_conducir: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/conductores");
        const filtrado = res.data.find((t) => t.dni == params.dni);
        if (filtrado) {
          setConductor(filtrado);
        }
      } catch (error) {
        console.error("Error fetching conductor:", error);
      }
    };

    fetchData();
  }, [params.dni]);

  useEffect(() => {
    if (conductor) {
      setFormData({
        nombre: conductor.nombre || "",
        dni: conductor.dni || "",
        codigo_antecedente_policial:
          conductor.codigo_antecedente_policial || "",
        codigo_antecedente_penal: conductor.codigo_antecedente_penal || "",
        nro_licencia_conducir: conductor.nro_licencia_conducir || "",
      });
    }
  }, [conductor]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Realizar la solicitud PUT al backend con los datos del formulario
      await axios.put("http://localhost:3001/conductores/update", formData);

      // Mostrar un mensaje de éxito
      Swal.fire(
        "Actualizado!",
        "El conductor ha sido actualizado correctamente.",
        "success"
      ).then(() => {
        // Opcional: Redirigir o actualizar el estado después de la confirmación
        window.location.href = "/conductores";
      });
    } catch (error) {
      // Manejo de errores
      Swal.fire(
        "Error!",
        "Ocurrió un problema al actualizar el conductor.",
        "error"
      );
      console.error("Error actualizando conductor:", error);
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-pen-to-square text-5xl mb-7"></i> <br />
        Actualizar conductor
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
          {/* <div className="mb-5">
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
          </div> */}
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

export default Actualizar;
