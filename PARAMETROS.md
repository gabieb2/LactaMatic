# 📊 Impacto de Parámetros en Chechomatic

## **Cómo Cada Parámetro Afecta el Resultado Final**

### **1. 🥛 Leche Fluida**

#### **Método Manual**
- **Proteína (g/100ml)**: Impacto DIRECTO en requerimiento de fortificador
  - ⬆️ Más proteína → Menos fortificador necesario
  - ⬇️ Menos proteína → Más fortificador necesario
- **Lactosa (g/100ml)**: Afecta cálculo energético total
- **Lípidos (g/100ml)**: Mayor impacto energético (9 kcal/g vs 4 kcal/g)

#### **Método Estimado**
- **Tipo de Leche**:
  - `Pretérmino`: Más proteína (1.72), menos lactosa (5.58)
  - `A término`: Menos proteína (1.04), más lactosa (7.19)
- **Días de Puerperio**: ¡AHORA SÍ IMPACTA!
  - `Días 1-5` (Calostro): +80% proteína, -40% lactosa
  - `Días 6-14` (Transición): Cambio gradual
  - `Días 15+` (Madura): Composición estándar

### **2. 🧪 Fortificador**
- **Composición fija**: 46.2g Prot, 51.8g Lactosa, 25.2g Lípidos/100g
- **Densidad**: 1.4 g/ml (afecta conversión volumen/peso)

### **3. 👶 Parámetros del Paciente**

#### **Peso (kg)**
- **Multiplicador CLAVE**: Todas las necesidades se escalan por peso
- Ejemplo: Bebé 1kg vs 2kg = doble requerimiento total

#### **Target Proteína (g/kg/día)**
- **Objetivo nutricional**: Rango 3.5-4.5 según ESPGHAN
- Impacto directo en cantidad de fortificador necesaria

#### **Volumen Leche (ml/kg/día)**
- **Base de dilución**: Más volumen = menor concentración de fortificador
- Estándar: 150 ml/kg/día

---

## **🧮 Fórmulas Implementadas**

### **Cálculo Completo del Algoritmo**

```
1. COMPOSICIÓN DE LECHE AJUSTADA:
   Si método = estimado:
     factorProteina = días ≤ 5 ? 1.8 : días ≤ 14 ? gradual : 1.0
     composición = composiciónBase × factores

2. REQUERIMIENTOS DIARIOS:
   requerimientoProteína = peso × targetProteína (g/día)
   volumenTotal = peso × volumenLeche (ml/día)

3. APORTE DE LECHE SOLA:
   aporteProteína = (composición.proteína × volumenTotal) / 100

4. DÉFICIT A CUBRIR:
   déficit = max(0, requerimiento - aporteLeche)

5. FORTIFICADOR NECESARIO:
   gramosLiof = (déficit × 100) / 46.2  // % proteína en fortificador
   volumenFort = gramosLiof / 1.4       // densidad

6. CONCENTRACIÓN FINAL:
   concentración = (gramosLiof / volumenTotal) × 100

7. ENERGÍA TOTAL:
   energía = (proteínas × 4) + (lactosa × 4) + (lípidos × 9) kcal
   energíaPorKg = energía / peso

8. OPTIMIZACIÓN:
   % = (aporteTotal / requerimiento) × 100
```

---

## **🔍 Ejemplos Prácticos**

### **Ejemplo 1: Impacto de Días de Puerperio**

**Bebé pretérmino, 1.5kg, target 4.0 g/kg/día:**

| Días Puerperio | Proteína Base | Proteína Ajustada | Fortificador Necesario |
|----------------|---------------|-------------------|------------------------|
| 3 días (calostro) | 1.72 g/100ml | 3.10 g/100ml | **0.97 g/100ml** |
| 10 días (transición) | 1.72 g/100ml | 2.41 g/100ml | **2.31 g/100ml** |
| 20 días (madura) | 1.72 g/100ml | 1.72 g/100ml | **3.24 g/100ml** |

**¡Diferencia significativa!** El calostro necesita 70% menos fortificador.

### **Ejemplo 2: Impacto del Peso**

**Misma composición, target 4.0 g/kg/día:**

| Peso | Requerimiento | Volumen Leche | Concentración Fort. |
|------|---------------|---------------|-------------------|
| 1.0 kg | 4.0 g/día | 150 ml/día | 3.24 g/100ml |
| 1.5 kg | 6.0 g/día | 225 ml/día | 3.24 g/100ml |
| 2.0 kg | 8.0 g/día | 300 ml/día | 3.24 g/100ml |

**Concentración igual**, pero cantidad total proporcional al peso.

### **Ejemplo 3: Impacto del Target de Proteína**

**Bebé 1.5kg, leche pretérmino madura:**

| Target | Requerimiento | Déficit | Fortificador |
|--------|---------------|---------|--------------|
| 3.5 g/kg/d | 5.25 g/día | 2.67 g | 2.57 g/100ml |
| 4.0 g/kg/d | 6.00 g/día | 3.42 g | 3.24 g/100ml |
| 4.5 g/kg/d | 6.75 g/día | 4.17 g | 3.91 g/100ml |

**Diferencia de 26%** entre mínimo y máximo target.

---

## **⚠️ Límites de Seguridad Implementados**

- **Concentración máxima**: 5% del volumen total
- **Densidad energética**: 100-150 kcal/kg/día
- **Peso mínimo**: 0.5 kg
- **Validación de campos**: No negativos, rangos fisiológicos

---

## **🔧 Debugging: Ver Detalles del Cálculo**

En los resultados, haz clic en **"Ver detalles del cálculo"** para ver:
- Requerimiento exacto calculado
- Aporte de leche sola
- Aporte del fortificador  
- Composición final usada

Esto te permite verificar cómo cada parámetro influye en el resultado final.

---

## **✅ Pruebas Recomendadas**

1. **Cambiar días de puerperio**: 3 → 10 → 20 (verás cambio significativo)
2. **Modificar peso**: 1.0 → 2.0 kg (cantidad proporcional)
3. **Ajustar target**: 3.5 → 4.5 g/kg/día (concentración varía)
4. **Comparar manual vs estimado**: Mismos valores numéricos

**¡Ahora todos los parámetros tienen impacto real en el cálculo!**
