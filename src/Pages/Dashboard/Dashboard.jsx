// src/Pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat';
import './Dashboard.css';
import { api } from '../../Service/api';

// Componente personalizado para el mapa de calor
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !points || points.length === 0) return;

    // Crear capa de calor
    const heatLayer = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      max: 1.0,
      gradient: {
        0.0: 'blue',
        0.5: 'lime',
        0.7: 'yellow',
        0.85: 'orange',
        1.0: 'red'
      }
    }).addTo(map);

    // Limpiar al desmontar
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [map, points]);

  return null;
}

// Componente para actualizar el centro del mapa
function MapController({ center }) {
  const map = useMap();
  
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  
  return null;
}

function Dashboard() {
  const [incidentes, setIncidentes] = useState([]);
  const [filteredIncidentes, setFilteredIncidentes] = useState([]);
  const [resumen, setResumen] = useState(null);
  const [provincias, setProvincias] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Filtros
  const [filters, setFilters] = useState({
    year: '2024',
    rangoEdad: 'all',
    genero: 'all',
    provincia: 'all',
    riesgo: 'all'
  });
  
  const [mapCenter, setMapCenter] = useState([-1.8312, -78.1834]); // Centro de Ecuador

  // Cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [incidentesData, resumenData, provinciasData] = await Promise.all([
          api.getIncidentes(),
          api.getResumen(),
          api.getProvincias()
        ]);
        
        setIncidentes(incidentesData);
        setFilteredIncidentes(incidentesData);
        setResumen(resumenData);
        setProvincias(provinciasData);
      } catch (error) {
        console.error('Error cargando datos:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  // Aplicar filtros
  useEffect(() => {
    const applyFilters = async () => {
      try {
        const filtered = await api.getIncidentesFiltrados(filters);
        setFilteredIncidentes(filtered);
      } catch (error) {
        console.error('Error aplicando filtros:', error);
      }
    };
    
    applyFilters();
  }, [filters]);

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
  };

  const handleApplyRangoEdad = () => {
    // Lógica para aplicar rango de edad
    console.log('Aplicar rango de edad');
  };

  // Convertir datos para el mapa de calor
  const heatmapPoints = filteredIncidentes.map(inc => {
    // Intensidad basada en el riesgo
    const intensity = inc.riesgo === 'alto' ? 1.0 : inc.riesgo === 'medio' ? 0.6 : 0.3;
    return [inc.lat, inc.lng, intensity];
  });

  if (loading) {
    return <div className="loading">Cargando datos...</div>;
  }

  return (
    <div className="dashboard">
      {/* Panel de filtros */}
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="header-icon">🗺️</div>
          <h2>Mapa Homicidios Ecuador</h2>
        </div>

        {/* Filtro de Año */}
        <div className="filter-section">
          <label className="filter-label">
            📅 Año
          </label>
          <select 
            className="filter-select"
            value={filters.year}
            onChange={(e) => handleFilterChange('year', e.target.value)}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="all">Todos</option>
          </select>
        </div>

        {/* Filtro de Rango de Edad */}
        <div className="filter-section">
          <label className="filter-label">Rango de Edad</label>
          <div className="range-inputs">
            <input type="number" placeholder="0" className="range-input" />
            <span>-</span>
            <input type="number" placeholder="100+" className="range-input" />
          </div>
          <button className="apply-button" onClick={handleApplyRangoEdad}>
            ⚙️ Aplicar Rango
          </button>
        </div>

        {/* Filtro de Género */}
        <div className="filter-section">
          <label className="filter-label">👥 Género</label>
          <div className="checkbox-group">
            <label className="checkbox-label">
              <input type="checkbox" defaultChecked />
              <span>Todos</span>
            </label>
          </div>
        </div>

        {/* Filtro de Provincia */}
        <div className="filter-section">
          <label className="filter-label">📍 Provincia</label>
          <select 
            className="filter-select"
            value={filters.provincia}
            onChange={(e) => handleFilterChange('provincia', e.target.value)}
          >
            <option value="all">Todas las provincias</option>
            {provincias.map(prov => (
              <option key={prov} value={prov}>{prov}</option>
            ))}
          </select>
        </div>

        {/* Filtro de Riesgo */}
        <div className="filter-section">
          <label className="filter-label">⚠️ Nivel de Riesgo</label>
          <select 
            className="filter-select"
            value={filters.riesgo}
            onChange={(e) => handleFilterChange('riesgo', e.target.value)}
          >
            <option value="all">Todos los niveles</option>
            <option value="alto">Alto</option>
            <option value="medio">Medio</option>
            <option value="bajo">Bajo</option>
          </select>
        </div>
      </div>

      {/* Mapa */}
      <div className="map-container">
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
          
          <MapController center={mapCenter} />
          
          {heatmapPoints.length > 0 && (
            <HeatmapLayer points={heatmapPoints} />
          )}
        </MapContainer>

        {/* Panel de resumen */}
        {resumen && (
          <div className="summary-panel">
            <h3>📊 Resumen de Incidentes</h3>
            <div className="summary-stats">
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <div>
                  <div className="stat-label">Total víctimas:</div>
                  <div className="stat-value">{filteredIncidentes.length}</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">📍</span>
                <div>
                  <div className="stat-label">Con coordenadas:</div>
                  <div className="stat-value">{filteredIncidentes.length}</div>
                </div>
              </div>
              <div className="stat-item">
                <span className="stat-icon">❌</span>
                <div>
                  <div className="stat-label">Sin coordenadas:</div>
                  <div className="stat-value">0</div>
                </div>
              </div>
            </div>

            {/* Leyenda del mapa de calor */}
            <div className="legend">
              <h4>Intensidad de Incidentes</h4>
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