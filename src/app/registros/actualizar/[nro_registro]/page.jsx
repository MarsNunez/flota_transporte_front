"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ActualizarRegistro = () => {
  const params = useParams(); // Obtiene los parámetros de la URL
  const [registro, setRegistro] = useState({}); // Estado para almacenar el registro seleccionado
  const [formData, setFormData] = useState({
    nro_registro: "",
    nro_cargamento: "",
    fecha_partida: "",
    dni_conductor: "",
    placa_vehiculo: "",
    ubicacion_destino: "",
    fecha_estimada_llegada: "",
    ubicacion_origen: "",
  });

  // Fetch data based on the "nro_registro"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/registros"); // Cambia a la URL correcta de tu API
        const filtrado = res.data.find(
          (r) => r.nro_registro === params.nro_registro
        ); // Busca el registro por el número de registro
        if (filtrado) {
          setRegistro(filtrado);
        }
      } catch (error) {
        console.error("Error fetching registro:", error);
      }
    };

    fetchData();
  }, [params.nro_registro]);

  // Actualiza el formulario cuando el registro cambia
  useEffect(() => {
    if (registro) {
      setFormData({
        nro_registro: registro.nro_registro || "",
        nro_cargamento: registro.nro_cargamento || "",
        fecha_partida: registro.fecha_partida
          ? new Date(registro.fecha_partida).toISOString().slice(0, 16) // Convierte a formato para inputs tipo datetime-local
          : "",
        dni_conductor: registro.dni_conductor || "",
        placa_vehiculo: registro.placa_vehiculo || "",
        ubicacion_destino: registro.ubicacion_destino || "",
        fecha_estimada_llegada: registro.fecha_estimada_llegada
          ? new Date(registro.fecha_estimada_llegada).toISOString().slice(0, 16) // Convierte a formato para inputs tipo datetime-local
          : "",
        ubicacion_origen: registro.ubicacion_origen || "",
      });
    }
  }, [registro]);

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
        `http://localhost:3001/registros/update`,
        formData
      );
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "Registro actualizado con éxito.",
        }).then(() => {
          // Redirigir al usuario a la lista de volquetes
          window.location.href = "/registros";
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
        Actualizar Registro
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Número de Registro
            </label>
            <input
              type="text"
              id="nro_registro"
              value={formData.nro_registro}
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
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Fecha de Partida
            </label>
            <input
              type="datetime-local"
              id="fecha_partida"
              value={formData.fecha_partida}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              DNI del Conductor
            </label>
            <input
              type="text"
              id="dni_conductor"
              value={formData.dni_conductor}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          {/* <div className="mb-5">
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
              Ubicación de Destino
            </label>
            <input
              type="text"
              id="ubicacion_destino"
              value={formData.ubicacion_destino}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Fecha Estimada de Llegada
            </label>
            <input
              type="datetime-local"
              id="fecha_estimada_llegada"
              value={formData.fecha_estimada_llegada}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Ubicación de Origen
            </label>
            <input
              type="text"
              id="ubicacion_origen"
              value={formData.ubicacion_origen}
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

export default ActualizarRegistro;
