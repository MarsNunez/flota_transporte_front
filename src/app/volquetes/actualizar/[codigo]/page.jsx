"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ActualizarVolquete = () => {
  const params = useParams(); // Obtiene los parámetros de la URL
  const [volquete, setVolquete] = useState({}); // Estado para almacenar el volquete seleccionado
  const [formData, setFormData] = useState({
    codigo: "",
    placa_vehiculo: "",
    longitud: "",
    ancho: "",
    altura: "",
    carga_util: "",
    peso_bruto: "",
  });

  // Fetch data based on the "codigo"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/volquetes"); // Cambia a la URL correcta de tu API
        const filtrado = res.data.find((v) => v.codigo === params.codigo); // Busca el volquete por el código
        if (filtrado) {
          setVolquete(filtrado);
        }
      } catch (error) {
        console.error("Error fetching volquete:", error);
      }
    };

    fetchData();
  }, [params.codigo]);

  // Actualiza el formulario cuando el volquete cambia
  useEffect(() => {
    if (volquete) {
      setFormData({
        codigo: volquete.codigo || "",
        placa_vehiculo: volquete.placa_vehiculo || "",
        longitud: volquete.longitud || "",
        ancho: volquete.ancho || "",
        altura: volquete.altura || "",
        carga_util: volquete.carga_util || "",
        peso_bruto: volquete.peso_bruto || "",
      });
    }
  }, [volquete]);

  // Maneja los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar la solicitud PUT al backend
      await axios.put("http://localhost:3001/volquetes/update", formData);

      // Mostrar mensaje de éxito
      Swal.fire(
        "Actualizado!",
        "El volquete ha sido actualizado correctamente.",
        "success"
      ).then(() => {
        // Redirigir al usuario a la lista de volquetes
        window.location.href = "/volquetes";
      });
    } catch (error) {
      // Manejo de errores
      Swal.fire(
        "Error!",
        "Ocurrió un problema al actualizar el volquete.",
        "error"
      );
      console.error("Error actualizando volquete:", error);
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-pen-to-square text-5xl mb-7"></i> <br />
        Actualizar Volquete
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Código
            </label>
            <input
              type="text"
              id="codigo"
              value={formData.codigo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Placa del Vehículo
            </label>
            <input
              type="text"
              id="placa_vehiculo"
              value={formData.placa_vehiculo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Longitud
            </label>
            <input
              type="number"
              id="longitud"
              value={formData.longitud}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Ancho
            </label>
            <input
              type="number"
              id="ancho"
              value={formData.ancho}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Altura
            </label>
            <input
              type="number"
              id="altura"
              value={formData.altura}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Carga Útil
            </label>
            <input
              type="number"
              id="carga_util"
              value={formData.carga_util}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Peso Bruto
            </label>
            <input
              type="number"
              id="peso_bruto"
              value={formData.peso_bruto}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Actualizar
          </button>
        </form>
      </div>
    </section>
  );
};

export default ActualizarVolquete;