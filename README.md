# Multiselect

Interfaz de multiselección con propagación bidireccional automática entre 3 niveles jerárquicos.

Base: [akobashikawa/template-tdd-vue-cdn](https://github.com/akobashikawa/template-tdd-vue-cdn)

## Características

- **3 niveles jerárquicos**: A (padres) → B (intermedios) → C (hijos)
- **Selección manual**: Los items seleccionados manualmente se marcan con checkbox
- **Auto-selección**: Los items auto-seleccionados se muestran en color y negrita
- **Propagación bidireccional**: La selección se propaga hacia adelante y hacia atrás en la jerarquía

## Reglas de Propagación

### Forward (A → B → C)
- **Seleccionar A** → Auto-selecciona B (hijos) → Auto-selecciona C (nietos)
- **Seleccionar B** → Auto-selecciona C (hijos)

### Backward (C → B → A)
- **Seleccionar B** → Auto-selecciona A (padres)
- **Seleccionar C** → Auto-selecciona B (padres) → Auto-selecciona A (abuelos)

## Cómo Funciona

### Estructura de Datos

Los items en los niveles B y C tienen un array `sources` que define sus relaciones:

```javascript
items_a: [
  { value: 'a0', label: 'Option a0' },
  { value: 'a1', label: 'Option a1' },
  { value: 'a2', label: 'Option a2' }
]

items_b: [
  { value: 'b0', label: 'Option b0', sources: ['a0'] },
  { value: 'b1', label: 'Option b1', sources: ['a0', 'a1'] },
  { value: 'b2', label: 'Option b2', sources: ['a1', 'a2'] }
]

items_c: [
  { value: 'c0', label: 'Option c0', sources: ['b0'] },
  { value: 'c1', label: 'Option c1', sources: ['b0', 'b1'] },
  { value: 'c2', label: 'Option c2', sources: ['b1', 'b2'] }
]
```

### Ejemplo de Propagación

**Seleccionar a0:**
- ✓ a0 (seleccionado manualmente)
- **b0, b1** (auto-seleccionados - tienen a0 como source)
- **c0, c1** (auto-seleccionados - vía b0 y b1)

**Seleccionar c2:**
- ✓ c2 (seleccionado manualmente)
- **b1, b2** (auto-seleccionados - sources de c2)
- **a1, a2** (auto-seleccionados - sources de b1 y b2)

## Uso

### Desarrollo

```bash
npm install
npm run dev
```

Abre http://localhost:3000

### Tests

```bash
# Tests unitarios
npm test

# Tests con UI
npm test:ui

# Tests con coverage
npm test:coverage

# Tests E2E con Cypress
npm run cypress:open
```

## Implementación Técnica

### Arquitectura de Componentes

El proyecto está organizado en 3 componentes con responsabilidades claramente separadas:

#### 1. **Selector.js** (~70 líneas)
Componente de presentación simple que muestra una lista de items con checkboxes.

**Responsabilidades:**
- Renderizar lista de items
- Manejar selección individual vía v-model
- Aplicar estilos visuales (selected/autoselected)

**Props:**
- `title`: Título del selector
- `items`: Array de items a mostrar
- `selectedItems`: Items seleccionados (v-model)
- `autoSelectedItems`: Items auto-seleccionados
- `showSources`: Mostrar/ocultar sources

#### 2. **MultiSelector.js** (~165 líneas)
Componente de lógica que contiene toda la propagación bidireccional.

**Responsabilidades:**
- Gestionar 3 instancias de `Selector` (A, B, C)
- Implementar lógica de auto-selección (computed properties)
- Propagar selecciones forward (A→B→C) y backward (C→B→A)

**Props:**
- `itemsA`, `itemsB`, `itemsC`: Arrays de items para cada nivel

#### 3. **App.js** (~60 líneas)
Componente raíz que provee los datos.

**Responsabilidades:**
- Definir estructura de datos (items con sources)
- Pasar datos a `MultiSelector`
- Layout general de la aplicación

### Vue 3 Composition API

- **Computed Properties**: Auto-selección calculada reactivamente en `MultiSelector`
- **v-model**: Binding bidireccional entre `MultiSelector` y `Selector`
- **Dynamic Classes**: Aplicación condicional de estilos en `Selector`

### Estilos CSS

Los estilos están definidos en `index.html` (no en el componente) porque Vue CDN con template strings no procesa bloques `<style>` correctamente:

```css
.selected {
    color: blue;
    font-weight: bold;
}

.autoselected {
    color: teal;
    font-weight: bold;
}
```

### Estructura del Proyecto

```
multiselect/
├── src/
│   ├── app.js                  # Punto de entrada
│   └── components/
│       ├── App.js              # Componente raíz (datos)
│       ├── MultiSelector.js    # Lógica de propagación
│       └── Selector.js         # Componente de presentación
├── tests/
│   └── app.test.js             # Tests unitarios
├── cypress/                    # Tests E2E
├── index.html                  # HTML principal con estilos CSS
└── package.json
```

### Flujo de Datos

```
App.js (datos)
    ↓ props
MultiSelector.js (lógica)
    ↓ props + v-model
Selector.js (presentación)
```

## Tecnologías

- **Vue 3** (CDN - sin build step)
- **Vitest** (testing unitario)
- **Cypress** (testing E2E)
- **Matcha.css** (framework CSS minimalista)