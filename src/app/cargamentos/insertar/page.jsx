"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import axios from "axios";

const Listar = () => {
  const router = useRouter(); // Instanciar el router
  const [formData, setFormData] = useState({
    nro: "",
    origen: "",
    unidad: "",
    peso: "",
    nombre: "",
    destino: "",
    codigo_volquete: "",
  });

  useEffect(() => {
    const fetchCargamentos = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/cargamentos`); // Reemplaza con la URL de tu API
        setFormData((prevData) => ({
          ...prevData,
          nro: response.data.at(-1).nro + 1, // Siguiente número de cargamento
        }));
      } catch (error) {
        console.error("Error al obtener los cargamentos:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener el número del próximo cargamento. Verifica tu conexión.",
        });
      }
    };

    fetchCargamentos();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "peso" ? Number(value) : value, // Convierte a número si el campo es 'peso'
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:3001/cargamentos/insert`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Cargamento insertado con éxito.",
        }).then(() => {
          router.push("/cargamentos"); // Redirige al listado
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al insertar el cargamento.",
        });
      }
    } catch (error) {
      console.error("Error al insertar el cargamento:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al insertar el cargamento. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-plus text-5xl mb-7"></i> <br />
        Insertar nuevo cargamento
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Número
            </label>
            <input
              type="number"
              id="nro"
              value={formData.nro}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
              disabled // Deshabilitado para evitar modificaciones
            />
          </div> */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Origen
            </label>
            <input
              type="text"
              id="origen"
              value={formData.origen}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Unidad (Toneladas)
            </label>
            <input
              type="text"
              id="unidad"
              value={formData.unidad}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Peso (Toneladas)
            </label>
            <input
              type="number"
              id="peso"
              value={formData.peso}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Nombre del cargamento
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Destino
            </label>
            <input
              type="text"
              id="destino"
              value={formData.destino}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Código del volquete (VOL003)
            </label>
            <input
              type="text"
              id="codigo_volquete"
              value={formData.codigo_volquete}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <button
            type="submit"
            className="text-white mt-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
          >
            Listo
          </button>
        </form>
      </div>
    </section>
  );
};

export default Listar;
