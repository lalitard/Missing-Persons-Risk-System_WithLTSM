// src/Service/api.js
const mockData = {
  incidentes: [
    // Guayas - Guayaquil (zona de alta concentración)
    { id: 1, lat: -2.1709, lng: -79.9224, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-15" },
    { id: 2, lat: -2.1894, lng: -79.8866, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-20" },
    { id: 3, lat: -2.1479, lng: -79.9663, provincia: "Guayas", riesgo: "medio", fecha: "2024-02-10" },
    { id: 4, lat: -2.2158, lng: -79.8897, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-15" },
    { id: 5, lat: -2.1309, lng: -79.9074, provincia: "Guayas", riesgo: "medio", fecha: "2024-03-05" },
    
    // Pichincha - Quito (zona de alta concentración)
    { id: 6, lat: -0.1807, lng: -78.4678, provincia: "Pichincha", riesgo: "alto", fecha: "2024-01-18" },
    { id: 7, lat: -0.2295, lng: -78.5249, provincia: "Pichincha", riesgo: "medio", fecha: "2024-02-05" },
    { id: 8, lat: -0.2902, lng: -78.5458, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-20" },
    { id: 9, lat: -0.1452, lng: -78.4874, provincia: "Pichincha", riesgo: "medio", fecha: "2024-03-10" },
    { id: 10, lat: -0.2102, lng: -78.4945, provincia: "Pichincha", riesgo: "bajo", fecha: "2024-03-15" },
    
    // Manabí - Portoviejo, Manta
    { id: 11, lat: -1.0543, lng: -80.4559, provincia: "Manabí", riesgo: "medio", fecha: "2024-01-25" },
    { id: 12, lat: -0.9537, lng: -80.7089, provincia: "Manabí", riesgo: "alto", fecha: "2024-02-12" },
    { id: 13, lat: -1.0356, lng: -80.6539, provincia: "Manabí", riesgo: "medio", fecha: "2024-03-08" },
    
    // El Oro - Machala
    { id: 14, lat: -3.2581, lng: -79.9553, provincia: "El Oro", riesgo: "medio", fecha: "2024-01-30" },
    { id: 15, lat: -3.2677, lng: -79.9598, provincia: "El Oro", riesgo: "alto", fecha: "2024-02-18" },
    
    // Los Ríos - Babahoyo, Quevedo
    { id: 16, lat: -1.8016, lng: -79.5341, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-02-01" },
    { id: 17, lat: -1.0278, lng: -79.4631, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-03-12" },
    
    // Azuay - Cuenca
    { id: 18, lat: -2.9001, lng: -79.0059, provincia: "Azuay", riesgo: "bajo", fecha: "2024-01-22" },
    { id: 19, lat: -2.8833, lng: -78.9833, provincia: "Azuay", riesgo: "medio", fecha: "2024-03-01" },
    
    // Esmeraldas
    { id: 20, lat: 0.9681, lng: -79.6517, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-08" },
    { id: 21, lat: 0.9592, lng: -79.6559, provincia: "Esmeraldas", riesgo: "medio", fecha: "2024-03-18" },
    
    // Santo Domingo de los Tsáchilas
    { id: 22, lat: -0.2521, lng: -79.1753, provincia: "Santo Domingo", riesgo: "medio", fecha: "2024-02-25" },
    { id: 23, lat: -0.2394, lng: -79.1894, provincia: "Santo Domingo", riesgo: "alto", fecha: "2024-03-20" },
    
    // Tungurahua - Ambato
    { id: 24, lat: -1.2490, lng: -78.6167, provincia: "Tungurahua", riesgo: "bajo", fecha: "2024-01-28" },
    { id: 25, lat: -1.2394, lng: -78.6294, provincia: "Tungurahua", riesgo: "medio", fecha: "2024-03-05" },
    
    // Imbabura - Ibarra
    { id: 26, lat: 0.3518, lng: -78.1226, provincia: "Imbabura", riesgo: "bajo", fecha: "2024-02-14" },
    
    // Santa Elena
    { id: 27, lat: -2.2268, lng: -80.8590, provincia: "Santa Elena", riesgo: "medio", fecha: "2024-03-22" },
    
    // Cotopaxi - Latacunga
    { id: 28, lat: -0.9347, lng: -78.6156, provincia: "Cotopaxi", riesgo: "bajo", fecha: "2024-02-28" },
    
    // Chimborazo - Riobamba
    { id: 29, lat: -1.6635, lng: -78.6547, provincia: "Chimborazo", riesgo: "medio", fecha: "2024-03-16" },
  ],
  
  resumen: {
    totalVictimas: 6988,
    conCoordenadas: 6985,
    sinCoordenadas: 3
  }
};

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // Obtener todos los incidentes
  async getIncidentes() {
    await delay(500);
    return mockData.incidentes;
  },
  
  // Filtrar incidentes
  async getIncidentesFiltrados({ year, rangoEdad, provincia, riesgo, fechaInicio, fechaFin }) {
    await delay(500);
    
    let filtered = [...mockData.incidentes];
    
    if (year && year !== 'all') {
      filtered = filtered.filter(inc => inc.fecha.startsWith(year));
    }
    
    if (provincia && provincia !== 'all') {
      filtered = filtered.filter(inc => inc.provincia === provincia);
    }
    
    if (riesgo && riesgo !== 'all') {
      filtered = filtered.filter(inc => inc.riesgo === riesgo);
    }
    
    if (fechaInicio) {
      filtered = filtered.filter(inc => inc.fecha >= fechaInicio);
    }
    
    if (fechaFin) {
      filtered = filtered.filter(inc => inc.fecha <= fechaFin);
    }
    
    return filtered;
  },
  
  // Obtener resumen
  async getResumen() {
    await delay(300);
    return mockData.resumen;
  },
  
  // Obtener lista de provincias
  async getProvincias() {
    await delay(200);
    const provincias = [...new Set(mockData.incidentes.map(inc => inc.provincia))];
    return provincias.sort();
  }
};