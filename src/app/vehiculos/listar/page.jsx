"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await axios.get("http://localhost:3001/vehiculos");
      setVehiculos(res.data.reverse());
    };
    data();
  }, []);

  const handleDelete = async (placa) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Eliminar conductor
          await axios.post(`http://localhost:3001/vehiculos/delete`, {
            placa,
          });

          // Actualizar el estado de conductores
          const res = await axios.get("http://localhost:3001/vehiculos");
          setVehiculos(res.data);

          Swal.fire("Eliminado!", "El vehiculo ha sido eliminado.", "success");
        } catch (error) {
          Swal.fire(
            "Error!",
            "Ocurrió un problema al eliminar el conductor.",
            "error"
          );
        }
      }
    });
  };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-list-check text-5xl mb-7"></i> <br />
        Listado de vehiculos
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {vehiculos.map((vehiculo) => (
          <div
            key={vehiculo.placa}
            className="flex max-h-72 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://bbrskc.s3-sa-east-1.amazonaws.com/images/product/CF450FTSC_DAF_CF_FT_4x2_Space_Cab1_1635792329885-1300.jpg"
                alt="user"
              />
              <Link
                href={"/vehiculos/actualizar/" + vehiculo.placa}
                className=""
              >
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(vehiculo.placa)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">Placa:</span> {vehiculo.placa}
              </p>
              <p className="text-xl">
                <span className="font-bold">Marca:</span> {vehiculo.marca}
              </p>
              <p className="text-xl">
                <span className="font-bold">Modelo:</span> {vehiculo.modelo}
              </p>
              <p className="text-xl">
                <span className="font-bold">Certificado especial:</span>{" "}
                {vehiculo.certificado_habilitacion_vehicular_especial}
              </p>
              <p className="text-xl">
                <span className="font-bold">SOAT:</span> {vehiculo.soat}
              </p>
              <p className="text-xl">
                <span className="font-bold">Tarjeta circulacion:</span>{" "}
                {vehiculo.tarjeta_unica_circulacion}
              </p>
              <p className="text-xl">
                <span className="font-bold">Tarjeta electronica:</span>{" "}
                {vehiculo.tarjeta_identificacion_vehicular_electronica}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
