"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ActualizarCliente = () => {
  const params = useParams(); // Obtiene los parámetros de la URL
  const [cliente, setCliente] = useState({}); // Estado para almacenar el cliente seleccionado
  const [formData, setFormData] = useState({
    ruc: "",
    nombre: "",
    ubicacion: "",
    telefono: "",
    nro_cargamento: "",
  });

  // Fetch data based on the "ruc"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/clientes"); // Cambia a la URL correcta de tu API
        const filtrado = res.data.find((c) => c.ruc === params.ruc); // Busca el cliente por el RUC
        if (filtrado) {
          setCliente(filtrado);
        }
      } catch (error) {
        console.error("Error fetching cliente:", error);
      }
    };

    fetchData();
  }, [params.ruc]);

  // Actualiza el formulario cuando el cliente cambia
  useEffect(() => {
    if (cliente) {
      setFormData({
        ruc: cliente.ruc || "",
        nombre: cliente.nombre || "",
        ubicacion: cliente.ubicacion || "",
        telefono: cliente.telefono || "",
        nro_cargamento: cliente.nro_cargamento || "",
      });
    }
  }, [cliente]);

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
      const response = await axios.put(
        `http://localhost:3001/clientes/update`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "Cliente actualizado con éxito.",
        }).then(() => {
          // Redirigir al usuario a la lista de volquetes
          window.location.href = "/clientes";
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al actualizar el cliente.",
        });
      }
    } catch (error) {
      console.error("Error actualizando cargamento:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al actualizar el cargamento. Inténtalo nuevamente.",
      });
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-pen-to-square text-5xl mb-7"></i> <br />
        Actualizar Cliente
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              RUC
            </label>
            <input
              type="text"
              id="ruc"
              value={formData.ruc}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
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
              Ubicación
            </label>
            <input
              type="text"
              id="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Teléfono
            </label>
            <input
              type="text"
              id="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Número de Cargamento (uno existente)
            </label>
            <input
              type="number"
              id="nro_cargamento"
              value={formData.nro_cargamento}
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

export default ActualizarCliente;
