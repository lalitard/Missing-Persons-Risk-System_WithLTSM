// src/Pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './Dashboard.css';
import { api } from '../../Service/api';
import Loader from '../../Components/Loader/Loader';
import 'leaflet.heat';

function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    if (!L.heatLayer) {
      console.error('leaflet.heat no está cargado correctamente');
      return;
    }

    const heatLayer = L.heatLayer(points, {
      radius: 30,
      blur: 20,
      maxZoom: 10,
      max: 3.0,
      minOpacity: 0.4, // ✅ Reducido para ver mejor los valores bajos
      gradient: {
        0.0: 'rgba(0, 150, 255, 0.3)', // ✅ Azul para riesgo bajo
        0.2: 'rgba(0, 200, 255, 0.5)', // ✅ Azul claro
        0.4: 'cyan',
        0.5: 'lime',
        0.6: 'yellow',
        0.75: 'orange',
        0.9: 'red',
        1.0: 'darkred'
      }
    }).addTo(map);

    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

function MapViewController({ center, zoom }) {
  const map = useMap();
  
  useEffect(() => {
    if (center && zoom) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  
  return null;
}

function Dashboard() {
  const [heatmapData, setHeatmapData] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [loading, setLoading] = useState(false);
  const [resultadoPrediccion, setResultadoPrediccion] = useState(null);
  const [mapView, setMapView] = useState({ center: [-1.8312, -78.1834], zoom: 7 });
  
  const [filters, setFilters] = useState({
    fecha: '',
    provincia: 'all',
    latitud: '',
    longitud: '',
    modelo: 'modelo1'
  });

  useEffect(() => {
    const provinciasData = api.getProvincias();
    setProvincias(provinciasData);
  }, []);

  // ✅ Resetear provincia al cambiar de modelo
  useEffect(() => {
    if (filters.modelo === 'modelo2' && filters.provincia === 'all') {
      setFilters(prev => ({
        ...prev,
        provincia: provincias[0] || 'GUAYAS'
      }));
    }
  }, [filters.modelo, provincias]);

  useEffect(() => {
    if (filters.provincia === 'all') {
      setMapView({ center: [-1.8312, -78.1834], zoom: 7 });
    } else {
      const centroProvincia = api.getCentroProvincia(filters.provincia);
      setMapView({ 
        center: [centroProvincia.lat, centroProvincia.lng], 
        zoom: centroProvincia.zoom 
      });
    }
  }, [filters.provincia, filters.modelo]);

  const handleApplyFilters = async () => {
    if (!filters.fecha) {
      alert('Por favor selecciona una fecha');
      return;
    }

    // ✅ Validación específica para Modelo 2
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
        if (filters.provincia === 'all') {
          const puntos = await api.procesarTodasLasProvincias(filters.fecha);
          
          setResultadoPrediccion({
            tipo: 'modelo1',
            contexto: { riesgo_label: 'VARIABLE' },
            totalPuntos: puntos.length,
            todasProvincias: true
          });

          const heatPoints = puntos.map(punto => [
            punto.lat,
            punto.lng,
            punto.peso || 1.0
          ]);

          setHeatmapData(heatPoints);
        } else {
          const resultado = await api.procesarModelo1(
            filters.fecha,
            filters.provincia
          );

          setResultadoPrediccion({
            tipo: 'modelo1',
            contexto: resultado.contexto,
            totalPuntos: resultado.puntos.length,
            desaparicionesEstimadas: resultado.contexto.desapariciones_estimadas
          });

          const heatPoints = resultado.puntos.map(punto => [
            punto.lat,
            punto.lng,
            punto.peso || 1.0
          ]);

          setHeatmapData(heatPoints);
        }
      } else {
        // ✅ Modelo 2 - Solo coordenadas específicas
        const puntos = await api.procesarModelo2(
          filters.fecha,
          filters.provincia,
          filters.latitud,
          filters.longitud
        );

        setResultadoPrediccion({
          tipo: 'modelo2',
          totalPuntos: puntos.length,
          riesgoDetectado: puntos[0]?.riesgo || 'N/A',
          desaparicionesEstimadas: puntos[0]?.n_desapariciones || 0
        });

        const heatPoints = puntos.map(punto => [
          punto.lat,
          punto.lng,
          punto.peso
        ]);

        setHeatmapData(heatPoints);

        // ✅ Hacer zoom a las coordenadas específicas
        setMapView({
          center: [parseFloat(filters.latitud), parseFloat(filters.longitud)],
          zoom: 13
        });
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
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="header-icon">🗺️</div>
          <h2>Mapa Personas Desaparecidas Ecuador</h2>
        </div>

        <div className="filter-section">
          <label className="filter-label">🤖 Modelo de Predicción</label>
          <select 
            className="filter-select"
            value={filters.modelo}
            onChange={(e) => handleFilterChange('modelo', e.target.value)}
          >
            <option value="modelo1">Modelo 1 - Análisis Provincial</option>
            <option value="modelo2">Modelo 2 - Análisis Geoespacial</option>
          </select>
        </div>

        <div className="filter-section">
          <label className="filter-label">📅 Fecha</label>
          <input 
            type="date"
            className="filter-input"
            value={filters.fecha}
            onChange={(e) => handleFilterChange('fecha', e.target.value)}
          />
        </div>

        <div className="filter-section">
          <label className="filter-label">📍 Provincia</label>
          <select 
            className="filter-select"
            value={filters.provincia}
            onChange={(e) => handleFilterChange('provincia', e.target.value)}
          >
            {/* ✅ Solo mostrar "Todas las provincias" en Modelo 1 */}
            {filters.modelo === 'modelo1' && (
              <option value="all">🌍 Todas las provincias</option>
            )}
            {provincias.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        {/* ✅ Campos de coordenadas - Solo para Modelo 2 */}
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

        <div className="filter-section">
          <button 
            className="apply-button-main" 
            onClick={handleApplyFilters}
            disabled={loading}
          >
            {loading ? '⏳ Procesando...' : '🔍 Aplicar Filtros'}
          </button>
        </div>

        <div className="model-info">
          <h4>ℹ️ Información del Modelo</h4>
          {filters.modelo === 'modelo1' ? (
            <p>
              <strong>Modelo 1:</strong> Analiza patrones basados en fecha y provincia. 
              {filters.provincia === 'all' 
                ? ' Muestra predicciones para todo Ecuador.' 
                : ' Genera 5 predicciones para la provincia seleccionada.'}
            </p>
          ) : (
            <p>
              <strong>Modelo 2:</strong> Análisis geoespacial preciso. Ingresa coordenadas 
              específicas para obtener la predicción de riesgo en ese punto exacto.
            </p>
          )}
        </div>

        {resultadoPrediccion && (
          <div className="prediction-result">
            <h4>📊 Resultado de la Predicción</h4>
            {resultadoPrediccion.todasProvincias && (
              <div className="result-item">
                <span className="result-label">Alcance:</span>
                <span className="result-badge nacional">NACIONAL</span>
              </div>
            )}
            {resultadoPrediccion.tipo === 'modelo1' && !resultadoPrediccion.todasProvincias && (
              <>
                <div className="result-item">
                  <span className="result-label">Desapariciones estimadas:</span>
                  <span className="result-value">
                    {resultadoPrediccion.desaparicionesEstimadas?.toFixed(2) || '0.00'}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Nivel de riesgo:</span>
                  <span className={`result-badge ${resultadoPrediccion.contexto?.riesgo_label?.toLowerCase() || 'bajo'}`}>
                    {resultadoPrediccion.contexto?.riesgo_label || 'N/A'}
                  </span>
                </div>
              </>
            )}
            <div className="result-item">
              <span className="result-label">Puntos analizados:</span>
              <span className="result-value">{resultadoPrediccion.totalPuntos}</span>
            </div>
            {resultadoPrediccion.tipo === 'modelo2' && (
              <>
                <div className="result-item">
                  <span className="result-label">Riesgo detectado:</span>
                  <span className={`result-badge ${resultadoPrediccion.riesgoDetectado?.toLowerCase() || 'bajo'}`}>
                    {resultadoPrediccion.riesgoDetectado || 'N/A'}
                  </span>
                </div>
                <div className="result-item">
                  <span className="result-label">Desapariciones estimadas:</span>
                  <span className="result-value">
                    {resultadoPrediccion.desaparicionesEstimadas?.toFixed(2) || '0.00'}
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="map-container">
        {loading && (
          <div className="map-loader-overlay">
            <Loader message={filters.provincia === 'all' ? "Procesando todas las provincias..." : "Procesando predicción..."} />
          </div>
        )}
        
        <MapContainer
          center={mapView.center}
          zoom={mapView.zoom}
          style={{ height: '100%', width: '100%' }}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          <MapViewController center={mapView.center} zoom={mapView.zoom} />
          
          {heatmapData.length > 0 && (
            <HeatmapLayer points={heatmapData} />
          )}
        </MapContainer>

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