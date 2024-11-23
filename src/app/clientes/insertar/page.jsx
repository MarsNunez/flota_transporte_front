"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

const Listar = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ruc: "",
    nombre: "",
    ubicacion: "",
    telefono: "",
    nro_cargamento: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: id === "nro_cargamento" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:3001/clientes/insert`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "Cliente insertado con éxito.",
        }).then(() => {
          router.push("/clientes"); // Redirige al listado
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al insertar el cliente.",
        });
      }
    } catch (error) {
      console.error("Error al insertar el cliente:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Ocurrió un error al insertar el ergistros. Por favor, inténtalo nuevamente.",
      });
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-plus text-5xl mb-7"></i> <br />
        Insertar nuevo cliente
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              RUC (20123456780)
            </label>
            <input
              type="text"
              id="ruc"
              value={formData.ruc}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Nombre
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
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Nuevo Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Número de Cargamento (uno existente)
            </label>
            <input
              type="number"
              id="nro_cargamento"
              value={formData.nro_cargamento}
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
