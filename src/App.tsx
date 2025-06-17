import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowLeft, Plus, X } from 'lucide-react';

// Definir el tipo para un coche
interface Coche {
  id: number;
  marca: string;
  modelo: string;
  año: number;
  precio: number;
  imagen: string;
  kilometraje: number;
  color: string;
  descripcion: string;
  caracteristicas: string[];
  transmision: string;
  combustible: string;
}

// Datos de ejemplo expandidos
const cochesIniciales: Coche[] = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'Camry',
    año: 2023,
    precio: 25000,
    imagen: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800',
    kilometraje: 0,
    color: 'Plata',
    descripcion: 'Nuevo Toyota Camry con un diseño elegante y tecnología de última generación. Perfecto equilibrio entre confort y rendimiento.',
    caracteristicas: ['Control de crucero adaptativo', 'CarPlay & Android Auto', 'Cámara de retroceso', 'Asientos de cuero'],
    transmision: 'Automática',
    combustible: 'Gasolina'
  },
  {
    id: 2,
    marca: 'Honda',
    modelo: 'Civic',
    año: 2022,
    precio: 22000,
    imagen: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800',
    kilometraje: 15000,
    color: 'Azul',
    descripcion: 'Honda Civic en excelente estado. Combina eficiencia y estilo con características premium.',
    caracteristicas: ['Sistema de frenado automático', 'Pantalla táctil de 9"', 'Sensores de aparcamiento', 'Techo solar'],
    transmision: 'Manual',
    combustible: 'Gasolina'
  },
  {
    id: 3,
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2023,
    precio: 45000,
    imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800',
    kilometraje: 5000,
    color: 'Negro',
    descripcion: 'BMW Serie 3 con acabados deportivos. La combinación perfecta de lujo y rendimiento.',
    caracteristicas: ['Asientos deportivos', 'Sistema de sonido premium', 'Navegación GPS', 'Llantas de aleación'],
    transmision: 'Automática',
    combustible: 'Diésel'
  },
  {
    id: 4,
    marca: 'Mercedes',
    modelo: 'Clase C',
    año: 2023,
    precio: 48000,
    imagen: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800',
    kilometraje: 3000,
    color: 'Blanco',
    descripcion: 'Mercedes Clase C con paquete AMG Line. Máximo lujo y confort con un toque deportivo.',
    caracteristicas: ['Paquete AMG Line', 'Asientos calefactables', 'Head-up display', 'Parking automático'],
    transmision: 'Automática',
    combustible: 'Híbrido'
  },
  {
    id: 5,
    marca: 'Audi',
    modelo: 'A4',
    año: 2022,
    precio: 42000,
    imagen: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800',
    kilometraje: 8000,
    color: 'Gris',
    descripcion: 'Audi A4 con tecnología Quattro. Diseño sofisticado y rendimiento excepcional.',
    caracteristicas: ['Tracción Quattro', 'Virtual Cockpit', 'Matrix LED', 'Bang & Olufsen Sound'],
    transmision: 'Automática',
    combustible: 'Gasolina'
  },
  {
    id: 6,
    marca: 'Volkswagen',
    modelo: 'Golf GTI',
    año: 2024,
    precio: 42000,
    imagen: 'https://images.unsplash.com/photo-1681882683415-1b8d02e07c8b?auto=format&fit=crop&w=800',
    kilometraje: 0,
    color: 'Blanco Puro',
    descripcion: 'Nuevo Volkswagen Golf GTI MK8. La última evolución del icónico hot hatch, ahora con más potencia y tecnología que nunca. Motor 2.0 TSI de 245 CV con diferencial autoblocante electrónico.',
    caracteristicas: [
      'Sistema de infoentretenimiento de 10"',
      'Cuadro digital con modos personalizables',
      'Faros IQ.Light LED Matrix',
      'Control dinámico del chasis DCC',
      'Asientos deportivos con tapicería específica GTI',
      'Sistema de sonido Harman Kardon',
      'Llantas de 19" Adelaide'
    ],
    transmision: 'DSG 7 velocidades',
    combustible: 'Gasolina'
  },
  {
    id: 7,
    marca: 'Porsche',
    modelo: '911',
    año: 2023,
    precio: 120000,
    imagen: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800',
    kilometraje: 500,
    color: 'Amarillo',
    descripcion: 'Porsche 911 Carrera S. El icónico deportivo alemán en su máxima expresión.',
    caracteristicas: ['Modo Sport Plus', 'Suspensión adaptativa', 'Escape deportivo', 'Chrono Package'],
    transmision: 'PDK',
    combustible: 'Gasolina'
  },
  {
    id: 8,
    marca: 'Tesla',
    modelo: 'Model 3',
    año: 2023,
    precio: 55000,
    imagen: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800',
    kilometraje: 2000,
    color: 'Azul Metalizado',
    descripcion: 'Tesla Model 3 Performance. El futuro de la conducción deportiva es eléctrico.',
    caracteristicas: ['Autopilot', 'Pantalla táctil 15"', 'Techo de cristal', 'Modo Track'],
    transmision: 'Automática',
    combustible: 'Eléctrico'
  },
  {
    id: 6,
    marca: 'Lexus',
    modelo: 'LC 500',
    año: 2024,
    precio: 115000,
    imagen: 'https://images.unsplash.com/photo-1619767886558-efdc259b6f05?auto=format&fit=crop&w=800',
    kilometraje: 0,
    color: 'Rojo Sonic',
    descripcion: 'El Lexus LC 500 representa la máxima expresión del lujo y rendimiento japonés. Con su motor V8 atmosférico de 5.0L que desarrolla 464 CV, combina una experiencia de conducción única con un diseño que parece sacado de un concept car.',
    caracteristicas: [
      'Motor V8 atmosférico de 464 CV',
      'Sistema de sonido Mark Levinson Reference',
      'Techo panorámico de cristal',
      'Head-up Display a color',
      'Asientos deportivos ventilados',
      'Sistema de navegación premium con pantalla 10.3"',
      'Llantas forjadas de 21"'
    ],
    transmision: 'Automática de 10 velocidades',
    combustible: 'Gasolina'
  }
];

