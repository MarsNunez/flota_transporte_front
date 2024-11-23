"use client";

import Swal from "sweetalert2";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

const Listar = () => {
  const [conductores, setConductores] = useState([]);

  // Fetch data
  useEffect(() => {
    const data = async () => {
      const res = await axios.get("http://localhost:3001/conductores");
      setConductores(res.data.reverse());
    };
    data();
  }, []);

  // Handle delete
  const handleDelete = async (dni) => {
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
          await axios.post(`http://localhost:3001/conductores/delete`, {
            dni,
          });

          // Actualizar el estado de conductores
          const res = await axios.get("http://localhost:3001/conductores");
          setConductores(res.data);

          Swal.fire("Eliminado!", "El conductor ha sido eliminado.", "success");
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

  // const handleDelete = async (dni) => {
  //   console.log("Intentando eliminar DNI:", dni);
  //   try {
  //     console.log("Intentando eliminar DNI:", dni);
  //     await axios
  //       .post(`http://localhost:3001/conductores/delete`, { dni })
  //       .then((response) => {
  //         console.log("Response:", response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //       });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  return (
    <section className="bg-slate-800 min-h-screen py-20 px-14">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        <i className="fa-solid fa-list-check text-5xl mb-7"></i> <br />
        Listado de conductores
      </h1>
      <div className="max-w-4xl mx-auto mt-16 flex flex-col gap-6">
        {conductores.map((conductor) => (
          <div
            key={conductor.dni}
            className="flex max-h-80 border-2 bg-slate-700 border-gray-500 rounded-md p-5 w-full mx-auto"
          >
            <div className="w-40 mr-10">
              <img
                className="rounded-lg"
                src="https://randomuser.me/api/portraits/lego/4.jpg"
                alt="user"
              />
              <Link
                href={"/conductores/actualizar/" + conductor.dni}
                className=""
              >
                <div className="bg-green-600 text-center text-white w-full rounded-lg mt-5 py-1 font-semibold">
                  Actualizar
                </div>
              </Link>
              <button
                onClick={() => handleDelete(conductor.dni)}
                className="bg-red-600 text-white w-full rounded-lg mt-2 py-1 font-semibold"
              >
                Eliminar
              </button>
            </div>
            <div className="text-white flex flex-col flex-wrap gap-5">
              <p className="text-xl">
                <span className="font-bold">DNI:</span> {conductor.dni}
              </p>
              <p className="text-xl">
                <span className="font-bold">Nombre:</span> {conductor.nombre}
              </p>
              <p className="text-xl">
                <span className="font-bold">Cdgo. policial:</span>{" "}
                {conductor.codigo_antecedente_policial}
              </p>
              <p className="text-xl">
                <span className="font-bold">Cdigo. penal:</span>{" "}
                {conductor.codigo_antecedente_penal}
              </p>
              <p className="text-xl">
                <span className="font-bold">Licencia de conducir:</span>{" "}
                {conductor.nro_licencia_conducir}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Listar;
