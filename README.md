# Chechomatic  - Calculadora de Fortificación de Leche Humana

## Descripción

Chechomatic es una aplicación web inteligente diseñada para optimizar la fortificación de leche humana en contextos sanitarios, especialmente para la alimentación de bebés prematuros. La aplicación implementa algoritmos basados en evidencia clínica para calcular las concentraciones óptimas de fortificador según las necesidades nutricionales específicas de cada paciente.

## Características Principales

### 🔬 **Algoritmo Científicamente Validado**
- Basado en datos reales de composición de leche humana
- Implementa recomendaciones ESPGHAN para prematuros
- Rangos objetivo nutricionales: 3.5-4.5 g/kg/día de proteína

### 📊 **Entrada de Datos Flexible**
- **Método Manual**: Ingreso directo de macronutrientes (Proteína/Lactosa/Lípidos g/100ml)
- **Método Estimado**: Selección automática basada en término/pretérmino + días de puerperio

### 🧮 **Cálculos Precisos**
- Aporte proteico total optimizado
- Concentración de fortificador necesaria
- Densidad energética calculada
- Volumen de fortificador requerido

### 💻 **Interfaz de Usuario Moderna**
- Diseño responsive para desktop, tablet y móvil
- Flujo de trabajo guiado paso a paso
- Validación en tiempo real
- Resultados visuales con barras de progreso

## Tecnologías Utilizadas

- **Frontend**: React 19.0.0
- **Gestión de Estado**: Context API con hooks personalizados
- **Estilos**: CSS Modules y CSS puro
- **Build Tool**: Create React App

## Estructura del Proyecto

```
src/
├── Components/
│   ├── CalculadoraFortificacion.js    # Componente principal
│   ├── EntradaDatos.js                # Panel de entrada de datos
│   ├── ResultadosCalculados.js        # Panel de resultados
│   ├── header.js                      # Header con navegación
│   └── *.css                          # Estilos de componentes
├── context/
│   ├── LactaTechContext.js           # Contexto principal de la app
│   └── ValoresNutricionalesContext.js # Contexto legacy (mantener por compatibilidad)
├── helpers/
│   └── cuentaAuxiliar.js             # Funciones de cálculo auxiliares
└── App.js                            # Componente raíz
```

## Algoritmo de Fortificación

### Parámetros de Entrada
```javascript
// Composiciones promedio de leche humana
LECHE_PROMEDIO = {
  term: { proteina: 1.04, lactosa: 7.19, lipidos: 2.96 },      // g/100ml
  preterm: { proteina: 1.72, lactosa: 5.58, lipidos: 3.04 }   // g/100ml
}

// Fortificador comercial estándar
FORTIFICADOR_COMERCIAL = {
  proteinaLiof: 46.2,  // g/100g liofilizado
  lactosaLiof: 51.8,   // g/100g liofilizado  
  lipidosLiof: 25.2    // g/100g liofilizado
}

// Constantes físicas
DENSIDAD_LIOFILIZADO = 1.4  // g/ml
```

### Fórmulas Principales

1. **Requerimiento diario de proteínas**:
   ```
   requerimiento = peso_kg × target_proteina_g_kg_dia
   ```

2. **Aporte de leche sola**:
   ```
   aporte_leche = (concentracion_proteina × volumen_leche_diario) / 100
   ```

3. **Déficit a cubrir**:
   ```
   deficit = max(0, requerimiento - aporte_leche)
   ```

4. **Cantidad de fortificador**:
   ```
   gramos_liof = (deficit × 100) / concentracion_proteina_fortificador
   volumen_fortificador = gramos_liof / densidad_liofilizado
   ```

### Rangos Objetivo
- **Proteínas**: 3.5-4.5 g/kg/día
- **Lactosa**: 11-15 g/kg/día
- **Lípidos**: 4.8-8.1 g/kg/día
- **Energía**: 115-140 kcal/kg/día

## Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**:
   ```bash
   git clone <url-del-repositorio>
   cd chechomatic
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**:
   ```bash
   npm start
   ```

4. **Abrir en navegador**:
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm run eject` - Expone la configuración de webpack (irreversible)

## Uso de la Aplicación

### Paso 1: Configurar Entrada de Datos

1. **Leche Fluida**:
   - Seleccionar método manual o estimado
   - Ingresar valores según opción elegida

2. **Fortificador**:
   - Seleccionar fortificador comercial estándar
   - Opción de personalizar composición

3. **Parámetros del Paciente**:
   - Peso del bebé (kg)
   - Target de proteína (3.5-4.5 g/kg/día)
   - Volumen de leche (ml/kg/día)

### Paso 2: Calcular y Revisar Resultados

1. Presionar "Calcular Fortificación"
2. Revisar resultados calculados:
   - Aporte proteico total
   - Concentración de fortificador
   - Densidad energética
   - Optimización alcanzada

### Paso 3: Interpretar Resultados

- **Verde (Óptimo)**: 80-110% de optimización
- **Amarillo (Revisar)**: Fuera del rango óptimo
- **Información detallada**: Volumen específico de fortificador necesario

## Consideraciones Clínicas

### Validaciones Implementadas
- Rangos seguros de concentración de fortificador
- Límites fisiológicos de densidad energética
- Alertas para concentraciones excesivas (>5% del volumen)

### Limitaciones
- Los cálculos son estimaciones basadas en valores promedio
- Siempre debe ser supervisado por personal médico cualificado
- No reemplaza la evaluación clínica individual

## Contribución al Proyecto

### Estructura de Commits
```
feat: nueva funcionalidad
fix: corrección de errores
docs: actualización de documentación
style: cambios de formato
refactor: refactorización de código
test: adición de pruebas
```

### Desarrollo Local

1. **Crear rama de feature**:
   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

2. **Realizar cambios y commit**:
   ```bash
   git add .
   git commit -m "feat: descripción del cambio"
   ```

3. **Push y crear PR**:
   ```bash
   git push origin feature/nueva-funcionalidad
   ```

## Licencia

Este proyecto está desarrollado para uso en contextos médicos y educativos. Consultar con el equipo de desarrollo para términos de uso específicos.

## Contacto y Soporte

Para consultas técnicas o clínicas sobre el algoritmo de fortificación, contactar al equipo de desarrollo.

---

**Versión**: 1.2.0  
**Última actualización**: Enero 2025  
**Compatibilidad**: React 19+, Navegadores modernos