function App() {
  const [coches, setCoches] = useState<Coche[]>(cochesIniciales);
  const [marcaFiltro, setMarcaFiltro] = useState('');
  const [modeloFiltro, setModeloFiltro] = useState('');
  const [precioMinimo, setPrecioMinimo] = useState('');
  const [precioMaximo, setPrecioMaximo] = useState('');
  const [mostrarFiltros, setMostrarFiltros] = useState(false);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [cocheSeleccionado, setCocheSeleccionado] = useState<Coche | null>(null);
  const [nuevoCoche, setNuevoCoche] = useState<Partial<Coche>>({
    caracteristicas: []
  });
  const [nuevaCaracteristica, setNuevaCaracteristica] = useState('');

  const cochesFiltrados = useMemo(() => {
    return coches.filter(coche => {
      const cumpleMarca = marcaFiltro === '' || coche.marca.toLowerCase().includes(marcaFiltro.toLowerCase());
      const cumpleModelo = modeloFiltro === '' || coche.modelo.toLowerCase().includes(modeloFiltro.toLowerCase());
      const cumplePrecioMin = precioMinimo === '' || coche.precio >= parseInt(precioMinimo);
      const cumplePrecioMax = precioMaximo === '' || coche.precio <= parseInt(precioMaximo);
      
      return cumpleMarca && cumpleModelo && cumplePrecioMin && cumplePrecioMax;
    });
  }, [coches, marcaFiltro, modeloFiltro, precioMinimo, precioMaximo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoCoche.marca && nuevoCoche.modelo && nuevoCoche.precio) {
      const cocheFinal: Coche = {
        id: coches.length + 1,
        marca: nuevoCoche.marca,
        modelo: nuevoCoche.modelo,
        año: nuevoCoche.año || new Date().getFullYear(),
        precio: nuevoCoche.precio,
        imagen: nuevoCoche.imagen || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800',
        kilometraje: nuevoCoche.kilometraje || 0,
        color: nuevoCoche.color || 'No especificado',
        descripcion: nuevoCoche.descripcion || '',
        caracteristicas: nuevoCoche.caracteristicas || [],
        transmision: nuevoCoche.transmision || 'No especificada',
        combustible: nuevoCoche.combustible || 'No especificado'
      };

      setCoches([...coches, cocheFinal]);
      setMostrarFormulario(false);
      setNuevoCoche({ caracteristicas: [] });
    }
  };

  const agregarCaracteristica = () => {
    if (nuevaCaracteristica.trim() && nuevoCoche.caracteristicas) {
      setNuevoCoche({
        ...nuevoCoche,
        caracteristicas: [...nuevoCoche.caracteristicas, nuevaCaracteristica.trim()]
      });
      setNuevaCaracteristica('');
    }
  };

  const eliminarCaracteristica = (index: number) => {
    if (nuevoCoche.caracteristicas) {
      setNuevoCoche({
        ...nuevoCoche,
        caracteristicas: nuevoCoche.caracteristicas.filter((_, i) => i !== index)
      });
    }
  };

  if (mostrarFormulario) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Publicar un Coche</h2>
            <button
              onClick={() => setMostrarFormulario(false)}
              className="text-gray-600 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca*
                </label>
                <input
                  type="text"
                  required
                  value={nuevoCoche.marca || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, marca: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Modelo*
                </label>
                <input
                  type="text"
                  required
                  value={nuevoCoche.modelo || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, modelo: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Año
                </label>
                <input
                  type="number"
                  value={nuevoCoche.año || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, año: parseInt(e.target.value)})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio*
                </label>
                <input
                  type="number"
                  required
                  value={nuevoCoche.precio || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, precio: parseInt(e.target.value)})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kilometraje
                </label>
                <input
                  type="number"
                  value={nuevoCoche.kilometraje || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, kilometraje: parseInt(e.target.value)})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  value={nuevoCoche.color || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, color: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transmisión
                </label>
                <select
                  value={nuevoCoche.transmision || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, transmision: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Manual">Manual</option>
                  <option value="Automática">Automática</option>
                  <option value="CVT">CVT</option>
                  <option value="DSG">DSG</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Combustible
                </label>
                <select
                  value={nuevoCoche.combustible || ''}
                  onChange={(e) => setNuevoCoche({...nuevoCoche, combustible: e.target.value})}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Seleccionar...</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                URL de la imagen
              </label>
              <input
                type="url"
                value={nuevoCoche.imagen || ''}
                onChange={(e) => setNuevoCoche({...nuevoCoche, imagen: e.target.value})}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                value={nuevoCoche.descripcion || ''}
                onChange={(e) => setNuevoCoche({...nuevoCoche, descripcion: e.target.value})}
                rows={4}
                className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Características
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={nuevaCaracteristica}
                  onChange={(e) => setNuevaCaracteristica(e.target.value)}
                  className="flex-1 rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Añadir característica"
                />
                <button
                  type="button"
                  onClick={agregarCaracteristica}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Añadir
                </button>
              </div>
              <div className="space-y-2">
                {nuevoCoche.caracteristicas?.map((caracteristica, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span>{caracteristica}</span>
                    <button
                      type="button"
                      onClick={() => eliminarCaracteristica(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setMostrarFormulario(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Publicar Anuncio
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (cocheSeleccionado) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
          <button
            onClick={() => setCocheSeleccionado(null)}
            className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al catálogo
          </button>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={cocheSeleccionado.imagen}
              alt={`${cocheSeleccionado.marca} ${cocheSeleccionado.modelo}`}
              className="w-full h-96 object-cover"
            />
            
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {cocheSeleccionado.marca} {cocheSeleccionado.modelo}
                  </h1>
                  <p className="text-lg text-gray-600">{cocheSeleccionado.año}</p>
                </div>
                <span className="text-2xl font-bold text-blue-600">
                  {cocheSeleccionado.precio.toLocaleString('es-ES')}€
                </span>
              </div>
              
              <p className="mt-4 text-gray-700">{cocheSeleccionado.descripcion}</p>
              
              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Especificaciones</h2>
                  <dl className="space-y-2">
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Kilometraje:</dt>
                      <dd className="font-medium">{cocheSeleccionado.kilometraje.toLocaleString('es-ES')} km</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Color:</dt>
                      <dd className="font-medium">{cocheSeleccionado.color}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Transmisión:</dt>
                      <dd className="font-medium">{cocheSeleccionado.transmision}</dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-gray-600">Combustible:</dt>
                      <dd className="font-medium">{cocheSeleccionado.combustible}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Características</h2>
                  <ul className="space-y-2">
                    {cocheSeleccionado.caracteristicas.map((caracteristica, index) => (
                      <li key={index} className="flex items-center text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        {caracteristica}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Catálogo de Coches</h1>
            <div className="flex gap-4">
              <button
                onClick={() => setMostrarFormulario(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Publicar Coche
              </button>
              <button
                onClick={() => setMostrarFiltros(!mostrarFiltros)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                <SlidersHorizontal className="w-5 h-5" />
                Filtros
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filtros */}
      {mostrarFiltros && (
        <div className="bg-white shadow-sm mb-6">
          <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Marca</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={marcaFiltro}
                    onChange={(e) => setMarcaFiltro(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Buscar por marca"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Modelo</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    value={modeloFiltro}
                    onChange={(e) => setModeloFiltro(e.target.value)}
                    className="pl-10 w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Buscar por modelo"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Precio mínimo</label>
                <input
                  type="number"
                  value={precioMinimo}
                  onChange={(e) => setPrecioMinimo(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="€"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">Precio máximo</label>
                <input
                  type="number"
                  value={precioMaximo}
                  onChange={(e) => setPrecioMaximo(e.target.value)}
                  className="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="€"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lista de coches */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cochesFiltrados.map(coche => (
            <div
              key={coche.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setCocheSeleccionado(coche)}
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={coche.imagen}
                  alt={`${coche.marca} ${coche.modelo}`}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">{coche.marca} {coche.modelo}</h2>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-gray-600">{coche.año}</span>
                  <span className="text-lg font-bold text-blue-600">{coche.precio.toLocaleString('es-ES')}€</span>
                </div>
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                  <span>{coche.kilometraje.toLocaleString('es-ES')} km</span>
                  <span>{coche.combustible}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;