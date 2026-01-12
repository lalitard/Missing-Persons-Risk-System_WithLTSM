// src/Service/api.js
const mockData = {
  incidentes: [
    // GUAYAS - GUAYAQUIL (Zona de MUY ALTA concentración - ROJO)
    // Norte de Guayaquil
    { id: 1, lat: -2.1709, lng: -79.9224, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-15" },
    { id: 2, lat: -2.1720, lng: -79.9210, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-16" },
    { id: 3, lat: -2.1695, lng: -79.9240, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-17" },
    { id: 4, lat: -2.1730, lng: -79.9200, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-18" },
    { id: 5, lat: -2.1680, lng: -79.9250, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-19" },
    
    // Centro de Guayaquil
    { id: 6, lat: -2.1894, lng: -79.8866, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-20" },
    { id: 7, lat: -2.1900, lng: -79.8850, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-21" },
    { id: 8, lat: -2.1880, lng: -79.8880, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-22" },
    { id: 9, lat: -2.1910, lng: -79.8840, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-23" },
    { id: 10, lat: -2.1870, lng: -79.8890, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-24" },
    { id: 11, lat: -2.1920, lng: -79.8830, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-25" },
    { id: 12, lat: -2.1860, lng: -79.8900, provincia: "Guayas", riesgo: "alto", fecha: "2024-01-26" },
    
    // Sur de Guayaquil
    { id: 13, lat: -2.2158, lng: -79.8897, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-15" },
    { id: 14, lat: -2.2170, lng: -79.8880, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-16" },
    { id: 15, lat: -2.2140, lng: -79.8910, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-17" },
    { id: 16, lat: -2.2180, lng: -79.8870, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-18" },
    { id: 17, lat: -2.2130, lng: -79.8920, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-19" },
    { id: 18, lat: -2.2190, lng: -79.8860, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-20" },
    
    // Durán
    { id: 19, lat: -2.1479, lng: -79.9663, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-10" },
    { id: 20, lat: -2.1490, lng: -79.9650, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-11" },
    { id: 21, lat: -2.1470, lng: -79.9675, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-12" },
    { id: 22, lat: -2.1500, lng: -79.9640, provincia: "Guayas", riesgo: "alto", fecha: "2024-02-13" },
    
    // PICHINCHA - QUITO (Zona de ALTA concentración - NARANJA/ROJO)
    // Norte de Quito
    { id: 23, lat: -0.1807, lng: -78.4678, provincia: "Pichincha", riesgo: "alto", fecha: "2024-01-18" },
    { id: 24, lat: -0.1820, lng: -78.4665, provincia: "Pichincha", riesgo: "alto", fecha: "2024-01-19" },
    { id: 25, lat: -0.1795, lng: -78.4690, provincia: "Pichincha", riesgo: "alto", fecha: "2024-01-20" },
    { id: 26, lat: -0.1830, lng: -78.4655, provincia: "Pichincha", riesgo: "alto", fecha: "2024-01-21" },
    
    // Centro de Quito
    { id: 27, lat: -0.2295, lng: -78.5249, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-05" },
    { id: 28, lat: -0.2310, lng: -78.5235, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-06" },
    { id: 29, lat: -0.2280, lng: -78.5260, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-07" },
    { id: 30, lat: -0.2320, lng: -78.5225, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-08" },
    { id: 31, lat: -0.2270, lng: -78.5270, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-09" },
    
    // Sur de Quito
    { id: 32, lat: -0.2902, lng: -78.5458, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-20" },
    { id: 33, lat: -0.2920, lng: -78.5445, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-21" },
    { id: 34, lat: -0.2885, lng: -78.5470, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-22" },
    { id: 35, lat: -0.2935, lng: -78.5435, provincia: "Pichincha", riesgo: "alto", fecha: "2024-02-23" },
    
    // ESMERALDAS (Zona de ALTA concentración - NARANJA)
    { id: 36, lat: 0.9681, lng: -79.6517, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-08" },
    { id: 37, lat: 0.9695, lng: -79.6505, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-09" },
    { id: 38, lat: 0.9670, lng: -79.6530, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-10" },
    { id: 39, lat: 0.9705, lng: -79.6495, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-11" },
    { id: 40, lat: 0.9660, lng: -79.6540, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-12" },
    { id: 41, lat: 0.9715, lng: -79.6485, provincia: "Esmeraldas", riesgo: "alto", fecha: "2024-02-13" },
    
    // MANABÍ - MANTA/PORTOVIEJO (Zona de MEDIA-ALTA concentración - AMARILLO)
    { id: 42, lat: -0.9537, lng: -80.7089, provincia: "Manabí", riesgo: "alto", fecha: "2024-02-12" },
    { id: 43, lat: -0.9550, lng: -80.7075, provincia: "Manabí", riesgo: "alto", fecha: "2024-02-13" },
    { id: 44, lat: -0.9525, lng: -80.7100, provincia: "Manabí", riesgo: "alto", fecha: "2024-02-14" },
    { id: 45, lat: -1.0543, lng: -80.4559, provincia: "Manabí", riesgo: "medio", fecha: "2024-01-25" },
    { id: 46, lat: -1.0560, lng: -80.4545, provincia: "Manabí", riesgo: "medio", fecha: "2024-01-26" },
    { id: 47, lat: -1.0530, lng: -80.4570, provincia: "Manabí", riesgo: "medio", fecha: "2024-01-27" },
    { id: 48, lat: -1.0356, lng: -80.6539, provincia: "Manabí", riesgo: "medio", fecha: "2024-03-08" },
    
    // EL ORO - MACHALA (Zona de MEDIA concentración - AMARILLO)
    { id: 49, lat: -3.2581, lng: -79.9553, provincia: "El Oro", riesgo: "medio", fecha: "2024-01-30" },
    { id: 50, lat: -3.2595, lng: -79.9540, provincia: "El Oro", riesgo: "medio", fecha: "2024-01-31" },
    { id: 51, lat: -3.2570, lng: -79.9565, provincia: "El Oro", riesgo: "medio", fecha: "2024-02-01" },
    { id: 52, lat: -3.2677, lng: -79.9598, provincia: "El Oro", riesgo: "alto", fecha: "2024-02-18" },
    { id: 53, lat: -3.2690, lng: -79.9585, provincia: "El Oro", riesgo: "medio", fecha: "2024-02-19" },
    
    // SANTO DOMINGO (Zona de MEDIA-ALTA concentración - AMARILLO)
    { id: 54, lat: -0.2521, lng: -79.1753, provincia: "Santo Domingo", riesgo: "medio", fecha: "2024-02-25" },
    { id: 55, lat: -0.2535, lng: -79.1740, provincia: "Santo Domingo", riesgo: "medio", fecha: "2024-02-26" },
    { id: 56, lat: -0.2510, lng: -79.1765, provincia: "Santo Domingo", riesgo: "medio", fecha: "2024-02-27" },
    { id: 57, lat: -0.2394, lng: -79.1894, provincia: "Santo Domingo", riesgo: "alto", fecha: "2024-03-20" },
    { id: 58, lat: -0.2410, lng: -79.1880, provincia: "Santo Domingo", riesgo: "medio", fecha: "2024-03-21" },
    
    // LOS RÍOS (Zona de MEDIA concentración)
    { id: 59, lat: -1.8016, lng: -79.5341, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-02-01" },
    { id: 60, lat: -1.8030, lng: -79.5330, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-02-02" },
    { id: 61, lat: -1.0278, lng: -79.4631, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-03-12" },
    { id: 62, lat: -1.0290, lng: -79.4620, provincia: "Los Ríos", riesgo: "medio", fecha: "2024-03-13" },
    
    // AZUAY - CUENCA (Zona de BAJA-MEDIA concentración)
    { id: 63, lat: -2.9001, lng: -79.0059, provincia: "Azuay", riesgo: "bajo", fecha: "2024-01-22" },
    { id: 64, lat: -2.8833, lng: -78.9833, provincia: "Azuay", riesgo: "medio", fecha: "2024-03-01" },
    { id: 65, lat: -2.9015, lng: -79.0045, provincia: "Azuay", riesgo: "bajo", fecha: "2024-03-02" },
    
    // TUNGURAHUA, IMBABURA, SANTA ELENA, COTOPAXI, CHIMBORAZO (Dispersos)
    { id: 66, lat: -1.2490, lng: -78.6167, provincia: "Tungurahua", riesgo: "bajo", fecha: "2024-01-28" },
    { id: 67, lat: -1.2394, lng: -78.6294, provincia: "Tungurahua", riesgo: "medio", fecha: "2024-03-05" },
    { id: 68, lat: 0.3518, lng: -78.1226, provincia: "Imbabura", riesgo: "bajo", fecha: "2024-02-14" },
    { id: 69, lat: -2.2268, lng: -80.8590, provincia: "Santa Elena", riesgo: "medio", fecha: "2024-03-22" },
    { id: 70, lat: -0.9347, lng: -78.6156, provincia: "Cotopaxi", riesgo: "bajo", fecha: "2024-02-28" },
    { id: 71, lat: -1.6635, lng: -78.6547, provincia: "Chimborazo", riesgo: "medio", fecha: "2024-03-16" },
    
    // Más puntos concentrados en Guayaquil para intensificar el rojo
    { id: 72, lat: -2.1750, lng: -79.9180, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-01" },
    { id: 73, lat: -2.1760, lng: -79.9170, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-02" },
    { id: 74, lat: -2.1740, lng: -79.9190, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-03" },
    { id: 75, lat: -2.1850, lng: -79.8920, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-04" },
    { id: 76, lat: -2.1840, lng: -79.8930, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-05" },
    { id: 77, lat: -2.2100, lng: -79.8950, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-06" },
    { id: 78, lat: -2.2110, lng: -79.8940, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-07" },
    { id: 79, lat: -2.2120, lng: -79.8930, provincia: "Guayas", riesgo: "alto", fecha: "2024-03-08" },
    
    // Más puntos concentrados en Quito
    { id: 80, lat: -0.1850, lng: -78.4640, provincia: "Pichincha", riesgo: "alto", fecha: "2024-03-09" },
    { id: 81, lat: -0.2250, lng: -78.5280, provincia: "Pichincha", riesgo: "alto", fecha: "2024-03-10" },
    { id: 82, lat: -0.2260, lng: -78.5290, provincia: "Pichincha", riesgo: "alto", fecha: "2024-03-11" },
    { id: 83, lat: -0.2950, lng: -78.5420, provincia: "Pichincha", riesgo: "alto", fecha: "2024-03-12" },
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