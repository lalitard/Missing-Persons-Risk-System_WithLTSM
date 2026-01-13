// Coordenadas de ciudades principales por provincia (5 puntos estratégicos)
const provinciaCoords = {
  "PICHINCHA": [
    { lat: -0.1807, lng: -78.4678, ciudad: "Quito Norte" },
    { lat: -0.2295, lng: -78.5249, ciudad: "Quito Centro" },
    { lat: -0.2902, lng: -78.5458, ciudad: "Quito Sur" },
    { lat: -0.3370, lng: -78.5527, ciudad: "Sangolquí" },
    { lat: -0.0078, lng: -78.4481, ciudad: "Cayambe" }
  ],
  "GUAYAS": [
    { lat: -2.1709, lng: -79.9224, ciudad: "Guayaquil Norte" },
    { lat: -2.1894, lng: -79.8866, ciudad: "Guayaquil Centro" },
    { lat: -2.2158, lng: -79.8897, ciudad: "Guayaquil Sur" },
    { lat: -2.1479, lng: -79.9663, ciudad: "Durán" },
    { lat: -2.0667, lng: -79.8833, ciudad: "Samborondón" }
  ],
  "TUNGURAHUA": [
    { lat: -1.2490, lng: -78.6167, ciudad: "Ambato Centro" },
    { lat: -1.2650, lng: -78.6292, ciudad: "Ambato Sur" },
    { lat: -1.2300, lng: -78.6100, ciudad: "Ambato Norte" },
    { lat: -1.3924, lng: -78.5468, ciudad: "Baños" },
    { lat: -1.2900, lng: -78.6300, ciudad: "Huachi" }
  ],
  "COTOPAXI": [
    { lat: -0.9347, lng: -78.6156, ciudad: "Latacunga" },
    { lat: -0.9200, lng: -78.6300, ciudad: "Latacunga Este" },
    { lat: -0.9450, lng: -78.6000, ciudad: "Latacunga Oeste" },
    { lat: -1.0533, lng: -78.6164, ciudad: "Pujilí" },
    { lat: -0.6833, lng: -78.6167, ciudad: "Saquisilí" }
  ],
  "SUCUMBIOS": [
    { lat: 0.0833, lng: -76.8833, ciudad: "Nueva Loja" },
    { lat: 0.0900, lng: -76.8700, ciudad: "Lago Agrio Norte" },
    { lat: 0.0750, lng: -76.8900, ciudad: "Lago Agrio Sur" },
    { lat: 0.1167, lng: -77.6167, ciudad: "Shushufindi" },
    { lat: 0.4667, lng: -76.5000, ciudad: "Cuyabeno" }
  ],
  "ESMERALDAS": [
    { lat: 0.9681, lng: -79.6517, ciudad: "Esmeraldas Centro" },
    { lat: 0.9800, lng: -79.6450, ciudad: "Esmeraldas Norte" },
    { lat: 0.9550, lng: -79.6600, ciudad: "Esmeraldas Sur" },
    { lat: 0.3500, lng: -79.7833, ciudad: "Atacames" },
    { lat: 0.6167, lng: -79.7167, ciudad: "Muisne" }
  ],
  "EL ORO": [
    { lat: -3.2581, lng: -79.9553, ciudad: "Machala Centro" },
    { lat: -3.2700, lng: -79.9600, ciudad: "Machala Sur" },
    { lat: -3.2450, lng: -79.9500, ciudad: "Machala Norte" },
    { lat: -3.2667, lng: -80.0000, ciudad: "Puerto Bolívar" },
    { lat: -3.4833, lng: -79.9167, ciudad: "Santa Rosa" }
  ],
  "CARCHI": [
    { lat: 0.8120, lng: -77.7177, ciudad: "Tulcán Centro" },
    { lat: 0.8200, lng: -77.7100, ciudad: "Tulcán Norte" },
    { lat: 0.8050, lng: -77.7250, ciudad: "Tulcán Sur" },
    { lat: 0.5833, lng: -77.7167, ciudad: "San Gabriel" },
    { lat: 0.6500, lng: -77.6667, ciudad: "Mira" }
  ],
  "STO DGO DE LOS TSACHILAS": [
    { lat: -0.2521, lng: -79.1753, ciudad: "Santo Domingo Centro" },
    { lat: -0.2400, lng: -79.1700, ciudad: "Santo Domingo Norte" },
    { lat: -0.2650, lng: -79.1800, ciudad: "Santo Domingo Sur" },
    { lat: -0.2300, lng: -79.2000, ciudad: "La Concordia" },
    { lat: -0.2700, lng: -79.1600, ciudad: "Santo Domingo Este" }
  ],
  "MANABI": [
    { lat: -0.9537, lng: -80.7089, ciudad: "Manta" },
    { lat: -1.0543, lng: -80.4559, ciudad: "Portoviejo" },
    { lat: -1.0356, lng: -80.6539, ciudad: "Montecristi" },
    { lat: -0.3667, lng: -80.4500, ciudad: "Bahía de Caráquez" },
    { lat: -0.7667, lng: -80.2000, ciudad: "Chone" }
  ],
  "IMBABURA": [
    { lat: 0.3518, lng: -78.1226, ciudad: "Ibarra Centro" },
    { lat: 0.3600, lng: -78.1150, ciudad: "Ibarra Norte" },
    { lat: 0.3450, lng: -78.1300, ciudad: "Ibarra Sur" },
    { lat: 0.2333, lng: -78.2167, ciudad: "Otavalo" },
    { lat: 0.1667, lng: -78.1167, ciudad: "Cotacachi" }
  ],
  "LOS RIOS": [
    { lat: -1.8016, lng: -79.5341, ciudad: "Babahoyo Centro" },
    { lat: -1.8100, lng: -79.5300, ciudad: "Babahoyo Norte" },
    { lat: -1.7900, lng: -79.5400, ciudad: "Babahoyo Sur" },
    { lat: -1.0278, lng: -79.4631, ciudad: "Quevedo" },
    { lat: -0.9833, lng: -79.4667, ciudad: "Quevedo Norte" }
  ],
  "AZUAY": [
    { lat: -2.9001, lng: -79.0059, ciudad: "Cuenca Centro" },
    { lat: -2.8833, lng: -78.9833, ciudad: "Cuenca Norte" },
    { lat: -2.9200, lng: -79.0100, ciudad: "Cuenca Sur" },
    { lat: -2.8900, lng: -78.9900, ciudad: "Cuenca Este" },
    { lat: -2.8833, lng: -79.0667, ciudad: "Gualaceo" }
  ],
  "ZAMORA CHINCHIPE": [
    { lat: -4.0667, lng: -78.9500, ciudad: "Zamora Centro" },
    { lat: -4.0700, lng: -78.9450, ciudad: "Zamora Norte" },
    { lat: -4.0650, lng: -78.9550, ciudad: "Zamora Sur" },
    { lat: -4.3833, lng: -78.9500, ciudad: "Yantzaza" },
    { lat: -3.6833, lng: -78.8167, ciudad: "Zumba" }
  ],
  "NAPO": [
    { lat: -1.0044, lng: -77.8144, ciudad: "Tena Centro" },
    { lat: -1.0100, lng: -77.8100, ciudad: "Tena Norte" },
    { lat: -1.0000, lng: -77.8200, ciudad: "Tena Sur" },
    { lat: -0.4667, lng: -77.8167, ciudad: "El Chaco" },
    { lat: -0.9833, lng: -77.5833, ciudad: "Archidona" }
  ],
  "CHIMBORAZO": [
    { lat: -1.6635, lng: -78.6547, ciudad: "Riobamba Centro" },
    { lat: -1.6700, lng: -78.6500, ciudad: "Riobamba Norte" },
    { lat: -1.6600, lng: -78.6600, ciudad: "Riobamba Sur" },
    { lat: -1.4833, lng: -78.6500, ciudad: "Guano" },
    { lat: -2.0333, lng: -78.6500, ciudad: "Alausí" }
  ],
  "ORELLANA": [
    { lat: -0.4586, lng: -76.9875, ciudad: "Francisco de Orellana (Coca)" },
    { lat: -0.4650, lng: -76.9800, ciudad: "Coca Norte" },
    { lat: -0.4550, lng: -76.9950, ciudad: "Coca Sur" },
    { lat: -0.8500, lng: -77.0000, ciudad: "Loreto" },
    { lat: -0.3333, lng: -76.8833, ciudad: "La Joya de los Sachas" }
  ],
  "CAÑAR": [
    { lat: -2.5597, lng: -78.9378, ciudad: "Azogues Centro" },
    { lat: -2.5650, lng: -78.9300, ciudad: "Azogues Norte" },
    { lat: -2.5550, lng: -78.9450, ciudad: "Azogues Sur" },
    { lat: -2.7500, lng: -78.8333, ciudad: "Cañar" },
    { lat: -2.4500, lng: -78.8667, ciudad: "La Troncal" }
  ],
  "MORONA SANTIAGO": [
    { lat: -2.3056, lng: -78.1167, ciudad: "Macas Centro" },
    { lat: -2.3100, lng: -78.1100, ciudad: "Macas Norte" },
    { lat: -2.3000, lng: -78.1200, ciudad: "Macas Sur" },
    { lat: -2.8833, lng: -78.0333, ciudad: "Sucúa" },
    { lat: -3.3167, lng: -78.2667, ciudad: "Gualaquiza" }
  ],
  "LOJA": [
    { lat: -3.9931, lng: -79.2042, ciudad: "Loja Centro" },
    { lat: -4.0000, lng: -79.2000, ciudad: "Loja Norte" },
    { lat: -3.9900, lng: -79.2100, ciudad: "Loja Sur" },
    { lat: -4.2667, lng: -79.9000, ciudad: "Catamayo" },
    { lat: -4.3833, lng: -79.5500, ciudad: "Cariamanga" }
  ],
  "SANTA ELENA": [
    { lat: -2.2268, lng: -80.8590, ciudad: "Santa Elena" },
    { lat: -2.2300, lng: -80.8550, ciudad: "La Libertad" },
    { lat: -2.2250, lng: -80.8650, ciudad: "Salinas" },
    { lat: -1.8333, lng: -80.7500, ciudad: "Manglaralto" },
    { lat: -2.0667, lng: -80.7167, ciudad: "Anconcito" }
  ],
  "PASTAZA": [
    { lat: -1.4886, lng: -78.0031, ciudad: "Puyo Centro" },
    { lat: -1.4950, lng: -78.0000, ciudad: "Puyo Norte" },
    { lat: -1.4850, lng: -78.0100, ciudad: "Puyo Sur" },
    { lat: -1.5833, lng: -77.8167, ciudad: "Mera" },
    { lat: -1.0667, lng: -77.8333, ciudad: "Santa Clara" }
  ],
  "GALAPAGOS": [
    { lat: -0.7500, lng: -90.3167, ciudad: "Puerto Ayora" },
    { lat: -0.9667, lng: -90.9667, ciudad: "Puerto Villamil" },
    { lat: -0.2500, lng: -90.4333, ciudad: "Puerto Baquerizo Moreno" },
    { lat: -0.4000, lng: -90.3000, ciudad: "Bellavista" },
    { lat: -0.7000, lng: -90.3500, ciudad: "Santa Cruz" }
  ],
  "BOLIVAR": [
    { lat: -1.5931, lng: -79.0019, ciudad: "Guaranda Centro" },
    { lat: -1.6000, lng: -79.0000, ciudad: "Guaranda Norte" },
    { lat: -1.5900, lng: -79.0100, ciudad: "Guaranda Sur" },
    { lat: -1.7167, lng: -79.0667, ciudad: "San Miguel" },
    { lat: -1.8333, lng: -78.9833, ciudad: "Chimbo" }
  ]
};

