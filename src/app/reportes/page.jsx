"use client";

import Link from "next/link";
import { useState } from "react";

const ReportesView = () => {
  const [resultados, setResultados] = useState(null); // Para almacenar los resultados
  const [error, setError] = useState(null); // Para manejar errores
  const [loading, setLoading] = useState(false); // Indicador de carga

  // Función para ejecutar un reporte
  const ejecutarReporte = async (reporte) => {
    setLoading(true);
    setResultados(null);
    setError(null);

    try {
      const response = await fetch("/api/${reporte}"); // Llamada al endpoint correspondiente
      if (!response.ok) {
        throw new Error("Error al obtener los datos del reporte");
      }
      const data = await response.json();
      setResultados(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="py-20 min-h-screen bg-slate-800">
      <h1 className="text-center text-2xl underline decoration-4 underline-offset-8 font-extrabold tracking-tight leading-none text-white md:text-4xl uppercase">
        Reportes disponibles
      </h1>
      <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 gap-10 text-slate-600">
        {/* Botones de reportes */}
        <button
          onClick={() => ejecutarReporte("reporte_conductores_licencias")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-id-card text-4xl"></i>
          <p className="mt-4">1. Conductores y licencias</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_vehiculos_conductores")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-truck text-4xl"></i>
          <p className="mt-4">2. Vehículos y conductores</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_cargamentos_volquetes")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-boxes-stacked text-4xl"></i>
          <p className="mt-4">3. Cargamentos y volquetes</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_total_vehiculos_marca")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-car text-4xl"></i>
          <p className="mt-4">4. Total vehículos por marca</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_clientes_cargamentos")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-users text-4xl"></i>
          <p className="mt-4">5. Clientes y cargamentos</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_volquete_mayor_carga")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-weight-scale text-4xl"></i>
          <p className="mt-4">6. Volquete mayor carga</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_vehiculos_soat_activo")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-shield text-4xl"></i>
          <p className="mt-4">7. Vehículos con SOAT</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_registros_transporte")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-calendar-days text-4xl"></i>
          <p className="mt-4">8. Registros transporte</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_peso_total_cargamentos")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-truck-loading text-4xl"></i>
          <p className="mt-4">9. Peso total cargamentos</p>
        </button>
        <button
          onClick={() => ejecutarReporte("reporte_clientes_ubicacion_destino")}
          className="border text-center font-semibold text-2xl py-10 rounded-lg bg-white group hover:scale-110 transform transition-all duration-300"
        >
          <i className="fa-solid fa-location-arrow text-4xl"></i>
          <p className="mt-4">10. Clientes por destino</p>
        </button>
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 mt-20">
        <Link
          href="/"
          className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
        >
          ← Regresar a inicio
        </Link>
      </div>

      {/* Mostrar resultados */}
      <div className="mt-8 max-w-4xl mx-auto bg-white p-4 rounded-lg">
        {loading && <p className="text-center">Cargando...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {resultados && (
          <pre className="whitespace-pre-wrap">
            {JSON.stringify(resultados, null, 2)}
          </pre>
        )}
      </div>
    </main>
  );
};

export default ReportesView;
