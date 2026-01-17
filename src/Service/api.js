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
const generarPuntosAlrededor = (centroLat, centroLng, offset = 0.063) => {
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
      
      let totalDesapariciones = 0;
      let provinciasExitosas = 0;
      const contextosProvincias = [];
      
      const resultados = await Promise.all(
        todasProvincias.map(async (provincia) => {
          try {
            console.log(`📍 Procesando provincia: ${provincia}`);
            
            const puntosAlrededor = provinciaCoordsMock[provincia];
            const contexto = await this.predecirContexto(fecha, provincia);
            
            // Acumular datos para el promedio nacional
            totalDesapariciones += contexto.desapariciones_estimadas || 0;
            provinciasExitosas++;
            contextosProvincias.push(contexto);
            
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
      
      // Calcular promedio nacional
      const promedioDesapariciones = provinciasExitosas > 0 
        ? totalDesapariciones / provinciasExitosas 
        : 0;
      
      // Determinar nivel de riesgo nacional basado en el promedio
      let nivelRiesgoNacional = 'BAJO';
      if (promedioDesapariciones >= 2.0) {
        nivelRiesgoNacional = 'ALTO';
      } else if (promedioDesapariciones >= 1.0) {
        nivelRiesgoNacional = 'MEDIO';
      }
      
      console.log(`✅ Total de puntos en todo Ecuador: ${todosPuntos.length}`);
      console.log(`📊 Promedio nacional de desapariciones: ${promedioDesapariciones.toFixed(2)}`);
      console.log(`⚠️ Nivel de riesgo nacional: ${nivelRiesgoNacional}`);
      
      return {
        puntos: todosPuntos,
        estadisticasNacionales: {
          promedioDesapariciones,
          nivelRiesgoNacional,
          provinciasAnalizadas: provinciasExitosas
        }
      };
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