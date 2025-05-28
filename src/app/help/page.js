'use client';

import { FaCalculator, FaBaby, FaHospital, FaEnvelope } from 'react-icons/fa';

const Help = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Ayuda</h1>
        <h2 className="text-2xl text-gray-600 font-medium">
          Calculadora de Fortificador de Leche para Neonatos
        </h2>
        {/* Generado por ChatGPT, podría hacerse con lo que hace de verdad, esto es solo un mock up */}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">
          <div className="flex justify-center mb-6">
            <FaCalculator className="text-4xl text-blue-500" />
          </div>
          <p className="text-gray-600 leading-relaxed">
            Esta herramienta está diseñada para profesionales de la salud neonatal que necesitan calcular con precisión la cantidad adecuada de fortificador a añadir a la leche materna o fórmula, según las necesidades nutricionales individuales de cada recién nacido.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">
          <div className="flex justify-center mb-6">
            <FaBaby className="text-4xl text-blue-500" />
          </div>
          <p className="text-gray-600 leading-relaxed">
            Permite ingresar datos como el volumen de leche, tipo de fortificante (líquido o en polvo), peso del neonato, edad gestacional y requerimientos específicos de proteínas y calorías. A partir de esta información, la calculadora estima la cantidad óptima de fortificante a utilizar, asegurando una nutrición personalizada, segura y basada en las recomendaciones clínicas actualizadas.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 p-6">
          <div className="flex justify-center mb-6">
            <FaHospital className="text-4xl text-blue-500" />
          </div>
          <p className="text-gray-600 leading-relaxed">
            Ideal para unidades de cuidados intensivos neonatales (UCIN), consultorios de nutrición pediátrica y hospitales, esta herramienta contribuye a una alimentación más precisa, minimizando errores y mejorando los resultados clínicos.
          </p>
        </div>

        <div className="col-span-full bg-gray-50 rounded-xl shadow-md p-6 text-center">
          <div className="flex justify-center mb-6">
            <FaEnvelope className="text-4xl text-blue-500" />
          </div>
          <p className="text-gray-600">
            ¿Tienes dudas? Contáctanos a través de nuestro correo electrónico:{' '}
            <a
              href="mailto:info@chechomatic.com"
              className="text-blue-500 font-medium hover:text-blue-600 hover:underline transition-colors duration-200"
            >
              info@chechomatic.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Help;