// Centros de cada provincia para el zoom del mapa
const provinciaCentros = {
  "PICHINCHA": { lat: -0.2295, lng: -78.5249, zoom: 9 },
  "GUAYAS": { lat: -2.1709, lng: -79.9224, zoom: 9 },
  "TUNGURAHUA": { lat: -1.2490, lng: -78.6167, zoom: 10 },
  "COTOPAXI": { lat: -0.9347, lng: -78.6156, zoom: 10 },
  "SUCUMBIOS": { lat: 0.0833, lng: -76.8833, zoom: 9 },
  "ESMERALDAS": { lat: 0.9681, lng: -79.6517, zoom: 9 },
  "EL ORO": { lat: -3.2581, lng: -79.9553, zoom: 10 },
  "CARCHI": { lat: 0.8120, lng: -77.7177, zoom: 10 },
  "STO DGO DE LOS TSACHILAS": { lat: -0.2521, lng: -79.1753, zoom: 10 },
  "MANABI": { lat: -0.9537, lng: -80.7089, zoom: 9 },
  "IMBABURA": { lat: 0.3518, lng: -78.1226, zoom: 10 },
  "LOS RIOS": { lat: -1.8016, lng: -79.5341, zoom: 9 },
  "AZUAY": { lat: -2.9001, lng: -79.0059, zoom: 10 },
  "ZAMORA CHINCHIPE": { lat: -4.0667, lng: -78.9500, zoom: 9 },
  "NAPO": { lat: -1.0044, lng: -77.8144, zoom: 9 },
  "CHIMBORAZO": { lat: -1.6635, lng: -78.6547, zoom: 10 },
  "ORELLANA": { lat: -0.4586, lng: -76.9875, zoom: 9 },
  "CAÑAR": { lat: -2.5597, lng: -78.9378, zoom: 10 },
  "MORONA SANTIAGO": { lat: -2.3056, lng: -78.1167, zoom: 9 },
  "LOJA": { lat: -3.9931, lng: -79.2042, zoom: 10 },
  "SANTA ELENA": { lat: -2.2268, lng: -80.8590, zoom: 10 },
  "PASTAZA": { lat: -1.4886, lng: -78.0031, zoom: 9 },
  "GALAPAGOS": { lat: -0.7500, lng: -90.3167, zoom: 8 },
  "BOLIVAR": { lat: -1.5931, lng: -79.0019, zoom: 10 }
};

