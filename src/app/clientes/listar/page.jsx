"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/clientes");
      setClientes(res.data.reverse());
    };
    fetchData();
  }, []);

  const handleDelete = async (ruc) => {
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
          await axios.post(`http://localhost:3001/clientes/delete`, {
            ruc,
          });

          // Actualizar el estado de conductores
          const res = await axios.get("http://localhost:3001/clientes");
          setClientes(res.data);

          Swal.fire("Eliminado!", "El volquete ha sido eliminado.", "success");
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
        Listado de Clientes
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {clientes.map((cliente) => (
          <div
            key={cliente.ruc}
            className="flex max-h-80 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://randomuser.me/api/portraits/lego/1.jpg"
                alt="cliente"
              />
              <Link href={"/clientes/actualizar/" + cliente.ruc} className="">
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(cliente.ruc)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">RUC:</span> {cliente.ruc}
              </p>
              <p className="text-xl">
                <span className="font-bold">Nombre:</span> {cliente.nombre}
              </p>
              <p className="text-xl">
                <span className="font-bold">Ubicación:</span>{" "}
                {cliente.ubicacion}
              </p>
              <p className="text-xl">
                <span className="font-bold">Teléfono:</span> {cliente.telefono}
              </p>
              <p className="text-xl">
                <span className="font-bold">Número de cargamento:</span>{" "}
                {cliente.nro_cargamento}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
