// src/Pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';
import { api } from '../../Service/api';
import Loader from '../../Components/Loader/Loader';

// Importar leaflet.heat de forma dinámica
import 'leaflet.heat';

// Componente personalizado para el mapa de calor
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    // Verificar que L.heatLayer existe
    if (!L.heatLayer) {
      console.error('leaflet.heat no está cargado correctamente');
      return;
    }

    // Crear capa de calor con configuración intensificada
    const heatLayer = L.heatLayer(points, {
      radius: 30,           // Radio más grande para mayor visibilidad
      blur: 20,             // Más blur para efecto suave
      maxZoom: 10,          // Reducido para que se vea en zoom alejado
      max: 3.0,             // Aumentado para intensificar colores
      minOpacity: 0.6,      // Opacidad mínima para mejor visibilidad
      gradient: {
        0.0: 'rgba(0, 0, 255, 0)',
        0.2: 'blue',
        0.4: 'cyan',
        0.5: 'lime',
        0.6: 'yellow',
        0.75: 'orange',
        0.9: 'red',
        1.0: 'darkred'
      }
    }).addTo(map);

    // Limpiar al desmontar
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

function Dashboard() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultadoPrediccion, setResultadoPrediccion] = useState(null);
  
  // Filtros
  const [filters, setFilters] = useState({
    fecha: '',
    provincia: 'all',
    latitud: '',
    longitud: '',
    modelo: 'modelo1'
  });
  
  const [mapCenter] = useState([-1.8312, -78.1834]); // Centro de Ecuador

  // Cargar provincias al montar
  useEffect(() => {
    const provinciasData = api.getProvincias();
    setProvincias(provinciasData);
  }, []);

  // Aplicar filtros y hacer predicción
  const handleApplyFilters = async () => {
    // Validaciones
    if (!filters.fecha) {
      alert('Por favor selecciona una fecha');
      return;
    }
    
    if (filters.provincia === 'all') {
      alert('Por favor selecciona una provincia');
      return;
    }

    if (filters.modelo === 'modelo2') {
      if (!filters.latitud || !filters.longitud) {
        alert('Para el Modelo 2, debes ingresar latitud y longitud');
        return;
      }
    }

    try {
      setLoading(true);
      setResultadoPrediccion(null);
      setHeatmapData([]);

      if (filters.modelo === 'modelo1') {
        // Procesar Modelo 1
        const resultado = await api.procesarModelo1(
          filters.fecha,
          filters.provincia
        );

        setResultadoPrediccion({
          tipo: 'modelo1',
          contexto: resultado.contexto,
          totalPuntos: resultado.puntos.length
        });

        // Convertir puntos para el mapa de calor
        const heatPoints = resultado.puntos.map(punto => [
          punto.lat,
          punto.lng,
          punto.peso || 1.0
        ]);

        setHeatmapData(heatPoints);
      } else {
        // Procesar Modelo 2
        const puntos = await api.procesarModelo2(
          filters.fecha,
          filters.provincia,
          filters.latitud,
          filters.longitud
        );

        setResultadoPrediccion({
          tipo: 'modelo2',
          totalPuntos: puntos.length,
          riesgoPromedio: puntos.length > 0 ? puntos[0].riesgo : 'N/A'
        });

        // Convertir puntos para el mapa de calor
        const heatPoints = puntos.map(punto => [
          punto.lat,
          punto.lng,
          punto.peso || 1.0
        ]);

        setHeatmapData(heatPoints);
      }
    } catch (error) {
      console.error('Error al aplicar filtros:', error);
      alert('Error al procesar la predicción. Verifica que el servidor esté activo.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  return (
    <div className="dashboard">
      {/* Panel de filtros */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="header-icon">🗺️</div>
          <h2>Mapa Personas Desaparecidas Ecuador</h2>
        </div>

        {/* Selector de Modelo */}
        <div className="filter-section">
          <label className="filter-label">
            🤖 Modelo de Predicción
          </label>
          <select 
            className="filter-select"
            value={filters.modelo}
            onChange={(e) => handleFilterChange('modelo', e.target.value)}
          >
            <option value="modelo1">Modelo 1 - Análisis Provincial</option>
            <option value="modelo2">Modelo 2 - Análisis Geoespacial</option>
          </select>
        </div>

        {/* Filtro de Fecha con DatePicker */}
        <div className="filter-section">
          <label className="filter-label">
            📅 Fecha
          </label>
          <input 
            type="date"
            className="filter-input"
            value={filters.fecha}
            onChange={(e) => handleFilterChange('fecha', e.target.value)}
          />
        </div>

        {/* Filtro de Provincia */}
        <div className="filter-section">
          <label className="filter-label">📍 Provincia</label>
          <select 
            className="filter-select"
            value={filters.provincia}
            onChange={(e) => handleFilterChange('provincia', e.target.value)}
          >
            <option value="all">Selecciona una provincia</option>
            {provincias.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        {/* Campos de Latitud y Longitud - Solo para Modelo 2 */}
        {filters.modelo === 'modelo2' && (
          <>
            <div className="filter-section">
              <label className="filter-label">🌐 Latitud</label>
              <input 
                type="number"
                step="0.000001"
                placeholder="Ej: -2.1709"
                className="filter-input"
                value={filters.latitud}
                onChange={(e) => handleFilterChange('latitud', e.target.value)}
              />
            </div>

            <div className="filter-section">
              <label className="filter-label">🌐 Longitud</label>
              <input 
                type="number"
                step="0.000001"
                placeholder="Ej: -79.9224"
                className="filter-input"
                value={filters.longitud}
                onChange={(e) => handleFilterChange('longitud', e.target.value)}
              />
            </div>
          </>
        )}

        {/* Botón para aplicar filtros */}
        <div className="filter-section">
          <button 
            className="apply-button-main" 
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? '⏳ Procesando...' : '🔍 Aplicar Filtros'}
          </button>
        </div>

        {/* Información del modelo seleccionado */}
        <div className="model-info">
          <h4>ℹ️ Información del Modelo</h4>
          {filters.modelo === 'modelo1' ? (
            <p>
              <strong>Modelo 1:</strong> Analiza patrones basados en fecha y provincia. 
              Genera predicciones en 5 puntos estratégicos de la provincia seleccionada.
            </p>
          ) : (
            <p>
              <strong>Modelo 2:</strong> Análisis geoespacial preciso usando fecha, provincia 
              y coordenadas específicas. Proporciona resultados más detallados por ubicación.
            </p>
          )}
        </div>

        {/* Resultado de la predicción */}
        {resultadoPrediccion && (
          <div className="prediction-result">
            <h4>📊 Resultado de la Predicción</h4>
            {resultadoPrediccion.tipo === 'modelo1' && (
              <>
                <div className="result-item">
                  <span className="result-label">Desapariciones estimadas:</span>
                  <span className="result-value">
                    {resultadoPrediccion.contexto.desapariciones_estimadas.toFixed(2)}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Nivel de riesgo:</span>
                  <span className={`result-badge ${resultadoPrediccion.contexto.riesgo_label.toLowerCase()}`}>
                    {resultadoPrediccion.contexto.riesgo_label}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Puntos analizados:</span>
                  <span className="result-value">{resultadoPrediccion.totalPuntos}</span>
                </div>
              </>
            )}
            {resultadoPrediccion.tipo === 'modelo2' && (
              <>
                <div className="result-item">
                  <span className="result-label">Puntos analizados:</span>
                  <span className="result-value">{resultadoPrediccion.totalPuntos}</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Riesgo detectado:</span>
                  <span className={`result-badge ${resultadoPrediccion.riesgoPromedio.toLowerCase()}`}>
                    {resultadoPrediccion.riesgoPromedio}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Mapa */}
      <div className="map-container">
        {loading && (
          <div className="map-loader-overlay">
            <Loader message="Procesando predicción en múltiples puntos..." />
          </div>
        )}
        
        <MapContainer
          center={mapCenter}
          zoom={7}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {heatmapData.length > 0 && (
            <HeatmapLayer points={heatmapData} />
          )}
        </MapContainer>

        {/* Panel de resumen */}
        {heatmapData.length > 0 && (
          <div className="summary-panel">
            <h3>📊 Resumen de Predicción</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-icon">📍</span>
                <div>
                  <div className="stat-label">Puntos de riesgo:</div>
                  <div className="stat-value">{heatmapData.length}</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🤖</span>
                <div>
                  <div className="stat-label">Modelo activo:</div>
                  <div className="stat-value">{filters.modelo === 'modelo1' ? 'M1' : 'M2'}</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📅</span>
                <div>
                  <div className="stat-label">Fecha analizada:</div>
                  <div className="stat-value-small">{filters.fecha}</div>
                </div>
              </div>
            </div>

            {/* Leyenda del mapa de calor */}
            <div className="legend">
              <h4>Intensidad de Riesgo</h4>
              <div className="legend-gradient">
                <span>Bajo</span>
                <div className="gradient-bar"></div>
                <span>Alto</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;