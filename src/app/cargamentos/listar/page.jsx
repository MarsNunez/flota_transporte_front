"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [cargamentos, setCargamentos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/cargamentos");
      setCargamentos(res.data.reverse());
    };
    fetchData();
  }, []);

  const handleDelete = async (nro) => {
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
          await axios.post(`http://localhost:3001/cargamentos/delete`, {
            nro,
          });

          // Actualizar el estado de conductores
          const res = await axios.get("http://localhost:3001/cargamentos");
          setCargamentos(res.data);

          Swal.fire(
            "Eliminado!",
            "El cargamento ha sido eliminado.",
            "success"
          );
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
        Listado de cargamentos
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {cargamentos.map((cargamento) => (
          <div
            key={cargamento.nro}
            className="flex max-h-72 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://www.juiciocrudo.com/pics/nocrop/1280x960/3049035b370a5ffea85049c0cbde655216fd6e1e.jpg"
                alt="cargamento"
              />
              <Link
                href={"/cargamentos/actualizar/" + cargamento.nro}
                className=""
              >
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(cargamento.nro)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">Nro cargamento:</span>{" "}
                {cargamento.nro}
              </p>
              <p className="text-xl">
                <span className="font-bold">Origen:</span> {cargamento.origen}
              </p>
              <p className="text-xl">
                <span className="font-bold">Destino:</span> {cargamento.destino}
              </p>
              <p className="text-xl">
                <span className="font-bold">Unidad:</span> {cargamento.unidad}
              </p>
              <p className="text-xl">
                <span className="font-bold">Peso:</span> {cargamento.peso}{" "}
                {cargamento.unidad.toLowerCase()}
              </p>
              <p className="text-xl">
                <span className="font-bold">Nombre:</span> {cargamento.nombre}
              </p>
              <p className="text-xl">
                <span className="font-bold">Código del volquete:</span>{" "}
                {cargamento.codigo_volquete}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
