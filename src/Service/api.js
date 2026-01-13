// Coordenadas de muestra por provincia (5 puntos por provincia)
const provinciaCoords = {
  "PICHINCHA": [
    { lat: -0.1807, lng: -78.4678 },
    { lat: -0.2295, lng: -78.5249 },
    { lat: -0.2902, lng: -78.5458 },
    { lat: -0.1850, lng: -78.4640 },
    { lat: -0.2250, lng: -78.5280 }
  ],
  "GUAYAS": [
    { lat: -2.1709, lng: -79.9224 },
    { lat: -2.1894, lng: -79.8866 },
    { lat: -2.2158, lng: -79.8897 },
    { lat: -2.1479, lng: -79.9663 },
    { lat: -2.1750, lng: -79.9180 }
  ],
  "TUNGURAHUA": [
    { lat: -1.2490, lng: -78.6167 },
    { lat: -1.2394, lng: -78.6294 },
    { lat: -1.2550, lng: -78.6100 },
    { lat: -1.2300, lng: -78.6350 },
    { lat: -1.2450, lng: -78.6200 }
  ],
  "COTOPAXI": [
    { lat: -0.9347, lng: -78.6156 },
    { lat: -0.9200, lng: -78.6300 },
    { lat: -0.9450, lng: -78.6000 },
    { lat: -0.9100, lng: -78.6400 },
    { lat: -0.9500, lng: -78.6050 }
  ],
  "SUCUMBIOS": [
    { lat: 0.0833, lng: -76.8833 },
    { lat: 0.0900, lng: -76.8700 },
    { lat: 0.0750, lng: -76.8900 },
    { lat: 0.0950, lng: -76.8650 },
    { lat: 0.0700, lng: -76.8950 }
  ],
  "ESMERALDAS": [
    { lat: 0.9681, lng: -79.6517 },
    { lat: 0.9695, lng: -79.6505 },
    { lat: 0.9670, lng: -79.6530 },
    { lat: 0.9705, lng: -79.6495 },
    { lat: 0.9660, lng: -79.6540 }
  ],
  "EL ORO": [
    { lat: -3.2581, lng: -79.9553 },
    { lat: -3.2595, lng: -79.9540 },
    { lat: -3.2570, lng: -79.9565 },
    { lat: -3.2677, lng: -79.9598 },
    { lat: -3.2690, lng: -79.9585 }
  ],
  "CARCHI": [
    { lat: 0.8120, lng: -77.7177 },
    { lat: 0.8200, lng: -77.7100 },
    { lat: 0.8050, lng: -77.7250 },
    { lat: 0.8250, lng: -77.7050 },
    { lat: 0.8000, lng: -77.7300 }
  ],
  "STO DGO DE LOS TSACHILAS": [
    { lat: -0.2521, lng: -79.1753 },
    { lat: -0.2535, lng: -79.1740 },
    { lat: -0.2510, lng: -79.1765 },
    { lat: -0.2394, lng: -79.1894 },
    { lat: -0.2410, lng: -79.1880 }
  ],
  "MANABI": [
    { lat: -0.9537, lng: -80.7089 },
    { lat: -1.0543, lng: -80.4559 },
    { lat: -1.0356, lng: -80.6539 },
    { lat: -0.9550, lng: -80.7075 },
    { lat: -1.0530, lng: -80.4570 }
  ],
  "IMBABURA": [
    { lat: 0.3518, lng: -78.1226 },
    { lat: 0.3600, lng: -78.1150 },
    { lat: 0.3450, lng: -78.1300 },
    { lat: 0.3650, lng: -78.1100 },
    { lat: 0.3400, lng: -78.1350 }
  ],
  "LOS RIOS": [
    { lat: -1.8016, lng: -79.5341 },
    { lat: -1.8030, lng: -79.5330 },
    { lat: -1.0278, lng: -79.4631 },
    { lat: -1.0290, lng: -79.4620 },
    { lat: -1.8000, lng: -79.5350 }
  ],
  "AZUAY": [
    { lat: -2.9001, lng: -79.0059 },
    { lat: -2.8833, lng: -78.9833 },
    { lat: -2.9015, lng: -79.0045 },
    { lat: -2.8900, lng: -78.9900 },
    { lat: -2.8950, lng: -78.9950 }
  ],
  "ZAMORA CHINCHIPE": [
    { lat: -4.0667, lng: -78.9500 },
    { lat: -4.0700, lng: -78.9450 },
    { lat: -4.0650, lng: -78.9550 },
    { lat: -4.0750, lng: -78.9400 },
    { lat: -4.0600, lng: -78.9600 }
  ],
  "NAPO": [
    { lat: -1.0044, lng: -77.8144 },
    { lat: -1.0100, lng: -77.8100 },
    { lat: -1.0000, lng: -77.8200 },
    { lat: -1.0150, lng: -77.8050 },
    { lat: -0.9950, lng: -77.8250 }
  ],
  "CHIMBORAZO": [
    { lat: -1.6635, lng: -78.6547 },
    { lat: -1.6700, lng: -78.6500 },
    { lat: -1.6600, lng: -78.6600 },
    { lat: -1.6750, lng: -78.6450 },
    { lat: -1.6550, lng: -78.6650 }
  ],
  "ORELLANA": [
    { lat: -0.4586, lng: -76.9875 },
    { lat: -0.4650, lng: -76.9800 },
    { lat: -0.4550, lng: -76.9950 },
    { lat: -0.4700, lng: -76.9750 },
    { lat: -0.4500, lng: -77.0000 }
  ],
  "CAÑAR": [
    { lat: -2.5597, lng: -78.9378 },
    { lat: -2.5650, lng: -78.9300 },
    { lat: -2.5550, lng: -78.9450 },
    { lat: -2.5700, lng: -78.9250 },
    { lat: -2.5500, lng: -78.9500 }
  ],
  "MORONA SANTIAGO": [
    { lat: -2.3056, lng: -78.1167 },
    { lat: -2.3100, lng: -78.1100 },
    { lat: -2.3000, lng: -78.1200 },
    { lat: -2.3150, lng: -78.1050 },
    { lat: -2.2950, lng: -78.1250 }
  ],
  "LOJA": [
    { lat: -3.9931, lng: -79.2042 },
    { lat: -4.0000, lng: -79.2000 },
    { lat: -3.9900, lng: -79.2100 },
    { lat: -4.0050, lng: -79.1950 },
    { lat: -3.9850, lng: -79.2150 }
  ],
  "SANTA ELENA": [
    { lat: -2.2268, lng: -80.8590 },
    { lat: -2.2300, lng: -80.8550 },
    { lat: -2.2250, lng: -80.8650 },
    { lat: -2.2350, lng: -80.8500 },
    { lat: -2.2200, lng: -80.8700 }
  ],
  "PASTAZA": [
    { lat: -1.4886, lng: -78.0031 },
    { lat: -1.4950, lng: -78.0000 },
    { lat: -1.4850, lng: -78.0100 },
    { lat: -1.5000, lng: -77.9950 },
    { lat: -1.4800, lng: -78.0150 }
  ],
  "GALAPAGOS": [
    { lat: -0.7500, lng: -90.3167 },
    { lat: -0.7550, lng: -90.3100 },
    { lat: -0.7450, lng: -90.3250 },
    { lat: -0.7600, lng: -90.3050 },
    { lat: -0.7400, lng: -90.3300 }
  ],
  "BOLIVAR": [
    { lat: -1.5931, lng: -79.0019 },
    { lat: -1.6000, lng: -79.0000 },
    { lat: -1.5900, lng: -79.0100 },
    { lat: -1.6050, lng: -78.9950 },
    { lat: -1.5850, lng: -79.0150 }
  ]
};

