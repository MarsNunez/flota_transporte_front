"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ActualizarVehiculo = () => {
  const params = useParams(); // Obtiene los parámetros de la URL
  const [vehiculo, setVehiculo] = useState({}); // Estado para almacenar el vehículo seleccionado
  const [formData, setFormData] = useState({
    placa: "",
    marca: "",
    modelo: "",
    certificado_habilitacion_vehicular_especial: "",
    soat: "",
    tarjeta_unica_circulacion: "",
    tarjeta_identificacion_vehicular_electronica: "",
  });

  // Fetch data based on the "placa"
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/vehiculos"); // Cambia a la URL correcta de tu API
        const filtrado = res.data.find((v) => v.placa === params.placa); // Busca el vehículo por la placa
        if (filtrado) {
          setVehiculo(filtrado);
        }
      } catch (error) {
        console.error("Error fetching vehículo:", error);
      }
    };

    fetchData();
  }, [params.placa]);

  // Actualiza el formulario cuando el vehículo cambia
  useEffect(() => {
    if (vehiculo) {
      setFormData({
        placa: vehiculo.placa || "",
        marca: vehiculo.marca || "",
        modelo: vehiculo.modelo || "",
        certificado_habilitacion_vehicular_especial:
          vehiculo.certificado_habilitacion_vehicular_especial || "",
        soat: vehiculo.soat || "",
        tarjeta_unica_circulacion: vehiculo.tarjeta_unica_circulacion || "",
        tarjeta_identificacion_vehicular_electronica:
          vehiculo.tarjeta_identificacion_vehicular_electronica || "",
      });
    }
  }, [vehiculo]);

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
      // Realizar la solicitud PUT al backend con los datos del formulario
      await axios.put("http://localhost:3001/vehiculos/update", formData);

      // Mostrar un mensaje de éxito
      Swal.fire(
        "Actualizado!",
        "El vehículo ha sido actualizado correctamente.",
        "success"
      ).then(() => {
        // Opcional: Redirigir al usuario a la lista de vehículos
        window.location.href = "/vehiculos";
      });
    } catch (error) {
      // Manejo de errores
      Swal.fire(
        "Error!",
        "Ocurrió un problema al actualizar el vehículo.",
        "error"
      );
      console.error("Error actualizando vehículo:", error);
    }
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-pen-to-square text-5xl mb-7"></i> <br />
        Actualizar Vehículo
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        <form
          className="max-w-lg text-xl mx-auto w-full"
          onSubmit={handleSubmit}
        >
          {/* <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Placa
            </label>
            <input
              type="text"
              id="placa"
              value={formData.placa}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div> */}
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Marca
            </label>
            <input
              type="text"
              id="marca"
              value={formData.marca}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Modelo
            </label>
            <input
              type="text"
              id="modelo"
              value={formData.modelo}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Certificado Habilitación Vehicular Especial
            </label>
            <input
              type="text"
              id="certificado_habilitacion_vehicular_especial"
              value={formData.certificado_habilitacion_vehicular_especial}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              SOAT
            </label>
            <input
              type="text"
              id="soat"
              value={formData.soat}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Tarjeta Única de Circulación
            </label>
            <input
              type="text"
              id="tarjeta_unica_circulacion"
              value={formData.tarjeta_unica_circulacion}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 font-medium text-gray-900 dark:text-white">
              Tarjeta de Identificación Vehicular Electrónica
            </label>
            <input
              type="text"
              id="tarjeta_identificacion_vehicular_electronica"
              value={formData.tarjeta_identificacion_vehicular_electronica}
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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

export default ActualizarVehiculo;
