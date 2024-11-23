"use client";

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [volquetes, setVolquetes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:3001/volquetes");
      setVolquetes(res.data.reverse());
    };
    fetchData();
  }, []);

  const handleDelete = async (codigo) => {
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
          await axios.post(`http://localhost:3001/volquetes/delete`, {
            codigo,
          });

          // Actualizar el estado de conductores
          const res = await axios.get("http://localhost:3001/volquetes");
          setVolquetes(res.data);

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
        Listado de volquetes
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {volquetes.map((volquete) => (
          <div
            key={volquete.codigo}
            className="flex max-h-72 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaLgTYfeXneZbtLR0d9Q84xrwlhRaZkhdLw2-SE3royQbZ1fFbgjWw5EypKUpVUidI1qA&usqp=CAU"
                alt="volquete"
              />
              <Link
                href={"/volquetes/actualizar/" + volquete.codigo}
                className=""
              >
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(volquete.codigo)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">Código:</span> {volquete.codigo}
              </p>
              <p className="text-xl">
                <span className="font-bold">Placa del vehículo:</span>{" "}
                {volquete.placa_vehiculo}
              </p>
              <p className="text-xl">
                <span className="font-bold">Longitud:</span> {volquete.longitud}{" "}
                metros
              </p>
              <p className="text-xl">
                <span className="font-bold">Ancho:</span> {volquete.ancho}{" "}
                metros
              </p>
              <p className="text-xl">
                <span className="font-bold">Altura:</span> {volquete.altura}{" "}
                metros
              </p>
              <p className="text-xl">
                <span className="font-bold">Carga útil:</span>{" "}
                {volquete.carga_util} kg
              </p>
              <p className="text-xl">
                <span className="font-bold">Peso bruto:</span>{" "}
                {volquete.peso_bruto} kg
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