const API_BASE_URL = 'http://127.0.0.1:5000/api';

// Simular delay de red
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  // ==================== MODELO 1 ====================
  
  // Endpoint 1: Predecir contexto de riesgo
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

  // Endpoint 2: Predecir localización
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

  // Función completa para Modelo 1 - Procesa múltiples coordenadas
  async procesarModelo1(fecha, provincia) {
    try {
      // Paso 1: Obtener contexto de riesgo
      const contexto = await this.predecirContexto(fecha, provincia);
      
      // Paso 2: Obtener coordenadas de la provincia
      const coords = provinciaCoords[provincia] || [];
      
      // Paso 3: Hacer predicciones en paralelo para cada coordenada
      const predicciones = await Promise.all(
        coords.map(async (coord) => {
          try {
            const resultado = await this.predecirLocalizacion(
              contexto.desapariciones_estimadas,
              fecha,
              provincia,
              contexto.riesgo
            );
            
            // Retornar los puntos con información adicional
            return resultado.puntos.map(punto => ({
              ...punto,
              riesgo: contexto.riesgo_label,
              fecha: fecha
            }));
          } catch (error) {
            console.error('Error en predicción individual:', error);
            return [];
          }
        })
      );
      
      // Aplanar el array de arrays
      const todosPuntos = predicciones.flat();
      
      return {
        contexto,
        puntos: todosPuntos
      };
    } catch (error) {
      console.error('Error en procesarModelo1:', error);
      throw error;
    }
  },

  // ==================== MODELO 2 ====================
  
  // Endpoint único para Modelo 2
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

  // Función completa para Modelo 2 - Procesa múltiples coordenadas
  async procesarModelo2(fecha, provincia, latitud = null, longitud = null) {
    try {
      let coordsToProcess = [];
      
      // Si se proporcionan coordenadas específicas, usarlas
      if (latitud !== null && longitud !== null) {
        coordsToProcess = [{ lat: parseFloat(latitud), lng: parseFloat(longitud) }];
      } else {
        // Si no, usar las 5 coordenadas de la provincia
        coordsToProcess = provinciaCoords[provincia] || [];
      }
      
      // Hacer predicciones en paralelo para cada coordenada
      const predicciones = await Promise.all(
        coordsToProcess.map(async (coord) => {
          try {
            const resultado = await this.predecirPuntoRiesgo(
              fecha,
              coord.lat,
              coord.lng,
              provincia
            );
            
            return {
              lat: resultado.ubicacion.lat,
              lng: resultado.ubicacion.lng,
              peso: resultado.n_desapariciones,
              riesgo: resultado.riesgo.nivel,
              fecha: resultado.fecha
            };
          } catch (error) {
            console.error('Error en predicción individual:', error);
            return null;
          }
        })
      );
      
      // Filtrar nulls y retornar
      return predicciones.filter(p => p !== null);
    } catch (error) {
      console.error('Error en procesarModelo2:', error);
      throw error;
    }
  },

  // ==================== UTILIDADES ====================
  
  // Obtener lista de provincias
  getProvincias() {
    return Object.keys(provinciaCoords).sort();
  },

  // Obtener coordenadas de una provincia
  getCoordenadasProvincia(provincia) {
    return provinciaCoords[provincia] || [];
  }
};