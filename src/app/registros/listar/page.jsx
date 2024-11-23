"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/registros");
        setRegistros(res.data.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (nro_registro) => {
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
          await axios.post(`http://localhost:3001/registros/delete`, {
            nro_registro,
          });

          const res = await axios.get("http://localhost:3001/registros");
          setRegistros(res.data);

          Swal.fire("Eliminado!", "El registro ha sido eliminado.", "success");
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
        Listado de Registros
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {registros.map((registro) => (
          <div
            key={registro.nro_registro}
            className="flex max-h-80 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://cdn-icons-png.flaticon.com/512/5146/5146927.png"
                alt="registro"
              />
              <Link
                href={"/registros/actualizar/" + registro.nro_registro}
                className=""
              >
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(registro.nro_registro)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">Nro Registro:</span>{" "}
                {registro.nro_registro}
              </p>
              <p className="text-xl">
                <span className="font-bold">Nro Cargamento:</span>{" "}
                {registro.nro_cargamento}
              </p>
              <p className="text-xl">
                <span className="font-bold">Fecha Partida:</span>{" "}
                {new Date(registro.fecha_partida).toLocaleDateString()}
              </p>
              <p className="text-xl">
                <span className="font-bold">DNI Conductor:</span>{" "}
                {registro.dni_conductor}
              </p>
              <p className="text-xl">
                <span className="font-bold">Placa Vehículo:</span>{" "}
                {registro.placa_vehiculo}
              </p>
              <p className="text-xl">
                <span className="font-bold">Ubicación Origen:</span>{" "}
                {registro.ubicacion_origen}
              </p>
              <p className="text-xl">
                <span className="font-bold">Ubicación Destino:</span>{" "}
                {registro.ubicacion_destino}
              </p>
              <p className="text-xl">
                <span className="font-bold">Fecha Estimada Llegada:</span>{" "}
                {new Date(registro.fecha_estimada_llegada).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