// Función helper para generar 5 puntos alrededor de un centro (Norte, Sur, Este, Oeste, Centro)
const generarPuntosAlrededor = (centroLat, centroLng, offset = 0.15) => {
  return [
    { lat: centroLat, lng: centroLng, direccion: "Centro" },
    { lat: centroLat + offset, lng: centroLng, direccion: "Norte" },
    { lat: centroLat - offset, lng: centroLng, direccion: "Sur" },
    { lat: centroLat, lng: centroLng + offset, direccion: "Este" },
    { lat: centroLat, lng: centroLng - offset, direccion: "Oeste" }
  ];
};

// Generar coordenadas distribuidas alrededor de cada centro provincial
const provinciaCoordsMock = {};
Object.keys(provinciaCentros).forEach(provincia => {
  const centro = provinciaCentros[provincia];
  provinciaCoordsMock[provincia] = generarPuntosAlrededor(centro.lat, centro.lng);
});

const API_BASE_URL = 'http://127.0.0.1:5000/api';

export const api = {
  // ==================== MODELO 1 ====================
  
  async predecirContexto(fecha, provincia) {
    try {
      const response = await fetch(`${API_BASE_URL}/prediccion/contexto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha,
          provincia
        })
      });
      
      if (!response.ok) {
        throw new Error('Error en la predicción de contexto');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en predecirContexto:', error);
      throw error;
    }
  },

  async predecirLocalizacion(desapariciones_estimadas, fecha, provincia, riesgo) {
    try {
      const response = await fetch(`${API_BASE_URL}/prediccion/localizacion`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          desapariciones_estimadas,
          fecha,
          provincia,
          riesgo
        })
      });
      
      if (!response.ok) {
        throw new Error('Error en la predicción de localización');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en predecirLocalizacion:', error);
      throw error;
    }
  },

  async procesarModelo1(fecha, provincia) {
    try {
      console.log('🔍 Iniciando procesamiento Modelo 1:', { fecha, provincia });
      
      // Paso 1: Obtener contexto de riesgo
      const contexto = await this.predecirContexto(fecha, provincia);
      console.log('✅ Contexto obtenido:', contexto);
      
      // Paso 2: Obtener las 5 coordenadas mock de la provincia
      const coordenadasMock = provinciaCoordsMock[provincia] || [];
      console.log(`📍 Usando ${coordenadasMock.length} coordenadas mock de ${provincia}`);
      
      // Asegurar un peso mínimo visible basado en el contexto
      const pesoBase = Math.max(contexto.desapariciones_estimadas || 1.0, 1.0);
      
      // Crear puntos con las coordenadas mock
      const puntos = coordenadasMock.map((coord, index) => ({
        lat: coord.lat,
        lng: coord.lng,
        peso: pesoBase,
        riesgo: contexto.riesgo_label,
        fecha: fecha,
        direccion: coord.direccion
      }));
      
      console.log(`📊 Total de puntos generados: ${puntos.length}`);
      console.log('📊 Muestra de puntos:', puntos);
      
      return {
        contexto,
        puntos: puntos
      };
    } catch (error) {
      console.error('❌ Error en procesarModelo1:', error);
      throw error;
    }
  },

  async procesarTodasLasProvincias(fecha) {
    try {
      console.log('🌎 Procesando todas las provincias para:', fecha);
      
      const todasProvincias = Object.keys(provinciaCentros);
      console.log(`📊 Provincias a procesar: ${todasProvincias.length}`);
      
      const resultados = await Promise.all(
        todasProvincias.map(async (provincia) => {
          try {
            console.log(`📍 Procesando provincia: ${provincia}`);
            
            const puntosAlrededor = provinciaCoordsMock[provincia];
            const contexto = await this.predecirContexto(fecha, provincia);
            
            const pesoBase = Math.max(contexto.desapariciones_estimadas || 1.0, 1.0);
            
            return puntosAlrededor.map(punto => ({
              lat: punto.lat,
              lng: punto.lng,
              peso: pesoBase,
              riesgo: contexto.riesgo_label,
              fecha: fecha,
              provincia: provincia,
              direccion: punto.direccion
            }));
          } catch (error) {
            console.error(`❌ Error en provincia ${provincia}:`, error);
            return [];
          }
        })
      );
      
      const todosPuntos = resultados.flat();
      console.log(`✅ Total de puntos en todo Ecuador: ${todosPuntos.length}`);
      
      return todosPuntos;
    } catch (error) {
      console.error('❌ Error en procesarTodasLasProvincias:', error);
      throw error;
    }
  },

  // ==================== MODELO 2 ====================
  
  async predecirPuntoRiesgo(fecha, lat, lng, provincia) {
    try {
      const response = await fetch(`${API_BASE_URL}/prediccion/punto`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fecha,
          lat,
          lng,
          provincia
        })
      });
      
      if (!response.ok) {
        throw new Error('Error en la predicción de punto de riesgo');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error en predecirPuntoRiesgo:', error);
      throw error;
    }
  },

  async procesarModelo2(fecha, provincia, latitud, longitud) {
    try {
      console.log('🔍 Iniciando procesamiento Modelo 2:', { fecha, provincia, latitud, longitud });
      
      const resultado = await this.predecirPuntoRiesgo(
        fecha,
        parseFloat(latitud),
        parseFloat(longitud),
        provincia
      );
      
      console.log('✅ Respuesta del servidor:', resultado);
      
      // Asegurar que siempre haya un peso mínimo visible
      const peso = Math.max(resultado.n_desapariciones || 0.5, 0.5);
      
      return [{
        lat: resultado.ubicacion.lat,
        lng: resultado.ubicacion.lng,
        peso: peso,
        riesgo: resultado.riesgo.nivel,
        fecha: resultado.fecha,
        n_desapariciones: resultado.n_desapariciones
      }];
    } catch (error) {
      console.error('❌ Error en procesarModelo2:', error);
      throw error;
    }
  },

  // ==================== UTILIDADES ====================
  
  getProvincias() {
    return Object.keys(provinciaCentros).sort();
  },

  getCentroProvincia(provincia) {
    return provinciaCentros[provincia] || { lat: -1.8312, lng: -78.1834, zoom: 7 };
  },

  getCoordenadasMock(provincia) {
    return provinciaCoordsMock[provincia] || [];
  }
};